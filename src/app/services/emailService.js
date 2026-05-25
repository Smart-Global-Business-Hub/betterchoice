const POSTMARK_API_KEY = 'd9fa94eb-f2ba-443b-9439-39b9e22bc807';
const SENDER_EMAIL = 'info@moonlightbc.com';
const OWNER_EMAIL = 'info@moonlightbc.com';
const POSTMARK_URL = 'https://api.postmarkapp.com/email';

export async function sendContactEmail(formData) {
  try {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    console.log('[Contact Email] Sending email for:', fullName);
    console.log('[Contact Email] To:', OWNER_EMAIL);
    console.log('[Contact Email] From:', SENDER_EMAIL);

    const emailData = {
      From: SENDER_EMAIL,
      To: OWNER_EMAIL,
      Subject: `New Contact Form Submission from ${fullName}`,
      HtmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Service Interest:</strong> ${formData.service || 'Not specified'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
            <p style="background-color: #fff; padding: 15px; border-left: 4px solid #2563EB; border-radius: 4px;">
              ${formData.message.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This message was sent from the A Better Choice Care contact form.</p>
          </div>
        </div>
      `,
      TextBody: `New Contact Form Submission\n\nName: ${fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nService Interest: ${formData.service || 'Not specified'}\n\nMessage:\n${formData.message}`,
      MessageStream: 'outbound'
    };

    console.log('[Contact Email] Sending to Postmark API...');
    const response = await fetch(POSTMARK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_KEY
      },
      body: JSON.stringify(emailData)
    });

    console.log('[Contact Email] Postmark response status:', response.status);
    const responseText = await response.text();
    console.log('[Contact Email] Postmark response body:', responseText);

    if (!response.ok) {
      throw new Error(`Postmark API error: ${response.status} ${responseText}`);
    }

    console.log('[Contact Email] Email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('[Contact Email] Error sending email:', error);
    throw error;
  }
}

export async function sendJobApplicationEmail(applicationData) {
  try {
    const fullName = `${applicationData.firstName} ${applicationData.lastName}`.trim();

    const emailData = {
      From: SENDER_EMAIL,
      To: OWNER_EMAIL,
      Subject: `New Job Application for ${applicationData.jobTitle} from ${fullName}`,
      HtmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
            New Job Application Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Position Applied:</h3>
            <p><strong>${applicationData.jobTitle}</strong> (${applicationData.jobId})</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Personal Information:</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${applicationData.email}</p>
            <p><strong>Phone:</strong> ${applicationData.phone}</p>
            <p><strong>Address:</strong> ${applicationData.streetAddress}, ${applicationData.city}, ${applicationData.state} ${applicationData.zipCode}</p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">Professional Information:</h3>
            <p><strong>Certification Number:</strong> ${applicationData.certificationNumber}</p>
            <p><strong>Certification Expiry:</strong> ${applicationData.certificationExpiryDate}</p>
            <p><strong>Years of Experience:</strong> ${applicationData.yearsOfExperience}</p>
            <p><strong>Availability:</strong> ${applicationData.availability}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Why interested in this position:</h3>
            <p style="background-color: #fff; padding: 15px; border-left: 4px solid #2563EB; border-radius: 4px;">
              ${applicationData.interestReason.replace(/\n/g, '<br>')}
            </p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Professional References:</h3>
            <p style="background-color: #fff; padding: 15px; border-left: 4px solid #2563EB; border-radius: 4px;">
              ${applicationData.professionalReferences?.replace(/\n/g, '<br>') || 'Not provided'}
            </p>
          </div>
          
          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Resume:</strong> ${applicationData.resumeFile?.name || 'Not provided'}</p>
            ${applicationData.resumeFile ? `<p><em>Resume file is available in the application data</em></p>` : ''}
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This application was submitted via the A Better Choice Care website.</p>
          </div>
        </div>
      `,
      TextBody: `New Job Application Submission\n\nPosition: ${applicationData.jobTitle} (${applicationData.jobId})\n\nPersonal Information:\nName: ${fullName}\nEmail: ${applicationData.email}\nPhone: ${applicationData.phone}\nAddress: ${applicationData.streetAddress}, ${applicationData.city}, ${applicationData.state} ${applicationData.zipCode}\n\nProfessional Information:\nCertification Number: ${applicationData.certificationNumber}\nCertification Expiry: ${applicationData.certificationExpiryDate}\nYears of Experience: ${applicationData.yearsOfExperience}\nAvailability: ${applicationData.availability}\n\nWhy interested:\n${applicationData.interestReason}\n\nProfessional References:\n${applicationData.professionalReferences || 'Not provided'}\n\nResume: ${applicationData.resumeFile?.name || 'Not provided'}`,
      MessageStream: 'outbound'
    };

    const response = await fetch(POSTMARK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_KEY
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Postmark API error: ${response.status} ${errorText}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending job application email:', error);
    throw error;
  }
}
