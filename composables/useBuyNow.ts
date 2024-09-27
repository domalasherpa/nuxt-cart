import { defineStore } from "pinia";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

interface Item {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	availableQuantity: number;
    quantity:number;
}

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