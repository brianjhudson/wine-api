const mongoose = require('mongoose');
const Wine = require('./Wine');

const InventoryItem = new mongoose.Schema({
    Id: {type: Number}
    , Name: {type: String}
    , Url: {type: String}
    , Appellation: {
        Id: {type: Number}
        , Name: {type: String}
        , Url: {type: String}
        , Region: {
            Id: {type: Number}
            , Name: {type: String}
            , Url: {type: String}
            , Area: {type: String}
        }
    }
    , Labels: [{
            Id: {type: String}
            , Name: {type: String}
            , Url: {type: String}
    }]
    , Type: {type: String}
    , Varietal: {
        Id: {type: Number}
        , Name: {type: String}
        , Url: {type: String}
        , WineType: {
            Id: {type: Number}
            , Name: {type: String}
            , Url: {type: String}
        }
    }
    , Vineyard: {
        Id: {type: Number}
        , Name: {type: String}
        , Url: {type: String}
        , ImageUrl: {type: String}
        , GeoLocation: {
            Latitude: {type: Number}
            , Longitude: {type: Number}
            , Url: {type: String}
        }
    }
    , Vintage: {type: String}
    , Community: {
        Reviews: {
            HighestScore: {type: Number}
            , Url: {type: String}
        }
        , Url: {type: String}
    }
    , Description: {type: String}
    , GeoLocation: {
        Latitude: {type: Number}
        , Longitude: {type: Number}
        , Url: {type: String}
    }
    , PriceMax: {type: Number}
    , PriceMin: {type: Number}
    , PriceRetail: {type: Number}
    , ProductAttributes:[{
        Id: {type: Number}
        , Name: {type: String}
        , Url: {type: String}
        , ImageUrl: {type: String}
    }]
    , Ratings: {
        HighestScore: {type: Number}
    }
    , Retail:{
        InStock: {type: Boolean}
        , Price: {type: Number}
        , Sku: {type: String}
        , State: {type: String}
        , Url: {type: String}
    }
    , Vintages: {
        List: [{type: String}]
    }
    , LabelImage: {type: String}
    , BottleImage: {type: String}
    , Quantity: {type: Number, default: 1}
}, {collection: "inventory"});

module.exports = mongoose.model('InventoryItem', InventoryItem);
