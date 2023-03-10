var express = require('express');
var router = express.Router();
var Product = require('../model/produits');
const { io } = require('../app');





router.get('/', async (req, res)=>
{
    try {
        const products = await Product.find({});
        res.json(products);
    
      } catch (err) {
        console.error('Error fetching products', err);
        res.status(500).json({ message: 'Internal server error' });
      }    
    });


router.post('/add',async (req,res) =>
    {
        console.log("kah")
        var p=new Product({Libelle:req.body.Libelle,Prix:req.body.Prix,Quantite:req.body.Quantite,Designation:req.body.Designation});
        try {
            await p.save();
            console.log(p);
            io.emit('notification', 'Product added successfully!');
        }
        catch (err) {
            res.status(400).json({ message: err.message });
          }
          res.redirect("/products");
        });


router.get('/:id',  async (req, res) => {
            try {
              const productId = req.params.id;
              const product = await Product.findOne({ _id: productId });
          
              if (!product) {
                return res.status(404).json({ message: 'product not found' });
              }
          
              res.json(product);
            } catch (err) {
              console.error('Error getting product', err);
              res.status(500).json({ message: 'Internal server error' });
            }
          });     
          
          

          router.put('/update/:id', async (req, res) => {
            const { Libelle, Prix, Quantite, Designation } = req.body;
            const productId = req.params.id;
          
            try {
             
              const product = await Product.findOne({ _id: productId });
          
             
              if (!product) {
                return res.status(404).json({ message: 'Product not found' });
              }
          
              
              product.Libelle = Libelle;
              product.Prix = Prix;
              product.Quantite = Quantite;
              product.Designation = Designation;
          
              
              await product.save();
              io.emit('notification', 'Product updated successfully!');
          
              res.json({ message: 'Product updated' });
            } catch (err) {
              console.error('Error updating Product', err);
              res.status(500).json({ message: 'Internal server error' });
            }
          });  


          router.delete('/:id', async (req, res) => {
            try {
              const productId = req.params.id;
              const deletedProduct = await Product.findOneAndDelete({ _id: productId });
          
              if (!deletedProduct ) {
                return res.status(404).json({ message: 'Product not found' });
              }
          
              res.json({ message: 'Product deleted' });
            } catch (err) {
              console.error('Error deleting product', err);
              res.status(500).json({ message: 'Internal server error' });
            }
          });


          router.get('/sort/:field', async (req, res) => {
            try {
              const field = req.params.field;
              const products = await Product.find().sort({ [field]: 1 });
              io.emit('notification', `Products sorted by ${field}`);
              res.status(200).json(products);
            } catch (err) {
              console.log(err);
              res.status(500).send('Failed to sort products');
            }
          });
             


    






module.exports = router;    