<template>
    <b-jumbotron header="Your Application" lead="You can edit your application as long as the application is unhandeled. You can see your current application and its status here.">
        <hr>
        <ApplicationReceipt/>
    </b-jumbotron>
</template>

<script>
import ApplicationReceipt from '../components/ApplicationReceipt'
    export default {
        components: {
            ApplicationReceipt
        }
    }
</script>

<style scoped>
    
</style>

