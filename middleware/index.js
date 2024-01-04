const express = require('express');
require('dotenv').config();
const pool = require('./DBConfig');
const passwordHasher = require('./passwordhassher');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const port = 8080;

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

//################################################################# GET methods #################################################################

//TODO connect this to front and greet user with login page
app.get('/', (req, res) => {
  res.send('Why are you here?, thi is not the fancy front page, this is crude, harsh BACKEND')
});

//Sing into application
app.get('/login', async(req, res) => {
  const {usr, psswd} = req.query;
  var creds = loginFunction(usr, psswd);
  try{
    //parameters for calling DB function must be in format username:<username> password:<password> in json format
      var data = await pool.query(`SELECT api.fn_login('${JSON.stringify(creds)}'::json)`);
      res.json(data.rows[0]['fn_login']); //data from response of a function is always stored in <variableName>.rows[0]['name-of-function-in-DB']
  }catch (err){
      res.status(400).send(err.message);
  }
});

//GET JSON containing all entries in useradmin table
app.get('/view_admins', async(req, res) => {
  try{
    var response = await pool.query('SELECT api.fn_view_admins()');
    res.json(response.rows[0]['fn_view_admins']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//GET JSON containing all entries in accommodation table
app.get('/view_accommodations', async(req, res) => {
  try{
    var response = await pool.query('SELECT api.fn_view_accommodations()');
    res.json(response.rows[0]['fn_view_accommodations']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//GET JSON containing all entries in transporter table
app.get('/view_transporters', async(req, res) => {
  try{
    var response = await pool.query('SELECT api.fn_view_transporters()');
    res.json(response.rows[0]['fn_view_transporters']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//GET JSON containing all entries in vehicle table corresponding to a selected transporter
app.get('/view_transporter_vehicles/:transporterID', async(req, res) => {
  transID = req.params.transporterID;
  getParams = {
    "transporterID": transID
  };
  try{
    var response = await pool.query(`SELECT api.fn_view_transporter_vehicles('${JSON.stringify(getParams)}'::json)`);
    res.json(response.rows[0]['fn_view_transporter_vehicles']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//################################################################# GET methods #################################################################

//################################################################# POST methods ################################################################

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
    res.status(400).send("Bad request");
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
    res.json(response.rows[0]['fn_change_password']);
  }catch(err){
    res.status(400).send(err.message);
  }
});

//Deletes selected user, selected by userID
app.post('/delete_admin', async(req, res) => {
  var userID = req.body;
  /*  expected body content
  {
    "userID": ""
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_delete_admin('${JSON.stringify(userID)}')::json`);
    res.json(response.rows[0]['fn_delete_admin']);
  }catch(err){
    res.status(400).send(err.message);
  }
});

//TODO add delete for multiple admins


//Add accommodation
app.post('/add_accommodation', async(req, res) => {
  var accomodation = req.body;
  /*  expected body content
  {
    "realEstateID": "",
    "typeID": ,
    "equippedID": ,
    "latitude": "",
    "longitude": "",
    "address": "",
    "townID": "",
    "active": ,
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_add_accommodation('${JSON.stringify(accomodation)}')::json`);
    res.json(response.rows[0]['fn_add_accommodation']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//Updates accommodation avaliability, selected by accommodationID
app.post('/update_accommodation_avaliability', async(req, res) => {
  var accommodation_update = req.body;
  /*  expected body content
  {
    "id": ,
    "avaliable": 
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_update_accommodation_avaliability('${JSON.stringify(accommodation_update)}')::json`);
    res.json(response.rows[0]['fn_update_accommodation_avaliability']);
  }catch(err){
    res.status(400).send(err.message);
  }
});

//Deletes selected accommodation, selected by accommodationID
app.post('/delete_accommodation', async(req, res) => {
  var accommodation_ID = req.body;
  /*  expected body content
  {
    "id": 
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_delete_accommodation('${JSON.stringify(accommodation_ID)}')::json`);
    res.json(response.rows[0]['fn_delete_accommodation']);
  }catch(err){
    res.status(400).send(err.message);
  }
});

//Add accommodation
app.post('/add_transporter', async(req, res) => {
  var transporter = req.body;
  /*  expected body content
  {
    "orgName": "",
    "contact": "",
    "address": "",
    "townID": "",
    "active": 
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_add_transporter('${JSON.stringify(transporter)}')::json`);
    res.json(response.rows[0]['fn_add_transporter']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//Deletes selected transporter, selected by transporterID
app.post('/delete_transporter', async(req, res) => {
  var transporter_ID = req.body;
  /*  expected body content
  {
    "id": 
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_delete_transporter('${JSON.stringify(transporter_ID)}')::json`);
    res.json(response.rows[0]['fn_delete_transporter']);
  }catch(err){
    res.status(400).send(err.message);
  }
});

//Add transporter vehicle
app.post('/add_transporter_vehicle', async(req, res) => {
  var transVehicle = req.body;
  /*  expected body content
  {
    "registration": "",
    "capacity": "",
    "type": "",
    "brand": "",
    "model": "",
    "transporter_id": "",
    "active": 
  }
  */
  try{
    var response = await pool.query(`SELECT api.fn_add_transporter_vehicle('${JSON.stringify(transVehicle)}')::json`);
    res.json(response.rows[0]['fn_add_transporter_vehicle']);
  }catch(err){
    res.status(400).send(err.message);
  }
})

//################################################################# POST methods ################################################################

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

//exporting function, so it can be called in front-end
module.exports = loginFunction;