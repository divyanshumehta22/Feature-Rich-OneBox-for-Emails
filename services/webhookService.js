
const axios = require("axios");

const WEBHOOK_URL = "https://webhook.site/18da8aac-0d93-4d12-8293-21119d868686"; // Replace with actual webhook URL

async function triggerWebhook(email, category) {
    try {
        console.log("EEEEEEmail get in webhook --> "+email)
        const payload = {
            subject: email.header.subject,
            date: email.header.date,
            category: category
        };

        await axios.post(WEBHOOK_URL, payload, {
            headers: { "Content-Type": "application/json" }
        });

        console.log("Webhook triggered successfully.");
    } catch (error) {
        console.error("Error triggering webhook:", error);
    }
}

module.exports = { triggerWebhook };
