<template>
    <div>
        <LoginForm v-if="['login', 'home']"/>
        <RegisterForm v-if="'register'"/>
    </div>
</template>

<script>
import LoginForm from './Login.vue'
import RegisterForm from './Register.vue'

export default {
    name: 'form',
  components: {
    LoginForm,
    RegisterForm
  }
}
</script>
