<script setup lang="ts">

import { useCartStore } from '~/composables/useCartStore';
import { useBuyNow } from '~/composables/useBuyNow';
import type { Product } from '~/types/product';

const route = useRoute();
const router = useRouter();
const carts = useCartStore();
const buyNowItem = useBuyNow();

const minQuantity = 1;
const quantity = ref(minQuantity);

const product = ref<Product>();

const {data,status} = await useFetch<Product>(`https://fakestoreapi.com/products/${route.params.id}`);
if(status.value === 'success' && data.value){
	product.value = data.value;
	product.value.availableQuantity = Math.floor(Math.random() * 100) + 1;
}

const addToCart = ()=>{
	if(product.value?.id){
		carts.addItem(product.value, quantity.value);
		alert("added to carts");
	}
	else{
		alert("product not available");
	}
}

const handleQuantityDcr = () => {
	if (quantity.value > 1) {
		quantity.value -= 1;
	}
}

const handleQuantityInc = () => {
	if(product.value?.availableQuantity){
		if (quantity.value < product.value.availableQuantity) {
			quantity.value += 1;
		} else {
			alert("Please choose up to the available quantity only.");
		}
	}
};

const handleInputQuantity = (event:Event) => {
	const target = event.target as HTMLInputElement;
	const inputQuantity = Number(target.value) ;

	if(isNaN(inputQuantity) || inputQuantity < 1){
		quantity.value = minQuantity;
		target.value = minQuantity.toString();
		alert("Please enter a valid quantity");
	}
	else if(product.value?.availableQuantity){
		if (inputQuantity > product.value.availableQuantity ) {
			quantity.value = product.value.availableQuantity;
		}
		else{
			quantity.value = inputQuantity;
		}
	}
}

const handleBuyNow = ()=>{
	if(product.value){
		buyNowItem.addItem(product.value, quantity.value);
		router.push({ 
			path:'/checkout',
			query: { 
				from: 'buy-now'
			},
		});
	}
}
</script>

<template>
	<div v-if="status === 'error'" class="text-center">
		<p>Something went wrong</p>
	</div>
	<div v-else-if="product" class="flex flex-col w-screen items-center">
		<div class="m-4 lg:w-1/2 flex-row md:flex space-x-10 border-2 py-4">
			<div class="h-40 lg:min-h-80 md:w-1/2">
				<img :src="product.image" :alt="product.title" class="p-2 h-full w-full object-contain" />
			</div>
			<div class="flex flex-col space-y-2 md:w-1/2">
				<div>
					<h1 class="text-xl font-semibold my-4">{{ product.title }}</h1>
					<p class="space-x-4"><span class="text-gray-600 font-bold">Price:</span><span
							class="text-gray-500 font-semibold">Rs. {{ product.price }}</span></p>
					<p class="space-x-4"><span class="text-gray-600 font-bold">Available quantity:</span><span
							class="text-gray-500 font-semibold">{{ product.availableQuantity }}</span></p>
				</div>
				<div class="flex text-gray-600 font-semibold space-x-4">
					<p>Quantity</p>
					<div class="space-x-4">
						<button 
							:class="{'cursor-not-allowed': quantity === 1}"
							@click="handleQuantityDcr">-</button>
						<input 
							class="w-10 text-center border-2 border-gray-200 no-spinner" 
							type="number" 
							v-model.number="quantity"
							:min="minQuantity"
							:max="product.availableQuantity"
							@change="handleInputQuantity($event)" placeholder="1" />
						<button @click="handleQuantityInc">+</button>
					</div>
				</div>
				<div class="space-x-2 w-full flex">
					<button class="bg-blue-400 px-4 py-1 font-semibold text-white" @click="handleBuyNow">Buy Now</button>
					<button class="bg-orange-400 px-4 py-1 font-semibold text-white" @click="addToCart">Add to
						Cart</button>
				</div>
			</div>
		</div>
		<div class="lg:w-1/2 mx-4 space-y-4">
			<h1 class="sm:text-sm md:text-xl font-bold text-gray-600">Product Description</h1>
			<p class="text-gray-500 font-semibold sm:text-xs md:text-sm">{{ product.description }}</p>
		</div>
	</div>
</template>

<style scoped>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type=number] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>