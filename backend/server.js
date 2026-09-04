const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

connectDB()

const PORT = process.env.PORT;

app.listen(PORT , () => {

    console.log(`Server is runnning on port: ${PORT}`)

})