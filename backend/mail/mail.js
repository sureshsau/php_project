import transporter from '../mail/mail.config.js'
import {
    codeVerificationTemplate,
    welcomeEmailTemplate,
    resetPasswordEmailTemplate
} from './mail.template.js';

export const sendVerificationCode = async (email, code) => {
    try {
        const info = await transporter.sendMail({
            from: `"Blognest" <${process.env.EMAIL_ADDRESS}>`,
            to: email,
            subject: "Your Blognest OTP Verification Code",
            text: `Your OTP for Blognest verification is: ${code}`,
            html: codeVerificationTemplate(code),
            headers: {
                "X-Mailer": "Blognest",
                "Precedence": "bulk",
            }
        });
        return true;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
};

export const sendWelcomeEmail = async (email, username) => {
    try {
        const info = await transporter.sendMail({
            from: `"Blognest" <${process.env.EMAIL_ADDRESS}>`,
            to: email,
            subject: "Welcome to Blognest!",
            html: welcomeEmailTemplate(username),
        });
        return true;
    } catch (error) {
        console.error("Error sending welcome email:", error);
        return false;
    }
};

export const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        const mailOptions = {
            from: `"Blognest" <${process.env.EMAIL_ADDRESS}>`,
            to: email,
            subject: 'Reset Your Blognest Password',
            html: resetPasswordEmailTemplate(resetLink)
        };

        const info = await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending reset password email:', error);
        return false;
    }
};
