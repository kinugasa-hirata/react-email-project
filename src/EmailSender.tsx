import React, { useState } from 'react'
import { Resend } from 'resend'
import { EmailTemplate } from './EmailTemplate'

export const EmailSender: React.FC = () => {
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [status, setStatus] = useState('')

  const sendEmail = async () => {
    console.log('API Key:', import.meta.env.VITE_RESEND_API_KEY) // Remove this in production!
    const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY)

    try {
      const result = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: recipientEmail,
        subject: 'Confirm Your Account',
        react: <EmailTemplate 
          recipientName={recipientName} 
          url="https://yourdomain.com/confirm" 
        />,
      })
      console.log('Resend API Response:', result)
      setStatus('Email sent successfully!')
    } catch (error) {
      console.error('Error sending email:', error)
      setStatus(`Error sending email: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient Name"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
      />
      <button onClick={sendEmail}>Send Email</button>
      {status && <p>{status}</p>}
    </div>
  )
}
