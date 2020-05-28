var path    = require('path')
var salt    = "DotaIsBetterThanLolAndThatsThe(T)"; // Här ska den inte vara, men smidigt!

var express = require('express');
var fs      = require('fs');
var Ajv     = require('ajv')
var router  = express.Router();
var CryptoJS = require('crypto-js');

// Selfmade stuff
var rootDir = path.join(__dirname, '..');
var schemas = require(`${rootDir}/data/schemas`);



/* GET user login */
router.get('/login', function(req, res, next) {

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
        res.status(404).send({message: "username or password incorrect!"});
      }
    }
    else {
      res.status(404).send({message: "username or password incorrect!"});
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
      res.status(500).send(ajv.errors); 
      return;
    }
    
    // Check if user already exists. If it does send back errormsg
    if (users.find(u => u.userName == newUser.userName)) {
      res.status(500).send({message: "User already exists"}); 
      return;
    }
    
    // Hash and salt the password
    newUser.password = CryptoJS.AES.encrypt(newUser.password, salt).toString();
    console.log(newUser.password);

    // Append the new user
    users.push(newUser)

    // Stringify data before updating the file
    let updatedUsers = JSON.stringify(users, null, 2); 

    // Write to file
    fs.writeFile(usersFilePath, updatedUsers, (err) => { 
        if(err) throw err;
        res.send("User has beend added!");
    });
  });
});

module.exports = router;
