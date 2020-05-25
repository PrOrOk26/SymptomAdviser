<template>
	<div class="diagnostic-history">
		<ul
			v-if="diagnostic_history[this.patientId] && diagnostic_history[this.patientId].length"
			id="example-1"
		>
			<li v-for="diagnosis in diagnostic_history[this.patientId]" :key="diagnosis._id">
				<Triage v-if="diagnosis.triage && diagnosis.triage.triage_level" :triage="diagnosis.triage" />
				<ConditionList v-if="diagnosis.conditions.length > 0" :conditions="diagnosis.conditions" />
			</li>
		</ul>
		<div
			v-else-if="!diagnostic_history[this.patientId] || !diagnostic_history[this.patientId].length"
		>
			<span class="textXl bold">No diagnosis data for this patient yet</span>
		</div>
		<Icon
			v-if="isDiagnosisHistoryLoading"
			name="spinner"
			width="32"
			height="32"
			spin
			class="icon__loading"
		/>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import ConditionList from './templates/ConditionList'
	import Triage from './templates/Triage'

	export default {
		name: 'PatientHistory',
		props: ['patientId'],
		computed: {
			...mapState({
				isDiagnosisHistoryLoading: state =>
					state.patients.isDiagnosticHistoryLoading,
				diagnostic_history(state) {
					debugger
					console.log('dh', state.patients.diagnostic_history)
					return state.patients.diagnostic_history
				}
			})
		},
		methods: {
			...mapActions(['getPatientDiagnosisHistory'])
		},
		created() {
			debugger
			this.getPatientDiagnosisHistory(this.patientId)
		},
		components: {
			ConditionList,
			Triage
		}
	}
</script>

<style>
	.diagnostic-history {
		position: relative;
		display: flex;
		justify-content: center;
		width: 100%;
	}
	.icon__loading {
		align-self: center;
		min-height: 13rem;
	}
</style>