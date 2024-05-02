import { app } from './src/app';
import { AppDataSource } from './src/ormconfig';

async function run() {
  try {
    await AppDataSource.initialize();
  } catch (e) {
    console.log('Failed to connect to database', e);
  }
  const PORT = parseInt(process.env.PORT as string, 10);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

run()
  .then(() => console.log('Running'))
  .catch((e) => console.log('Error', e));
