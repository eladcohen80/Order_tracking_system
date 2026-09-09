import app from './app';
import sql from './db';

const startServer = async () => {
  await sql`ALTER TABLE orders ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'Pending'`;
  await sql`UPDATE orders SET status = CASE WHEN received THEN 'Received' ELSE 'Pending' END WHERE status = 'Pending'`;
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to initialize order status:', error);
  process.exitCode = 1;
});