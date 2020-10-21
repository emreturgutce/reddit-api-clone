import { RedisClient } from 'redis';
import { promisify } from 'util';

interface RedisActions {
  sadd: (key: string, val: string) => boolean;
  smembers: (key: string) => Promise<string[]>;
}

class Redis {
  readonly client: RedisClient;

  readonly actions: RedisActions;

  constructor() {
    this.client = new RedisClient({});
    this.onConnect();
    this.onError();
    this.actions = this.initializeActions();
  }

  private initializeActions(): RedisActions {
    return {
      smembers: (key) => {
        const smembersAsync = promisify(this.client.smembers).bind(this.client);
        return smembersAsync(key);
      },
      sadd: (key, val) => this.client.sadd(key, val),
    };
  }

  private onConnect() {
    return this.client.on('connect', () => {
      console.log('👹 Connected to Redis'.red.bold);
    });
  }

  private onError() {
    return this.client.on('error', (err) => {
      console.error('err'.red);
    });
  }
}

const redis = new Redis();

export { redis };
