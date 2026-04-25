import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import { seedInitialData } from './seed/seedData.js';
import { createApp } from './app.js';

dotenv.config();

const app = createApp();
const PORT = Number(process.env.PORT || 4000);

async function bootstrap() {
  const dbInfo = await connectDatabase();
  await seedInitialData();

  app.listen(PORT, () => {
    console.log(`ShopVridhi API running on http://localhost:${PORT}`);
    console.log(`Database connected (${dbInfo.inMemory ? 'in-memory MongoDB' : 'external MongoDB'})`);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap API', error);
  process.exit(1);
});
