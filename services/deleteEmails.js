const { Client } = require("@elastic/elasticsearch");

const esClient = new Client({ 
  node: "http://localhost:9200",
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  }
});

const indexName = "emails";

async function deleteAllEmails() {
  try {
    const exists = await esClient.indices.exists({ index: indexName });
    if (exists) {
      await esClient.indices.delete({ index: indexName });
    }
    await esClient.indices.create({ index: indexName });
  } catch (error) {
    console.error("❌ Error deleting emails:", error);
  }
}

deleteAllEmails();
