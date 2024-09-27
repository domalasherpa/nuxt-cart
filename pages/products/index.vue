<script setup lang="ts">;

interface Product{
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

interface Response{
    [index: number] : Product;
}

const {data: products, status} = await useFetch<Response>("https://fakestoreapi.com/products");

</script>

<template>
    <div v-if="status === 'pending'" class="text-center">
        <h1>Loading...</h1>
    </div>
    <div v-if="status === 'error'">
        <h1>Whoops! Something went wrong. Please try again later.</h1>
    </div>
    <div v-else class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6  gap-8">
        <ProductSingle v-for="(product, index) in products" :product="product" :key="index" />
    </div>
</template>

<style></style>
