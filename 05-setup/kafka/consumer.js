const client = require("./client");

async function init() {
  const consumer = client.consumer({ groupId: "user-1" });
  try {
    console.log("connect to consumer");
    await consumer.connect({ timeout: 10000 }); // 10 second timeout

    console.log("consumer subscribe the messages");
    await consumer.subscribe({ topic: "my-topic", fromBeginning: true });

    console.log("consumer sending messages to outside.......");
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          console.log({
            topic,
            partition,
            offset: message.offset,
            value: message.value.toString(),
            timestamp: message.timestamp,
          });
          // Process the message here
        } catch (error) {
          console.error(`Error processing message: ${error.message}`, error);
        }
      },
    });
    console.log("consumer successfully sent messages to outside");
  } catch (error) {
    console.error(`[consumer] ${error.message}`, error);
  }
}

module.exports = { init };
