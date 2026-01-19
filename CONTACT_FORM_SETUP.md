# How to Set Up Your Free Google Backend

Follow these steps to enable your contact form for free.

---

## ⚠️ Note on Visitor Counter Accuracy

The unique visitor counter uses **localStorage** on the client side to track if a user has been counted before. This approach has known limitations:

| Scenario | Result |
|----------|--------|
| Incognito/Private mode | Counts as new visitor (each session) |
| Clearing browser data | Re-counts the same user |
| Different browsers/devices | Same person = multiple counts |
| Bots without JavaScript | Not counted (good!) |

**Why not server-side?** Google Apps Script web apps don't expose the requester's IP address for security reasons. True IP-based unique visitor tracking isn't possible with this architecture.

**Bottom line:** The counter provides a *reasonable estimate* for portfolio traffic, not an exact count. For precise analytics, consider services like Plausible or Fathom (privacy-friendly alternatives to Google Analytics).

---
## 1. Create the Script
1.  Open your [Google Drive](https://drive.google.com/).
2.  Create a **New > Google Sheets** spreadsheet. Name it "NekoCode Inquiries".
3.  In the sheet menu, go to **Extensions > Apps Script**.
4.  Delete *all* existing code in the editor.
5.  Copy and paste the code below into `Code.gs`:

```javascript
/**
 * BACKEND SCRIPT FOR NEKOCODE CONTACT FORMZ
 */

// CHANGE THIS: Where you want to receive emails
// By default, this sends to the Gmail account that owns the script.
const TO_EMAIL = Session.getActiveUser().getEmail();

/**
 * Handle POST requests (Contact Form)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, subject, message } = data;

    // 1. Save to Google Sheet
    recordToSheet(name, email, subject, message);

    // 2. Send Email Notification
    sendEmailNotification(name, email, subject, message);

    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Message sent successfully' 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (Visitor Counter)
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    const propertyKey = 'VISITOR_COUNT';
    const scriptProperties = PropertiesService.getScriptProperties();
    
    let count = Number(scriptProperties.getProperty(propertyKey)) || 0;

    if (action === 'increment_visitor') {
      count++;
      scriptProperties.setProperty(propertyKey, count.toString());
    }

    // Always return the count (whether we incremented or just requested it)
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'success', 
      count: count 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error', 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function recordToSheet(name, email, subject, message) {
  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName('Submissions') || doc.insertSheet('Submissions');
    
    // Add headers if new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
    }

    sheet.appendRow([new Date(), name, email, subject, message]);
  } catch (err) {
    console.error('Sheet Error:', err);
  }
}

function sendEmailNotification(name, email, subject, message) {
  const emailSubject = `[NekoCode] New Contact: ${subject}`;
  const emailBody = `
    New Contact Form Submission
    
    Name: ${name}
    Email: ${email}
    Subject: ${subject}
    
    Message:
    ${message}
    
    -----------------------------------
    Sent from NekoCode Portfolio
  `;
  
  GmailApp.sendEmail(TO_EMAIL, emailSubject, emailBody, {
    replyTo: email
  });
}

function initialSetup() {
  const doc = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = doc.getSheetByName('Submissions') || doc.insertSheet('Submissions');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
  }
  
  // Initialize visitor count if missing
  const scriptProperties = PropertiesService.getScriptProperties();
  if (!scriptProperties.getProperty('VISITOR_COUNT')) {
    scriptProperties.setProperty('VISITOR_COUNT', '0');
  }
}
```

## 2. Deploy
1.  In the Apps Script editor, click the blue **Deploy** button > **New deployment**.
2.  Click the gear icon (Select type) > **Web app**.
3.  **Fill in details**:
    *   **Description**: Contact Form
    *   **Execute as**: Me (your email)
    *   **Who has access**: **Anyone** (This is crucial! It allows the website to send data).
4.  Click **Deploy**.
5.  **Authorize**: Google will ask for permission.
    *   Click "Review permissions".
    *   Choose your account.
    *   You might see a "Google hasn't verified this app" warning (because you just wrote it!).
    *   Click **Advanced** > **Go to ... (unsafe)**.
    *   Click **Allow**.

## 3. Connect to Website
1.  Copy the **Web App URL** (it starts with `https://script.google.com/macros/s/...`).
2.  Paste it into specified line in `src/pages/contact.astro` where it says `const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_URL_HERE';`.
