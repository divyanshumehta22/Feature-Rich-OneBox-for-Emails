const { Client } = require("@elastic/elasticsearch");
const { categorizeEmail } = require("../features/aiCategorization");
const { sendSlackNotification } = require("../features/slackNotifier");
const { triggerWebhook } = require("./webhookService");

// Connect to Elasticsearch
const esClient = new Client({ 
  node: "http://localhost:9200" ,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
});

const indexName = "emails"; // Name of the index where emails will be stored

// Function to check if the index exists, if not, create it
async function createIndex() {
  const exists = await esClient.indices.exists({ index: indexName });
  if (!exists) {
    await esClient.indices.create({ index: indexName });
  }
}

async function indexEmail(email) {
  // Checking  header.date is a string and not an array
  const subject = Array.isArray(email.header.subject) ? email.header.subject[0] : email.header.subject;
  const date = Array.isArray(email.header.date) ? email.header.date[0] : email.header.date;

  const existingEmail = await esClient.search({
    index: indexName,
    query: {
      bool: {
        must: [
          { match: { "header.subject": subject } },
          { term: { "header.date": date } }
        ]
      }
    }
  });

  if (existingEmail.hits.hits.length > 0) {
    console.log(`Email already indexed: ${subject}`);
    return;
  }
  // Categorization by AI Before Storing to elastic search
  const category = await categorizeEmail(email.header.subject);
  email.category = category; 

  await esClient.index({
    index: indexName,
    document: { ...email, header: { subject, date } }, // Store values
  })

  // Trigger Slack Notification & Webhook if category is "Interested"
  if (category === "Interested") {
    await sendSlackNotification(email, category);
    await triggerWebhook(email, category);
  }
}

// Function to search for emails with category filter
async function searchEmails(query, category = null) {
  let searchQuery = {
    bool: {
      must: [
        { match: { "header.subject": query } } // Search in subject
      ]
    }
  };

  if (category) {
    searchQuery.bool.filter = [{ term: { "category.keyword": category } }]; // Filter by category
  }

  const result = await esClient.search({
    index: indexName,
    query: searchQuery
  });

  return result.hits.hits.map(hit => hit._source);
}


module.exports = { createIndex, indexEmail, searchEmails };

