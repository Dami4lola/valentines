# Vercel Setup Guide

This project uses environment variables on Vercel to securely store EmailJS credentials.

## Setting Up Environment Variables on Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following environment variables:

### Required Variables:

- `EMAILJS_PUBLIC_KEY` - Your EmailJS Public Key
- `EMAILJS_SERVICE_ID` - Your EmailJS Service ID (e.g., `service_1zn663c`)
- `EMAILJS_TEMPLATE_ID` - Your EmailJS Template ID (e.g., `template_mfz0czq`)
- `RECIPIENT_EMAIL` - Email address to receive reports (e.g., `ayoadedamilola91@gmail.com`)

### Optional Variables:

- `WEBHOOK_URL` - Webhook URL (leave empty if not using)

## How It Works

1. During build, Vercel runs `npm run build`
2. The build script (`build-config.js`) reads environment variables
3. It generates `config.js` with your credentials
4. The generated `config.js` is included in the deployment

## Local Development

For local development, you can either:

1. **Use the existing config.js** (if you have one locally)
2. **Create a `.env.local` file** and run the build script:
   ```bash
   npm run build
   ```

## Troubleshooting

If you see "CONFIG not loaded" errors:

1. Check that all environment variables are set in Vercel
2. Verify the build is running successfully (check Vercel build logs)
3. Ensure `config.js` is being generated (it should appear in build output)
4. Check browser console for any script loading errors
