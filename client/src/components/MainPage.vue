<template>
  <div class='table-container'>
    <b-table class='table patients-table' striped hover :items="items"></b-table>
    <router-link to="/adviser">Go to adviser</router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    data() {
      return {
        items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    },
    computed: {
      ...mapState({
        patients: state => state.patients.patients,
      })
    },
    created() {
      this.$store.dispatch('loadRiskFactors')
    },
  }
</script>

<style lang="scss">
  .table-container {
    width: 100%;

    .patients-table {
      position: static;
    }
  }
</style>
