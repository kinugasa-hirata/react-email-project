import React, { useState } from 'react'

export const EmailSender: React.FC = () => {
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [status, setStatus] = useState('')

  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject: 'Confirm Your Account',
          recipientName,
          confirmUrl: "https://yourdomain.com/confirm"
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setStatus('Email sent successfully!');
      console.log('Server response:', result);
    } catch (error) {
      console.error('Error details:', error);
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
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