const express = require('express');
const app = express();

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;
const TaskRouter = require('./Routes/TaskRouter');
const bodyParser = require('body-parser');
const cors = require('cors');

app.get('/', (req, res) => {
    res.send('Hello from the server');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(cors({
    origin: '*', // Allows requests from any origin
}));

app.use(bodyParser.json());
app.use('/tasks', TaskRouter)

app.listen(PORT, () => {
    console.log(`Server is running on PORT=${PORT}`);
})
