const express = require('express');
const subdomain = require('express-subdomain')
const adminRouter = express.Router();
const driverRouter = express.Router();

module.exports = app => {

  app.use(subdomain('driver', driverRouter))
  app.use(subdomain('admin', adminRouter))

adminRouter.use(express.static(`${__dirname}/../dist/admin`))
  .get('*',
  (req, res)=>{ res.sendFile('index.html', {root:`${__dirname}/../dist/admin`}) }
);

driverRouter.use(express.static(`${__dirname}/../dist/driver`))
  .get('*',
    (req, res)=>{ res.sendFile('index.html', {root:`${__dirname}/../dist/driver`}) }
  );

app.use(express.static(`${__dirname}/../dist/shop`))
  .get('*',
    (req, res)=>{ res.sendFile('index.html', {root:`${__dirname}/../dist/shop`}) }
  );
}
