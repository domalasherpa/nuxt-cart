<script setup lang="ts">
import { useCartStore } from '~/composables/useCartStore';
import { useSelectedItems } from '~/composables/useSelectedItems';

const CartStore = useCartStore();
const selectedItemsStore = useSelectedItems();

const allSelected = ref(false);
const router = useRouter();

const selectAll = (event:Event) => {
	const target = event.target as HTMLInputElement;
	if (target.checked) {
		Object.keys(CartStore.carts).forEach(productId => {
			selectedItemsStore.addItem(CartStore.carts[Number(productId)]);
		});
	} else {
		Object.keys(selectedItemsStore.selectedItems).forEach(productId => {
			selectedItemsStore.removeItem(Number(productId));
		});
	}
	allSelected.value = target.checked;
};

// if all are not selected or if one unselected then change state of allSelected
const updateAllSelectedState = () => {
	allSelected.value = CartStore.cartsSize === selectedItemsStore.selectedItemsCount;
};

const handleCheckboxToggle = (productId:number) => {
	if (productId in selectedItemsStore.selectedItems) {
		selectedItemsStore.removeItem(productId);
	} else {
		selectedItemsStore.addItem(CartStore.carts[productId]);
	}
	updateAllSelectedState();
};

const removeProduct = (productId:number) => {
	CartStore.removeItem(productId);
	selectedItemsStore.removeItem(productId);
	console.log(CartStore.carts);
	updateAllSelectedState();
};

const handleCheckout = () => {
	router.push({ path:'/checkout'});
};

const handleQuantityDcr = (productId:number) => {CartStore.decreaseQnty(productId)};

const handleQuantityInc = (productId:number) => {CartStore.increaseQnty(productId)};

const handleInputQuantity = (event:Event, productId:number) => {
	const target = event.target as HTMLInputElement;
	const inputQuantity = Number(target.value);
	if (isNaN(inputQuantity) || inputQuantity < 1 || inputQuantity > CartStore.carts[productId].availableQuantity) {
		target.value = CartStore.carts[productId].quantity.toString();
		alert("please enter a valid quantity");
	} else {
		CartStore.setQuantity(productId,inputQuantity);
	}
}
</script>

<template>
	<div v-if="CartStore.isCartEmpty">
		<p>Whoops! your cart is empty.</p>
	</div>
	<div v-else class="w-full flex flex-col items-center mb-8">
		<h1 class="text-xl text-gray-600 font-bold my-2">My Cart</h1>
		<table class="hidden md:block w-full md:w-9/12 text-sm text-left rtl:text-right text-gray-500">
			<thead class="text-xs text-gray-700 uppercase bg-gray-50">
				<tr>
					<th scope="col" class="px-2 py-3">
						<input type="checkbox" class="cursor-pointer" :checked="allSelected" @change="selectAll" />
					</th>
					<th scope="col" class="px-6 py-3">
						<span class="sr-only">Image</span>
					</th>
					<th scope="col" class="px-6 py-3">Product</th>
					<th scope="col" class="px-6 py-3">Qty</th>
					<th scope="col" class="px-6 py-3">Rate</th>
					<th scope="col" class="px-6 py-3">Price</th>
					<th scope="col" class="px-6 py-3">Action</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(product) in CartStore.carts" :key="product.id" class="bg-white border-b hover:bg-gray-50 text-xs">
					<td class="px-2 py-4">
						<input type="checkbox" :value="product.id" class="cursor-pointer"
							:checked="product.id in selectedItemsStore.selectedItems" @change="handleCheckboxToggle(product.id)" />
					</td>
					<td class="py-1">
						<img :src="product.image" class="md:w-16 max-w-full max-h-full" :alt="product.title">
					</td>
					<td class="px-6 py-4 font-semibold text-gray-900">
						<NuxtLink :to="'/products/' + product.id">{{ product.title }}</NuxtLink>
					</td>
					<td class="font-semibold">
						<div class="space-x-2 flex flex-col items-center lg:block">
							<Icon name="heroicons:minus-16-solid" @click="handleQuantityDcr(product.id)" class="w-5 cursor-pointer" />
							<input 
								class="w-10 text-center border-2 border-gray-200 no-spinners"
								type="number"
								:value="product.quantity" 
								@change="handleInputQuantity($event, product.id)"
								placeholder="1" />
							<Icon name="heroicons:plus-16-solid" @click="handleQuantityInc(product.id)" class="w-5 cursor-pointer" />
						</div>
					</td>
					<td class="px-6 py-4 font-semibold text-orange-500">Rs.{{ product.price }}</td>
					<td class="px-6 py-4 font-semibold text-orange-500">Rs.{{ product.price * product.quantity }}</td>
					<td class="px-6 py-4">
						<Icon name="heroicons:trash" @click="removeProduct(product.id)" class="cursor-pointer w-5 h-5" />						 
					</td>
				</tr>
			</tbody>
		</table>
		<div v-if="CartStore.carts" class="space-y-2 p-0 lg:w-5/12 md:hidden">
            <div v-for="item in CartStore.carts" class="flex gap-4 border-2 p-4">
                <div class="h-20 w-auto"><img :src="item.image" alt="" class="w-full h-full object-contain"></div>
                <div class="space-y-2">
                    <div class="font-semibold text-gray-700">{{ item.title }}</div>
                    <div class="text-gray-400 text-sm font-semibold">
                        <p class="space-x-2"><span>Price:</span><span>Rs.{{ item.price }}</span></p>    
                        <p class="space-x-2"><span>Qty:</span><span>{{ item.quantity }}</span></p>    
                    </div>
					<div class="space-x-2">
							<Icon name="heroicons:minus-16-solid" @click="handleQuantityDcr(item.id)" class="w-5 cursor-pointer" />
							<input 
								class="w-10 text-center border-2 border-gray-200 no-spinners"
								type="number"
								:value="item.quantity" 
								@change="handleInputQuantity($event, item.id)"
								placeholder="1" />
							<Icon name="heroicons:plus-16-solid" @click="handleQuantityInc(item.id)" class="w-5 cursor-pointer" />
					</div>
                    <div class="text-orange-600 font-semibold">
                        <p class="space-x-1"><span>Rs.</span><span>{{ Number(item.quantity * item.price).toFixed(2) }}</span></p>
                    </div>
                </div>
            </div>
        </div>
		<div class="fixed bottom-0 bg-white w-full h-16">
			<div class="flex gap-4 items-center justify-center">
				<div class="space-x-2">
					<span class="text-gray-600 font-bold">Subtotal:</span>
					<span class="font-semibold text-orange-500">Rs. {{ selectedItemsStore.total }}</span>
				</div>
				<button class="bg-orange-500 px-4 py-1 rounded-sm text-white font-semibold" @click="handleCheckout">
					Check Out
				</button>
			</div>
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