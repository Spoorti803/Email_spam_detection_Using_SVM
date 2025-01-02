import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Add email to Firestore
export const addEmailToFirestore = async (emailData) => {
  try {
    const docRef = await addDoc(collection(db, 'emails'), emailData);
    console.log('Email added to Firestore with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding email: ', error);
    throw new Error(error.message);
  }
};

// Fetch emails from Firestore
export const getEmailsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'emails'));
    const emails = [];
    querySnapshot.forEach((doc) => {
      emails.push(doc.data());
    });
    return emails;
  } catch (error) {
    console.error('Error fetching emails: ', error);
    throw new Error(error.message);
  }
};
