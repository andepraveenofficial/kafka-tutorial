const client = require("./client");

async function init() {
  const producer = client.producer({
    acks: "all", // Wait for all replicas to acknowledge the message
  });

  try {
    console.log("Connect to producer");
    await producer.connect({ timeout: 10000 }); // Add a timeout to the connection attempt

    console.log("Send messages");
    await producer.send({
      topic: "my-topic",
      messages: [
        {
          key: "user-praveen-update",
          value: JSON.stringify({ name: "Ande Praveen", age: 28 }),
        },
        {
          key: "user-prabhas-update",
          value: JSON.stringify({ name: "Prabhas", age: 43 }),
        },
      ],
    });

    console.log("Messages sent successfully");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await producer.disconnect();
    console.log("Producer disconnected successfully");
  }
}

module.exports = { init };
