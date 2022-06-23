<template>
    <form class="max-w-4/5 m-auto" @submit.prevent="handlelogin()" >
    <h1 class="text-3xl mb-5">Log in</h1>
    <label>Email<input v-model="form.email" type="email" /> </label>
    <label>Password<input v-model="form.password" type="password" /> </label>
    <button>Login</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import useAuthUser from '../composables/UseAuthUser';
import router from '../router.js'
const { login } = useAuthUser();

const form = ref({
    email: "",
    password: "",
})

const handlelogin = async (provider) => {
    try {
        await login(form.value);
        router.push({ path:'/' });
    } catch (error) {
        alert(error.message)
    }
}
</script>
