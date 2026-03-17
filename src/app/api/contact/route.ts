import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, service, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
      New Contact Form Submission
      
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Service Interest: ${service || 'Not specified'}
      
      Message:
      ${message}
    `;

    // Send email using Mailtrap API
    const response = await fetch('https://sandbox.smtp.mailtrap.io/api/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from('020ee610ab27ae:e286c293833488').toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: {
          email: 'noreply@abetterchoicecare.com',
          name: 'A Better Choice Care Website'
        },
        to: [
          {
            email: 'info@abetterchoicecare.com',
            name: 'A Better Choice Care Team'
          }
        ],
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        text: emailContent,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Service Interest:</strong> ${service || 'Not specified'}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
              <p style="background-color: #fff; padding: 15px; border-left: 4px solid #2563EB; border-radius: 4px;">
                ${message.replace(/\n/g, '<br>')}
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
              <p>This message was sent from the A Better Choice Care contact form.</p>
            </div>
          </div>
        `
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Mailtrap API error:', errorData);
      throw new Error('Failed to send email');
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}
