<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>POTBELLY Login Link</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #f0fdf4;">
    <div style="background: #ffffff; padding: 30px; border-radius: 12px; text-align: center; border: 1px solid #dcfce7;">
        
        <!-- Header -->
        <h1 style="color: #22c55e; margin-bottom: 20px;">✨ Your POTBELLY Login Link</h1>
        
        <!-- Message -->
        <p style="font-size: 16px; margin-bottom: 30px; color: #374151;">
            Click the button below to securely log into your account. This link will expire in 15 minutes.
        </p>
        
        <!-- CTA Button -->
        <a href="{{ $url }}" 
           style="display: inline-block; background: #22c55e; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 2px 6px rgba(34,197,94,0.3);">
            🔐 Login to Your Account
        </a>
        
        <!-- Fallback link -->
        <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <span style="word-break: break-all; color: #22c55e;">{{ $url }}</span>
        </p>
        
        <!-- Footer -->
        <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
            If you didn't request this login link, you can safely ignore this email.
        </p>
    </div>
</body>
</html>
