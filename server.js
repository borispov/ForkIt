import app from './src/app';
import config from 'config';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

// Connect MongoDB
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => {
  console.log('Connection to DB successful');
}).catch(err => {
  console.log(`Connection to DB Error: ${err}`);
});

console.log('What is process browser...', process.browser)

const PORT = process.env.PORT || 3000
// run server
app.listen(PORT);
