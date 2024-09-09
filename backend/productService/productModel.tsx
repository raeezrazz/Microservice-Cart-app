import mongoose, {Document , Schema} from 'mongoose';

export interface Iporduct extends Document {
    name:string ,
    price:number
}

const ProductSchema : Schema = new Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
})

const Product = mongoose.model<Iporduct>('Product', ProductSchema);
export default Product;