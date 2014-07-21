require('./style/request.scss');

var shellController = require('shell/shell.js'),
    Request = require('./components/request-view.jsx');

shellController.registerApplication(Request());
