import { defineConfig, loadEnv } from 'vite'
import fs from 'fs'
import path from 'path'
// import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

export default defineConfig(({ mode }) => {
  const rootDir = (globalThis as any).process?.cwd?.() ?? '.'
  const env = loadEnv(mode, rootDir, '')

  const mailtrapHost = env.MAILTRAP_HOST || 'sandbox.smtp.mailtrap.io'
  const mailtrapPort = Number(env.MAILTRAP_PORT || '2525')
  const mailtrapUser = env.MAILTRAP_USER
  const mailtrapPass = env.MAILTRAP_PASS
  const mailFrom = env.MAIL_FROM || 'no-reply@moonlight.local'

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
        name: 'book-consultation-mailtrap',
        configureServer(server) {
          server.middlewares.use('/api/book-consultation', (req: any, res: any, next: any) => {
            if (req.method !== 'POST') return next()

            let body = ''
            req.on('data', (chunk: any) => {
              body += chunk
            })
            req.on('end', async () => {
              try {
                if (!mailtrapUser || !mailtrapPass) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'text/plain')
                  res.end('Missing MAILTRAP_USER / MAILTRAP_PASS env vars')
                  return
                }

                const parsed = body ? JSON.parse(body) : {}

                const toEmail = String(parsed.toEmail || '').trim()
                const fullName = String(parsed.fullName || '').trim()
                const phone = String(parsed.phone || '').trim()
                const brief = String(parsed.brief || '').trim()
                const dateLabel = String(parsed.dateLabel || '').trim()
                const timeLabel = String(parsed.timeLabel || '').trim()

                if (!toEmail || !fullName || !phone || !dateLabel || !timeLabel) {
                  res.statusCode = 400
                  res.setHeader('Content-Type', 'text/plain')
                  res.end('Missing required fields')
                  return
                }

                const transporter = nodemailer.createTransport({
                  host: mailtrapHost,
                  port: mailtrapPort,
                  auth: {
                    user: mailtrapUser,
                    pass: mailtrapPass,
                  },
                })

                const subject = 'Your consultation slot has been booked'
                const text =
                  `Hi ${fullName},\n\n` +
                  `Your consultation slot has been booked on ${dateLabel} at ${timeLabel}.\n\n` +
                  `Phone: ${phone}\n` +
                  (brief ? `Brief information: ${brief}\n` : '') +
                  `\nThank you.`

                await transporter.sendMail({
                  from: mailFrom,
                  to: toEmail,
                  subject,
                  text,
                })

                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ ok: true }))
              } catch (e: any) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'text/plain')
                res.end(e?.message ? String(e.message) : 'Failed to send email')
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
