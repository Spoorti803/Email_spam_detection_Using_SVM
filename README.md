# 📧 AI-Powered Spam Detection Email Client

A full-stack email client that classifies incoming/outgoing emails as **spam or not spam** in real time using a machine learning model, built as part of my B.Tech coursework.

Unlike a standalone spam-classifier script, this project wires the ML model into an actual working email application — so every email sent through the app is automatically scored by the model and routed to the correct folder (Inbox / Spam).

---

## ✨ Features

- 🔐 User authentication (Signup/Login/Logout) via Firebase Auth
- 📨 Send, receive, and view emails (Inbox, Sent, Spam folders)
- 🤖 Real-time spam classification on every email sent, using a trained SVM model
- ⚡ Live updates via Firestore listeners (no manual refresh needed)
- 🎨 Clean, responsive UI

---

## 🧠 How Spam Detection Works

1. Email text is preprocessed (lowercased, special characters removed, stopwords removed via NLTK).
2. The cleaned text is vectorized using **TF-IDF** (top 3000 features).
3. A trained **SVM classifier (linear kernel)** predicts spam / not spam.
4. The model was trained on a combined dataset (SMS Spam Collection + Enron email dataset) and achieves **~99% accuracy, precision, and recall** on the held-out test set.
5. The prediction (`isSpam: true/false`) is stored alongside the email in Firestore, and the frontend filters emails into Inbox vs Spam based on this flag.

> Model training and evaluation code is in `train_model1.ipynb`.

---

## 🏗️ Architecture

```
┌─────────────────┐        POST /send-email        ┌──────────────────────┐
│   React Frontend│ ─────────────────────────────►│  Flask Backend       │
│ (Login, Inbox,  │                               │ (loads .pkl model +  │
│  Sent, Spam, ...)│ ◄────────────────────────────│  TF-IDF vectorizer)  │
└─────────────────┘        spam prediction         └──────────┬───────────┘
        │                                                     │
        │ Firebase Auth (login state)                         │ writes email +
        │                                                     │ isSpam flag
        ▼                                                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          Firebase Firestore                         │
│                  (emails collection, queried by user)               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

**Frontend:** React, React Router, Firebase Auth SDK, Firebase Firestore SDK
**Backend:** Flask, Flask-CORS, Firebase Admin SDK
**ML:** scikit-learn (SVM, TF-IDF), NLTK, pandas, joblib

---

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── CreateMail.js      # Compose + send email (calls Flask API)
│   │   ├── Home.js            # Authenticated layout + nav
│   │   ├── Inbox.js           # Non-spam received emails
│   │   ├── Login.js
│   │   ├── LogoutButton.js
│   │   ├── NotFound.js
│   │   ├── Sent.js            # Emails sent by the user
│   │   ├── Signup.js
│   │   ├── Spam.js            # Emails flagged isSpam: true
│   │   └── addEmail.js
│   ├── hooks/
│   │   └── useAuth.js         # Auth context + hook
│   ├── services/
│   │   ├── auth.js            # signUp / signIn / logOut helpers
│   │   └── firestore.js
│   ├── App.js                 # Routes
│   ├── AuthContext.js
│   ├── firebase.js            # Firebase config (excluded from repo — see Setup)
│   └── ...
├── backend/
│   ├── server.py               # Flask API: /send-email endpoint
│   ├── spam_classifier_model.pkl
│   └── tfidf_vectorizer.pkl
├── train_model1.ipynb          # Model training notebook
├── app.ipynb
└── README.md
```

> Note: adjust the `backend/` path above to match your actual repo layout if the Flask server lives elsewhere.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python 3.10+
- A Firebase project (Firestore + Authentication enabled)

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Frontend setup
```bash
npm install
```

Create your own `src/firebase.js` using your Firebase project's config (never commit real API keys — see [Environment Variables](#-environment-variables) below):

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

Run the frontend:
```bash
npm start
```

### 3. Backend setup
```bash
cd backend
pip install flask flask-cors firebase-admin joblib scikit-learn
```

- Download your Firebase Admin SDK service account key from the Firebase Console and save it as `firebase_credentials.json` in the `backend/` folder (this file should **never** be committed — add it to `.gitignore`).
- Make sure `spam_classifier_model.pkl` and `tfidf_vectorizer.pkl` are present (generated by running `train_model1.ipynb`, or included in the repo).

Run the backend:
```bash
python server.py
```
The API will start on `http://127.0.0.1:5002`.

### 4. Train the model yourself (optional)
```bash
jupyter notebook train_model1.ipynb
```
This regenerates `spam_classifier_model.pkl` and `tfidf_vectorizer.pkl`.

---

## 🔑 Environment Variables

This project currently has Firebase config hardcoded in `firebase.js` for simplicity during development. **Before making this public, rotate any exposed API keys in the Firebase Console** and switch to environment variables:

```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
```

---

## ⚠️ Known Limitations & Future Improvements

- **Model choice:** SVM + TF-IDF works well here (~99% accuracy) but doesn't capture context the way transformer-based models (e.g. a fine-tuned BERT/DistilBERT) would. A future version could compare both.
- **Dataset size/diversity:** trained on SMS Spam Collection + Enron emails — a production system would need a larger, more diverse, and more recent dataset (spam patterns evolve).
- **No email deletion/reply/forward features** — this is a minimal client focused on demonstrating the spam-classification pipeline, not a full email product.
- **Hardcoded backend URL** (`localhost:5002`) — should be moved to an environment variable for deployment.
- **No automated tests** for the classification pipeline yet — would be a good next addition.

---

## 📄 License

This project was built for educational purposes as part of my B.Tech coursework. Feel free to fork and build on it.
