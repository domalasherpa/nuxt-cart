<script setup lang="ts">
interface Product{
    id: number;
    title: string;
    price: number;
    image: string;
}

defineProps({
    product: Object as PropType<Product>
});
</script>
<template>    
    <div v-if="product !== undefined" class="bg-white cursor-pointer flex-col h-full justify-between hover:shadow-md">
        <div class="h-40 border-2 border-orange-200 shadow">
            <NuxtLink :to="'/products/' + product.id">
                <img :src="product.image" alt="product" class="h-full w-full object-contain" />
            </NuxtLink>
        </div>
        <div class="px-2">
            <NuxtLink :to="'/products/' + product.id">
                <h5 class="text-xs font-semibold tracking-tight text-gray-900">{{ product.title }}</h5>
            </NuxtLink>
            <NuxtLink :to="'/products/' + product.id">
                <p class="text-xs font-semibold text-gray-500">{{ product.price }}</p>
            </NuxtLink>
        </div>
    </div>
</template>



<style scoped>
</style>