# **Email Sync & Search using IMAP and Elasticsearch**

## **Project Overview**
This project provides real-time email synchronization using an IMAP account and stores emails in Elasticsearch for efficient searching, categorization, and processing. I tried for AI-based email categorization, Slack notifications, and webhook triggering for specific email categories but It will be done soon.

---

## **Technology Stack**
- **Node.js** – Backend server to connect with IMAP and process emails.
- **IMAP (node-imap)** – Fetches emails from an email account in real-time.
- **Elasticsearch** – Stores and indexes emails for searching.
- **Slack API** – Sends notifications for important emails.
- **Webhook Integration** – Triggers external webhooks for categorized emails.

---

## **Assessment Steps**

### **Step 1: Real-time Email Sync using IMAP**
- Connect to an IMAP server using `node-imap`.
- Authenticate the IMAP connection.
- Listen for new incoming emails in real-time.
- Fetch emails and process metadata (subject, date, sender, etc.).
- Extract email headers and body content for further processing.

### **Step 2: Storing Emails in Elasticsearch**
- Create an Elasticsearch index (`emails`) if it doesn’t exist.
- Store email metadata (subject, date, sender, etc.).
- Prevent duplicate indexing by checking for existing emails present in the elastic search or not.
- Enable structured storage for fast searching and filtering.

### **Step 3: Searching and Filtering Emails**
 - Implement search functionality using Elasticsearch queries.
 - Search emails by subject, date, sender, or category.
 - Optimize queries for better performance.

### **Step 4: Email Categorization using AI**
 - Use Natural Language Processing (NLP) to analyze email subject lines.
 - Send email subjects to Google Vertex AI for categorization.
 - AI assigns categories like Interested, Spam, Inquiry, etc.
 - Store the categorized result in Elasticsearch.
 - Google Vertex AI (free trial with limited requests) is used for email categorization.bject, date, sender, or category.
 - Optimize queries for better performance.

### **Step 5: Slack Notifications & Webhook Triggers**
- If an email is categorized as `Interested`, trigger a Slack notification.
- If an email is categorized as `Interested`, trigger a Webhook (using webhook site).
- Allow real-time notifications for important emails.

### **Step 6: Frontend Interface**
- used react and material-ui for userfriendly and simple interface.
- Added toggle mode (Dark, Light) button.
- Added User profile feature.

### **Step 7: AI powered Suggested Replies (Yet Not Complted)**
- Wil be added soon !

---

## **Project working flow**
- Project started it will connect to mongodb atlas, IMAP account and add event listener for sync when new email come to listen.
- Connect to imap and create index to elastic search (using createIndex()).
- User come to homepage (request to backend url  '/emails' to fetch the emails trigger)
- Cotroller run fetchEmails function in imapService.js file it will check if elasticSearch instance contain emails or not if not then fetch form imap account else just fetch from elasticSearch.
- If emails are fethed from imap account than call the esSearch.js function index for email .
- For each email ai categorization function is called using google vertix ai model and return the created category .
- Save the email with ai created category in elastic search in docker.
- When user refresh return from elastic search itself
- Any new email come than trigger the imap function event to listen and add this email to elastic search .

## **Setup Instructions**

### **1. Install Dependencies**
```bash
npm install
```

### **2. Configure Environment Variables**
Create a `.env` file in the project root and add the following details:
```env
IMAP_HOST=imap.yourmail.com
IMAP_PORT=993
IMAP_USER=your-email@example.com
IMAP_PASS=your-password
ELASTICSEARCH_USERNAME=your-es-username
ELASTICSEARCH_PASSWORD=your-es-password
SLACK_WEBHOOK_URL=your-slack-webhook-url
```

### **3. Start Elasticsearch**
Make sure Elasticsearch is running on `localhost:9200`:
```bash
systemctl start elasticsearch   # For Linux
# or
elasticsearch                   # If installed manually
```

### **4. Run the Project**
```bash
node index.js
```

### **5. Test IMAP Connection**
Check logs to verify if IMAP is syncing emails correctly:
```bash
IMAP Connected Successfully!
```

### **6. Verify Elasticsearch Indexing**
Run the following to check stored emails:
```bash
curl -X GET "http://localhost:9200/emails/_search?pretty"
```

---

## **API Endpoints**

### **1. Search Emails**
```http
GET /search?query=meeting&category=Interested
```
**Response:**
```json
{
  "emails": [
    {
      "subject": "Meeting Tomorrow",
      "sender": "john@example.com",
      "category": "Interested"
    }
  ]
}
```

### **2. Fetch All Emails**
```http
GET /emails
```

---

## **Future Enhancements**
- Implement real-time email updates using WebSockets.
- Enhance AI-based categorization using GPT-based models.
- AI-Powered Suggested Replies
---
