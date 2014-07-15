require('./style/request.css');

var shellController = require('shell/shell.js'),
    Request = require('./components/request-view.js');

shellController.registerApplication(Request());
