<template>
    <div><p>{{ text }}</p></div>
</template>

<script setup>
    const props = defineProps({
        text: String
    })
</script>

<style scoped>
    p{
        color: red
    }
</style>