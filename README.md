# 📬 Blurt

### Mail Without a Face

Blurt is an anonymous messaging platform that lets people receive **mystery messages through a personal shareable link** — no account required for the sender.

Create your profile, share your unique link, and let anyone send you anonymous messages.

---

## ✨ Features

* 🔐 **OTP Email Verification** — Verify your email during signup.
* 🔗 **Personal Shareable Links** — Every user gets a unique link such as `/u/[username]`.
* 🕵️ **Anonymous Messaging** — Anyone can send messages without creating an account.
* 🤖 **AI-Powered Suggestions** — Get question/message suggestions powered by Gemini.
* 📥 **Message Dashboard** — View received anonymous messages in one place.
* 🗑️ **Message Management** — Delete messages you no longer want to keep.
* 📱 **Responsive Design** — Works smoothly across desktop and mobile devices.
* 🔒 **Authentication** — Secure user authentication with NextAuth.js.

---

## 🛠️ Tech Stack

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| **Next.js**      | Full-stack React framework     |
| **TypeScript**   | Type-safe development          |
| **MongoDB**      | Database                       |
| **NextAuth.js**  | Authentication                 |
| **Resend**       | OTP & transactional emails     |
| **Zod**          | Schema validation              |
| **Gemini AI**    | AI-powered message suggestions |
| **Tailwind CSS** | Styling & responsive UI        |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/blurt.git
cd blurt
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env.local
```

Then add your required credentials:

```env
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
RESEND_API_KEY=
GEMINI_API_KEY=
```

> Check `.env.example` for the complete list of required environment variables.

### 4. Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📖 How It Works

### 1. Create an account

Sign up with your email and verify it using the OTP sent to your inbox.

### 2. Get your personal link

After registration, Blurt generates a unique profile link:

```text
/u/yourusername
```

### 3. Share your link

Share your link with friends, followers, or anyone you want to receive messages from.

### 4. Receive anonymous messages

Visitors can open your link and send you a message without creating an account.

### 5. Manage your inbox

Log in to your dashboard to view and delete your received messages.

---

## 🤖 AI Message Suggestions

Blurt uses **Gemini AI** to help users come up with interesting questions and messages.

Instead of wondering what to ask, users can generate suggestions with a single click.

---

## 🔐 Security

Blurt uses several measures to protect user accounts and data:

* OTP-based email verification
* Secure authentication with NextAuth.js
* Server-side validation with Zod
* Environment variables for sensitive credentials
* Protected dashboard routes
* Anonymous sender identity protection

---

## 📁 Project Structure

```text
blurt/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utilities and configurations
│   ├── models/           # MongoDB models
│   └── schemas/          # Zod validation schemas
├── public/               # Static assets
├── .env.example          # Environment variable template
├── package.json
└── README.md
```

---

## 🌐 Deployment

Blurt can be deployed on platforms such as **Vercel**.

Before deploying, make sure all required environment variables are configured in your production environment.

---

## 📌 Future Improvements

Potential improvements include:

* 💬 Replying to messages
* 📊 Message analytics
* 🎨 More profile customization
* 🛡️ Advanced abuse/spam protection
* 🔔 Notification improvements
* 📱 Progressive Web App support

---

## 👨‍💻 Author

**Talha Khan**

Full-Stack Developer

* GitHub: [@talhaakhann1](https://github.com/talhaakhann1)
* LinkedIn: [@talhaakhann45](https://linkedin.com/in/talhaakhann45)


