const userRoutes = require('./users/userRoutes');
const driverRoutes = require('./drivers/driverRoutes');
const adminRoutes = require('./admin/adminRoutes');
const wineRoutes = require('./wines/wineRoutes');
const cartRoutes = require('./carts/cartRoutes');
const orderRoutes = require('./orders/orderRoutes');

module.exports = app => {
    userRoutes(app);
    driverRoutes(app);
    adminRoutes(app);
    wineRoutes(app);
    cartRoutes(app);
    orderRoutes(app);
};
