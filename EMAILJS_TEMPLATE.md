# EmailJS Template Setup Guide

This guide shows you exactly how to create the email template in EmailJS.

## Step 1: Create Email Template in EmailJS Dashboard

1. Go to https://www.emailjs.com and log in
2. Navigate to **"Email Templates"** in the left sidebar
3. Click **"Create New Template"**

## Step 2: Template Configuration

### Template Name
- Name: `Valentine Tracking Report` (or any name you prefer)

### Email Settings

**To Email:**
```
{{to_email}}
```

**Subject:**
```
{{subject}}
```

**Content (Message Body):**
```
{{message}}
```

### Full Template Example

Here's what your template should look like in the EmailJS editor:

```
To: {{to_email}}
Subject: {{subject}}

{{message}}
```

Or if using HTML format:

```html
To: {{to_email}}
Subject: {{subject}}

<pre>{{message}}</pre>
```

## Step 3: Save and Get Template ID

1. Click **"Save"** button
2. After saving, you'll see your **Template ID** (looks like: `template_xxxxxxxxx`)
3. Copy this Template ID

## Step 4: Update config.js

Open `config.js` and replace `YOUR_TEMPLATE_ID_HERE` with your actual Template ID.

## Template Variables Used

The template uses these variables that are automatically sent:
- `{{to_email}}` - Recipient email (ayoadedamilola91@gmail.com)
- `{{subject}}` - Email subject line
- `{{message}}` - The tracking report with all the data

## Example Email Output

When someone uses your website, you'll receive an email like this:

```
To: ayoadedamilola91@gmail.com
Subject: Valentine Website - No Button Clicks Report

Valentine Website Tracking Report

Session ID: session_1234567890_abc123
Start Time: 2024-02-14T10:00:00.000Z
End Time: 2024-02-14T10:05:00.000Z

Click Statistics:
- Main Page "No" Clicks: 5
- Success Page "No" Clicks: 2
- Total "No" Clicks: 7

Page: mainPage
User Agent: Mozilla/5.0...
```

## Quick Checklist

- [ ] Created email template in EmailJS
- [ ] Set To Email to: `{{to_email}}`
- [ ] Set Subject to: `{{subject}}`
- [ ] Set Content to: `{{message}}`
- [ ] Saved template and copied Template ID
- [ ] Updated `config.js` with Template ID
