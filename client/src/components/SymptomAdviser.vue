
<template>
  <div class="adviser">
    <Error v-if="isError" />
    <transition :name="transitionName" mode="out-in">
      <keep-alive exclude="StepDiagnosis">
        <component :is="step" :key="step" />
      </keep-alive>
    </transition>
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
        riskFactors: state => state.api.riskFactors,
        isError: state => state.api.isError,
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
      StepDiagnosis,
      Error,
    }
  }
</script>

<style lang="scss">
  .adviser {
    width: 100%;
  }
</style>
