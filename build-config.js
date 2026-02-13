// Build script to generate config.js from environment variables
// This runs during Vercel build process

const fs = require('fs');
const path = require('path');

// Get environment variables (Vercel will provide these)
const config = {
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE',
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID_HERE',
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID_HERE',
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL || 'ayoadedamilola91@gmail.com',
    WEBHOOK_URL: process.env.WEBHOOK_URL || ''
};

// Validate required variables (warn but don't fail for local dev)
if (config.EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
    console.warn('⚠️  WARNING: EMAILJS_PUBLIC_KEY not set. Using placeholder.');
}
if (config.EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID_HERE') {
    console.warn('⚠️  WARNING: EMAILJS_SERVICE_ID not set. Using placeholder.');
}
if (config.EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE') {
    console.warn('⚠️  WARNING: EMAILJS_TEMPLATE_ID not set. Using placeholder.');
}

// Escape single quotes in values to prevent JavaScript errors
function escapeValue(value) {
    return String(value).replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// Generate config.js content
const configContent = `// Configuration file for tracking
// This file is auto-generated from environment variables during build
// DO NOT EDIT MANUALLY - it will be overwritten on next build

const CONFIG = {
    // EmailJS Configuration
    EMAILJS_PUBLIC_KEY: '${escapeValue(config.EMAILJS_PUBLIC_KEY)}',
    EMAILJS_SERVICE_ID: '${escapeValue(config.EMAILJS_SERVICE_ID)}',
    EMAILJS_TEMPLATE_ID: '${escapeValue(config.EMAILJS_TEMPLATE_ID)}',
    
    // Recipient email
    RECIPIENT_EMAIL: '${escapeValue(config.RECIPIENT_EMAIL)}',
    
    // Webhook URL (optional)
    WEBHOOK_URL: '${escapeValue(config.WEBHOOK_URL)}'
};
`;

// Write to config.js
const configPath = path.join(__dirname, 'config.js');
try {
    fs.writeFileSync(configPath, configContent, 'utf8');
    console.log('✅ config.js generated successfully from environment variables');
} catch (error) {
    console.error('❌ Error generating config.js:', error);
    process.exit(1);
}
