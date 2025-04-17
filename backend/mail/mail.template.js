export const codeVerificationTemplate = (code) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; 
                    border-radius: 10px; background: #f4f4f4; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            <div style="background: linear-gradient(135deg, #007bff, #00c6ff); padding: 15px; border-radius: 10px 10px 0 0; 
                        text-align: center; color: #fff;">
                <h2 style="margin: 0; font-size: 24px;">Enterity Trading</h2>
                <p style="margin: 0; font-size: 16px;">Secure OTP Verification</p>
            </div>

            <div style="padding: 20px; background: #ffffff; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px; color: #333;">Hello,</p>
                <p style="font-size: 16px; color: #333;">
                    We received a request to verify your account on 
                    <strong style="color: #007bff;">Enterity Trading</strong>.
                </p>
                
                <p style="font-size: 16px; color: #333;">Your One-Time Password (OTP) is:</p>

                <div style="background: #007bff; padding: 15px; text-align: center; font-size: 26px; 
                            font-weight: bold; letter-spacing: 3px; color: #ffffff; border-radius: 5px;">
                    ${code}
                </div>

                <p style="font-size: 16px; color: #333; margin-top: 15px;">
                    This OTP is valid for <strong style="color: #e74c3c;">5 minutes</strong>. 
                    Please do not share it with anyone.
                </p>

                <p style="font-size: 14px; color: #777;">If you did not request this, you can ignore this email.</p>

                <div style="margin-top: 20px; text-align: center;">
                    <a href="#" style="display: inline-block; padding: 10px 20px; background: #007bff; 
                                      color: #fff; text-decoration: none; font-size: 16px; 
                                      border-radius: 5px; font-weight: bold;">
                        Verify Now
                    </a>
                </div>
            </div>

            <div style="text-align: center; font-size: 12px; color: #999; margin-top: 15px;">
                <p>Need help? Contact our support team at 
                    <a href="mailto:support@enterity.com" style="color: #007bff; text-decoration: none;">
                        support@enterity.com
                    </a>.
                </p>
                <p style="margin: 0;">© 2025 Enterity Trading. All rights reserved.</p>
            </div>
        </div>
    `;
};


export const welcomeEmailTemplate = (username) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f0fff0;">
            <h2 style="color: #2e7d32; text-align: center;">🌿 Welcome to Enterity Trading, ${username}! 🌿</h2>
            
            <p style="font-size: 16px; color: #333;">Dear ${username},</p>

            <p style="font-size: 16px; color: #333;">
                We're thrilled to have you on board! 🎉 Enterity Trading is your trusted platform for secure and seamless trading.
                Explore new opportunities, stay ahead in the market, and enjoy a top-notch trading experience.
            </p>

            <div style="background: #e8f5e9; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; color: #1b5e20; border-radius: 5px;">
                "Success in trading starts with smart decisions."
            </div>

            <p style="font-size: 16px; color: #333;">
                Get started by logging into your account and exploring the features. If you need any assistance, our support team is always here to help. 🚀
            </p>

            <p style="text-align: center;">
                <a href="https://yourwebsite.com/login" style="display: inline-block; padding: 10px 20px; background-color: #388e3c; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
                    Start Trading Now
                </a>
            </p>

            <p style="color: #777;">Best regards, <br> <strong>Enterity Trading Team</strong></p>
            
            <hr>
            <p style="font-size: 12px; text-align: center; color: #999;">
                This is an automated email. Please do not reply. If you have any questions, contact <a href="mailto:support@enterity.com">support@enterity.com</a>.
            </p>
        </div>
    `;
};

export const resetPasswordEmailTemplate = (resetLink) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 25px; 
                    border-radius: 10px; background: #f4f4f4; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            
            <div style="text-align: center; padding-bottom: 20px;">
                <img src="https://your-enterity-logo-url.com/logo.png" alt="Enterity Trading" 
                     style="width: 150px; margin-bottom: 10px;">
                <h2 style="color: #2c3e50; margin: 5px 0;">Password Reset Request</h2>
                <p style="color: #777; font-size: 15px;">You're just one step away from securing your account.</p>
            </div>

            <div style="background: #fff; padding: 20px; border-radius: 8px;">
                <p style="color: #444; font-size: 14px; line-height: 1.6;">
                    We received a request to reset your password for your <strong>Enterity Trading</strong> account.
                    Click the button below to proceed with resetting your password.
                </p>

                <div style="text-align: center; margin: 20px 0;">
                    <a href="${resetLink}" 
                       style="background: #ff6b00; color: #fff; padding: 12px 20px; 
                              border-radius: 6px; text-decoration: none; font-weight: bold; 
                              display: inline-block; font-size: 16px; transition: 0.3s;">
                        Reset Password
                    </a>
                </div>

                <p style="color: #777; font-size: 14px;">If you did not request this, please ignore this email.</p>
                <p style="color: #ff6b00; font-size: 13px; font-weight: bold;">This link will expire in 5 minutes.</p>
            </div>

            <div style="text-align: center; margin-top: 20px;">
                <p style="color: #777; font-size: 12px;">
                    Need help? <a href="https://enteritytrading.com/support" 
                                  style="color: #ff6b00; text-decoration: none; font-weight: bold;">Contact Support</a>
                </p>
                <p style="color: #aaa; font-size: 11px;">© 2025 Enterity Trading. All rights reserved.</p>
            </div>
        </div>
    `;
};

