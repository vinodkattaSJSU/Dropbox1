var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
let DB=require('./mySQL');
var bcrypt=require('bcrypt');

var reqUsername='';

var users = [
    {
        username: "Mike",
        password: "mike123"
    },
    {
        username: "Tom",
        password: "tom123"
    },
    {
        username: "John",
        password: "john123"
    },
    {
        username: "Mac",
        password: "mac123"
    }
];
router.post('/shareFile', function (req, res, next) {

    var filename = req.body.file;
    var user=req.body.user;
    console.log("-------------------------")
    console.log(filename);
    console.log(user);
    var jsonString;
    var jsonParse;

    DB.query("insert into userfilepaths values('"+user+"','./public/uploads/" +filename +"','no');", null, function (data, error) {
        jsonString = JSON.stringify(data);
        jsonParse = JSON.parse(jsonString);
        console.log(jsonParse);
    });
        res.status(204).end();

});

router.post('/deleteFilePath', function (req, res, next) {

    var filename = req.body.file;
    console.log("-------------------------fdelete");
    console.log(filename);

    var jsonString;
    var jsonParse;
    DB.query("select permission from userfilepaths where filepath='./public/uploads/" + filename + "' AND username='"+reqUsername+"';", null, function (data, error) {
        jsonString = JSON.stringify(data);
        jsonParse = JSON.parse(jsonString);
        console.log("-------------------------delete permission");
        console.log(jsonParse[0].permission);
        if(jsonParse[0].permission==="yes"){
            console.log(
                "Inside if"
            );
            DB.query("delete from userfilepaths where filepath='./public/uploads/" + filename + "'", null, function (data, error) {
                jsonString = JSON.stringify(data);
                jsonParse = JSON.parse(jsonString);
                console.log(jsonParse);
            });
        }


    });



    res.status(204).end();
});




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)   //+ '-' + Date.now()
    },
});


var upload = multer({storage:storage});

/* GET users listing. */
router.get('/display', function (req, res, next) {
    var resArr = [];
    var files=[];
    var out=[];
    DB.query("select filepath from userfilepaths where username='" + reqUsername + "';", null, function (data, error) {
            jsonString = JSON.stringify(data);
            jsonParse = JSON.parse(jsonString);
            files=jsonParse;
            // if(jsonParse!=null)
           for(var i=0;i<files.length;i++)
           {
            out.push(files[i].filepath);
           }
             resArr = out.map(function (file) {
                 var imgJSON = {};

                 imgJSON.img = file.split('/')[3];
                 console.log(imgJSON.img);
                 imgJSON.cols = 2;
                 return imgJSON;
             });
            console.log(resArr);
            res.send(resArr);

        });

    });

router.post('/upload', upload.single('mypic'), function (req, res, next) {

    console.log(req.body);


    DB.query("Insert into userfilepaths values('" + reqUsername + "','"+req.file.destination+req.file.originalname+ "','yes');", null, function (data, error) {
        jsonString = JSON.stringify(data);
        jsonParse = JSON.parse(jsonString);
        console.log(jsonParse);
    });

    res.status(204).end();

});



router.post('/doLogin', function (req, res, next) {
    console.log(req.body.username);
     reqUsername = req.body.username;
    var reqPassword = req.body.password;
    // console.log("reached server");
    var jsonString;
    var jsonParse;


    var theUser = DB.query("select * from users where username='" + reqUsername + "'", null, function (data, error) {
        //       callback(data, error);
        jsonString = JSON.stringify(data);
        jsonParse = JSON.parse(jsonString);
        console.log(orgPassword)
        console.log(data);
        if(jsonParse.length==1)

        {
            var orgPassword = bcrypt.compareSync(reqPassword, jsonParse[0].password);
            orgPassword&&
            res.status(201).json({message: "Login successful"}) ||
            res.status(401).json({message: "Login failed"});
        }

        else {
            res.status(401).json({message: "Login failed"});

        }


    });
});

router.post('/doSignUp', function (req, res, next) {
    console.log(req.body.username);
    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var reqfirstname=req.body.firstname;
    var reqlastname=req.body.lastname;
    console.log("reached server");
    var jsonString;
    var jsonParse;
    var hash = bcrypt.hashSync(reqPassword, 10);
    var theUser = DB.query("select * from users where username='" + reqUsername + "'", null, function (data, error) {
        //       callback(data, error);
        jsonString = JSON.stringify(data);
        jsonParse = JSON.parse(jsonString);
        console.log(data);

        if (jsonParse[0] == null) {
            //
            DB.query("Insert into users values('" + reqUsername + "','"+ hash + "','"+ reqfirstname + "','"+ reqlastname + "');", null, function (data, error) {
                jsonString = JSON.stringify(data);
                jsonParse = JSON.parse(jsonString);
                console.log(data);
                res.status(401).json({message: "Login failed"});
            });

        } else {

            res.status(201).json({message: "Username/Email already exists. Please enter new mail ID"});
        }



    });
});
module.exports = router;
