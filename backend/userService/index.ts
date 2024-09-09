import express, {Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User, {userModel} from './userModel';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import authentication from './authentication';

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true
}))

mongoose
    .connect('mongodb://localhost:27017/kafka-user')
    .then(()=> {
        console.log('connected to MongoDB')
    })
    .catch((error)=> {
        console.error('Error connecting to mongodb',error)
    })


app.post('/signup', async(req: Request, res: Response)=> {
    const { name, password, email } = req.body;
    console.log(req.body)

    const newUser = new User({ name, password, email})

    try {
        const user = await newUser.save();
        res.status(200).send(user)
    } catch (error) {
        console.error(error);
        res.status(500).send({error: 'Error creating user'})
    }
})

app.get('/users/:id',authentication, async(req: Request, res:Response) => {
    const userId = req.params.id;

    try {
        const newUser = await User.findById(userId)

        if(!newUser) {
            return res.status(500).send({error: 'User not found'})
        }

        return res.status(200).send(newUser.name)
    } catch (error) {
        console.error(error)
        res.status(500).send({error: "Error retrieving user"})
    }
})

app.get('/logout', async(req: Request, res: Response) => {
    try {
        
        res.clearCookie('token', {
            httpOnly: true,
        })

        res.status(200).send({message: "logged out"})
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).send({ error: "Error loging out user" });
    }
})

app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user.id }, 'secret-token', { expiresIn: '1h' });
        console.log(token,"tknnnnnnnnnnnnnnnnnnnnnnn")
        res.cookie('token', token, { httpOnly: true });
        res.status(200).send({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error logging in' });
    }
});

const Port = 4000;

app.listen(Port, ()=> {
    console.log(`user-service is running on port ${Port}`)
})
