<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Magic Login Link</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; text-align: center;">
        <h1 style="color: #2563eb; margin-bottom: 20px;">✨ Your Magic Login Link</h1>
        
        <p style="font-size: 16px; margin-bottom: 30px;">
            Click the button below to securely log into your account. This link will expire in 15 minutes.
        </p>
        
        <a href="{{ $url }}" 
           style="display: inline-block; background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
            🔐 Login to Your Account
        </a>
        
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <span style="word-break: break-all;">{{ $url }}</span>
        </p>
        
        <p style="font-size: 12px; color: #999; margin-top: 20px;">
            If you didn't request this login link, you can safely ignore this email.
        </p>
    </div>
</body>
</html>