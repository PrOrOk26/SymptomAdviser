
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
	import { mapState, mapActions, mapMutations } from 'vuex'
	import StepWelcome from './StepWelcome'
	import StepSexAge from './StepSexAge'
	import StepParse from './StepParse'
	import StepRiskFactorsCommon from './StepRiskFactorsCommon'
	import StepRiskFactorsMap from './StepRiskFactorsMap'
	import StepSuggest from './StepSuggest'
	import StepDiagnosis from './StepDiagnosis'
	import Error from './templates/Error'
	import { router } from './router/router.js'

	export default {
		name: 'App',
		computed: {
			...mapState({
				step: state => state.steps.activeStep,
				transitionName: state => state.steps.transition,
				riskFactors: state => state.api.riskFactors,
				isError: state => state.api.isError,
				currentPatientId: state => state.patients.currentPatientId
			})
		},
		created() {
			if (!this.currentPatientId.length) {
				this.SET_ERROR({
					response: {
						data: {
							message: 'You should select a patient first'
						}
					}
				})

				setTimeout(() => router.replace('/'), 500)
				setTimeout(() => this.SET_IS_ERROR(true), 1000)
				setTimeout(() => this.SET_IS_ERROR(false), 4000)
			}
		},
		methods: {
			...mapMutations(['SET_ERROR', 'SET_IS_ERROR'])
		},
		components: {
			StepWelcome,
			StepSexAge,
			StepParse,
			StepRiskFactorsCommon,
			StepRiskFactorsMap,
			StepSuggest,
			StepDiagnosis,
			Error
		}
	}
</script>

<style lang="scss">
	.adviser {
		width: 100%;
	}
</style>
