import {ConsumerConfig, SimpleConsumer} from "../src";

const rdkafka = require("node-rdkafka")
const rdkafkaConsumer = rdkafka.KafkaConsumer;

const consumerConfig = new ConsumerConfig("localhost", "9092", "hello-world");

const consumer = new SimpleConsumer()
  .create(rdkafkaConsumer, ["hello-world"], consumerConfig)
  .onMessage(({topic, key, value}) =>
    console.log("Rec'd", topic.toString(), key.toString(), value.toString()))
  .connect()

