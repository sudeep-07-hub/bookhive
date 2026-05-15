import User from '../models/User.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      if (user.role === 'Admin') {
        res.status(400);
        throw new Error('Cannot delete admin user');
      }
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'User removed' });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get Admin Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments({});
    const Book = (await import('../models/Book.js')).default;
    const Order = (await import('../models/Order.js')).default;
    const booksCount = await Book.countDocuments({});
    const ordersCount = await Order.countDocuments({});
    
    const orders = await Order.find({});
    const revenue = orders.reduce((acc, item) => acc + item.totalAmount, 0);

    res.json({
      users: usersCount,
      books: booksCount,
      orders: ordersCount,
      revenue: revenue.toFixed(2)
    });
  } catch (error) {
    next(error);
  }
};
