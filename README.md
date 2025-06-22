# 🔐 Register and Login with OTP (One-Time Password)

A secure Node.js-based authentication system where users can **register and log in using an OTP** sent to their email (or phone). This improves user experience by removing the need for traditional passwords.

## 🚀 Features

    - ✅ User registration with email or mobile number
    - 🔐 OTP generation and secure validation
    - ⏱️ OTP expires after a set time (e.g., 5 minutes)
    - 🔁 Resend OTP option
    - ✉️ OTP delivered via email (using Nodemailer)
    - 🛡️ Secure session/token handling after login
    - 📦 Built with Node.js, Express, and MySQL

## 🛠️ Tech Stack

    - **Backend:** Node.js, Express.js
    - **Database:** MySQL
    - **Email Service:** Nodemailer
    - **Others:** bcrypt, express-session, dotenv


## 📁 Folder Structure

    otp-auth-app/
    ├── routes/
    │ ├── auth.js # Register, verify, login routes
    ├── views/ # Frontend (optional - e.g. EJS, HBS)
    ├── db.js # MySQL DB connection
    ├── App.js # Main entry point
    └── .env # Environment variables

## 📦 Installation

    git clone https://github.com/your-username/otp-auth-app.git
    cd otp-auth-app
    npm install
    Create a .env file:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=otp_auth
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password
    SESSION_SECRET=your_secret
    
🔍 API Flow

    1. Register User
    POST /register
    
    json
    
    {
      "email": "user@example.com"
    }
    Sends OTP to user's email
    
    2. Verify OTP
    POST /verify-otp
    
    json

    {
      "email": "user@example.com",
      "otp": "123456"
    }
    Validates OTP and logs user in
    
    3. Resend OTP
    POST /resend-otp
    
    json
 
    {
      "email": "user@example.com"
    }
    Sends a new OTP if the previous one expired

🧪 API Testing with Postman

    Use Postman to test registration, OTP sending, and login.
    
    Set appropriate headers and send raw JSON body as shown above.

🔐 Security Notes
    
    OTPs are securely stored and hashed in the database
    
    OTPs auto-expire after a fixed duration (e.g., 5 minutes)
    
    Sessions or JWTs can be used for maintaining login state

📄 License

    This project is licensed under the MIT License.
    ✅ Use the code
    ✅ Modify it
    ✅ Distribute it
    ✅ Even use it commercially

📷 Screenshots


   ![pic0](https://github.com/iamdeepak199/Keeper-App/blob/main/Keeper%20App.jpg)
   
   ![pic1](https://github.com/iamdeepak199/Keeper-App/blob/main/database_App.jpg)



👨‍💻 Author

    Deepak Bhardwaj
    GitHub: @iamdeepak199


