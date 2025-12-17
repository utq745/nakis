# OAuth Setup Guide

This guide will help you set up Google and Apple authentication for your application.

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen if you haven't already
6. For **Application type**, select **Web application**
7. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
8. Copy the **Client ID** and **Client Secret**
9. Add them to your `.env` file:
   ```
   GOOGLE_CLIENT_ID="your-client-id-here"
   GOOGLE_CLIENT_SECRET="your-client-secret-here"
   ```

## Apple OAuth Setup

1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Sign in with your Apple Developer account
3. Go to **Certificates, Identifiers & Profiles**
4. Click on **Identifiers** → **+** (plus button)
5. Select **App IDs** and click **Continue**
6. Select **App** and click **Continue**
7. Fill in the description and Bundle ID
8. Enable **Sign in with Apple** capability
9. Configure the **Sign in with Apple** settings:
   - Add your domain
   - Add redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/apple`
     - Production: `https://yourdomain.com/api/auth/callback/apple`
10. Create a **Services ID** for web authentication
11. Generate a **Key** for Sign in with Apple
12. Download the key file (you'll need this for the client secret)
13. Add to your `.env` file:
    ```
    APPLE_CLIENT_ID="your-services-id"
    APPLE_CLIENT_SECRET="your-generated-secret"
    ```

### Generating Apple Client Secret

Apple requires a JWT token as the client secret. You can generate it using:
- Your Team ID
- Services ID (Client ID)
- Key ID
- Private key file (.p8)

You may need to use a tool or library to generate this JWT. Here's a Node.js example:

```javascript
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('path/to/AuthKey_XXXXXXXXXX.p8');
const token = jwt.sign({}, privateKey, {
  algorithm: 'ES256',
  expiresIn: '180d',
  audience: 'https://appleid.apple.com',
  subject: 'YOUR_SERVICES_ID',
  issuer: 'YOUR_TEAM_ID',
  header: {
    alg: 'ES256',
    kid: 'YOUR_KEY_ID'
  }
});

console.log(token);
```

## Testing

After setting up the OAuth providers:

1. Restart your development server
2. Go to `/login` page
3. Click on **Google** or **Apple** button
4. You should be redirected to the respective OAuth provider
5. After successful authentication, you'll be redirected back to `/dashboard`

## Troubleshooting

### Google OAuth Issues
- Make sure redirect URIs match exactly (including http/https)
- Check that Google+ API is enabled
- Verify OAuth consent screen is configured

### Apple OAuth Issues
- Ensure your domain is verified in Apple Developer Portal
- Check that redirect URIs are correctly configured
- Verify the JWT token is generated correctly
- Make sure Sign in with Apple capability is enabled

## Security Notes

- Never commit `.env` file to version control
- Keep your client secrets secure
- Use environment variables for all sensitive data
- In production, always use HTTPS
- Regularly rotate your secrets
