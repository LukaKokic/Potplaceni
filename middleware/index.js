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
  //console.log(creds);
  return creds;
}

//Sing into application
app.get('/fn_login', async(req, res) => {
  const {usr, psswd} = req.query;
  var creds = loginFunction(usr, psswd);
  try{
    //parameters for calling DB function must be in format username:<username> password:<password> in json format
      //console.log("Creds before call: ", JSON.stringify(creds));
      const data = await pool.query(`SELECT api.fn_login('${JSON.stringify(creds)}'::json)`);
      //console.log('DB: ', data.rows[0]['fn_login']);
      res.json(data.rows[0]['fn_login']);
  }catch (err){
      console.error(err);
      res.status(400).send(err.message);
  }
});

//Add new user
app.post('/fn_add_admin', async(req, res) => {
  var reqBody = req.body;
  /* expected body content 
  {
    PIN: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: ''
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_add_admin('${JSON.stringify(reqBody)}'::json)`)
    res.json(response.rows[0]['fn_add_admin']);
    //console.log(response.rows[0]['add_admin']);
  }catch (err){
    res.json(response.rows[0]['fn_add_admin']);
    res.status(400).send("Bad request");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

//exporting function, so it can be called in front-end
module.exports = loginFunction;