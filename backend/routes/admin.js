var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended : true});

var fs      = require('fs');
var path    = require('path')

var rootDir = path.join(__dirname, '..');

/* GET home page. */
router.get('/', function(req, res, next) {

    // Go to panelpage if admin
    if(req.cookies.token) {
        res.redirect("admin/panel");
        return;
    }
    
    let html = 
    `
        <form action="/admin/login" method="post" name="admin-form">
        <H3>Logga In</H3>
        
        <label for="username"><b>Användarnamn*</b></label>
        <input id="username-field" type="text" placeholder="Ange användarnamn" name="username"> 

        <label for="password"><b>Lösenord*</b></label>
        <input id="password-field" type="password" placeholder="Ange Lösenord" name="password">

        <input type="submit" value="Logga in">
    </form>
    `

    res.send(html);
});

router.post('/login', urlencodedParser, function(req, res) {

    // Go to panelpage if admin
    if(req.cookies.token) {
        res.redirect("/admin/panel");
    }

    // Try to login
    let success = attempLogin(req.body.username, req.body.password);

    // If success, create token
    if (success) {
        res.cookie("token", "admin", { path: "/admin"});
        res.redirect("panel");
    }
    else {
        res.redirect("/admin");
    }
});

router.post('/logout', function(req, res) {

    // Return to loginpage if not loggedin
    if(!req.cookies.token) {
        res.redirect("/");
        return;
    }
    
    // Clear token and redirect to startpage
    res.clearCookie("token", { path: "/admin" });
    res.redirect("/admin");
});

router.get('/panel', function(req, res) {

    // Return to loginpage if not loggedin
    if(!req.cookies.token) {
        res.redirect("/admin");
        return;
    }

    fs.readFile(rootDir + "/data/users.json", (err, data) => {
    
        if (err) throw err;

        users = JSON.parse(data);

        // HTML to append
        let html = "<H2>Admin Panel</H2>";
        
        // Get user list as html table
        html += buildUserList(users);

        // Get emails of subscribers as html
        html += buildEmailList(users);
        
        // Add logout button
        html += 
        `
            <form action="/admin/logout" method="post" name="admin-form">
                <input type="submit" value="Logga ut"/>
            </form>
        `
        res.send(html);
    });
}); 

function attempLogin(user, pw) {
    return (user == "test" && pw == "1234") ? true : false;
}

function buildUserList(users)
{
    let userListHtml = "";
    // Create user list as table html
    users.forEach(user => {
        userListHtml += 
        `
        <tr>
            <td>${user.userName}</td>
            <td>${user.email}</td>
            <td>${user.newsletterSub}</td>
        </tr>
        `;
    }); 

    // Declare div and table
    let html = 
    `
    <div id="user-container">
        <table id="user-table">
            <tr>
                <th>User</th>
                <th>Email</th>
                <th>Subscriber</th>
            </tr>
            ${userListHtml}
        </table>
    </div>
    `;

    return html;
}

function buildEmailList(users) {

    let userEmails = "";

    users.forEach(user => {

        if (user.newsletterSub) {

            // If list is not empty, append comma
            if (userEmails) {
                userEmails += ", ";
            }

            // Append user email to list
            userEmails += `${user.email}`; 
        };
    });

    let html = 
    `
    <div id="subscribers-container">
        <h4>Subscriber-emails</h4>
        <p>${userEmails}</p>
    </div>
    `;

    return html;
}

module.exports = router;
