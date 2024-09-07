import React ,{useEffect,useState} from 'react'
import { FaPlusCircle, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { clearToken } from '../store/Auth';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '../store/AuthStore';

interface Product {
    _id:string;
    name:string;
    price:number;
}

function ListProduct() {

const [products , setProducts] =  useState<Product[]>([]);
const [name,setName] = useState<string>('')
const [price , setPrice] = useState <number | string>('')
const [loading , setLoading] = useState(false);

const userId = useSelector((state: RootState)=> state.auth.userId);
const dispatch = useDispatch()
const navigate = useNavigate();


    const fetchProducts = async ()=>{
        setLoading(true);

        try {
            const response = await axios.get<Product[]>('http://localhost:4001/products',{
                withCredentials:true
            });
            setProducts(response.data)
        } catch (error) {
            console.log(error,'error fetching product')
        }finally{
            setLoading(false);
        }
    }

    const addProduct = async (e: React.FormEvent)=>{
        e.preventDefault();
        if(name === '' || price === '') return ;

        try{
            const response = await axios.post<Product>('http://localhost:4001/add-products',{
                name,
                price:Number(price)
            },{
                withCredentials:true
            });

            setProducts([...products , response.data]);
            setName('');
            setPrice('');
            toast.success('Product added');


        }catch(error){
            console.error('Error adding product', error)
            toast.error('Failed to add product.');
        }
    }


    const handleCart = async (id: string)=>{
        console.log(id, ' here is the id')
        try {
            
            const response = await axios.post('http://localhost:4001/add-to-cart',{
                userId,
                productId:id
            },{
                withCredentials:true
            });

            if(response.data.error){
                toast.error('Product already added');

            }else{
                toast.success('Product added to cart!')
                navigate('/');
            }

        } catch (error) {
            console.error('here is te error',error)
        }
    }


    const handleLogout = async () => {
        try {
          await axios.get('http://localhost:4000/logout', { withCredentials: true });
          dispatch(clearToken());
          navigate('/login');
        } catch (error) {
          console.error('Error during logout', error);
          toast.error('Failed to logout.');
        }
      };

      useEffect(()=>{
        fetchProducts()
      },[])

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
    <ToastContainer />
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-6xl mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800">
          <FaShoppingCart className="inline mr-2" /> Products
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center space-x-2"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
      <form className="space-y-4 mb-6" onSubmit={addProduct}>
        <div className="flex flex-col mb-4">
          <label className="text-gray-600 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg py-2 px-4"
            placeholder="Product Name"
            required
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-gray-600 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-lg py-2 px-4"
            placeholder="Product Price"
            required
            step="0.01"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
        >
          <FaPlusCircle className="inline mr-2" /> Add Product
        </button>
      </form>
      {products.length === 0 ? (
        <h1 className="text-center text-gray-600">No Products Available</h1>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-lg">
                <img src="https://via.placeholder.com/100" alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">₹{product.price.toFixed(2)}</p>
                <button
                  onClick={() => handleCart(product._id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center space-x-2"
                >
                  <FaPlusCircle />
                  <span>Add to Cart</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    <Link to="/cart">
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center space-x-2">
        <FaShoppingCart />
        <span>Go to Cart</span>
      </button>
    </Link>
  </div>
);
};

export default ListProduct
