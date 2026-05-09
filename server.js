
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("MongoDB Error:", err));

// // ================= MODELS =================

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: String,
// });

// const productSchema = new mongoose.Schema({
//   brand: String,
//   name: String,
//   price: Number,
//   original: Number,
//   category: String,
//   rating: Number,
//   reviews: Number,
//   image: String,
// });

// const cartSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   productId: mongoose.Schema.Types.ObjectId,
//   qty: Number,
// });

// const orderSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   items: Array,
//   total: Number,
//   address: String,
//   status: {
//     type: String,
//     default: "Confirmed",
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const User = mongoose.model("User", userSchema);
// const Product = mongoose.model("Product", productSchema);
// const Cart = mongoose.model("Cart", cartSchema);
// const Order = mongoose.model("Order", orderSchema);

// // ================= ROUTES =================

// app.get("/", (req, res) => {
//   res.json({ message: "Fashion Store API Running" });
// });

// // ================= PRODUCTS =================

// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json({ success: true, products });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// app.get("/api/products/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ success: false, message: "Product not found" });
//     }

//     res.json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Add Product
// app.post("/api/products", async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();

//     res.json({
//       success: true,
//       message: "Product added successfully",
//       product,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ================= AUTH =================

// app.post("/api/auth/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email already exists" });
//     }

//     const user = new User({
//       name,
//       email,
//       password,
//     });

//     await user.save();

//     res.json({
//       success: true,
//       message: "User registered successfully",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // Login
// app.post("/api/auth/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email, password });

//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid credentials" });
//     }

//     res.json({
//       success: true,
//       message: "Login successful",
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ================= CART =================

// app.get("/api/cart/:userId", async (req, res) => {
//   try {
//     const cart = await Cart.find({ userId: req.params.userId });

//     res.json({ success: true, cart });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// app.post("/api/cart", async (req, res) => {
//   try {
//     const cart = new Cart(req.body);

//     await cart.save();

//     res.json({
//       success: true,
//       message: "Added to cart",
//       cart,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ================= ORDERS =================

// app.post("/api/orders", async (req, res) => {
//   try {
//     const order = new Order(req.body);

//     await order.save();

//     res.json({
//       success: true,
//       message: "Order placed successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// app.get("/api/orders/:userId", async (req, res) => {
//   try {
//     const orders = await Order.find({ userId: req.params.userId });

//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ================= SERVER =================

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: "https://plated-hangout-355004.web.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ================= MONGODB CONNECTION =================
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Error:", err));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ MongoDB Error:", err);
  });

// ================= MODELS =================

// User Model
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Product Model
const productSchema = new mongoose.Schema({
  brand: String,
  name: String,
  price: Number,
  original: Number,
  category: String,
  rating: Number,
  reviews: Number,
  image: String,
});

// Cart Model
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  qty: {
    type: Number,
    default: 1,
  },
});

// Order Model
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: Array,
  total: Number,
  address: String,
  status: {
    type: String,
    default: "Confirmed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);
const Cart = mongoose.model("Cart", cartSchema);
const Order = mongoose.model("Order", orderSchema);

// ================= ROOT =================
app.get("/", (req, res) => {
  res.json({ message: "Fashion Store API Running 🚀" });
});

// ================= PRODUCTS =================

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get single product
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Add product
app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ================= AUTH =================

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ================= CART =================

// Get user cart
app.get("/api/cart/:userId", async (req, res) => {
  try {
    const cart = await Cart.find({
      userId: req.params.userId,
    }).populate("productId");

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Add to cart
app.post("/api/cart", async (req, res) => {
  try {
    const { userId, productId, qty } = req.body;

    const existingCart = await Cart.findOne({
      userId,
      productId,
    });

    if (existingCart) {
      existingCart.qty += qty || 1;
      await existingCart.save();

      return res.json({
        success: true,
        message: "Cart updated",
        cart: existingCart,
      });
    }

    const cart = new Cart({
      userId,
      productId,
      qty,
    });

    await cart.save();

    res.json({
      success: true,
      message: "Added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ================= ORDERS =================

// Place order
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);

    await order.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get user orders
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId,
    });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});