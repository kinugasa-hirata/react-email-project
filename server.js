import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.get('/favicon.ico', (req, res) => res.status(204));

app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, recipientName, confirmUrl } = req.body;
    
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html: `
        <h1>Hello ${recipientName},</h1>
        <p>Thank you for signing up. Please confirm your account by clicking the link below:</p>
        <a href="${confirmUrl}">Confirm Account</a>
      `
    });
    
    res.json({ message: 'Email sent successfully', id: result.id });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));