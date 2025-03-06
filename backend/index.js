import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes.js"
import authRoutes from "./routes/authRoutes.js";

// Load environment variables
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5555;

//middleware for parsing request body
app.use(express.json());

//Middleware for handling cors policy
//Option 1 Allow all orgins with defualt of cors(*)
app.use(cors())

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use('/books', bookRoutes)
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to database');
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    });
