const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  name: String,  
  title: String, 
  image: String,
  imagedos: String,
  imagetres: String,
  description: String,
  filtroprice:  String,
  color: String,
  colorstock: String,
  enstock:  String,
  oldprice: Number,
  price: Number,
  amount: Number,
  like: {
    type: Boolean,
    default: false
  },

  status: {
    type: Boolean,
    default: false
  },

  timestamp: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Ofertauno', NoteSchema);
