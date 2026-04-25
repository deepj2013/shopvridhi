import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import fs from 'node:fs';

let memoryServer;
const DEFAULT_MONGOD_PATH = '/opt/homebrew/opt/mongodb-community@5.0/bin/mongod';

export async function connectDatabase() {
  const externalUri = process.env.MONGODB_URI;
  const uri = externalUri || await getMemoryMongoUri();

  await mongoose.connect(uri, { dbName: 'shopvridhi' });
  return { uri, inMemory: !externalUri };
}

async function getMemoryMongoUri() {
  if (!memoryServer) {
    const systemBinary = process.env.MONGOMS_SYSTEM_BINARY
      || (fs.existsSync(DEFAULT_MONGOD_PATH) ? DEFAULT_MONGOD_PATH : undefined);

    memoryServer = await MongoMemoryServer.create({
      binary: systemBinary
        ? { systemBinary }
        : { version: process.env.MONGOMS_VERSION || '7.0.14' },
      instance: { port: 0 }
    });
  }
  return memoryServer.getUri();
}
