// app.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// These lines are needed to get __dirname in ES modules



// Routes
import authRoutes from "./routes/user.route.js";
import productRoutes from "./routes/product.route.js"
import cartRoutes from './routes/cart.route.js';
import orderRoutes from './routes/order.route.js';


const app = express();

// Middlewares — in exact order
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "public/products/uploads")));

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);



// 404 Route
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
