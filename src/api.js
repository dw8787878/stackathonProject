'use strict'
const api = require('express').Router();


var bodyParser = require('body-parser');
api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

//Easter Egg - http://localhost:8080/api/hello
api.get('/hello', (req, res) => res.send({hello: 'world'}))

//POST
api.post('/upload', (req, res, next) => {

    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldmname, file, filename) {
      console.log("Uploading: " + filename);

      //Path where image will be uploaded
      fstream = fs.createWriteStream(__dirname + '/img/' + filename);
      file.pipe(fstream);
      fstream.on('close', function(){
        console.log('Upload Finished of ' + filename);
      });
    });
});


module.exports = api
