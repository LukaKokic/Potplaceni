const express = require('express');
const dotenv = require('dotenv');
const pool = require('./DBConfig');
dotenv.config();
//const poolParameters = require('databaseConnection.json')
const app = express();
app.use(express.json());

const port = 8080;


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/useradmin', async(req, res) => {
    try{
        const data = await pool.query('SELEECT now()');
        res.json({data});
    }catch (err){
        console.error(err);
        res.status(500).send(err.message);
    }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});