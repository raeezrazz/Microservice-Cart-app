// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { RootState } from '../store/AuthStore';
// import { useNavigate } from 'react-router-dom';

// interface Product {
//   id: string;
//   name: string;
//   price: number;
// }



// const AddProduct: React.FC = () => {

//   const [name, setName] = useState<string>('')
//   const [price, setPrice ] = useState<number | string>('');
//   const [products, setProducts] = useState<Product[]>([])

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
//         <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
//         <form onSubmit={addProduct} className="space-y-4">
//           <div className="flex flex-col">
//             <label className="text-gray-600 mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={newProduct.name}
//               onChange={handleInputChange}
//               className="border rounded-lg py-2 px-4"
//               placeholder="Product Name"
//               required
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-gray-600 mb-2">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={newProduct.price}
//               onChange={handleInputChange}
//               className="border rounded-lg py-2 px-4"
//               placeholder="Product Price"
//               required
//               step="0.01"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
//           >
//             Add Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddProduct;
