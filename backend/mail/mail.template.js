export const codeVerificationTemplate = (code) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; 
                    border-radius: 10px; background: #f4f4f4; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            <div style="background: linear-gradient(135deg, #673ab7, #512da8); padding: 15px; border-radius: 10px 10px 0 0; 
                        text-align: center; color: #fff;">
                <h2 style="margin: 0; font-size: 24px;">BlogNest</h2>
                <p style="margin: 0; font-size: 16px;">Email Verification Code</p>
            </div>

            <div style="padding: 20px; background: #ffffff; border-radius: 0 0 10px 10px;">
                <p style="font-size: 16px; color: #333;">Hello,</p>
                <p style="font-size: 16px; color: #333;">
                    We received a request to verify your email for 
                    <strong style="color: #673ab7;">BlogNest</strong>.
                </p>
                
                <p style="font-size: 16px; color: #333;">Your verification code is:</p>

                <div style="background: #673ab7; padding: 15px; text-align: center; font-size: 26px; 
                            font-weight: bold; letter-spacing: 3px; color: #ffffff; border-radius: 5px;">
                    ${code}
                </div>

                <p style="font-size: 16px; color: #333; margin-top: 15px;">
                    This code is valid for <strong style="color: #e74c3c;">5 minutes</strong>. 
                    Please do not share it with anyone.
                </p>

                <p style="font-size: 14px; color: #777;">If you did not request this, you can safely ignore this email.</p>

                <div style="margin-top: 20px; text-align: center;">
                    <a href="#" style="display: inline-block; padding: 10px 20px; background: #673ab7; 
                                      color: #fff; text-decoration: none; font-size: 16px; 
                                      border-radius: 5px; font-weight: bold;">
                        Verify Email
                    </a>
                </div>
            </div>

            <div style="text-align: center; font-size: 12px; color: #999; margin-top: 15px;">
                <p>Need help? Contact us at 
                    <a href="mailto:support@blognest.com" style="color: #673ab7; text-decoration: none;">
                        support@blognest.com
                    </a>.
                </p>
                <p style="margin: 0;">© 2025 BlogNest. All rights reserved.</p>
            </div>
        </div>
    `;
};
export const welcomeEmailTemplate = (username) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #fdf8ff;">
            <h2 style="color: #6a1b9a; text-align: center;">✨ Welcome to BlogNest, ${username}! ✨</h2>
            
            <p style="font-size: 16px; color: #333;">Dear ${username},</p>

            <p style="font-size: 16px; color: #333;">
                We're thrilled to have you join <strong>BlogNest</strong> – your cozy corner of the internet for sharing thoughts, stories, and inspiration.
            </p>

            <div style="background: #f3e5f5; padding: 15px; text-align: center; font-size: 18px; font-weight: bold; color: #4a148c; border-radius: 5px;">
                "Write what should not be forgotten."
            </div>

            <p style="font-size: 16px; color: #333;">
                Log in now to start writing or exploring amazing blogs from creators around the world!
            </p>

            <p style="text-align: center;">
                <a href="https://blognest.com/login" style="display: inline-block; padding: 10px 20px; background-color: #6a1b9a; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">
                    Go to Dashboard
                </a>
            </p>

            <p style="color: #777;">Warm wishes, <br> <strong>BlogNest Team</strong></p>
            
            <hr>
            <p style="font-size: 12px; text-align: center; color: #999;">
                This is an automated email. Need help? Contact us at <a href="mailto:support@blognest.com">support@blognest.com</a>.
            </p>
        </div>
    `;
};
export const resetPasswordEmailTemplate = (resetLink) => {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 25px; 
                    border-radius: 10px; background: #f4f4f4; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);">
            
            <div style="text-align: center; padding-bottom: 20px;">
                <img src="https://your-blognest-logo-url.com/logo.png" alt="BlogNest" 
                     style="width: 150px; margin-bottom: 10px;">
                <h2 style="color: #4527a0; margin: 5px 0;">Reset Your Password</h2>
                <p style="color: #777; font-size: 15px;">A password reset was requested for your BlogNest account.</p>
            </div>

            <div style="background: #fff; padding: 20px; border-radius: 8px;">
                <p style="color: #444; font-size: 14px; line-height: 1.6;">
                    If this was you, click the button below to create a new password.
                </p>

                <div style="text-align: center; margin: 20px 0;">
                    <a href="${resetLink}" 
                       style="background: #7b1fa2; color: #fff; padding: 12px 20px; 
                              border-radius: 6px; text-decoration: none; font-weight: bold; 
                              display: inline-block; font-size: 16px; transition: 0.3s;">
                        Reset Password
                    </a>
                </div>

                <p style="color: #777; font-size: 14px;">Didn't request this? You can safely ignore this email.</p>
                <p style="color: #d84315; font-size: 13px; font-weight: bold;">This link will expire in 5 minutes.</p>
            </div>

            <div style="text-align: center; margin-top: 20px;">
                <p style="color: #777; font-size: 12px;">
                    Questions? <a href="https://blognest.com/support" 
                                  style="color: #7b1fa2; text-decoration: none; font-weight: bold;">Contact Support</a>
                </p>
                <p style="color: #aaa; font-size: 11px;">© 2025 BlogNest. All rights reserved.</p>
            </div>
        </div>
    `;
};
