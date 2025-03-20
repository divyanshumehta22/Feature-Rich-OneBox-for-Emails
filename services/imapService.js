const Imap = require("node-imap");
const { createIndex, indexEmail } = require("./esService");
const { categorizeEmail } = require("../features/aiCategorization");
const { sendSlackNotification } = require("../features/slackNotifier");
const { triggerWebhook } = require("./webhookService");

const imapConfig = {
  user: process.env.IMAP_USER,
  password: process.env.IMAP_PASSWORD,
  host: process.env.IMAP_HOST,
  port: process.env.IMAP_PORT,
  tls: true,
};

const imap = new Imap(imapConfig);

// Function to fetch and process emails
const fetchEmails = (callback) => {
  if (imap.state !== "authenticated") {
    return callback(new Error("IMAP not connected"), null);
  }

  imap.openBox("INBOX", false, (err, box) => {
    if (err) {
      console.error("Error while opening inbox:", err);
      return callback(err, null);
    }
    console.log("INBOX Opened:", box.messages.total);

    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - 30); // Fetch last 30 days

    const searchCriteria = [["SINCE", sinceDate.toISOString().split("T")[0]]];
    const fetchOptions = { bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"], struct: true };

    imap.search(searchCriteria, (err, results) => {
      if (err) {
        console.error("Error searching emails:", err);
        return callback(err, null);
      }

      if (results.length === 0) 
        {
          return callback(null, []);
        }

      const f = imap.fetch(results, fetchOptions);
      let emails = [];

      f.on("message", (msg, seqno) => {
        let email = { seqno };

        msg.on("body", (stream, info) => {
          let buffer = "";
          stream.on("data", (chunk) => (buffer += chunk.toString("utf8")));
          stream.on("end", () => {
            if (info.which.includes("HEADER")) {
              email.header = Imap.parseHeader(buffer);
            }
          });
        });

        msg.once("end", async () => {
          emails.push(email);
          try {
            // Store Email in Elasticsearch with category
            console.log('email is : '+JSON.stringify(email));
            await indexEmail(email);
            console.log(`Email indexed in Elasticsearch`);
          } catch (error) {
            console.error("Error processing email:", error);
          }
        });
        
      });

      f.once("end", () => {
        console.log("Finished fetching emails");
        callback(null, emails);
      });
    });
  });
};

// IMAP Connection
imap.once("ready", () => {
  console.log("IMAP Connected Successfully!");
  createIndex(); 
  imap.openBox("INBOX", false, (err, box) => {
    if (err) {
      console.error("Error opening inbox:", err);
      return;
    }
    console.log("INBOX Opened for real-time updates");
  });

  // Listen for new incoming emails
  imap.on("mail", (numNewMsgs) => {
    console.log(`New email received! (${numNewMsgs} new messages)`);

    // Automatically fetch and process the latest email when a new one arrives
    fetchEmails((err, emails) => {
      if (!err) {
        console.log(`Updated email list with ${emails.length} total emails.`);
      }
    });
  });
});

// IMAP Error Handling
imap.once("error", (err) => {
  console.error("IMAP Error:", err);
});

// IMAP Connection Closed
imap.once("end", () => {
  console.log("IMAP Connection Closed");
});

imap.connect();

module.exports = fetchEmails;
