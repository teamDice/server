const express = require('express');
const morgan = require('morgan');
const { resolve } = require('path');
const app = express();
const errorHandler = require('./util/error-handler');
// const createEnsureAuth = require('./util/ensure-auth');

require('./models/register-plugins');
const redirectHttp = require('./util/redirect-http');
const checkConnection = require('./util/check-connection');

if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttp());
}

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());

const auth = require('./routes/auth');
const matches = require('./routes/matches');

if(process.env.NODE_ENV !== 'production') {
    app.use(checkConnection());
}

app.use('/api/auth', auth);
app.use('/api/matches', matches);

app.use((req, res) => {
    res.sendFile('index.html', {
        root: resolve(__dirname + '/../public/')
    });
});

app.use(errorHandler());

module.exports = app;