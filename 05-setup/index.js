const adminModule = require("./kafka/admin");
const producerModule = require("./kafka/producer");
const consumerModule = require("./kafka/consumer");

async function main() {
  try {
    // Run admin operations
    console.log("\nRunning admin operations...");
    await adminModule.init();

    // Run producer
    console.log("\nRunning producer...");
    await producerModule.init();

    // Run consumer
    console.log("\nStarting consumer...");
    await consumerModule.init();

    // Keep the script running to observe consumer messages
    console.log("Press Ctrl+C to exit.");
  } catch (error) {
    console.error("Kafka demo error:", error);
  }
}

main().catch((error) => console.error("Initialization error:", error));
