<script setup>
import { ref } from "vue";

const isLoggedIn = ref(false);
const username = ref("");
const password = ref("");

const user = {username: 'user1', password:'user1password'};

const verifyLoginIn = ()=>{
    if(username.value === user.username && password.value === user.password){
        isLoggedIn.value = true
        alert("logged In");
    }
    else{
        console.log(username.value, "\n", password.value);
        alert("Failed to log in");
    }
    
}
</script>

<template>
    <div v-if="!isLoggedIn">
        <form action="" @submit.prevent="verifyLoginIn">
            <label for="">Username</label>
            <!-- <input type="text" name="username" id="" :value="username" @input="(e)=>username= e.target.value"/>  -->
            <input type="text" name="username" id="" v-model="username"/> 
            <br />
            <label for="">Password</label>
            <!-- <input type="password" name="password" :value="password" @input="(e)=>password = e.target.value"> -->
            <input type="password" name="password" v-model="password">
            <br />
            <button>Log In</button>
        </form>
    </div>
    <div v-else>
        <h1>Dashboard</h1>
    </div>
</template>

<style>

</style>