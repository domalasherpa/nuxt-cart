import { defineStore } from "pinia";
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

interface CartItems {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	availableQuantity: number;
    quantity:number;
}

interface Items{
    [key:number] : CartItems
}

export const useSelectedItems = defineStore('selectedItems', ()=>{
    const selectedItems = reactive<Items>({});

    const total = computed(() => {
        const temp = Object.values(selectedItems).reduce((acc, item) => acc + item.quantity * item.price, 0);
        return parseFloat(temp.toFixed(2));
    });

    const selectedItemsCount = computed(()=>{return Object.keys(selectedItems).length});

    const removeItem = (productId:number)=>{
        delete selectedItems[productId];
    }

    const addItem = (product:CartItems)=>{
        selectedItems[product.id] = product
    }

    return {
        selectedItems, 
        total,
        selectedItemsCount,
        removeItem,
        addItem
    }
}
)