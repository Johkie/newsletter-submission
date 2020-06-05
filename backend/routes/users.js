var salt    = "DotaIsBetterThanLolAndThatsThe(T)"; // Här ska den inte vara, men smidigt!
var path    = require('path')

var express = require('express');
var fs      = require('fs');
var Ajv     = require('ajv')
var router  = express.Router();
var CryptoJS = require('crypto-js');

// Selfmade stuff
var rootDir = path.join(__dirname, '..');
var schemas = require(`${rootDir}/data/schemas`);

router.get('/:id', function(req, res, next) {
  fs.readFile(rootDir + "/data/users.json", (err, data) => {
    if(err) throw err;

    let userId = req.params.id;

    // Parse userdata
    let users = JSON.parse(data);
    let user = users.find(u => u.id == userId);

    res.send(user);
  });
});

/* GET user login */
router.post('/login', function(req, res, next) {

  fs.readFile(rootDir + "/data/users.json", (err, data) => {
    
    if (err) throw err;
    
    // Build login object
    let loginDetails = {
      userName: req.body.userName,
      password: req.body.password
    };

    // Get schema and schema validator
    let schema  = schemas.getLoginSchema();
    let ajv     = new Ajv();
    
    // Check if data is valid against the schema. If not send back errormsg.
    if (!ajv.validate(schema, loginDetails)) {
      res.status(500).send(ajv.errors); 
      return;
    }

    // Try to find the user by provided name. 
    let users = JSON.parse(data);
    let user  = users.find(u => u.userName == loginDetails.userName);
   
    if (user) {

      // Decrypt password and check if password matches
      let pw = CryptoJS.AES.decrypt(user.password, salt).toString(CryptoJS.enc.Utf8);
      let isValidLogin = (pw == loginDetails.password) ? true : false;
      
      if(isValidLogin) {
          res.send(user);
      }
      else {
        res.send({message: "username or password incorrect!"});
      }
    }
    else {
      res.send({message: "username or password incorrect!"});
    }
  })
});

/* POST new user */
router.post('/', async function(req, res, next) {
  
  fs.readFile(rootDir + "/data/users.json", (err, data) => {
    
    if(err) throw err;

    // Parse userdata
    let users = JSON.parse(data);

    // If users exists, take the latest id and add 1. Else just return 1.
    newId = (users.length != 0) ? (users[users.length -1].id + 1) : 1;
    
    // Build newuser
    let newUser = {
      id: newId,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      newsletterSub: req.body.newsletterSub
    }

    // Get schema and schema validator
    let schema = schemas.getUserSchema();
    let ajv = new Ajv();

    // Check if userdata is valid against the schema. If not send back errormsg.
    if (!ajv.validate(schema, newUser)) {
      res.send(ajv.errors); 
      return;
    }
    
    // Check if user already exists. If it does send back errormsg
    if (users.find(u => u.userName == newUser.userName)) {
      res.send({message: "User already exists"}); 
      return;
    }
    
    // Hash and salt the password
    newUser.password = CryptoJS.AES.encrypt(newUser.password, salt).toString();

    // Append the new user
    users.push(newUser)

    // Stringify data before updating the file
    let updatedUsers = JSON.stringify(users, null, 2); 

    // Write to file
    fs.writeFile(rootDir + "/data/users.json", updatedUsers, (err) => { 
        if(err) throw err;
        res.send({message: "User has beend added!"});
    });
  });
});

router.put('/:id/subscriber', function(req, res, next) {
  let userId = req.params.id;
  let newUserData = req.body;
  
  // Get schema and schema validator
  let schema = schemas.getSubChangeSchema();
  let ajv = new Ajv();

  // Check if userdata is valid against the schema. If not send back errormsg.
  if (!ajv.validate(schema, newUserData)) {
    res.send(ajv.errors); 
    return;
  }

  // Check if IDs are correct
  if (newUserData.id == userId) {
    fs.readFile(rootDir + "/data/users.json", (err, data) => {
      if(err) throw err;
      
      // Parse userdata
      let users = JSON.parse(data);

      // Find the user and update the field
      let user = users.find(u => u.id == userId);
      user.newsletterSub = newUserData.newsletterSub;
      user.email = newUserData.email;

      // Stringify data before updating the file
      let updatedUsers = JSON.stringify(users, null, 2); 

      // Write to file
      fs.writeFile(rootDir + "/data/users.json", updatedUsers, (err) => { 
          if(err) throw err;
          res.send({ message: "User has beend updated!", sucessful: true });
      });
    });
  }
  else {
    res.send({ message: "IDs didnt match!" });
  }
});

module.exports = router;
