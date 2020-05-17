<template>
	<div class="app__header">
		<div class="app__title">Medical Adviser</div>
		<div class="app__doctor">
			<b-dropdown id="dropdown-left" left v-bind:text="doctorFullName" variant="dark" class="m-2">
				<b-dropdown-item href="#">Personal info</b-dropdown-item>
				<b-dropdown-item href="#">Statistics</b-dropdown-item>
				<b-dropdown-item href="#">Analytics</b-dropdown-item>
			</b-dropdown>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import { BDropdown, BDropdownItem } from 'bootstrap-vue'

	export default {
		name: 'AppHeader',
		computed: {
			...mapState({
				doctor: state => {
					return state.patients.doctor
				}
			}),
			doctorFullName() {
				return `${this.doctor.name} ${this.doctor.surname}`
			}
		},
		components: {
			BDropdown,
			BDropdownItem
		}
	}
</script>

<style lang="scss">
	.app {
		&__header {
			display: flex;
			justify-content: space-between;
			width: 92%;
			margin-top: 20px;
			color: $dark-blue;
		}

		&__title {
			font: $text-lg 'Soleil', sans-serif;
		}
	}
</style>
