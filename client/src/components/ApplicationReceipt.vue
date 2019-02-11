<template>
    <b-container class="bv-example-row textStyle">
        <b-row>
            <b-col md="6" sm="12">
                <p><b>First name: </b> Emil</p>
            </b-col>
            <b-col md="6" sm="12">
                <p><b>Last name: </b>Lindholm Brandt</p>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="6" sm="12">
                <p><b>Email: </b>emil@apa.se</p>
            </b-col>
            <b-col md="6" sm="12">
                <p><b>SSN: </b>19930324-3333</p>
            </b-col>
        </b-row>
        <b-row>
            <b-table striped hover :items="qual" :fields="fieldsQual"></b-table>
        </b-row>
        <b-row>
            <b-table striped hover :items="availability" :fields="fieldsAvailability"></b-table>
        </b-row>
        <hr>
        <b-row>
            <b-col md="6" sm="12">
                <b-button variant="info" size="lg">Edit application</b-button>  <!-- TODO: Att detta endast görs när ansökan inte är hanterad! -->
            </b-col>
            <b-col md="6" sm="12">
                <p v-if="['profile'].indexOf($route.name) > - 1"><b>Status:</b> Unhandled</p>
                <b-button variant="info" size="lg" v-if="['receipt'].indexOf($route.name) > - 1" @click="onSubmit">Submit </b-button> <!-- TODO: Fixa så man kan submitta -->
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    const qualifications = [
  { qualification: 'Slav', years: '17' },
  { qualification: 'Waiter', years: '3' },
  { qualification: 'General manager', years: '3' },
  { qualification: 'Boss', years: '23' }
]
    const availability = [
        { availabilityFrom: '2019-02-01', availabilityTo: '2019-03-01' },
        { availabilityFrom: '2019-01-01', availabilityTo: '2019-02-01' },
        { availabilityFrom: '2019-01-01', availabilityTo: '2019-02-01' },
        { availabilityFrom: '2019-01-01', availabilityTo: '2019-02-01' }
    ]
export default {
    data() {
        return {
            fieldsAvailability: {
                availabilityFrom: {
                    label: 'Availability from',
                    sortable: true
                },
                availabilityTo: {
                    label: 'Availability to',
                }
            },
            fieldsQual: {
                qualification: {
                    sortable: true
                },
                years: {
                    sortable: true
                }
            },
            qual: qualifications,
            availability: availability
        }
    }
}
</script>

<style scoped>
    .textStyle {
        font-size:1.2em;
        text-align:left;
    }
</style>
