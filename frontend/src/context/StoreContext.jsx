import { createContext, useEffect, useState } from "react";

import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
    
    const [cartItems, setCartItems ] = useState({});
    const [foodList, setFoodList ] = useState([]);
    const [token, setToken] = useState('');
    const url = 'https://food-delivering-app-6.onrender.com';

    useEffect(() => {
        console.log("Cart Items:", cartItems);
        console.log("token", token)
    }, [cartItems]);

    const loadCartData = async(token) => {
        try {
            const response = await axios.get(url+"/api/cart/get", {
                headers: { token: token }
            });
            if(response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch(error) {
            console.log("Error loading cart:", error);
        }
    };

    const addToCart = async(itemId) => {
        try {
            if(!token) return; // Don't proceed if not logged in
            
            const response = await axios.post(url+"/api/cart/add", 
                { itemId }, 
                { headers: { token: token }}
            );
            
            if(response.data.success) {
                if(!cartItems[itemId]){
                    setCartItems(prev => ({...prev,[itemId]: 1}));
                } else {
                    setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}));
                }
            }
        } catch(error) {
            console.log("Error adding to cart:", error);
        }
    };

    const removeFromCart = async(itemId) => {
        try {
            if(!token) return;

            const response = await axios.post(url+"/api/cart/remove", 
                { itemId }, 
                { headers: { token: token }}
            );
            
            if(response.data.success) {
                setCartItems(prev => ({...prev, [itemId]: prev[itemId] - 1}));
            }
        } catch(error) {
            console.log("Error removing from cart:", error);
        }
    };

    const totalCartAmount = () => {
        let totalAmount = 0;
        if(!foodList.length) return totalAmount;
        
        for(let item in cartItems){
            if(cartItems[item] > 0){
                const itemInfo = foodList.find((product) => product._id === item);
                if(itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async() => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    };

    useEffect(() => {
        async function loadData(){
            await fetchFoodList();
            const storedToken = localStorage.getItem('token');
            if(storedToken){
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }   
        loadData();
    },[]);

    const contextValue = {
        foodList,
        cartItems,
        setCartItems, 
        addToCart, 
        removeFromCart,
        totalCartAmount,
        url,
        token,
        setToken
    };
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
