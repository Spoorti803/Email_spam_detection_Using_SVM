import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';

const Sent = () => {
  const { user } = useAuth();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'emails'), where('sender', '==', user.email));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const emailsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEmails(emailsData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  if (loading) return <p className="loading-message">Loading sent emails...</p>;

  return (
    <div className="sent-container">
      <h2>Sent Emails</h2>
      {emails.length === 0 ? (
        <p className="no-emails-message">No emails sent.</p>
      ) : (
        <ul className="email-list">
          {emails.map((email) => (
            <li key={email.id} className="email-item">
              <p>
                <strong>To:</strong> {email.recipient} <br />
                <strong>Subject:</strong> {email.subject} <br />
                <strong>Body:</strong> {email.body} <br />
                <strong>Timestamp:</strong>{' '}
                {email.timestamp
                  ? new Date(email.timestamp.toDate()).toLocaleString()
                  : 'No timestamp available'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sent;

