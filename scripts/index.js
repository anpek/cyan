#!/usr/bin/env node
var express = require('express');
var app = express()
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

var currentPath = process.cwd();
var root = path.resolve(__dirname, '..');

var files = fs.readdirSync(currentPath);

console.log("Files", files)

app.get('/', function (req, res) {
    var body = files.reduce((acc, item) => (
        acc + `<a href="/${item}">${item}</a><br/><hr>`
    ), '')
    res.send(body)
})

files.map((fileName) => {
    return app.get(`/${fileName}`, function (req, res) {
        _buildAndBundle(fileName);
        res.send(fileName);
    })
})

app.listen(9000, function () {
    console.log('Cyan app listening on port 9000!')
})

function _buildAndBundle(fileName) {
    console.log("Root", root);
    var command = `./node_modules/.bin/rimraf __temp__ && ./node_modules/.bin/tsc --outFile ${currentPath}/__temp__/${fileName} -w`;

    spawn(command, { cwd: root });

}