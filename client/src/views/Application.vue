<template>
    <div id="apply">
        <b-jumbotron>
            <template slot="header">
                Apply 
            </template>

            <template slot="lead">
                Apply for a job at <b>Amusement park</b>. You will not apply for a specific job, your specific task will be decided by the recruiter!
            </template>
            <hr class="my-4">
            <b-container class="bv-example-row">
                <b-form inline>
                    <label class="sr-only" for="inlineFormInputName2">Name</label>
                    <b-input class="mb-2 mr-sm-2 mb-sm-0" id="inlineFormInputName2" placeholder="Jane Doe" />
                    <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
                    <b-input-group left="@" class="mb-2 mr-sm-2 mb-sm-0">
                        <b-input id="inlineFormInputGroupUsername2" placeholder="Username" />
                    </b-input-group>
                    <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>
                    <b-button variant="primary">Save</b-button>
                </b-form>
            </b-container>
        </b-jumbotron>
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style scoped>
    #apply {
        width:50%;
        margin: 0 auto;
    }
</style>


