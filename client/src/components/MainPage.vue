<template>
	<div class="table-container">
		<Error v-if="isError" />
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

			<template v-if="patients.length" v-slot:cell(actions)="row">
				<b-button class="mr-1" size="sm" @click="prepareAdviser(row.item._id)">
					<router-link to="/adviser" class="a-default no-decoration">Make diagnosis</router-link>
				</b-button>
				<b-button class="mr-1" variant="info" size="sm" @click="onShowSymptomsClick">Symptoms</b-button>
				<b-button class="mr-1" size="sm" @click="onEditDetailsClick">Details</b-button>
				<b-button
					class="mr-1"
					size="sm"
					variant="dark"
					@click="onDiagnosticHistoryClick(row.item._id)"
				>Diagnostic history</b-button>
				<b-button class="mr-1" variant="danger" size="sm" @click="onDeleteClick">Delete</b-button>
			</template>
			<Icon v-else-if="arePatientsLoading" name="spinner" spin class="main-page__load" />
			<template v-else>
				<span>No patients</span>
			</template>
		</b-table>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { BButton } from 'bootstrap-vue'
	import Error from './templates/Error'
	import { router } from './router/router'

	export default {
		name: 'App',
		data() {
			return {
				fields: [
					{ key: 'card_number', sortable: true },
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
						({ name, surname, sex, age, _id, card_number = '---' }) => {
							return {
								card_number,
								_id,
								name,
								surname,
								sex,
								age
							}
						}
					)
				},
				arePatientsLoading: state => state.patients.arePatientsLoading,
				isError: state => state.api.isError
			})
		},
		components: {
			BButton,
			Error
		},
		methods: {
			...mapActions(['prepareAdviser']),
			onShowSymptomsClick: e => {
				console.log('sh')
			},
			onDiagnosticHistoryClick: patientId => {
				router.push(`/diagnostic_history/${patientId}`)
			},
			onEditDetailsClick: e => {
				console.log('sh')
			},
			onDeleteClick: e => {
				console.log('sh')
			}
		}
	}
</script>

<style lang="scss">
	.main-page {
		&__load {
			margin: 15px 0;
		}
	}
	.table-container {
		width: 100%;

		.patients-table {
			position: static;
		}
	}
</style>
