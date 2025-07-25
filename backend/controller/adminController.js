const User = require('../models/user');
const Upload = require('../models/upload');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

exports.getAllUploads = async (req, res) => {
  try {
    const upload = await Upload.find().populate('user', 'name email');
    res.json(upload);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching uploads', error });
  }
};
