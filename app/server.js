const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express()

dotenv.config();
const PORT = process.env.PORT;

// x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json())

// enable CORS
app.use(cors());

// routes
app.use(require('./routes'))

// setup port
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost/:${PORT}`);
});

