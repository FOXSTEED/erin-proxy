const express = require('express')
const morgan = require('morgan');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/:listing_id', express.static(path.join(__dirname, 'public')));

const clientBundles = './public/services';
const serverBundles = './templates/services';
const serviceConfig = require('./service-config.json');
const services = require('./loader.js')(clientBundles, serverBundles, serviceConfig);

const React = require('react');
const ReactDom = require('react-dom/server');
const Layout = require('./templates/layout');
const App = require('./templates/app');
const Scripts = require('./templates/scripts');

const renderComponents = (components, props = {}) => {
  return Object.keys(components).map(item => {
    let component = React.createElement(components[item], props);
    return ReactDom.renderToString(component);
  });
}

// need to edit this to go to the correct path
app.get('/items/:id', function(req, res){
  let components = renderComponents(services, {itemid: req.params.id});
  res.end(Layout(
    'SDC TripAdvisor',
    App(...components),
    Scripts(Object.keys(services))
  ));
});

app.listen(port, () => {
  console.log(`server running at: http://${host}:${port}`)
});