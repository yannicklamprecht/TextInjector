var express = require('express');
var serveIndex = require('serve-index')
let logger = require('morgan');
let app = express();

app.use(logger('dev'));

app.use(express.static(__dirname + '/static'));

app.use('/assets', [
    express.static(__dirname + '/node_modules/jquery/dist/')
]);

app.use('/parts', express.static(__dirname + '/static/parts'), serveIndex(__dirname + '/static/parts', {'icons': true}));
app.use('/l18n', express.static(__dirname + '/static/l18n'), serveIndex(__dirname + '/static/l18n', {'icons': true}));


app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
});