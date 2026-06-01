const POSTMARK_API_KEY = '902ab639-1cd8-4e37-98bb-db206b00eb0d';
const SENDER_EMAIL = 'team@abetterchoicecare.com';
const OWNER_EMAIL = 'team@abetterchoicecare.com';
const POSTMARK_URL = 'https://api.postmarkapp.com/email';

export async function sendContactEmail(formData) {
  try {
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    console.log('[Contact Email] Sending email for:', fullName);

    // Email to business owner with form data
    const ownerEmailData = {
      From: SENDER_EMAIL,
      To: OWNER_EMAIL,
      Subject: `New Consultation Form Submitted from ${fullName}`,
      HtmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
            You have New Consultation Request
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
      TextBody: `Consultation Form Submitted n\n\nName: ${fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\nService Interest: ${formData.service || 'Not specified'}\n\nMessage:\n${formData.message}`,
      MessageStream: 'outbound'
    };

    console.log('[Contact Email] Sending owner email to:', OWNER_EMAIL);
    const ownerResponse = await fetch(POSTMARK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_KEY
      },
      body: JSON.stringify(ownerEmailData)
    });

    console.log('[Contact Email] Owner email response status:', ownerResponse.status);
    const ownerResponseText = await ownerResponse.text();
    console.log('[Contact Email] Owner email response body:', ownerResponseText);

    if (!ownerResponse.ok) {
      throw new Error(`Postmark API error (owner email): ${ownerResponse.status} ${ownerResponseText}`);
    }

    // Confirmation email to user
    const userConfirmationData = {
      From: SENDER_EMAIL,
      To: formData.email,
      Subject: 'Thank you for contacting A Better Choice Care',
      HtmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
            Thank You for Contacting Us
          </h2>

          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            Dear ${fullName},
          </p>

          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            Thank you for reaching out to A Better Choice Care. We have received your inquiry and will get back to you within 24 hours.
          </p>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-bottom: 10px;">Your Inquiry Details:</h3>
            <p><strong>Service Interest:</strong> ${formData.service || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p style="background-color: #fff; padding: 15px; border-left: 4px solid #2563EB; border-radius: 4px;">
              ${formData.message.replace(/\n/g, '<br>')}
            </p>
          </div>

          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            If you have any questions or need immediate assistance, please call us at <strong>380-235-7179</strong>.
          </p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>A Better Choice Care</p>
            <p>2700 E Dublin-Granville Rd STE 2708</p>
            <p>Columbus, OH 43231</p>
            <p>Phone: 380-235-7179</p>
            <p>Email: team@abetterchoicecare.com</p>
          </div>
        </div>
      `,
      TextBody: `Thank You for Contacting Us\n\nDear ${fullName},\n\nThank you for reaching out to A Better Choice Care. We have received your inquiry and will get back to you within 24 hours.\n\nYour Inquiry Details:\nService Interest: ${formData.service || 'Not specified'}\n\nMessage:\n${formData.message}\n\nIf you have any questions or need immediate assistance, please call us at 380-235-7179.\n\nA Better Choice Care\n2700 E Dublin-Granville Rd STE 2708\nColumbus, OH 43231\nPhone: 380-235-7179\nEmail: team@abetterchoicecare.com`,
      MessageStream: 'outbound'
    };

    console.log('[Contact Email] Sending confirmation email to:', formData.email);
    const userResponse = await fetch(POSTMARK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_KEY
      },
      body: JSON.stringify(userConfirmationData)
    });

    console.log('[Contact Email] Confirmation email response status:', userResponse.status);
    const userResponseText = await userResponse.text();
    console.log('[Contact Email] Confirmation email response body:', userResponseText);

    if (!userResponse.ok) {
      console.error('[Contact Email] Failed to send confirmation email, but owner email was sent');
      // Don't throw error - owner email was sent successfully
    }

    console.log('[Contact Email] Emails sent successfully');
    return { success: true };
  } catch (error) {
    console.error('[Contact Email] Error sending email:', error);
    throw error;
  }
}

export async function sendJobApplicationEmail(applicationData) {
  try {
    const fullName = `${applicationData.firstName} ${applicationData.lastName}`.trim();

    // Prepare attachments if resume file exists
    let attachments = [];
    if (applicationData.resumeFile) {
      try {
        // Handle base64 string from frontend
        let base64Content;
        if (applicationData.resumeFile.base64) {
          // Remove data URL prefix if present (e.g., "data:application/pdf;base64,")
          base64Content = applicationData.resumeFile.base64.split(',')[1] || applicationData.resumeFile.base64;
        } else if (typeof applicationData.resumeFile === 'string') {
          base64Content = applicationData.resumeFile.split(',')[1] || applicationData.resumeFile;
        } else {
          console.log('[Job Application] Resume file format not supported:', typeof applicationData.resumeFile);
        }

        if (base64Content) {
          attachments.push({
            Name: applicationData.resumeFile.name || 'resume.pdf',
            Content: base64Content,
            ContentType: applicationData.resumeFile.type || 'application/pdf'
          });
          console.log('[Job Application] Resume file attached:', applicationData.resumeFile.name);
        }
      } catch (error) {
        console.error('[Job Application] Error processing resume file:', error);
      }
    }

    // Email to business owner with application data and attachment
    const ownerEmailData = {
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
            ${applicationData.resumeFile ? `<p><em>Resume file is attached to this email</em></p>` : ''}
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This application was submitted via the A Better Choice Care website.</p>
          </div>
        </div>
      `,
      TextBody: `New Job Application Submission\n\nPosition: ${applicationData.jobTitle} (${applicationData.jobId})\n\nPersonal Information:\nName: ${fullName}\nEmail: ${applicationData.email}\nPhone: ${applicationData.phone}\nAddress: ${applicationData.streetAddress}, ${applicationData.city}, ${applicationData.state} ${applicationData.zipCode}\n\nProfessional Information:\nCertification Number: ${applicationData.certificationNumber}\nCertification Expiry: ${applicationData.certificationExpiryDate}\nYears of Experience: ${applicationData.yearsOfExperience}\nAvailability: ${applicationData.availability}\n\nWhy interested:\n${applicationData.interestReason}\n\nProfessional References:\n${applicationData.professionalReferences || 'Not provided'}\n\nResume: ${applicationData.resumeFile?.name || 'Not provided'}${applicationData.resumeFile ? ' (attached)' : ''}`,
      MessageStream: 'outbound',
      Attachments: attachments.length > 0 ? attachments : undefined
    };

    console.log('[Job Application] Sending owner email to:', OWNER_EMAIL);
    const ownerResponse = await fetch(POSTMARK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_KEY
      },
      body: JSON.stringify(ownerEmailData)
    });

    console.log('[Job Application] Owner email response status:', ownerResponse.status);
    const ownerResponseText = await ownerResponse.text();
    console.log('[Job Application] Owner email response body:', ownerResponseText);

    if (!ownerResponse.ok) {
      throw new Error(`Postmark API error (owner email): ${ownerResponse.status} ${ownerResponseText}`);
    }

    // Confirmation email to applicant (with attachment and full details)
    const applicantConfirmationData = {
      From: SENDER_EMAIL,
      To: applicationData.email,
      Subject: 'Thank you for applying to A Better Choice Care',
      HtmlBody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
            Thank You for Your Application
          </h2>

          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            Dear ${fullName},
          </p>

          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            Thank you for your interest in joining A Better Choice Care. We have received your application for the position of <strong>${applicationData.jobTitle}</strong>.
          </p>

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
            ${applicationData.resumeFile ? `<p><em>Resume file is attached to this email for your records</em></p>` : ''}
          </div>

          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            Our team will review your application and contact you within 3-5 business days if your qualifications match our current needs.
          </p>

          <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
            If you have any questions about your application, please contact us at <strong>380-235-7179</strong> or <strong>team@abetterchoicecare.com</strong>.
          </p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>A Better Choice Care</p>
            <p>2700 E Dublin-Granville Rd STE 2708</p>
            <p>Columbus, OH 43231</p>
            <p>Phone: 380-235-7179</p>
            <p>Email: team@abetterchoicecare.com</p>
          </div>
        </div>
      `,
      TextBody: `Thank You for Your Application\n\nDear ${fullName},\n\nThank you for your interest in joining A Better Choice Care. We have received your application for the position of ${applicationData.jobTitle}.\n\nPosition: ${applicationData.jobTitle} (${applicationData.jobId})\n\nPersonal Information:\nName: ${fullName}\nEmail: ${applicationData.email}\nPhone: ${applicationData.phone}\nAddress: ${applicationData.streetAddress}, ${applicationData.city}, ${applicationData.state} ${applicationData.zipCode}\n\nProfessional Information:\nCertification Number: ${applicationData.certificationNumber}\nCertification Expiry: ${applicationData.certificationExpiryDate}\nYears of Experience: ${applicationData.yearsOfExperience}\nAvailability: ${applicationData.availability}\n\nWhy interested:\n${applicationData.interestReason}\n\nProfessional References:\n${applicationData.professionalReferences || 'Not provided'}\n\nResume: ${applicationData.resumeFile?.name || 'Not provided'}${applicationData.resumeFile ? ' (attached)' : ''}\n\nOur team will review your application and contact you within 3-5 business days if your qualifications match our current needs.\n\nIf you have any questions about your application, please contact us at 380-235-7179 or team@abetterchoicecare.com.\n\nA Better Choice Care\n2700 E Dublin-Granville Rd STE 2708\nColumbus, OH 43231\nPhone: 380-235-7179\nEmail: team@abetterchoicecare.com`,
      MessageStream: 'outbound',
      Attachments: attachments.length > 0 ? attachments : undefined
    };

    console.log('[Job Application] Sending confirmation email to:', applicationData.email);
    const applicantResponse = await fetch(POSTMARK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_KEY
      },
      body: JSON.stringify(applicantConfirmationData)
    });

    console.log('[Job Application] Confirmation email response status:', applicantResponse.status);
    const applicantResponseText = await applicantResponse.text();
    console.log('[Job Application] Confirmation email response body:', applicantResponseText);

    if (!applicantResponse.ok) {
      console.error('[Job Application] Failed to send confirmation email, but owner email was sent');
      // Don't throw error - owner email was sent successfully
    }

    console.log('[Job Application] Emails sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending job application email:', error);
    throw error;
  }
}
