// Tracking utility for "No" button clicks
class ClickTracker {
    constructor() {
        // Generate session ID first
        this.sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        this.startTime = new Date().toISOString();
        this.clicks = { mainPage: 0, successPage: 0 };
        
        // Try to load existing session data from localStorage
        const savedData = localStorage.getItem('valentine_tracking');
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Use saved session data if it exists
                if (parsed.sessionId) this.sessionId = parsed.sessionId;
                if (parsed.startTime) this.startTime = parsed.startTime;
                if (parsed.clicks) this.clicks = parsed.clicks;
            } catch (e) {
                console.warn('Failed to parse saved tracking data:', e);
            }
        }
        
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
        
        // Don't send on beforeunload - only send on final pages
        // Email will be sent when user reaches breakfast.html or plans.html
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

        console.log('Sending tracking data:', data);

        // Only use EmailJS
        try {
            console.log('Attempting to send email...');
            await this.sendToEmail(data);
            console.log('Email sent successfully!');
        } catch (emailError) {
            console.error('Email failed:', emailError);
            // Fallback to console and localStorage
            console.log('Valentine Tracking Data:', data);
            this.saveToLocalStorage();
        }
    }


    async sendToEmail(data) {
        // EmailJS configuration
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded - make sure emailjs script is included');
        }

        // Get configuration from config.js
        if (typeof CONFIG === 'undefined') {
            throw new Error('Config file not loaded - make sure config.js is included before tracking.js');
        }

        const PUBLIC_KEY = CONFIG.EMAILJS_PUBLIC_KEY;
        const SERVICE_ID = CONFIG.EMAILJS_SERVICE_ID;
        const TEMPLATE_ID = CONFIG.EMAILJS_TEMPLATE_ID;

        // Validate configuration
        if (!PUBLIC_KEY || PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE') {
            throw new Error('EmailJS Public Key not configured in config.js');
        }
        if (!SERVICE_ID || SERVICE_ID === 'YOUR_SERVICE_ID_HERE') {
            throw new Error('EmailJS Service ID not configured in config.js');
        }
        if (!TEMPLATE_ID || TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE') {
            throw new Error('EmailJS Template ID not configured in config.js');
        }

        // Initialize EmailJS if not already initialized
        try {
            emailjs.init(PUBLIC_KEY);
        } catch (initError) {
            console.warn('EmailJS already initialized or init failed:', initError);
        }

        // Format message as requested: "No was pressed X times on page index.html and No was pressed Y times on success.html"
        const mainPageText = data.clicks.mainPage === 1 ? 'time' : 'times';
        const successPageText = data.clicks.successPage === 1 ? 'time' : 'times';
        const message = `No was pressed ${data.clicks.mainPage} ${mainPageText} on page index.html and No was pressed ${data.clicks.successPage} ${successPageText} on success.html`;

        const emailParams = {
            to_email: CONFIG.RECIPIENT_EMAIL || 'ayoadedamilola91@gmail.com',
            subject: 'Valentine Website - No Button Clicks Report',
            message: message
        };

        console.log('Sending email with params:', { SERVICE_ID, TEMPLATE_ID, to_email: emailParams.to_email });

        try {
            const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams);
            console.log('EmailJS response:', response);
            return response;
        } catch (error) {
            console.error('EmailJS send error:', error);
            throw error;
        }
    }
}

// Initialize tracker
const clickTracker = new ClickTracker();

// Export for use in other scripts
window.clickTracker = clickTracker;
