const express = require('express');
const router = express.Router();
 

// Models
const Prodtres = require('../models/prodtres');
const Cart = require('../models/cart');
 
// Helpers
const { isAuthenticated } = require('../helpers/auth');


router.get('/prodtresindex/:page', async (req, res) => {

  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  let perPage = 8;
  let page = req.params.page || 1;

  Prodtres
  .find({}) // finding all documents
  .sort({ timestamp: -1 })
  .skip((perPage * page) - perPage) // in the first page the value of the skip is 0
  .limit(perPage) // output just 9 items
  .exec((err, prodtres) => {
    Prodtres.countDocuments((err, count) => { // count to calculate the number of pages
      if (err) return next(err);
      res.render('prodtres/prodtres', {
        prodtres,
        current: page,
        pages: Math.ceil(count / perPage),
        products: cart.generateArray(), totalPrice: cart.totalPrice

      });
    });
  });
});





router.post('/prodtres/new-prodtres',  async (req, res) => {
  const { 
    name,
    title,
    image,
    imagedos,
    imagetres,
    imagecuatro,
    imagecinco,
    description,
    filtroprice,
    enstock,
    color,
    coloruno,
    colordos,
    colortres,
    colorcuatro,
    talle,
    talleuno,
    talledos,
    talletres,
    tallecuatro,
    tallecinco,
    talleseis,
    oldprice,
    price
  } = req.body;
  const errors = [];
  if (!image) {
    errors.push({text: 'Please Write a Title.'});
  }
  if (!title) {
    errors.push({text: 'Please Write a Description'});
  }
  if (!price) {
    errors.push({text: 'Please Write a Description'});
  }
  if (errors.length > 0) {
    res.render('notes/new-note', {
      errors,
      image,
      title,
      price
    });
  } else {
    const newNote = new Prodtres({ 
      name,
      title,
      image,
      imagedos,
      imagetres,
      imagecuatro,
      imagecinco,
      description,
      filtroprice,
      enstock,
      color,
      coloruno,
      colordos,
      colortres,
      colorcuatro,
      talle,
      talleuno,
      talledos,
      talletres,
      tallecuatro,
      tallecinco,
      talleseis,
      oldprice,
      price
    });
    //newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/prodtres/add');
  }
});






router.get('/prodtresredirect/:id', async (req, res) => {
  const { id } = req.params;
  const prodtres = await Prodtres.findById(id);
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  res.render('prodtres/prodtresredirect', {
    prodtres,
    products: cart.generateArray(), totalPrice: cart.totalPrice

  });
});








// New product
router.get('/prodtres/add',  async (req, res) => {
  const prodtres = await Prodtres.find();
  res.render('prodtres/new-prodtres',  { prodtres });
});





// talle y color
router.get('/prodtres/tallecolor/:id',  async (req, res) => {
  const prodtres = await Prodtres.findById(req.params.id);
  res.render('prodtres/tallecolor-prodtres', { prodtres });
});

router.post('/prodtres/tallecolor/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtres.updateOne({_id: id}, req.body);
  res.redirect('/prodtresredirect/' + id);
});




//editar


router.get('/prodtres/edit/:id',  async (req, res) => {
  const prodtres = await Prodtres.findById(req.params.id);
  res.render('prodtres/edit-prodtres', { prodtres });
});

router.post('/prodtres/edit/:id',  async (req, res) => {
  const { id } = req.params;
  await Prodtres.updateOne({_id: id}, req.body);
  res.redirect('/prodtresback/' + id);
});




// Delete 
router.get('/prodtres/delete/:id', async (req, res) => {
  const { id } = req.params;
    await Prodtres.deleteOne({_id: id});
  res.redirect('/prodtres/add');
});






router.get('/addtocardprodtres/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

  Prodtres.findById(productId, function(err, product){
    if(err){
      return res-redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/shopcart');

  });
});



module.exports = router;
 