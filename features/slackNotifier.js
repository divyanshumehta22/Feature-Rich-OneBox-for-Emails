require("dotenv").config();
const { WebClient } = require("@slack/web-api");

const slack = new WebClient(process.env.SLACK_TOKEN);

async function sendSlackNotification(email, category) {
    try {
        const message = ` *New Email Categorized as:* ${category}\n  *From:* ${email.header.subject}`;
        
        await slack.chat.postMessage({
            channel: process.env.SLACK_CHANNEL_ID,
            text: message
        });

        console.log("Slack notification sent!");
    } catch (err) {
        console.error("Error sending Slack notification:", err);
    }
}

module.exports = { sendSlackNotification };
