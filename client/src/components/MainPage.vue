<template>
  <div class="table-container">
    <b-table
      class="table patients-table"
      responsive
      striped
      hover
      caption-top
      bordered
      sort-icon-left
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
        <b-button class="mr-1" variant="info" size="sm" @click="onShowSymptomsClick">Symptoms</b-button>
        <b-button class="mr-1" size="sm" @click="onEditDetailsClick">Details</b-button>
        <b-button class="mr-1" variant="danger" size="sm" @click="onDeleteClick">Delete</b-button>
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
          { key: 'card_number', sortable: true},
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
            ({ name, surname, sex, age, id, card_number = '---' }) => {
              return {
                card_number,
                id,
                name,
                surname,
                sex,
                age,
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
      onShowSymptomsClick: e => {
        console.log('sh')
      },
      onEditDetailsClick: e => {
        console.log('sh')
      },
      onDeleteClick: e => {
        console.log('sh')
      },
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
