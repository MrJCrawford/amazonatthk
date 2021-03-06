import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import uploadRoute from './routes/uploadRoute';
import cors from 'cors';


const connection =  config.MONGODB_CONNECTION;

mongoose.connect(process.env.MONGODB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));


// const mongodbUrl = config.MONGODB_URL;
// mongoose.connect(mongodbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .catch((error) => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});

const { wakeDyno } = require('heroku-keep-awake');
const DYNO_URL = 'https://tinytreasureshk.herokuapp.com/';

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
  wakeDyno(DYNO_URL);
});
