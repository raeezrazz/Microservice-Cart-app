import express, {Request, Response} from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import Product from '../productModel';
import  cookieParser  from 'cookie-parser';
import authentication from '../authentication';

const app = express()
app.use(cookieParser())

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

mongoose.connect('mongodb://localhost:27017/miniKart-kafka')
.then(()=> {
    console.log('Connected to Mongodb')
})
.catch((error) => {
    console.error('Error connecting to MongoDB:',error)
})

app.post('/add-products',authentication , async(req:Request, res:Response)=>{
    const {name ,price} = req.body;

    const newProduct = new Product({name, price})

    try {

        const product = newProduct.save()
        res.status(200).send(product)

    } catch (error) {
        console.log(error);
        res.status(500).send({error: ' Error  creating product'})
    }

})

app.get('/products',authentication, async (req: Request, res: Response) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching products' });
    }
  });


app.post('/add-to-cart',authentication , async(req: Request , res: Response)=>{
    const {userId , productId } = req.body;

    try{
        const product = await Product.findById(productId)

        if(!product){
            console.log('new product added')
            return res.status(404).send({error: 'Product not found'})
        }

        // addToCartEvent(product,userId)

        res.status(200).send('successfully added to cart')
    }catch(error){
        console.log('Error adding to cart:',error)
        res.status(500).send({ error: "Error adding to cart" });
    }
})



app.listen(4001,()=>{
    console.log('server started at http://localhost:4001')
})
