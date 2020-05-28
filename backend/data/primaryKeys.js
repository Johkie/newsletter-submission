var fs = require('fs');

// Inte säkert eller optimalt, men funkar fint så länge datan inte är broken!
module.exports =  {
    getNewUserPK: async function() { 
        fs.readFile(__dirname + "/users.json", (err, data) => {
            if(err) throw err;

            let latestUser = JSON.parse(data).pop();
            let id = latestUser.id + 1;

            console.log(id);
            return id;
        });
    }
}