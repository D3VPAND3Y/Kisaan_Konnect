const express = require('express');
const app = express();
const port = 3000;
const {dbConnect} = require('./db');
const cors = require('cors');
const {userRoute} = require('./controllers/auth_controller')
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.use("/user", userRoute);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
