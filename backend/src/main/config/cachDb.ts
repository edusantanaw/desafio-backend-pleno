import { createClient } from "redis";

const client = createClient({
  url: "redis://redis:6379",
});
client.connect().catch((err) => {
  console.log(err);
  throw err;
});

export default client;
