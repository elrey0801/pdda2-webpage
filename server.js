import app from './src/app.js';

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
    console.log(`App is running on port ${PORT} of ${HOST}`);
  })