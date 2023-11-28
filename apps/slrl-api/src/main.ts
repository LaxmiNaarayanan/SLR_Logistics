import { connect } from 'mongoose';
import express, { json } from 'express';
import * as path from 'path';
import { userRoute } from './user.route';

const app = express();
await connect(process.env['DB_CONNECTION_STRING'] ?? '', {
  dbName: 'slrl_db'
})

app.use(json({ limit: "1mb" }));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to slrl-api!' });
});

userRoute(app)

const port = process.env['PORT'] || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
