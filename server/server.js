const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const config = require('./config');
const router = require('./router');
console.log(config.dbName);
mongoose.connect(`mongodb://${config.host}:${config.dbPort}${config.dbName}`, {
  auto_reconnect: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('Mongo Connected')).catch(() => console.log('Mongo connection Failed'));


const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1',router);

server.listen(config.serverPort, () => {
  console.log(`Server is up and running on port ${config.serverPort}`);
});
