import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Spam = () => {
  const [spamEmails, setSpamEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) {
      setError("No user is currently logged in. Please log in to view your spam emails.");
      setLoading(false);
      return;
    }

    // Use onSnapshot for real-time updates
    const q = query(
      collection(db, "emails"),
      where("recipient", "==", user.email),
      where("isSpam", "==", true)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const emails = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSpamEmails(emails);
        setLoading(false);
      } catch (err) {
        setError("Error fetching spam emails: " + err.message);
        setLoading(false);
      }
    }, (error) => {
      setError("Error setting up spam emails listener: " + error.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="spam-container">
      <h2>Spam Emails</h2>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="loading-message">Loading spam emails...</p>
      ) : spamEmails.length === 0 ? (
        <p className="no-spam-message">No spam emails found in your mailbox.</p>
      ) : (
        <ul className="spam-email-list">
          {spamEmails.map((email) => (
            <li key={email.id} className="spam-email-item">
              <p>
                <strong>From:</strong> {email.sender}
              </p>
              <p>
                <strong>Subject:</strong> {email.subject || "No Subject"}
              </p>
              <p>
                <strong>Message:</strong> {email.body || "No Content"}
              </p>
              <p>
                <strong>Received:</strong>{' '}
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

export default Spam;