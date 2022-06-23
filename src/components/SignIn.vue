<template>
     <div>
      <h1>Login Page</h1>
      <form @submit.prevent="signIn">
        <input
          class="inputField"
          type="email"
          placeholder="Your email"
          v-model="form.email"
        />
        <input
          class="inputField"
          type="password"
          placeholder="Your Password"
          v-model="form.password"
        />
        <button type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? 
        <router-link to="/sign-up">Sign Up</router-link>
      </p>
    </div>
</template>

<script>
// should be called from LoginPage.vue
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },
})
</script>
