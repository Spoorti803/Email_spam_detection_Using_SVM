// // addEmail.js

// import { db } from './firebase';  // Import Firestore instance
// import { collection, addDoc } from "firebase/firestore";  // Import the functions

// // Function to add an email
// const addEmail = async (subject, body) => {
//   try {
//     // Reference to 'emails' collection
//     const emailCollectionRef = collection(db, "emails");

//     // Add new email document to the collection
//     await addDoc(emailCollectionRef, {
//       subject: subject,
//       body: body,
//       sentAt: new Date()  // Adding current timestamp
//     });

//     console.log("Email added successfully!");
//   } catch (e) {
//     console.error("Error adding email: ", e);
//     throw new Error("Error adding email: " + e.message);  // Throw error for App.js to handle
//   }
// };

// export { addEmail };
