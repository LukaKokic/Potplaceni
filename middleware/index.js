const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const pool = require('./DBConfig');
const passwordHasher = require('./passwordhassher');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const port = 8080;
//gnowbwsrptchujab 
const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth:{
    user: process.env.nodeMailerAcc,
    pass: process.env.nodeMailerPass,
  },
};

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

//funciton that sends mail to the patient
function notifyPatient(patientData, onError = null){
  if (onError != null){
    console.log("Could not plan");
    const mailData = {
      from: process.env.nodeMailerAcc,
      to: onError,
      subject: 'Medical tourism plan - could not be realised',
      text: `We are so sorry but your medical tourism plan could not be realised!
      In return we are giving you a voucher!`
    };
    const mailTransporter = nodemailer.createTransport(config);
    mailTransporter.sendMail(mailData, (err, info) => {
      if (err) console.log(err);
    });

  }else{
    const mailData = {
      from: process.env.nodeMailerAcc,
      to: patientData['mail'],
      subject: 'Medical tourism plan',
      text: `Dear ${patientData['lName']},
      Your medical treatment "${patientData['tName']}" has been organised! 
      We have booked, according to your preferences, an accommodation located at ${patientData['accAddress']} (${patientData['accLat']}, ${patientData['accLong']}) from: ${patientData['datefrom']} till: ${patientData['dateto']}. Your treatment is planned on ${patientData['treatmentDateTime']} starting from: ${patientData['treatmentTimeStart']} and ending at: ${patientData['treatmentTimeEnd']} in clinic "${patientData['cName']}". The address of the clinic is: ${patientData['cAddress']} (${patientData['cLat']}, ${patientData['cLong']}).
      Transport has been aranged to come and pick you up from your accommodation on ${patientData['treatmentDateTime']} at 07:00:00 and transport you to the clinic. After your treatment, there will be a transport waiting for you in front of a clinic. For the day of your treatment, you will be transported by a vehicle with registraion: ${patientData['transportReg']}. If there are any probles you can contact transporter by calling: ${patientData['transporterContact']}.
      Thank you for choosing DentALL, and we hope you have a pleasent stay!`
    };
    const mailTransporter = nodemailer.createTransport(config);
    mailTransporter.sendMail(mailData, (err, info) => {
      if (err) console.log(err);
    });
  }
  return;
}

//funciton that sends mail to the transporter
function notifyTransporter(transporterData){
  const mailData = {
    from: process.env.nodeMailerAcc,
    to: transporterData['mail'],
    subject: 'Organised transport of a patient',
    text: `You are transporting ${transporterData['pName']} ${transporterData['pLName']} on ${transporterData['dateOfTreatment']} from ${transporterData['startingPoint']} to ${transporterData['destination']}.
    You need to pick them up from their accommodation at ${transporterData['timeMorning']} and also from clinic at ${transporterData['timeNoon']}.
    Booked vehicle with registration: ${transporterData['rgistration']}.
    If there are any delays or problems you can contact ${transporterData['pLName']} by calling: ${transporterData['pContact']}.
    DentALL thanks you for cooporation!`
  };
  const mailTransporter = nodemailer.createTransport(config);
  mailTransporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err);
  });
  return;
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

