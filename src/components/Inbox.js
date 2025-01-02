import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { db } from '../firebase';

const Inbox = () => {
  const { user } = useAuth();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'emails'), where('recipient', '==', user.email));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const emailsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEmails(emailsData);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [user]);

  if (loading) return <p className="loading-message">Loading inbox...</p>;

  return (
    <div className="inbox-container">
      <h2>Inbox</h2>
      {emails.length === 0 ? (
        <p className="no-emails-message">No emails received.</p>
      ) : (
        <ul className="email-list">
          {emails.map((email) => (
            <li key={email.id} className="email-item">
              <p>
                <strong>From:</strong> {email.sender} <br />
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

export default Inbox;

