<template>
  <div>
    <h1>Hello, this is a working router!</h1>
    <router-link to="/adviser">Go to adviser</router-link>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import StepWelcome from './StepWelcome'
  import StepSexAge from './StepSexAge'
  import StepParse from './StepParse'
  import StepRiskFactorsCommon from './StepRiskFactorsCommon'
  import StepRiskFactorsMap from './StepRiskFactorsMap'
  import StepSuggest from './StepSuggest'
  import StepDiagnosis from './StepDiagnosis'
  import Error from './templates/Error'

  export default {
    name: 'App',
    computed: {
      ...mapState({
        step: state => state.steps.activeStep,
        transitionName: state => state.steps.transition,
        riskFactors: state => state.api.riskFactors
      })
    },
    created() {
      this.$store.dispatch('loadRiskFactors')
    },
    components: {
      StepWelcome,
      StepSexAge,
      StepParse,
      StepRiskFactorsCommon,
      StepRiskFactorsMap,
      StepSuggest,
      StepDiagnosis
    }
  }
</script>

<style lang="scss">
  body {
    display: flex;
    flex: 1;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
  }

  .app {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
  }
</style>
