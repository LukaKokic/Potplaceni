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
  return creds;
}

//Sing into application
app.get('/login', async(req, res) => {
  const {usr, psswd} = req.query;
  var creds = loginFunction(usr, psswd);
  try{
    //parameters for calling DB function must be in format username:<username> password:<password> in json format
      var data = await pool.query(`SELECT api.fn_login('${JSON.stringify(creds)}'::json)`);
      res.json(data.rows[0]['fn_login']); //data from response of a function is always stored in <variableName>.rows[0]['name-of-function-in-DB']
  }catch (err){
      console.error(err);
      res.status(400).send(err.message);
  }
});

//Add new user
app.post('/add_admin', async(req, res) => {
  var reqBody = req.body;
  /* expected body content 
  {
    "PIN": "",
    "firstname": "",
    "lastname": "",
    "phone": "",
    "email": ""
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_add_admin('${JSON.stringify(reqBody)}'::json)`);
    res.json(response.rows[0]['fn_add_admin']);
  }catch (err){
    res.json(response.rows[0]['fn_add_admin']);
    res.status(400).send("Bad request");
  }
});

//Sends JSON containing all entries in useradmin table
app.get('/view_admins', async(req, res) => {
  try{
    var response = await pool.query('SELECT api.fn_view_admins()');
    res.json(response.rows[0]['fn_view_admins']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//Updates phone, email and role/roles of a selected user, selected by userID
app.post('/update_admin_info', async(req, res) => {
  var new_admin_info = req.body;
  /*  expected body content
  {
    "userID": "",
    "phone": "",
    "email": "",
    "roleList": []
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_update_admin_info('${JSON.stringify(new_admin_info)}')::json`);
    res.json(response.rows[0]['fn_update_admin_info']);
  }catch(err){
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

//Changes the password of selected user, selected by userID
app.post('/change_password', async(req, res) => {
  var new_password = req.body;
  /*  expected body content
  {
    "userID": "",
    "pass": ""
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_change_password('${JSON.stringify(new_password)}')::json`);
    res.json(response.rows[0]);
  }catch(err){
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

//exporting function, so it can be called in front-end
module.exports = loginFunction;