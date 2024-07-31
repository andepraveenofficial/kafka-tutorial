// console.log(require("kafkajs"));

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app", // client application

  /*
   * Each Broker is a separate server.
   * Fault tolerance : If one broker is down or becomes unavailable, the client can still connect to the other brokers in the list.
   * Load balancing : By connecting to multiple brokers, the client can distribute its requests across the cluster, improving overall performance and reducing the load on individual brokers.
   * Replication Factor : Kafka uses a replication factor to determine how many copies of the data are maintained across the cluster. The replication factor is configured at the topic level, and it determines how many brokers will maintain a copy of the data for each partition.
   */

  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"], // Multiple Servers
});

// console.log(kafka);

module.exports = kafka;
