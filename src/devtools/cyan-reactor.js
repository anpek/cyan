var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var chalk = require('chalk');
var express = require('express');
var app = express();

var webpackConfig = require('../../config/webpack.bundle.target.config.js');
var currentPath = process.cwd();
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
                            , 'tsconfig.json'
                            , '.DS_Store' ];


app.use(express.static(path.resolve(currentPath, '__temp__')));

app.get('/', function (req, res) {
    var body = files.reduce((acc, item) => {
        
        if(blacklistedFilenNames.indexOf(item) == -1)
            return acc + `<a href="/${item}">${item}</a><br/><hr>`
        else
            return acc;

    }, '')
    res.send(body);
})

app.get('/__history__', function (req, res) {
    var html = `<html>
                <head></head>
                <body style="margin: 0;">
                    <div id="cyan-app-history" style="background: black; display: flex; min-width: 100vw; min-height: 100vh;">
                        <div id="history-events" style="min-width: 20vw; min-height: 100vh; border-right: 1px solid cyan; color: cyan;">
                        </div>

                        <div id="history-snapshots" style="color: white;">
                        </div>
                    </div>
                    
                    <script>
                        
                        function renderHistory() {
                            var history = window.__history__;
                            if(!history) return;
                            
                            var eventsRendered = "", snapshotRendered = "";

                            var historyEvents = Object.keys(history).forEach(key => {
                                var event = history[key];
                                eventsRendered += '<div data-key="' + key + '">' + event.moduleId + '/' + event.action.type + '</div>';                                 
                            })

                            var eventsContainer =  document.getElementById("history-events");
                            eventsContainer.innerHTML = eventsRendered;
                        }

                        function renderSnapshot(e) {
                            debugger;
                            var key = e.target.dataset.key;
                            var snapshot = window.__history__[key];

                            if(!snapshot) return;

                            snapshotRendered = "<pre><code>" + JSON.stringify(snapshot.model) + "</pre></code>";
                            
                            var snapShotContainer = document.getElementById("history-snapshots");
                            snapShotContainer.innerHTML = snapshotRendered;
                        }

                        renderHistory();

                        window.addEventListener('message',function(event) {                                
                            console.log('received response:  ',event.data);
                            if(event.data)
                                window.__history__ = event.data;
                            
                            renderHistory();
                        }, false);  

                        document.getElementById("history-events").addEventListener("click", renderSnapshot) 
                        
                        
                    </script>
                </body>
            </html>`;
    res.send(html);
})

files.map((fileName) => {
    return app.get(`/${fileName}`, function (req, res) {
        
        var success = function(res) {
            var html = `<html>
                <head>
                    ${style}
                </head>
                <body>
                    <div id="cyan-app">

                    </div>
                    <div class="cyan-controls">
                        <a id="show-history-link" onclick="showHistory()">Show History</a>
                    </div>
                    <script src="index.js"> </script>
                    <script>
                        function showHistory() {
                            if(!window.historyWindow)
                                window.historyWindow = window.open('http://localhost:9000/__history__', 'History', 'titlebar=no,toolbar=no,location=no,status=no,menubar=no,width=400,height=350');
                            else
                                window.historyWindow.focus();
                        }
                    </script>
                </body>
            </html>`
            res.send(html);
        }

        var error = function(res, errors) {
            var html = `<html>
                <head>
                    ${style}
                </head>
                <body>
                    <div id="cyan-app">
                        ${errors}
                    </div>
                </body>
            </html>`
            res.send(html);
        }

        _bundle(fileName, success.bind(this, res), error.bind(this, res));
    })
})

function _bundle(fileName, success, error) {    
    var entryFilePath = `${currentPath}/${fileName}`;

    webpackConfig.context = currentPath;
    webpackConfig.entry = entryFilePath;
    webpackConfig.output = {
        path: `${currentPath}/__temp__`,
        filename: 'index.js'
    };

    webpack(webpackConfig, (err, stats) => {
        if(stats.hasErrors()) {
            var errors = stats.toJson('errors-only', null, 4);
            return error(JSON.stringify(errors));
        }
        
        return success();
    })
}

app.listen(9000, function () {
    console.log('Cyan app listening on port 9000!')
})

var style = `<style>
    .cyan-controls {
        position: fixed;
        bottom: 0;
        right: 0;
        padding: 13px;
        background: black;
        color: cyan;
    }
</style>`