<template>
    <form class="max-w-4/5 m-auto" @submit.prevent="handleSubmit" >
    <h1 class="text-3xl mb-5">Register</h1>
    <label>Email<input v-model="form.email" type="email" /> </label>
    <label>Password<input v-model="form.password" type="password" /> </label>
    <button>Register</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import useAuthUser from '../composables/UseAuthUser';
import router from '../router.js'
const { register } = useAuthUser();

const form = ref({
    email: "",
    password: "",
})

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