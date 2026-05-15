import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Book from '../models/Book.js';
import Order from '../models/Order.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bookhive');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  const users = [
    {
      name: 'Admin User',
      email: 'admin@bookhive.com',
      password: await bcrypt.hash('123456', 10),
      role: 'Admin',
      address: '123 Admin St, Tech City'
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('123456', 10),
      role: 'User',
      address: '456 User Ave, Readerville'
    }
  ];

  const books = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Classic", description: "A story of the Jazz Age.", price: 10.99, stock: 50, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop", publishedYear: 1925 },
    { title: "1984", author: "George Orwell", category: "Dystopian", description: "A dystopian social science fiction novel.", price: 12.99, stock: 40, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop", publishedYear: 1949 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic", description: "A novel about the serious issues of rape and racial inequality.", price: 14.99, stock: 30, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop", publishedYear: 1960 },
    { title: "Pride and Prejudice", author: "Jane Austen", category: "Romance", description: "A romantic novel of manners.", price: 9.99, stock: 60, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop", publishedYear: 1813 },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Classic", description: "A story about teenage rebellion and alienation.", price: 11.99, stock: 45, image: "https://images.unsplash.com/photo-1476275466078-4007374efac4?q=80&w=600&auto=format&fit=crop", publishedYear: 1951 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy", description: "A fantasy novel and children's book.", price: 15.99, stock: 70, image: "https://images.unsplash.com/photo-1629196914168-98f5a6b07c80?q=80&w=600&auto=format&fit=crop", publishedYear: 1937 },
    { title: "Fahrenheit 451", author: "Ray Bradbury", category: "Dystopian", description: "A dystopian novel about book burning.", price: 13.99, stock: 35, image: "https://images.unsplash.com/photo-1524578505417-6644f53c9eec?q=80&w=600&auto=format&fit=crop", publishedYear: 1953 },
    { title: "Moby Dick", author: "Herman Melville", category: "Adventure", description: "The narrative of Captain Ahab's quest.", price: 16.99, stock: 25, image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop", publishedYear: 1851 },
    { title: "War and Peace", author: "Leo Tolstoy", category: "Historical", description: "A novel chronicling the French invasion of Russia.", price: 18.99, stock: 20, image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=600&auto=format&fit=crop", publishedYear: 1869 },
    { title: "The Odyssey", author: "Homer", category: "Epic", description: "An ancient Greek epic poem.", price: 10.99, stock: 55, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop", publishedYear: -800 },
    { title: "Frankenstein", author: "Mary Shelley", category: "Horror", description: "A novel about a young scientist who creates a sapient creature.", price: 12.99, stock: 40, image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=600&auto=format&fit=crop", publishedYear: 1818 },
    { title: "Dracula", author: "Bram Stoker", category: "Horror", description: "A Gothic horror novel.", price: 11.99, stock: 50, image: "https://images.unsplash.com/photo-1555679427-1f6dfcce943b?q=80&w=600&auto=format&fit=crop", publishedYear: 1897 },
    { title: "The Picture of Dorian Gray", author: "Oscar Wilde", category: "Classic", description: "A philosophical novel.", price: 9.99, stock: 65, image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=600&auto=format&fit=crop", publishedYear: 1890 },
    { title: "Jane Eyre", author: "Charlotte Brontë", category: "Romance", description: "A novel that follows the experiences of its eponymous heroine.", price: 14.99, stock: 30, image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=600&auto=format&fit=crop", publishedYear: 1847 },
    { title: "Brave New World", author: "Aldous Huxley", category: "Dystopian", description: "A dystopian social science fiction novel.", price: 13.99, stock: 45, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop", publishedYear: 1932 },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien", category: "Fantasy", description: "An epic high fantasy novel.", price: 29.99, stock: 15, image: "https://images.unsplash.com/photo-1629196914168-98f5a6b07c80?q=80&w=600&auto=format&fit=crop", publishedYear: 1954 },
    { title: "Crime and Punishment", author: "Fyodor Dostoevsky", category: "Classic", description: "A novel about the mental anguish and moral dilemmas of Rodion Raskolnikov.", price: 15.99, stock: 25, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop", publishedYear: 1866 },
    { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", description: "A novel about an Andalusian shepherd boy named Santiago.", price: 14.99, stock: 60, image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop", publishedYear: 1988 },
    { title: "The Little Prince", author: "Antoine de Saint-Exupéry", category: "Children", description: "A novella that explores themes of loneliness, friendship, love, and loss.", price: 10.99, stock: 80, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop", publishedYear: 1943 },
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fantasy", description: "A fantasy novel about a young wizard.", price: 19.99, stock: 100, image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop", publishedYear: 1997 }
  ];

  return { users, books };
};

const importData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    const { users, books } = await seedData();
    const createdUsers = await User.insertMany(users);
    
    await Book.insertMany(books);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
