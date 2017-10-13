# kafka-typescript

Typescript wrapper for [node-rdkafka](https://github.com/Blizzard/node-rdkafka).

Intended to make it easier to quickly create topic consumers and producers for Apache Kafka.

Inspiration drawn from Kafka's Java API and Confluent.

## Usage

Start Zookeeper and Kafka:
```bash
confluent start
```

Producer:
```typescript
import {IProducerConfig, ProducerConfig, SimpleProducer} from "kafka-typescript"

const rdkafka = require("node-rdkafka")
const rdkafkaProducer = rdkafka.Producer

const producers: { [topic: string]: SimpleProducer } = {}

const createTopicProducer = async (topic: string, config: IProducerConfig) => {
  const prod = await new SimpleProducer().create(rdkafkaProducer, config)
                                         .connect()
  prod.setTopic(topic);
  producers[topic] = prod
  return prod
}

createTopicProducer("hello-world", new ProducerConfig("localhost", "9092"))
.then(x => {
  producers["hello-world"].send("1", new Buffer("hello"));
}).catch(err => console.error(err))
```

Consumer:
```typescript
import {ConsumerConfig, SimpleConsumer} from "kafka-typescript";

const rdkafka = require("node-rdkafka")
const rdkafkaConsumer = rdkafka.KafkaConsumer;

const consumerConfig = new ConsumerConfig("localhost", "9092", "hello-world-group");

const consumer = new SimpleConsumer()
  .create(rdkafkaConsumer, ["hello-world"], consumerConfig)
  .onMessage(({topic, key, value}) =>
    console.log("Rec'd", topic.toString(), key.toString(), value.toString()))
  .connect()
  
=> "Rec'd hello-world 1 hello"
```
