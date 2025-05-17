# Setup

## Kafka with Nodejs

1. Create NodeJS Environment
2. Add Kafka : `npm install kafkajs`

### Steps to write kafka code

1. create kafka client

   - Each Broker is a separate server.
   - Fault tolerance : If one broker is down or becomes unavailable, the client can still connect to the other brokers in the brokers list.
   - Load balancing : By connecting to multiple brokers, the client can distribute its requests across the cluster, improving overall performance and reducing the load on individual brokers.
   - Replication Factor : Kafka uses a replication factor to determine how many copies of the data are maintained across the cluster. The replication factor is configured at the topic level, and it determines how many brokers will maintain a copy of the data for each partition.

```js client.js
const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app", // client application
  brokers: ["localhost:9092", "localhost:9093", "localhost:9094"], // Multiple servers
});

module.exports = kafka;
```

2.  Create Admin & Create Topic
    - numPartitions: The number of partitions for this topic. In this case, we're setting it to 4. Partitions are essentially parallel streams of data within a topic. Having multiple partitions allows for better load balancing and scalability.
    - replicationFactor: The number of copies of each partition that should be maintained across the Kafka cluster. In this case, we're setting it to 3. This means that each partition will be replicated across 3 brokers, providing higher durability and fault tolerance.

```js admin.js
const client = require("./client");

async function init() {
  console.log("create admin");
  const admin = client.admin();
  try {
    console.log("connect to admin");
    await admin.connect();
    console.log("create topic");
    await admin.createTopics({
      topics: [
        {
          topic: "my-topic", // topic name
          numPartitions: 4, // Increased partitions for better load balancing
          replicationFactor: 3, // Increased replication factor for higher durability
          replicaAssignment: [
            // all partitions will have the same data.
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
```

3. Produce the messages
4. Subscribe the messages
5. Use the messages

### Installation

- `npm install`

### Start the Application

- Run the `docker-compose` file

- Production : `npm start`
- Development : `npm run dev`
