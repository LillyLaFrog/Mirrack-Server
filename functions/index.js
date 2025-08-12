/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

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

exports.helloWorld = onRequest((request, response) => {
    console.log(request);
  response.status(200).send("Hello "+request.body.name+"! This is from Firebase!");
});

exports.signUp = onRequest((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var code = 200; //start asumming no error, change if error occurs

  //sign up logic

  res.status(code).send();
});

exports.login = onRequest((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var code = 200; //start asumming no error, change if error occurs

  //log in logic

  res.status(code).send();
});

exports.refresh = onRequest((req,res)=>{
  const refreshToken = req.body.refreshToken;
  var code = 200;

  //refresh token logic

  res.status(code).send();
});

exports.getWeather = onRequest((req,res)=>{
  const idToken = req.body.idToken;
  const weekly = req.body.weekly;
  var code = 200;

  //verify token logic (return uid)

  //get weather logic
  if(uid){ //continue if token valid
    //get user prefs.

    //make api call
    if(weekly){
      //weekly api call

    }else{
      //current api call

    }
  }

  res.status(code).send();
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