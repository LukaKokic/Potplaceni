const express = require('express');
require('dotenv').config();
const pool = require('./DBConfig');
const passwordHasher = require('./passwordhassher');
const cors = require('cors');
const app = express();



app.use(express.json());
app.use(cors());

const port = 8080;


//TODO connect this to front and greet user with login page
app.get('/', (req, res) => {
  res.send('Hello World')
});

//function do be called when login button has been pressed
function loginFunction(username, password){
  var creds = {
    'username' : '',
    'password' : ''
  };

  hashedPassword = passwordHasher(password);
  creds['username'] = username;
  creds['password'] = hashedPassword;
  console.log(creds);
  return creds;
}

app.post("/temp_login", async (req, res) => {
  //let receivedData = req.body['data'];
  //console.log(receivedData);
  //var temp = JSON.parse(receivedData['data'])
  //console.log(temp['username']);
  res.redirect(req, '/fn_login');
})

app.get('/fn_login', async(req, res) => {
  // let receivedData = req.body['data'];
  // var temp = JSON.parse(receivedData);
  //var creds = loginFunction(temp['username'], temp['password']);
  var creds = loginFunction('KB9012', '56789012');
  //console.log("GET: ", receivedData);
  try{
    //parameters for calling DB function must be in format username:<username> password:<password> in json format
      const data = await pool.query(`SELECT api.fn_login('${JSON.stringify(creds)}'::json)`);
      //console.log('DB response: ', data);
      res.json({data});
  }catch (err){
      console.error(err);
      res.status(500).send(err.message);
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  //console.log('Pool: ', pool);
  //loginFunction('KB9012', '56789012');
});

//exporting function, so it can be called in front-end
module.exports = loginFunction;