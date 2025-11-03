import React from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from "react-hot-toast"


const ProductList = () => {

    const {products, currency, axios,fetchProducts} = useAppContext()
    const toggleStock = async(id,inStock) => {
        try {
            const {data} = await axios.post('/api/product/stock',{id,inStock})
            if(data.success){
                fetchProducts();
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">All Products</h2>
                <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Product</th>
                                <th className="px-4 py-3 font-semibold truncate">Category</th>
                                <th className="px-4 py-3 font-semibold truncate hidden md:table-cell">Selling Price</th>
                                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {products?.map((product) => (
                                <tr key={product._id} className="border-t border-gray-500/20">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="border border-gray-300 rounded overflow-hidden flex-shrink:0">
                                                <img src={product.image[0]} alt="Product" className="w-16 h-16 object-cover" />
                                            </div>
                                            <span className="truncate max-sm:hidden">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">{product.category}</td>
                                    <td className="px-4 py-3 hidden md:table-cell">{currency}{product.offerPrice}</td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-block w-12 h-7 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={product.inStock}
                                            onChange={() => toggleStock(product._id, !product.inStock)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-full h-full bg-slate-300 peer-checked:bg-primary rounded-full transition-colors duration-200"></div>
                                        <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                    </label>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductList