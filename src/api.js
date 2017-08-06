'use strict'
const api = require('express').Router();
const fs = require('fs');

const bodyParser = require('body-parser');
const gallery = require('express-photo-gallery');
// const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' });

// const { exec } = require('child_process');


const shortid = require('shortid');
const uploader = require('raw-uploader');

api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

let options = {
  title: 'Cohort 1706!!!'
};

api.use('/photos', gallery('./src/img/', options));


//Easter Egg - http://localhost:8080/api/hello
api.get('/hello', (req, res) => res.send({hello: 'world'}))


//POST
api.post('/upload', function (req, res) {
    let fileName = shortid.generate();
    uploader({
        contentTypes: ['image/jpeg'],
        minFileSize: 100,
        maxFileSize: 1000000000,
        outputType: 'file',
        destFolder: './src/img',
        createDestFolder: true,
        disconnectOnErr: true,
        fileNameHeader: 'file-name',
        destFileName: fileName,
        overwrite: true,
        deepCheckMime: true
    }, req, res, function (code, data) {
        res.status(code);
        res.end();
    });
});

// api.post('/upload', (req, res, next) => {

//     var fstream;
//     req.pipe(req.busboy);

//     req.busboy.on('file', function (fieldmname, file, filename) {
//       console.log("Uploading: " + filename);
//       //Path where image will be uploaded
//       fstream = fs.createWriteStream('./src/img/' + counterFileName + filename);
//       file.pipe(fstream);
//       fstream.on('close', function(){
//         console.log('Upload Finished of ' + filename);
//         counterFileName += "a";
//       });
//     });

// });

module.exports = api
