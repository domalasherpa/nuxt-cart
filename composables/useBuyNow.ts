import { defineStore } from "pinia";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import type { Item } from "~/types/cartItem";

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const useBuyNow = defineStore('buyNow',()=> {
    const Item = ref<Item | null>();

    const addItem = (product:Omit<Item, 'quantity'>, quantity: number)=>{
        Item.value = {...product, quantity};
    }

    const buyNowItem = ():Item=>{
        return Item.value ?? {} as Item;
    }
    
    const clearBuyNowItem = ()=>{
        Item.value = null
    }

    return {
        Item, 
        addItem,
        buyNowItem,
        clearBuyNowItem
    }
});