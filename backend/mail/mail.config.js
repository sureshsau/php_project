import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  
  port: 465,               // 465 (SSL) or 587 (TLS)
  secure: true,            //  true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default transporter;
