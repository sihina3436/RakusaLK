const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },

    hexCode: { type: String, required: true, unique: true, trim: true }, 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // admin or seller
        required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Color', colorSchema);



