var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
    Libelle : String,
    Prix : Number,
    Quantite : Number,
    Designation:String
});

module.exports = mongoose.model('produits', Product);