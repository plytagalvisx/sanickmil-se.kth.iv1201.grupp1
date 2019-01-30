<template>
    <div>
        <LoginForm v-if="['login', 'home']"/>
        <RegisterForm v-if="'register'"/>
    </div>
</template>

<script>
import LoginForm from '../components/LoginComponent'
import RegisterForm from '../components/Register'

export default {
    name: 'form',
    components: {
        LoginForm,
        RegisterForm
    }
}
</script>
