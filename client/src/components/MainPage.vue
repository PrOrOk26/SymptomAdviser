<template>
  <div class="table-container">
    <b-table
      class="table patients-table"
      responsive
      striped
      hover
      caption-top
      :items="patients"
      :fields="fields"
    >
      <template v-slot:table-caption>
        <span class="text-md bold">Your patients</span>
      </template>

      <template v-slot:cell(actions)="row">
        <b-button
          class="mr-1"
          size="sm"
          @click="prepareAdviser(row.item.id)"
        >
          <router-link to="/adviser" class="a-default no-decoration">Make diagnosis</router-link>
        </b-button>
        <b-button size="sm" @click="onShowDetailsClick">Details</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { BButton } from 'bootstrap-vue'

  export default {
    name: 'App',
    data() {
      return {
        fields: [
          { key: 'name', sortable: true },
          { key: 'surname', sortable: true },
          { key: 'sex' },
          { key: 'age', sortable: true },
          { key: 'actions', label: 'Actions' }
        ]
      }
    },
    computed: {
      ...mapState({
        patients: state => {
          return state.patients.patients.map(
            ({ name, surname, sex, age, id }) => {
              return {
                id,
                name,
                surname,
                sex,
                age
              }
            }
          )
        }
      })
    },
    components: {
      BButton
    },
    methods: {
      ...mapActions(['prepareAdviser']),
      onShowDetailsClick: e => {
        console.log('sh')
      }
    },
    created() {
      this.$store.dispatch('loadRiskFactors')
    }
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
