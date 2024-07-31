const client = require("./client");

async function init() {
  console.log("create admin");
  const admin = client.admin();
  try {
    console.log("connect to admin");
    await admin.connect();
    console.log("create topic");
    await admin.createTopics({
      /*
        numPartitions: The number of partitions for this topic. In this case, we're setting it to 4. Partitions are essentially parallel streams of data within a topic. Having multiple partitions allows for better load balancing and scalability.
        replicationFactor: The number of copies of each partition that should be maintained across the Kafka cluster. In this case, we're setting it to 3. This means that each partition will be replicated across 3 brokers, providing higher durability and fault tolerance.
     */
      topics: [
        {
          topic: "my-topic", // topic name
          numPartitions: 4, // Increased partitions for better load balancing
          replicationFactor: 3, // Increased replication factor for higher durability
          replicaAssignment: [
            {
              partition: 0,
              replicas: [0, 1, 2],
            },
            {
              partition: 1,
              replicas: [1, 2, 0],
            },
            {
              partition: 2,
              replicas: [2, 0, 1],
            },
            {
              partition: 3,
              replicas: [0, 1, 2],
            },
          ],
          validateOnly: false,
        },
      ],
    });
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await admin.disconnect();
  }
}

module.exports = { init };
