/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
require('dotenv').config();
const {setGlobalOptions, https} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const { firebaseConfig } = require('firebase-functions/v1');

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.getWeather = onRequest( async(req,res)=>{
  const idToken = req.body.idToken;
  const weekly = req.body.weekly;
  var code = 200;

  //verify token logic (return uid)
  const authApiKey = process.env.AUTH_API_KEY;
  firebaseRequest = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${authApiKey}`;

  const postData = {idToken: idToken};

  firebaseResponse = await fetch(firebaseRequest, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(postData) // Convert the JavaScript object to a JSON string
  })
  if(!firebaseResponse.ok){
    res.status(firebaseResponse.status).send();
    return;
  }
  fbJson = await firebaseResponse.json()
  const uid = fbJson.users[0].localId;

  //get weather logic
  if(uid != undefined){ //continue if token valid
    const weatherApiKey=process.env.PIRATE_WEATHER_API_KEY;
    //get user prefs. using idToken and uid
    //todo get these values from RTDB
    lat = 41.03;
    lng = -111.92;
    units = 'us';

    weatherRequest = `https://api.pirateweather.net/forecast/${weatherApiKey}/${lat},${lng}?&units=${units}`;
    //make api weather call
    if(weekly == "true"){
      //weekly (exclude everything but daily, gives array of 7 days)
      weatherRequest += "&exclude=hourly,minutely,currently,alerts,flags";
    }else{
      //current (exclude everything but currently (and daily for temp high and temp low))
      weatherRequest += `&exclude=hourly,minutely,alerts,flags`;
    }
    weatherResponse = await fetch(weatherRequest);
    json = await weatherResponse.json()
    data = (weekly == "true")?json.daily:{...json.currently,temperatureMax:json.daily.data[0].temperatureMax, temperatureMin: json.daily.data[0].temperatureMin, units: units};
  }
  else{
    code = 401;
    data = {code:"unauthorized"}
  }

  res.status(code).send(data);
});

exports.getTodos = onRequest((req,res)=>{
  const idToken = req.body.idToken;
  var code = 200;

  //verify token logic (return uid)

  if(uid){ //continue if token valid
    //get a key-value object of todos from database
  }

  res.status(code).send();
});

exports.addTodo = onRequest((req,res)=>{
  const idToken = req.body.idToken;
  const item = req.body.idToken;
  var code = 200;

  //verify token logic (return uid)

  if(uid){ //continue if token valid
    //add item to the database, give it a new id
  }

  res.status(code).send();
});

exports.removeTodo = onRequest((req,res)=>{
  const idToken = req.body.idToken;
  const itemId = req.body.itemId;
  var code = 200;

  //verify login logic (return uid)

  if(uid){ //continue if token vaild
    //get todos, compare ids with given one. If there's a match get rid of it and update database
    //return updated todos
  }

  res.status(code).send();
});