//GET JSON containing all entries in patient table
app.get('/view_patients', async(req, res) => {
  try{
    var response = await pool.query('SELECT api.fn_view_patients()');
    res.json(response.rows[0]['fn_view_patients']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//GET JSON containing all entries in PatietnPlan table corresponding to a selected patient
app.get('/view_patient_treatment/:patientID', async(req, res) => {
  patID = req.params.patientID;
  getParams = {
    "id": patID
  };
  try{
    var response = await pool.query(`SELECT api.fn_view_patient_treatment('${JSON.stringify(getParams)}'::json)`);
    res.json(response.rows[0]['fn_view_patient_treatment']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//returns JSON containing accommodation equipped info(id, description)
app.get('/get_accommodation_equipped_info', async(req, res) => {
  try{
    var response = await pool.query('SELECT fn_get_equipped()');
    res.json(response.rows[0]['fn_get_equipped']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//returns JSON containing accommodation type info(id, description)
app.get('/get_accommodation_type_info', async(req, res) => {
  try{
    var response = await pool.query('SELECT fn_get_accommodation_types()');
    res.json(response.rows[0]['fn_get_accommodation_types']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//returns JSON containing roles info (id, rolename)
app.get('/get_roles_info', async(req, res) => {
  try{
    var response = await pool.query('SELECT fn_get_roles()');
    res.json(response.rows[0]['fn_get_roles']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//returns JSON containing town info (id, townname)
app.get('/get_towns_info', async(req, res) => {
  try{
    var response = await pool.query('SELECT fn_get_towns()');
    res.json(response.rows[0]['fn_get_towns']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//returns JSON containing treatment info (id, treatmentname, description)
app.get('/get_treatments_info', async(req, res) => {
  try{
    var response = await pool.query('SELECT fn_get_treatments()');
    res.json(response.rows[0]['fn_get_treatments']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//returns JSON containing vehicle type info (typeid, description)
app.get('/get_vehicle_type_info', async(req, res) => {
  try{
    var response = await pool.query('SELECT fn_get_vehicle_types()');
    res.json(response.rows[0]['fn_get_vehicle_types']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//returns JSON containing clinic info (id, clinicname)
app.get('/get_clinics_info', async(req, res) => {
  try{
    var response = await pool.query('SELECT fn_get_clinics()');
    res.json(response.rows[0]['fn_get_clinics']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//returns JSON containing last recorded realestateID (id)
app.get('/get_last_used_realestate_id', async(req, res) => {
  try{
    var response = await pool.query('SELECT fn_get_last_realestate_id()');
    res.json(response.rows[0]['fn_get_last_realestate_id']);
  }catch (err){
    res.status(400).send(err.message);
  }
});

//################################################################# GET methods #################################################################

//################################################################# POST methods ################################################################

//Add new user
app.post('/add_admin', async(req, res) => {
  var reqBody = req.body;
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
  try{
    var response = await pool.query(`SELECT api.fn_add_transporter_vehicle('${JSON.stringify(transVehicle)}')::json`);
    res.json(response.rows[0]['fn_add_transporter_vehicle']);
  }catch(err){
    res.status(400).send(err.message);
  }
});

//Updates vehicle avaliability, selected by vehicleID
app.post('/update_vehicle_avaliability', async(req, res) => {
  var vehicle_update = req.body;
  try{
    var response = await pool.query(`SELECT api.fn_update_vehicle_avaliability('${JSON.stringify(vehicle_update)}')::json`);
    res.json(response.rows[0]['fn_update_vehicle_avaliability']);
  }catch(err){
    res.status(400).send(err.message);
  }
});

//Deletes selected vehicle, selected by vehicleID
app.post('/delete_transporter_vehicle', async(req, res) => {
  var vehicle_ID = req.body;
  try{
    var response = await pool.query(`SELECT api.fn_delete_transporter_vehicle('${JSON.stringify(vehicle_ID)}')::json`);
    res.json(response.rows[0]['fn_delete_transporter_vehicle']);
  }catch(err){
    res.status(400).send(err.message);
  }
});

//Add patient
app.post('/add_patient', async(req, res) => {
  var patientData = req.body;
  var patientMail = patientData['mail'];
  //console.log("PatientMail", patientMail);
  // var subresponse = await pool.query('SELECT public.fn_get_patient_mail_info_by_id(3)');
  // notifyPatient(subresponse.rows[0]['fn_get_patient_mail_info_by_id']);
  try{
    var response = await pool.query(`SELECT api.fn_add_patient('${JSON.stringify(patientData)}')::json`);
    if (response.rows[0]['fn_add_patient']['success']){
      var patID = response.rows[0]['fn_add_patient']['id'];
      //console.log("PatientID", patID);
      var patientSubresponse = await pool.query(`SELECT public.fn_get_patient_mail_info_by_id(${patID})`);
      var transporterSubresponse = await pool.query(`SELECT public.fn_get_transporter_mail_info_by_id(${patID})`);
      if (patientSubresponse.rows[0]['fn_get_patient_mail_info_by_id'] != null && transporterSubresponse.rows[0]['fn_get_transporter_mail_info_by_id'] != null){
        //console.log("PAtient MAIL: ", patientSubresponse.rows[0]['fn_get_patient_mail_info_by_id']);
        //console.log("Transporter MAIL: ", transporterSubresponse.rows[0]['fn_get_transporter_mail_info_by_id']);
        notifyPatient(patientSubresponse.rows[0]['fn_get_patient_mail_info_by_id']);
        notifyTransporter(transporterSubresponse.rows[0]['fn_get_transporter_mail_info_by_id']);
        res.json(response.rows[0]['fn_add_patient']);
      }else{
        console.log("Calling notifyPatient with: ", patientMail);
        notifyPatient(null, patientMail);
        //console.log("Could not book accommodation or transport, so sorry, here is a voucher!");
        res.json({"success": false, "msg": "Could not book accommodation or transport, so sorry, here is a voucher!"});
      }
    }else{
      res.json(response.rows[0]['fn_add_patient']);
    }
  }catch(err){
    res.status(400).send(err.message);
  }
  // res.status(200).send({"message": "Cool!"});
});

//Deletes selected patient, selected by patientid
app.post('/delete_patient', async(req, res) => {
  var patient_ID = req.body;
  try{
    var response = await pool.query(`SELECT api.fn_delete_patient('${JSON.stringify(patient_ID)}')::json`);
    res.json(response.rows[0]['fn_delete_patient']);
  }catch(err){
    res.status(400).send(err.message);
  }
});
//################################################################# POST methods ################################################################

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  //setInterval(createTreatmentPlan, 300000); //adjust time so that it doesn't break render but also doesn't let middleware to spin down
});

//exporting function, so it can be called in front-end
module.exports = loginFunction;