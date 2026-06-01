import { defineConfig, loadEnv } from 'vite'
import fs from 'fs'
import path from 'path'
// import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const rootDir = (globalThis as any).process?.cwd?.() ?? '.'
  const env = loadEnv(mode, rootDir, '')

  const postmarkApiKey = env.POSTMARK_API_KEY || '902ab639-1cd8-4e37-98bb-db206b00eb0d'
  const senderEmail = env.SENDER_EMAIL || 'team@abetterchoicecare.com'
  const ownerEmail = env.OWNER_EMAIL || 'team@abetterchoicecare.com'

  return {
    plugins: [
      {
        name: 'figma-asset-resolver',
        resolveId(id) {
          if (id.startsWith('figma:asset/')) {
            return `\0figma-asset:${id}`
          }
          return null
        },
        load(id) {
          if (!id.startsWith('\0figma-asset:')) return null

          const original = id.slice('\0figma-asset:'.length)
          const assetName = original.replace('figma:asset/', '')
          const localAssetAbsPath = path.resolve(__dirname, 'src/assets', assetName)

          if (fs.existsSync(localAssetAbsPath)) {
            return `export default new URL(${JSON.stringify(localAssetAbsPath + '?url')}, import.meta.url).href;`
          }

          // 1x1 transparent gif placeholder
          return `export default "data:image/gif;base64,R0lGODlhAQABAAAAACw=";`
        },
      },
      {
        name: 'book-consultation-postmark',
        configureServer(server) {
          server.middlewares.use('/api/book-consultation', (req: any, res: any, next: any) => {
            if (req.method !== 'POST') return next()

            let body = ''
            req.on('data', (chunk: any) => {
              body += chunk
            })
            req.on('end', async () => {
              try {
                console.log('[Book Consultation] Request received')
                const parsed = body ? JSON.parse(body) : {}
                console.log('[Book Consultation] Parsed body:', parsed)

                const toEmail = String(parsed.toEmail || '').trim()
                const fullName = String(parsed.fullName || '').trim()
                const phone = String(parsed.phone || '').trim()
                const brief = String(parsed.brief || '').trim()
                const dateLabel = String(parsed.dateLabel || '').trim()
                const timeLabel = String(parsed.timeLabel || '').trim()

                if (!toEmail || !fullName || !phone || !dateLabel || !timeLabel) {
                  res.statusCode = 400
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'Missing required fields' }))
                  return
                }

                // Send via Postmark API
                const postmarkUrl = 'https://api.postmarkapp.com/email'

                // Customer email
                const customerEmailData = {
                  From: senderEmail,
                  To: toEmail,
                  Subject: 'Your consultation slot has been booked',
                  HtmlBody: `
<html>
<head>
    <title>Consultation Booking Confirmation</title>
</head>
<body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
    <div style='background: linear-gradient(129.33deg, #2563EB 12.21%, #1d4ed8 126.73%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;'>
        <h1 style='margin: 0; font-size: 24px;'>Booking Confirmed!</h1>
    </div>
    <div style='background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;'>
        <p>Hi <strong>${fullName}</strong>,</p>
        <p>Your consultation slot has been successfully booked. Here are the details:</p>
        
        <div style='background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563EB;'>
            <h3 style='margin-top: 0; color: #333;'>Appointment Details</h3>
            <p><strong>Date:</strong> ${dateLabel}</p>
            <p><strong>Time:</strong> ${timeLabel}</p>
            <p><strong>Email:</strong> ${toEmail}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${brief ? `<p><strong>Brief Information:</strong> ${brief}</p>` : ''}
        </div>
        
        <p style='color: #666; font-size: 14px;'>
            Please arrive 5 minutes before your scheduled time. If you need to reschedule, contact us at least 24 hours in advance.
        </p>
        
        <p style='margin-top: 30px;'>Thank you!</p>
        <p style='margin-bottom: 0;'><strong>A Better Choice Care Team</strong></p>
    </div>
</body>
</html>`,
                  TextBody: `Hi ${fullName},\n\nYour consultation slot has been booked on ${dateLabel} at ${timeLabel}.\n\nEmail: ${toEmail}\nPhone: ${phone}\n${brief ? `Brief information: ${brief}\n` : ''}\nThank you.`,
                  MessageStream: 'outbound'
                }

                // Owner notification email
                const ownerEmailData = {
                  From: senderEmail,
                  To: ownerEmail,
                  Subject: `New Consultation Booking - ${fullName}`,
                  HtmlBody: `
<html>
<head>
    <title>New Consultation Booking</title>
</head>
<body style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;'>
    <div style='background: linear-gradient(129.33deg, #2563EB 12.21%, #1d4ed8 126.73%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;'>
        <h1 style='margin: 0; font-size: 24px;'>New Booking Received</h1>
    </div>
    <div style='background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;'>
        <p>A new consultation booking has been made. Here are the details:</p>
        
        <div style='background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563EB;'>
            <h3 style='margin-top: 0; color: #333;'>Patient Details</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${toEmail}</p>
            <p><strong>Phone:</strong> ${phone}</p>
        </div>
        
        <div style='background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1d4ed8;'>
            <h3 style='margin-top: 0; color: #333;'>Appointment Details</h3>
            <p><strong>Date:</strong> ${dateLabel}</p>
            <p><strong>Time:</strong> ${timeLabel}</p>
            ${brief ? `<p><strong>Brief Information:</strong> ${brief}</p>` : ''}
        </div>
        
        <p style='margin-top: 30px;'><strong>A Better Choice Care Team</strong></p>
    </div>
</body>
</html>`,
                  TextBody: `New consultation booking received.\n\nPatient Details:\nName: ${fullName}\nEmail: ${toEmail}\nPhone: ${phone}\n\nAppointment Details:\nDate: ${dateLabel}\nTime: ${timeLabel}\n${brief ? `Brief information: ${brief}\n` : ''}\nA Better Choice Care Team`,
                  MessageStream: 'outbound'
                }

                // Send customer email
                const customerResponse = await fetch(postmarkUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Postmark-Server-Token': postmarkApiKey
                  },
                  body: JSON.stringify(customerEmailData)
                })

                // Send owner notification email
                const ownerResponse = await fetch(postmarkUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Postmark-Server-Token': postmarkApiKey
                  },
                  body: JSON.stringify(ownerEmailData)
                })

                if (customerResponse.ok && ownerResponse.ok) {
                  res.statusCode = 200
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: true, message: 'Emails sent successfully via Postmark' }))
                } else {
                  const customerErrorText = await customerResponse.text()
                  const ownerErrorText = await ownerResponse.text()
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'Failed to send email via Postmark', customer_response: customerErrorText, owner_response: ownerErrorText }))
                }
              } catch (e: any) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: e?.message ? String(e.message) : 'Failed to send email' }))
              }
            })
          })
        },
      },
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
