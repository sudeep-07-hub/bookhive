import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Book from '../models/Book.js';
import Order from '../models/Order.js';

dotenv.config();

connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@bookhive.com',
    password: 'password123',
    role: 'Admin',
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
  },
];

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Classic',
    description: 'A novel about the American dream.',
    price: 15.99,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
    ratings: 4.5,
    numReviews: 12,
    publishedYear: 1925
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    description: 'A novel about racial injustice.',
    price: 12.50,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    ratings: 4.8,
    numReviews: 24,
    publishedYear: 1960
  },
  {
    title: '1984',
    author: 'George Orwell',
    category: 'Dystopian',
    description: 'A story of a totalitarian society.',
    price: 14.99,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?auto=format&fit=crop&w=400&q=80',
    ratings: 4.7,
    numReviews: 30,
    publishedYear: 1949
  }
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    
    // We don't need to link books to users unless it's the admin who added them.
    // For now we just insert books.
    await Book.insertMany(books);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
