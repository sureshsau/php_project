import transporter from '../mail/mail.config.js'
import { codeVerificationTemplate, welcomeEmailTemplate,resetPasswordEmailTemplate } from './mail.template.js';


export const sendVerificationCode = async (email, code) => {
    try {
        const info = await transporter.sendMail({
            from: `"Entirety Trading" <${process.env.EMAIL_ADDRESS}>`, 
            to: email,
            subject: "Enterity OTP Verification Code",
            text: `Your OTP for Enterity Trading verification is: ${code}`,
            html: codeVerificationTemplate(code), // HTML version
            headers: {
                "X-Mailer": "EnterityTrading",
                "Precedence": "bulk",
            }
        });
        return true;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
};

export const sendWelcomeEmail = async (email,username) => {
    try {
        const info = await transporter.sendMail({
            from: `"Entirety Trading" <${process.env.EMAIL_ADDRESS}>`, 
            to: email,
            subject: "welcome email from enterity",
            html:welcomeEmailTemplate(username), // HTML version
        });
        return true;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
    }
};

export const sendPasswordResetEmail = async (email, resetLink) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reset Your Password',
            html: resetPasswordEmailTemplate(resetLink)  
        };

        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
