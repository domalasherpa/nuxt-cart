<script setup lang="ts">;
import type { Product } from '~/types/product';

interface Response{
    [index: number] : Omit<Product, 'availableQuantity'>;
}

const {data: products, status} = await useFetch<Response>("https://fakestoreapi.com/products");
</script>

<template>
    <div v-if="status === 'error'">
        <h1>Whoops! Something went wrong. Please try again later.</h1>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6  gap-8">
        <ProductSingle v-for="(product, index) in products" :product="product" :key="index" />
    </div>
</template>

<style></style>
