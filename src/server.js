// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const app = express();

// app.use(express.json());  // to parse JSON request bodies
// app.use(cors());  // to handle CORS issues

// // POST route for sending email
// app.post('/send-email', async (req, res) => {
//   const { sender, recipient, subject, body } = req.body;

//   // Check if all required fields are provided
//   if (!sender || !recipient || !subject || !body) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // Nodemailer configuration
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'your-email@gmail.com',  // use your email
//         pass: 'your-email-password',  // use your email password
//       },
//     });

//     const mailOptions = {
//       from: sender,
//       to: recipient,
//       subject: subject,
//       text: body,
//     };

//     // Send email
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Email sent successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error sending email' });
//   }
// });

// const port = 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
