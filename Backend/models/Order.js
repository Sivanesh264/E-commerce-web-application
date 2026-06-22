const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: { type: String, default: 'Credit Card' },
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingUpdates: [
    {
      status: { type: String, required: true },
      date: { type: Date, default: Date.now },
      note: { type: String, default: '' }
    }
  ]
}, { timestamps: true });

orderSchema.methods.addTrackingUpdate = function (status, note = '') {
  this.trackingUpdates.push({ status, date: new Date(), note });
  this.status = status;
};

module.exports = mongoose.model('Order', orderSchema);
