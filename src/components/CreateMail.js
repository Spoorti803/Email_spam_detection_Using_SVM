import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const CreateMail = () => {
  const { user } = useAuth();
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async () => {
    // Reset error message at the start
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Input validation
      if (!recipient || !subject || !body) {
        setErrorMessage('Please fill in all fields.');
        return;
      }

      if (!user) {
        setErrorMessage('You need to be logged in to send an email.');
        return;
      }

      const senderEmail = user.email;

      // Log the attempt
      console.log('Attempting to send email...', {
        sender: senderEmail,
        recipient,
        subject,
        body: body.substring(0, 50) + '...' // Log only first 50 chars of body for privacy
      });

      // Check if the server is available first
      try {
        const response = await fetch('http://localhost:5002/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            sender: senderEmail,
            recipient,
            subject,
            body,
          }),
          // Add timeout to prevent hanging
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
          throw new Error(errorData.message || `Server error: ${response.status}`);
        }

        const result = await response.json();
        console.log('Response data:', result);

        // Clear form only on success
        setRecipient('');
        setSubject('');
        setBody('');
        
        alert('Email sent successfully!');

      } catch (fetchError) {
        // Handle specific error types
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out. Please try again.');
        }
        if (fetchError instanceof TypeError && fetchError.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect to the email server. Please check if the server is running (localhost:5002).');
        }
        throw fetchError; // Re-throw other errors
      }

    } catch (error) {
      console.error('Error sending email:', error);
      setErrorMessage(`Error sending email: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-mail-container">
      <h2>Create New Mail</h2>
      <form className="create-mail-form">
        <div className="form-group">
          <label className="input-label" htmlFor="recipient">To</label>
          <input
            type="email"
            id="recipient"
            placeholder="Recipient's Email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label className="input-label" htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label className="input-label" htmlFor="body">Body</label>
          <textarea
            id="body"
            placeholder="Email Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button 
          type="button" 
          onClick={handleSendEmail}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Email'}
        </button>
      </form>
    </div>
  );
};

export default CreateMail;