// Tracking utility for "No" button clicks
class ClickTracker {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.startTime = new Date().toISOString();
        this.clicks = {
            mainPage: 0,
            successPage: 0
        };
        // Initialize EmailJS if available and configured
        if (typeof emailjs !== 'undefined' && typeof CONFIG !== 'undefined') {
            const PUBLIC_KEY = CONFIG.EMAILJS_PUBLIC_KEY;
            if (PUBLIC_KEY && PUBLIC_KEY !== 'YOUR_PUBLIC_KEY_HERE') {
                emailjs.init(PUBLIC_KEY);
            }
        }
        this.init();
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    init() {
        // Track page views
        this.currentPage = this.getPageName();
        
        // Send data when page is about to unload
        window.addEventListener('beforeunload', () => {
            this.sendData();
        });

        // Also send data when navigating to final pages
        this.setupNavigationTracking();
    }

    getPageName() {
        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
            return 'mainPage';
        } else if (path.includes('success.html')) {
            return 'successPage';
        }
        return 'unknown';
    }

    trackNoClick(page) {
        if (page === 'mainPage') {
            this.clicks.mainPage++;
        } else if (page === 'successPage') {
            this.clicks.successPage++;
        }
        
        // Save to localStorage as backup
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        const data = {
            sessionId: this.sessionId,
            startTime: this.startTime,
            clicks: this.clicks,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('valentine_tracking', JSON.stringify(data));
    }

    setupNavigationTracking() {
        // Override navigation to send data before leaving
        const originalAssign = window.location.assign;
        const originalReplace = window.location.replace;
        const originalHref = Object.getOwnPropertyDescriptor(window.location, 'href');

        const self = this;
        
        // Track when navigating to final pages
        document.addEventListener('click', function(e) {
            if (e.target && (e.target.id === 'yesBtn' || e.target.id === 'yesBtn2')) {
                setTimeout(() => {
                    self.sendData();
                }, 100);
            }
        });
    }

    async sendData() {
        const data = {
            sessionId: this.sessionId,
            startTime: this.startTime,
            endTime: new Date().toISOString(),
            clicks: this.clicks,
            page: this.currentPage,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
        };

        // Try multiple methods to send data
        try {
            // Method 1: Webhook (configure your webhook URL here)
            await this.sendToWebhook(data);
        } catch (error) {
            console.error('Webhook failed, trying email...', error);
            try {
                // Method 2: Email via EmailJS (if configured)
                await this.sendToEmail(data);
            } catch (emailError) {
                console.error('Email failed, saving to console...', emailError);
                // Method 3: Console log as fallback
                console.log('Valentine Tracking Data:', data);
                this.saveToLocalStorage();
            }
        }
    }

    async sendToWebhook(data) {
        // Get webhook URL from config
        const webhookUrl = (typeof CONFIG !== 'undefined' && CONFIG.WEBHOOK_URL) 
            ? CONFIG.WEBHOOK_URL 
            : '';
        
        // If webhook URL is not configured, skip
        if (!webhookUrl || webhookUrl.trim() === '') {
            throw new Error('Webhook not configured');
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            keepalive: true // Ensures request completes even if page unloads
        });

        if (!response.ok) {
            throw new Error('Webhook request failed');
        }
    }

    async sendToEmail(data) {
        // EmailJS configuration
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded');
        }

        // Get configuration from config.js
        if (typeof CONFIG === 'undefined') {
            throw new Error('Config file not loaded');
        }

        const emailParams = {
            to_email: CONFIG.RECIPIENT_EMAIL || 'ayoadedamilola91@gmail.com',
            subject: 'Valentine Website - No Button Clicks Report',
            message: `
Valentine Website Tracking Report

Session ID: ${data.sessionId}
Start Time: ${data.startTime}
End Time: ${data.endTime}

Click Statistics:
- Main Page "No" Clicks: ${data.clicks.mainPage}
- Success Page "No" Clicks: ${data.clicks.successPage}
- Total "No" Clicks: ${data.clicks.mainPage + data.clicks.successPage}

Page: ${data.page}
User Agent: ${data.userAgent}
            `.trim()
        };

        const PUBLIC_KEY = CONFIG.EMAILJS_PUBLIC_KEY;
        const SERVICE_ID = CONFIG.EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = CONFIG.EMAILJS_TEMPLATE_ID;

        if (!PUBLIC_KEY || PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE' || 
            !SERVICE_ID || SERVICE_ID === 'YOUR_SERVICE_ID_HERE' || 
            !TEMPLATE_ID || TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE') {
            throw new Error('EmailJS not configured - please set values in config.js');
        }

        await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams);
    }
}

// Initialize tracker
const clickTracker = new ClickTracker();

// Export for use in other scripts
window.clickTracker = clickTracker;
