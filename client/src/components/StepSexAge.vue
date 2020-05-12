<template>
  <Step>
    <div class="step__subtitle">Gather initial information about patient</div>
    <div class="step-sexage">
      <div class="step-sexage__form">
        <label class="step-sexage--field">Sex</label>
        <BaseRadio v-model="sex" label="Male" check-value="male" />
        <BaseRadio v-model="sex" label="Female" check-value="female" />
      </div>
      <div class="step-sexage__form">
        <label class="step-sexage--field">Age</label>
        <BaseInput v-model.number="age" class="step-sexage__value" />
      </div>
    </div>
  </Step>
</template>

<script>
  import BaseRadio from './common/BaseRadio'
  import BaseInput from './common/BaseInput'

  export default {
    name: 'StepSexAge',
    computed: {
      sex: {
        get() {
          debugger;
          return this.$store.getters.currentPatient.sex
        },
        set(sex) {
          debugger;
          this.$store.commit('SET_PATIENT_SEX', {
            patientId: this.$store.state.patients.currentPatientId,
            sex
          })
        }
      },
      age: {
        get() {
          debugger;
          return this.$store.getters.currentPatient.age
        },
        set(age) {
          debugger;
          this.$store.commit('SET_PATIENT_AGE', {
            patientId: this.$store.state.patients.currentPatientId,
            age
          })
        }
      }
    },
    components: {
      BaseRadio,
      BaseInput
    }
  }
</script>

<style lang="scss">
  .step-sexage {
    display: flex;
    flex-direction: column;
    align-self: center;

    &__form {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &--field {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5rem;
      font-size: $font-grand;
      color: $dull-blue;
    }

    &__value {
      margin: 25px 0;
    }
  }
</style>
