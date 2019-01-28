const ioredis = require('ioredis');

const redisClient = new ioredis('redis://redis:6379');

redisClient.on('error', error => console.log(`Connect redis error: ${error}`));

class RedisClient {
   set(key, value) {
      console.log(`Redius set ${key} value: ${value}`);
      redisClient.set(key, value);
   }

   get(key, callback = {}) {
      console.log(`Redius get ${key}`);
      redisClient.get(key, (error, result) => {
         callback(error, result);
      });
   }

   del(key) {
      redisClient.del(key);
   }
}

export default new RedisClient();
