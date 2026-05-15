import Book from '../models/Book.js';

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
export const getBooks = async (req, res, next) => {
  try {
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const books = await Book.find({ ...keyword });
    res.json(books);
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
export const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      res.json(book);
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
export const createBook = async (req, res, next) => {
  try {
    const { title, author, category, description, price, stock, image, publishedYear } = req.body;
    
    const book = new Book({
      title,
      author,
      category,
      description,
      price,
      stock,
      image: image || 'https://via.placeholder.com/150',
      publishedYear
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
export const updateBook = async (req, res, next) => {
  try {
    const { title, author, category, description, price, stock, image, publishedYear } = req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = title || book.title;
      book.author = author || book.author;
      book.category = category || book.category;
      book.description = description || book.description;
      book.price = price || book.price;
      book.stock = stock || book.stock;
      book.image = image || book.image;
      book.publishedYear = publishedYear || book.publishedYear;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await Book.deleteOne({ _id: book._id });
      res.json({ message: 'Book removed' });
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    next(error);
  }
};
