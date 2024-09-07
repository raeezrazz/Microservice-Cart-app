import express, { Request, Response } from 'express'; 
import cors from 'cors';
import User from '../userModel'
import mongoose from 'mongoose';
// import User
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import authenticateToken from './authentication';

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

mongoose.connect('mongodb://localhost:27017/miniKart-kafka')
    .then(()=>{
        console.log("mongodb connected successfully")
    })
    .catch((error)=>{
        console.log(error.message)
    })

    app.post('/signup', async(req:Request , res: Response)=>{
        const {name, email, password} =req.body;
        console.log(name,email,password)

        const newUser = new User({name,password, email})

        try{
            const user = await newUser.save()
            res.status(200).send(user)
        }catch(error){
            console.log(error)
            res.status(500).send({error: 'Error creating user'})
        }
    })


    app.get('/users/:id',authenticateToken , async(req: Request , res:Response)=>{
        const userId =req.params.id;

        try{
            const newUser = await User.findById(userId)

            if(!newUser){
                return res.status(500).send({error: 'User not found'})
            }

            return res.status(200).send(newUser.name)
        }catch(error){
            console.log(error)
            res.status(500).send({error:'Error retrieving user'})
        }
    })

    app.get('/logout',async(req:Request , res: Response)=>{
        try {
            res.clearCookie('token',{
                httpOnly:true,
            })
            res.status(200).send({message: ' Logged out'})
        } catch (error) {
            console.log(error,"error retireving user")
            res.status(500).send({error : ' Error logging out user'})
        }
    })

    app.post('/login',async(req:Request , res: Response)=>{
        const {email,password}= req.body
        try {
            const user= await User.findOne({email});
            if(!user || user.password !== password){
                return res.status(401).send({error:"Invalid email or password"});
            }
            const token = jwt.sign({userId:user.id},'secret-token',{expiresIn:'1h'});

            console.log('reached here successfully',token)
            res.cookie('token',token,{httpOnly:true});
            res.status(200).send({token});
        } catch (error) {
            console.log(error)
            res.status(500).send({error:'Error loggin in'})
        }
    })

app.listen(4000,()=>{
    console.log('server running on http://localhost:4000')
})

