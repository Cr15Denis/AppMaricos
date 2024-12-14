import { useState, useEffect } from "react";

export default function ProductList() {
   const [products, setProducts] = useState([]);
   const [cart, setCart] = useState([]);
   const [quantities, setQuantities] = useState({});

   // Consumir la API
   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await fetch(
               "https://localhost:7282/leer/productos"
            );
            if (!response.ok)
               throw new Error("Error al obtener los productos.");
            const data = await response.json();
            setProducts(data);
         } catch (error) {
            console.error("Error al consumir la API:", error.message);
         }
      };
      fetchProducts();
   }, []);

   // Cambiar cantidad en el stepper
   const handleQuantityChange = (id, increment) => {
      setQuantities((prev) => ({
         ...prev,
         [id]: Math.max(1, (prev[id] || 1) + increment),
      }));
   };

   // Añadir al carrito
   const handleAddToCart = (productId) => {
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      const quantity = quantities[productId] || 1;

      setCart((prevCart) => {
         const existingItem = prevCart.find((item) => item.id === productId);
         if (existingItem) {
            return prevCart.map((item) =>
               item.id === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
            );
         } else {
            return [
               ...prevCart,
               {
                  id: productId,
                  name: product.nombre,
                  price: product.precioLibra,
                  quantity,
                  available: product.librasDisponibles,
               },
            ];
         }
      });

      setQuantities((prev) => ({ ...prev, [productId]: 1 })); // Resetear cantidad
   };

   return (
      <div className="flex h-screen w-full bg-[#e4e4e4e4]">
         {/* Listado de productos */}
         <div className="flex-1 grid grid-cols-6 gap-4 p-6">
            {products.length > 0 ? (
               products.map((product) => (
                  <div
                     key={product.id}
                     className="p-4 bg-white border rounded-lg shadow-md h-48 flex flex-col justify-between">
                     <h3 className="mt-2 text-lg font-semibold">
                        {product.nombre}
                     </h3>
                     <p className="text-gray-500">
                        Q{product.precioLibra.toFixed(2)} por libra
                     </p>
                     <p className="text-sm text-gray-400">
                        Disponibles: {product.librasDisponibles} lbs
                     </p>

                     {/* Stepper y botón */}
                     <div className="flex items-center mt-2">
                        <button
                           className="bg-red-500 text-white px-3 py-1 rounded-l hover:bg-red-600"
                           onClick={() => handleQuantityChange(product.id, -1)}>
                           -
                        </button>
                        <span className="px-4 border-y border-gray-300">
                           {quantities[product.id] || 1}
                        </span>
                        <button
                           className="bg-red-500 text-white px-3 py-1 rounded-r hover:bg-red-600"
                           onClick={() => handleQuantityChange(product.id, 1)}>
                           +
                        </button>
                     </div>
                     <button
                        className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
                        onClick={() => handleAddToCart(product.id)}>
                        Añadir al carrito
                     </button>
                  </div>
               ))
            ) : (
               <p className="text-gray-500">Cargando productos...</p>
            )}
         </div>

         {/* Carrito */}
         <div className="w-80 bg-white border-l shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Carrito</h2>
            {cart.length > 0 ? (
               cart.map((item) => (
                  <div key={item.id} className="mb-4">
                     <h3 className="text-lg font-semibold">{item.name}</h3>
                     <p className="text-gray-500">
                        Q{item.price.toFixed(2)} por libra
                     </p>
                     <p className="text-gray-500">Cantidad: {item.quantity}</p>
                     <p className="text-gray-500">
                        Subtotal: Q{(item.price * item.quantity).toFixed(2)}
                     </p>
                  </div>
               ))
            ) : (
               <p className="text-gray-500">El carrito está vacío.</p>
            )}
            <hr className="my-4" />
            <p className="flex justify-between text-lg font-bold">
               <span>Total:</span>
               <span>
                  Q
                  {cart
                     .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                     )
                     .toFixed(2)}
               </span>
            </p>
            <button className="w-full bg-green-500 text-white mt-4 py-2 rounded hover:bg-green-600">
               Finalizar Compra
            </button>
         </div>
      </div>
   );
}
