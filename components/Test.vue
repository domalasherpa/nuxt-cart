<template>
    <div>
        <select v-model="selectedOption">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
    </div>
</template>

<script setup>
    import {ref} from "vue";

    alert(selectedOption.value);
</script>

<style scoped>

</style>