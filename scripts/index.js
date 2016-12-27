var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var express = require('express');
var app = express();

var webpackConfig = require('../config/webpack.bundle.target.config.js');
var currentPath = process.cwd();
var root = path.resolve(__dirname, '..');
var files = fs.readdirSync(currentPath);

var blacklistedFilenNames = [ '.git'
                            , '.gitignore'
                            , 'node_modules'
                            , 'webpack.config.js'
                            , 'package.json'
                            , 'yarn.lock'
                            , 'yarn-error.log'
                            , 'npm-debug.log'
                            , '__temp__'
                            , 'tsconfig.json' ];


app.use(express.static(path.resolve(currentPath, '__temp__')));

app.get('/', function (req, res) {
    var body = files.reduce((acc, item) => {
        
        if(blacklistedFilenNames.indexOf(item) == -1)
            return acc + `<a href="/${item}">${item}</a><br/><hr>`
        else
            return acc;

    }, '')
    res.send(body)
})

files.map((fileName) => {
    return app.get(`/${fileName}`, function (req, res) {
        
        var cb = function(res) {
            var html = `<html>
                <head>
                </head>
                <body>
                    <div id="container">

                    </div>
                    <script src="index.js"> </script>
                </body>
            </html>`
            res.send(html);
        }

        _bundle(fileName, cb.bind(this, res));
    })
})

function _bundle(fileName, cb) {    
    var entryFilePath = `${currentPath}/${fileName}`;

    webpackConfig.context = currentPath;
    webpackConfig.entry = entryFilePath;
    webpackConfig.output = {
        path: `${currentPath}/__temp__`,
        filename: 'index.js'
    };

    webpack(webpackConfig, cb)
}

app.listen(9000, function () {
    console.log('Cyan app listening on port 9000!')
})