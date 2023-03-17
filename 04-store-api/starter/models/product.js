const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'product name must be provided']
    },
    price: {
        type: Number,
        require: [true, 'product price must be provided']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 5.0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'caressa', 'liddy', 'marcos'],
            message:'{VALUE} is not supported'
        }
        // enum: ['ikea', 'caressa', 'liddy', 'marcos'],
      }
})

module.exports = mongoose.model('Product', productSchema);