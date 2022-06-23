<script setup>
import useAuthUser from "../composables/UseAuthUser";
import { ref } from "vue";

const { sendPasswordRestEmail } = useAuthUser();

const form = ref({
    email: "",
})


const handlePasswordReset = async () => {
  await sendPasswordRestEmail(form.value);
  alert("Password reset email sent to: ${form.value}");
};
</script>
<template>
<div class="w-1/2 mx-auto border-2">
    <form class="m-auto my-5 pt-10 w-full  text-2xl" @submit.prevent="handlePasswordReset()" >
    <h1 class="text-5xl p-4 text-center w-full mb-10">Forgot Password?</h1>
    <label class=" ml-6 my-12">Email
        <input class="block mx-auto  h-12 bg-gray-200 border-none w-11/12 text-xl rounded-lg my-8" placeholder="E-mail address" v-model="form.email" type="email"/> </label>
    
    <button class="w-full h-24 bg-sky-700 text-white text-xl mt-10 text-bold">Send reset</button>
    </form>
</div>
</template>


