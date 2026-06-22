const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

dotenv.config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    description: "Premium over-ear headphones with active noise cancellation and 30-hour battery life.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    stock: 50
  },
  {
    
    name: "Minimalist Leather Watch",
    price: 149.99,
    description: "Elegant analog watch with genuine leather strap and scratch-resistant mineral glass.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
    stock: 50
  },
  {

    name: "Running Shoes",
    price: 119.99,
    description: "Lightweight mesh sneakers with responsive cushioning for everyday runs.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    stock: 50
  },
  {
    
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    description: "Double-wall insulated bottle keeps drinks cold for 24 hours or hot for 12 hours.",
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
    stock: 50
  },
  {
    
    name: "Classic Denim Jacket",
    price: 89.99,
    description: "Timeless mid-weight denim jacket with button front and chest pockets.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600",
    stock: 50
  },
  {
    
    name: "Mechanical Keyboard",
    price: 129.99,
    description: "RGB backlit mechanical keyboard with Cherry MX switches and aluminum frame.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600",
    stock: 50
  },
  {
    
    name: "Canvas Backpack",
    price: 59.99,
    description: "Durable waxed canvas backpack with padded laptop sleeve and multiple compartments.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    stock: 50
  },
  {
    
    name: "Sunglasses",
    price: 44.99,
    description: "UV400 polarized aviator sunglasses with lightweight metal frame.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
    stock: 50
  },
  {
    
    name: "Ceramic Coffee Mug Set",
    price: 29.99,
    description: "Set of 4 handcrafted ceramic mugs with minimalist matte glaze finish.",
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
    stock: 50
  },
  {
    
    name: "Yoga Mat",
    price: 39.99,
    description: "Non-slip eco-friendly TPE yoga mat with alignment lines, 6mm thickness.",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600",
    stock: 50
  },
];

module.exports = products;


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});

    const admin = await User.create({ name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' });
    const user = await User.create({ name: 'Test User', email: 'user@example.com', password: 'user123', role: 'user' });
    console.log(`Created admin: admin@example.com / admin123`);
    console.log(`Created user: user@example.com / user123`);

    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    console.log('\nSeed completed successfully!');
    console.log('Login credentials:');
    console.log('  Admin: admin@example.com / admin123');
    console.log('  User:  user@example.com / user123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed(); 
