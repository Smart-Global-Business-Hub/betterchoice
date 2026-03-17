import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '020ee610ab27ae',
    pass: 'e286c293833488'
  }
});

export async function sendContactEmail(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}) {
  try {
    const emailContent = `
      New Contact Form Submission
      
      Name: ${formData.firstName} ${formData.lastName}
      Email: ${formData.email}
      Phone: ${formData.phone || 'Not provided'}
      Service Interest: ${formData.service || 'Not specified'}
      
      Message:
      ${formData.message}
    `;

    const mailOptions = {
      from: 'noreply@abetterchoicecare.com',
      to: 'info@abetterchoicecare.com',
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563EB; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
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
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
}

export async function sendJobApplicationEmail(applicationData: {
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  certificationNumber: string;
  certificationExpiryDate: string;
  yearsOfExperience: string;
  availability: string;
  interestReason: string;
  professionalReferences?: string;
  resumeFile?: {
    name: string;
    type: string;
    base64: string;
  };
}) {
  try {
    const emailContent = `
      New Job Application Submission
      
      Position: ${applicationData.jobTitle} (${applicationData.jobId})
      
      Personal Information:
      Name: ${applicationData.firstName} ${applicationData.lastName}
      Email: ${applicationData.email}
      Phone: ${applicationData.phone}
      Address: ${applicationData.streetAddress}, ${applicationData.city}, ${applicationData.state} ${applicationData.zipCode}
      
      Professional Information:
      Certification Number: ${applicationData.certificationNumber}
      Certification Expiry: ${applicationData.certificationExpiryDate}
      Years of Experience: ${applicationData.yearsOfExperience}
      Availability: ${applicationData.availability}
      
      Interest Reason:
      ${applicationData.interestReason}
      
      Professional References:
      ${applicationData.professionalReferences || 'Not provided'}
      
      Resume: ${applicationData.resumeFile?.name || 'Not provided'}
    `;

    const mailOptions = {
      from: 'noreply@abetterchoicecare.com',
      to: 'info@abetterchoicecare.com',
      subject: `New Job Application for ${applicationData.jobTitle} from ${applicationData.firstName} ${applicationData.lastName}`,
      text: emailContent,
      html: `
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
            <p><strong>Name:</strong> ${applicationData.firstName} ${applicationData.lastName}</p>
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
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending job application email:', error);
    throw error;
  }
}
