const express = require('express');
const dotenv = require('dotenv');
const pool = require('./DBConfig');
const cors = require('cors');
dotenv.config();
//const poolParameters = require('databaseConnection.json')
const app = express();
app.use(express.json());
app.use(cors());
const port = 8080;


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/useradmin', async(req, res) => {
    try{
        const data = await pool.query('SELECT now()');
        res.json({data});
    }catch (err){
        console.error(err);
        res.status(500).send(err.message);
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});