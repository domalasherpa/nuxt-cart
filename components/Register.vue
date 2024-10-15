<script setup>

import { ref } from "vue";
import inputError from "./inputError.vue";

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

const currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate()
}

const baseYear = 1904;

const defaultData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    selectedMonth: months[currentDate.month],
    selectedDate: currentDate.date,
    selectedYear: currentDate.year,
    gender: ''
}

const defaultError = {
    firstName: false,
    lastName: false,
    phoneNumber: false,
    password: false,
    selectedMonth: false,
    selectedDate: false,
    selectedYear: false,
    gender: false,
    flag: false
};

const userData = ref(defaultData);

const errors = ref(defaultError);

const validateRegister = ()=>{
    errors.value = defaultError;
    
    for(const [key, data] of Object.entries(userData.value)){
        if(data == ''){
            errors.value[key] = true;
            errors.value['flag'] = true;
        }
        console.log(key, "\n", data);
    }
    
    if(!months.includes(userData.value.selectedMonth)){
        errors.value.selectedMonth = true;
        errors.value[flag] = true;
    }

    if(userData.selectedYear > currentDate.year || userData.selectedYear < baseYear + 1){
        errors.value.selectedYear = true;
        errors.value[flag] = true;
    }

    userData.value = defaultData;
}

const register = ()=>{
    validateRegister();
    if(!errors.value.flag){
        //send data to backend
        localStorage.setItem('user', JSON.stringify(userData.value));
        alert("sucessfully registered");
    }else{
        errors.value.flag = false;
    }
}

</script>

<template>
    <div class="container">
        <div class="register-form-container">
            <div class="form-header">
                <h1>Sign Up</h1>
                <p>It's quick and easy</p>
            </div>
            <form action="" @submit.prevent="register">
            <div class="fullname">
                <input type="text" v-model="userData.firstName" placeholder="First Name" :class="{error: errors.firstName && !userData.firstName}" >
                <input type="text" v-model="userData.lastName" name="lastName" placeholder="Last Name" style="margin-left: 10px;" :class="{error: errors.lastName && !userData.lastName}">
            </div>
            
            <inputError v-show="errors.firstName && !userData.firstName" text="First Name is required"/>
            <inputError v-show="errors.lastName && !userData.lastName" text="Last Name is required"/>
            

            <div>
                <input type="text" v-model="userData.phoneNumber" placeholder="Mobile number or email">
            </div>
            <inputError v-show="errors.phoneNumber && !userData.phoneNumber" text="PhoneNumber is required"/>


            <div>
                <input type="text" v-model="userData.password" placeholder="New password">
            </div>
            <inputError v-show="errors.password && !userData.password" text="Password is required"/>

            <label for="">Birthday</label>
            <div class="bday">    
                <select name="month" id="" v-model="userData.selectedMonth" class="">
                    <option v-for="(month,index) in months" :value="month" :key="month" >{{ month }}</option>
                </select>

                <select name="day" id="" v-model="userData.selectedDate">
                    <option v-for="day in 31" :value="day" :key="day">{{ day }}</option>
                </select>

                <select name="year" id="" v-model="userData.selectedYear">
                    <option v-for="year in (currentDate.year - baseYear)" :key="year">{{ currentDate.year - year + 1}}</option>
                </select>
            </div>
            <inputError v-show="errors.selectedDate || errors.selectedMonth || errors.selectedYear" text="please enter a valid date"/>

            <label for="">Gender</label>
            <div class="gender">
                <div class="three-option">
                    
                    <label for="male">Male</label>
                    <input type="radio" v-model="userData.gender" value="male" id="male" />
                </div>

                <div class="three-option">
                    <label for="female">Female</label>
                    <input type="radio" v-model="userData.gender" value="female" id="female"/>
                </div>

                <div class="three-option">
                    <label for="custom">Custom</label>
                    <input type="radio" v-model="userData.gender" value="custom" id="custom"/>
                </div>
            </div>
            <inputError v-show="errors.gender && !userData.gender" text="please select the valid option"/>

            <div class="btn-div">
                <button>Sign Up</button>
            </div>
        </form>
        </div>
    </div>
</template>


<style scoped>
    .error{
        border: 1px solid red;
    }
    .container{
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .register-form-container{
        border: 2px solid black;
        width: 500px;
    }
    
    .register-form-container > div{
        width: 100%;
    }

    .form-header{
        padding: 30px 20px;
        margin-bottom: 10px;
        border-bottom: 2px solid black;
    }

    form{
        padding: 10px 20px;
    }
    
    form div{
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        
    }
    
    form>div>input, select, .gender>div{
        padding: 6px;
        border: 2px solid black;
        border-radius: 5px;
        width: 100%;
        outline: none;
    }

    .gender>div, .bday>select{
        display: flex;
        flex-wrap: wrap;
        flex-basis: 26%;
        justify-content: space-between;
    }

    .three-option {
        border: 1px solid black;
        padding: 2px 10px;
    }

    .btn-div{
        display: flex;
        justify-content: center;
    }

    button{
        margin-top: 20px;
        background-color: rgb(40, 183, 40);
        padding: 8px 32px;
        outline: none;
        border: none;
        border-radius: 5px;
        color: white;
        font-size: 20px;
        font-weight: bolder;
        cursor: pointer;
        /* width: fit-content; */
    }
</style>