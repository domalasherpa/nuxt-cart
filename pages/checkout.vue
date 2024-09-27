<script setup lang="ts">
    import { useSelectedItems } from '~/composables/useSelectedItems.js';
    import { useCartStore } from '~/composables/useCartStore.js';

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

    const route = useRoute();
    const router = useRouter();

    const fromBuyNow = route.query.from === 'buy-now';
    const cartStore = useCartStore();
    const selectedItemsStore = useSelectedItems();
    const buyNowStore = useBuyNow();
    const product = ref<Item>();

    if(fromBuyNow){
        product.value = buyNowStore.buyNowItem();
    }

    const handlePlaceOrder = ()=>{
        alert("order placed sucessfully.");
        if(fromBuyNow){
            buyNowStore.clearBuyNowItem();
        }
        else{
            Object.keys(selectedItemsStore.selectedItems).forEach(productId => {
                selectedItemsStore.removeItem(Number(productId));
                cartStore.removeItem(Number(productId));
            })
        }
        router.push('/products');
    }
</script>
<template>
    <div v-if="fromBuyNow || selectedItemsStore.selectedItemsCount > 0" class="flex flex-col md:flex-row md:justify-center w-full gap-4 lg:w-9/12 lg:gap-8">
        <div v-if="fromBuyNow && product" class="space-y-2 p-0 lg:w-5/12">
            <div class="flex gap-4 border-2 p-4">
                <div class="h-20 w-auto"><img :src="product.image" alt="" class="w-full h-full object-contain"></div>
                <div class="space-y-2">
                    <div class="font-semibold text-gray-700">{{ product.title }}</div>
                    <div class="text-gray-400 text-sm font-semibold">
                        <p class="space-x-2"><span>Price:</span><span>Rs.{{ product.price }}</span></p>    
                        <p class="space-x-2"><span>Qty:</span><span>{{ product.quantity }}</span></p>    
                    </div>
                    <div class="text-orange-600 font-semibold">
                        <p class="space-x-1"><span>Rs.</span><span>{{ Number(product.quantity * product.price).toFixed(2) }}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="selectedItemsStore" class="space-y-2 p-0 lg:w-5/12">
            <div v-for="item in selectedItemsStore.selectedItems" class="flex gap-4 border-2 p-4">
                <div class="h-20 w-auto"><img :src="item.image" alt="" class="w-full h-full object-contain"></div>
                <div class="space-y-2">
                    <div class="font-semibold text-gray-700">{{ item.title }}</div>
                    <div class="text-gray-400 text-sm font-semibold">
                        <p class="space-x-2"><span>Price:</span><span>Rs.{{ item.price }}</span></p>    
                        <p class="space-x-2"><span>Qty:</span><span>{{ item.quantity }}</span></p>    
                    </div>
                    <div class="text-orange-600 font-semibold">
                        <p class="space-x-1"><span>Rs.</span><span>{{ Number(item.quantity * item.price).toFixed(2) }}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="border-2 lg:w-4/12 p-0">
            <div class="font-semibold text-gray-700 space-y-2 w-full p-4">
                <h1 class="">Order Summary</h1>
                <p v-if="fromBuyNow && product" class="space-x-2"><span>Total</span><span class="text-orange-500">Rs. {{ Number(product.quantity * product.price).toFixed(2) }}</span></p>

                <p v-else class="space-x-2"><span>Total</span><span class="text-orange-500">Rs. {{ selectedItemsStore.total }}</span></p>

                <button class="w-full bg-orange-500 font-bold text-white p-2 rounded-sm hover:bg-orange-600" @click="handlePlaceOrder">Place Order</button>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Please select the items in <NuxtLink to="/cart" class="underline text-blue-900 font-semibold">Carts</NuxtLink></p>
    </div>
</template>