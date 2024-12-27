import User from '../model/User.js';

const registerUser = async (req, res) => {
  try {
    const { name, phone, city } = req.body;

    // Validate input data
    if (!name || !phone || !city) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ error: 'Phone must be 10 digits' });
    }

    // Check if the phone already exists
    // const existingUser = await User.findOne({ phone });
    // if (existingUser) {
    //   return res.status(400).json({ error: 'Phone number already registered' });
    // }

    // Create new user
    const newUser = new User({
      name,
      phone,
      city,
    });

    await newUser.save();

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred during registration' });
  }
};

export { registerUser };
