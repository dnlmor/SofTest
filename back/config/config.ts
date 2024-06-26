import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number | string;
  MONGO_URI: string;
}

const config: Config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || '',
};

export default config;
