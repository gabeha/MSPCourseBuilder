
<script setup>
import { ref } from 'vue';
import useAuthUser from '../composables/UseAuthUser';
import router from '../router.js'
const { login, register } = useAuthUser();


const form = ref({
    email: "",
    password: "",
    name: "",
})

const handlelogin = async (provider) => {
    try {
        await login(form.value);
        router.push({ path: "/dashboard" });
    } catch (error) {
        alert(error.message)
    }
}

const handleSubmit = async () => {
    try {
        await register(form.value);
        router.push({
            path: "/email-confirmation",
            query: { email: form.value.email }
        });
    } catch (error) {
        alert(error.message)
    }
}
</script>
<template>
<div class="w-1/3 mt-10 border-2 mx-auto ">
    <button @click="signup=!signup" class="text-3xl p-4 border-2 w-1/2" :class="signup?  'bg-sky-700 border-b-2 text-white ': 'bg-white'">Log in</button>
    <button  @click="signup=!signup" class="text-3xl p-4 border-2 w-1/2" :class="!signup? 'bg-sky-700 border-b-2 text-white ': 'bg-white'">Sign up</button>
    <form v-if="signup" class="m-auto my-5 pt-10 w-full  text-2xl" @submit.prevent="handlelogin()" >
    <h1 class="text-5xl p-4 text-center w-full ">Log in</h1>
    <label class=" ml-6 my-12">Email
        <input class="block mx-auto  h-12 bg-gray-200 border-none w-11/12 text-xl rounded-lg my-8" placeholder="E-mail address" v-model="form.email" type="email" /> </label>
    <label class="ml-6 my-12">Password
    <input class="block border-none mx-auto h-12 bg-gray-200  my-8 w-11/12 text-xl  rounded-lg"  placeholder="Password" v-model="form.password" type="password" /> </label>
    <div class="mx-auto my-10 text-center"><router-link to="/forgotpassword">Forgot your password?</router-link></div>
    <button class="w-full h-24 bg-sky-700 text-white text-xl mt-10 text-bold">Log in ></button>
    </form>

    <form v-else class="m-auto my-5 pt-10 w-full  text-2xl" @submit.prevent="handleSubmit" >
    <h1 class="text-5xl p-4 text-center w-full ">Register</h1>
    <label class=" ml-6 my-12">Name
        <input class="block mx-auto  h-12 bg-gray-200 border-none w-11/12 text-xl rounded-lg my-8" placeholder="First and Last name" v-model="form.name" type="text" /> </label>
    <label class=" ml-6 my-12">Email
        <input class="block mx-auto  h-12 bg-gray-200 border-none w-11/12 text-xl rounded-lg my-8" placeholder="E-mail address" v-model="form.email" type="email" /> </label>
    <label class="ml-6 my-12">Password
    <input class="block border-none mx-auto h-12 bg-gray-200  my-8 w-11/12 text-xl  rounded-lg"  placeholder="Password" v-model="form.password" type="password" /> </label>
    <button class="w-full h-24 bg-sky-700 text-white text-xl mt-10 text-bold">Register></button>
    </form>
</div>   
</template>
<script>
export default {
    name: 'CourseBuilder',
    data() {
        return {
            signup: true,
        }
    }

        
    
}
</script>