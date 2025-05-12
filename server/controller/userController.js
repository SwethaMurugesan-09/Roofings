import Users from '../models/Users.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'swetha'; 

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, number } = req.body;

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({
            name,
            email,
            password: hashedPassword,
            number,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id).populate('favourites');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

export const addFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.favourites.includes(productId)) {
            return res.status(400).json({ message: 'Product already in favorites' });
        }

        user.favourites.push(productId);
        await user.save();

        res.status(200).json({ message: 'Product added to favorites', favourites: user.favourites });
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite', error: error.message });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.favourites = user.favourites.filter(id => id.toString() !== productId);
        await user.save();

        res.status(200).json({ message: 'Product removed from favorites', favourites: user.favourites });
    } catch (error) {
        res.status(500).json({ message: 'Error removing favorite', error: error.message });
    }
};

export const syncFavourites = async (req, res) => {
  try {
    const { userId, favourites } = req.body;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const uniqueFavourites = favourites.filter(
      id => !user.favourites.includes(id)
    );

    if (uniqueFavourites.length > 0) {
      user.favourites.push(...uniqueFavourites);
      await user.save();
    }

    res.status(200).json({
      message: 'Favourites synced successfully',
      favourites: user.favourites
    });
  } catch (error) {
    console.error("Sync error:", error); 
    res.status(500).json({ message: 'Error syncing favourites', error: error.message });
  }
};
