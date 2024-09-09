import express, { Request, Response } from "express";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import Cart, { CartItem } from "./cartModel";
import consumer from "./cartConsumer";
import cookieParser from 'cookie-parser';
import authentication from "./authentication";

consumer;

const app = express()
app.use(cookieParser())

interface IProduct {
    name: string;
    price: number;
    id: mongoose.Schema.Types.ObjectId;
}

interface IUser {
    name: string;
    id: mongoose.Schema.Types.ObjectId;
}

app.use(express.json());
const allowedOrigins = ['http://localhost:5000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
mongoose
    .connect('mongodb://localhost:27017/kafka-cart')
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log("Error Connecting to MongoDB:" , error)
    })

    export async function addToCart(userId: string, product: CartItem) {

        console.log(userId,"cartuseriddddddddddddddd")
        try {
            let cart = await Cart.findOne({userId})

            if(!cart) {
                cart = new Cart({userId, products: []})
            }

            cart.products.push(product);

            await cart.save()
            console.log(`Product added to cart for user ${userId}`)
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    }

    app.get('/cart/:id',authentication, async (req: Request, res: Response) => {
        try {
            const cartItems = await Cart.findOne({userId: req.params.id})

            console.log(req.params.id,"reqparamassdfasfsfsss")
            
            console.log(cartItems)
            res.json({cartItems});

        } catch (error) {
            res.status(500).send({ error: "Error fetching cart items" });
        }
    })

    const PORT = 4002;

    app.listen(PORT, () => {
        console.log(`cart-service is running on port ${PORT}`)
    })