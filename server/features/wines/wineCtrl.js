const axios = require('axios');
const config = require('../../../config/config');
const Wine = require('./Wine');
const InventoryItem = require('./InventoryItem');

const baseUrl = 'http://services.wine.com/api/beta/service.svc/json/catalog?offset=0&size=100&apikey=' + config.wineAPI.key + '&sort=popularity%7Cascending&state=TX'

module.exports = {
    getWinesFromAPI(req, res) {
      let query = "";
      let test = req.query.filter
      if (req.query.filter) {
        query += '&filter=' + req.query.filter;
      } else if ( req.query.term ) {
        query += '&term=' + req.query.term;
      }
      else query += "rating(85%7C100)";
        axios.get(baseUrl + query)
          .then(result => {
            return res.status(200).json(result.data);
          })
          .catch( error => {
            return res.status(500).json(error);
          })
    }

    , getWinesFromDistribution(req, res) {
        Wine.find(req.query, (err, wines) => {
          if (err) return res.status(500).json(err);
          if (wines[0] === undefined && req.query.Name) {
            let updatedQuery = {};
              updatedQuery["Varietal.Name"] = req.query.Name;
              Wine.find(req.updatedQuery, ( err, newWines ) => {
                if ( err ) {
                  return res.status( 500 ).json( err );
                }
                return res.status( 200 ).json( newWines );
              });
          } else {
            return res.status(200).json(wines);
          }
        });
    }

    , getWinesFromInventory(req, res) {
        let filter = {}
        if (req.query.varietal) filter = {"Varietal.Id": req.query.varietal}
        InventoryItem.find(filter)
          .limit(req.query.page/1)
          .skip(req.query.skip/1)
          .exec((err, wines) => {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            }
            return res.status(200).json(wines);
          })
    }
    , getWinesFromInventoryByText(req, res) {
        let text = req.query.text
        if (!req.query.text) text = "";
        InventoryItem.find({ $text: { $search: text } })
          .limit(req.query.page/1)
          .skip(req.query.skip/1)
          .exec((err, wines) => {
            if (err) {
              console.log(err);
              return res.status(500).json(err);
            }
            return res.status(200).json(wines);
          })
    }
    , addWineToDistributor(req, res) {
        Wine.findOneAndUpdate({Id: req.body.Id}, { $inc: { Quantity: req.body.Quantity } }, (err, updatedWine) => {
          if (err) {
            return res.status(500).json(err);
          }
          else if (updatedWine) {
            console.log( `Updated ${req.body.Name.slice(0,15)}'s Quantity to ${updatedWine.Quantity + req.body.Quantity}` );
            return res.status(200).json(updatedWine);
          }
          else {
            new Wine(req.body).save( (err, newWine) => {
              if (err) {
                return res.status(500).json(err);
              }
              console.log( `Created new wine: ${req.body.Name.slice(0,15)}` );
              return res.status(200).json(newWine);
            } );
          }
        } );
    }

    , addWineToInventory(req, res) {
      InventoryItem.findOneAndUpdate({Id: req.body.Id}, { $inc: { Quantity: req.body.Quantity } }, (err, updatedWine) => {
        if (err) {
          return res.status(500).json(err);
        }
        else if (updatedWine) {
          console.log( `inv Updated ${req.body.Name.slice(0,15)}'s Quantity to ${updatedWine.Quantity + req.body.Quantity}` );
          return res.status(200).json(updatedWine);
        }
        else {
          new InventoryItem(req.body).save( (err, newWine) => {
            if (err) {
              return res.status(500).json(err);
            }
            console.log( `inv Created new wine: ${req.body.Name.slice(0,15)}` );
            return res.status(200).json(newWine);
          } );
        }
      } );
    }

    , getDistributionCategoryCounts(req, res) {
        Wine.aggregate([{$group: {_id: "$Varietal.Id", varietal: {$first: "$Varietal.Name"}, qty: {$sum: "$Quantity"}}}], (err, results) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(results);
          });
    }

    , getInventoryCategoryCounts(req, res) {
        InventoryItem.aggregate([{$group: {_id: "$Varietal.Id", varietal: {$first: "$Varietal.Name"}, qty: {$sum: 1}}}], (err, results) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(results);
          });
    }
}
