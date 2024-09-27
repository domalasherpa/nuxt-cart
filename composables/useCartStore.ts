import { defineStore } from "pinia";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { Product } from '~/types/product';
import type { Item } from '~/types/cartItem.js';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

interface Cart{
    [key:number] : Item
}

export const useCartStore = defineStore('cartStore', ()=>{
    const carts = reactive<Cart>({});
    const cartsSize = computed(()=>{return Object.entries(carts).length});

    const isCartEmpty = computed(() => {
        return Object.entries(carts).length === 0;
    });


    const increaseQnty= (productId:number)=>{
        if(carts[productId].quantity < carts[productId].availableQuantity){
            carts[productId].quantity += 1;
        }
    }

    const decreaseQnty = (productId:number)=>{    
        if(carts[productId].quantity > 1){
            carts[productId].quantity -= 1;
        }
    }

    const setQuantity=(productId:number, newQuantity:number)=>{
        if(productId in carts && carts[productId].availableQuantity > newQuantity){
            carts[productId].quantity = newQuantity;
        }
    }

    const addItem = (product:Product, quantity:number)=>{
        if(product.id in carts){
            carts[product.id].quantity += quantity; 
        }
        else{
            carts[product.id] = {...product, quantity: quantity}; 
        }
    }
    
    const removeItem= (productId:number)=>{
        delete carts[productId];
    }

    return {
        carts,
        cartsSize, 
        isCartEmpty, 
        increaseQnty,
        decreaseQnty,
        setQuantity,
        addItem,
        removeItem
    }
}, {
    persist: true
})