import express from 'express';
import cors from 'cors';
import { sendContactEmail, sendJobApplicationEmail } from './src/app/services/emailService.js';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, service, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await sendContactEmail({ firstName, lastName, email, phone, service, message });
    
    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// Job application endpoint
app.post('/api/job-application', async (req, res) => {
  try {
    const applicationData = req.body;

    // Validate required fields
    if (!applicationData.firstName || !applicationData.lastName || !applicationData.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    await sendJobApplicationEmail(applicationData);
    
    res.json({ message: 'Job application submitted successfully' });
  } catch (error) {
    console.error('Job application error:', error);
    res.status(500).json({ error: 'Failed to submit job application' });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});
