import { router } from '../../components/router/router.js'
import medicalDatabaseApi from '../../api/medicalDatabaseApi.js'

export default {
  state: {
    doctor: {
      _id: '',
      name: '',
      surname: '',
      specialty: '',
    },
    patients: [],
    diagnostic_history: {},
    arePatientsLoading: false,
    isDiagnosticHistoryLoading: false,
    currentPatientId: 'bulk',
  },

  mutations: {
    ADD_PATIENTS(state, patients) {
      state.patients = [...state.patients, ...patients]
    },
    REMOVE_PATIENT(state, patientId) {
      state.patients = [...state.patients.filter((p) => p._id !== patientId)]
    },
    MODIFY_PATIENT_SYMPTOMS(state, { patientId, patientEvidence }) {
      const patient = state.patients.find((p) => p._id === patientId)
      state.patients = [
        ...state.patients.filter((p) => p._id !== patientId),
        {
          ...patient,
          evidence: [...patient.evidence, patientEvidence],
        },
      ]
    },
    MERGE_PARSED_SYMPTOMS(state, parsedSymptoms) {
      const patient = state.patients.find(
        (p) => p._id === state.currentPatientId,
      )
      state.patients = [
        ...state.patients.filter((p) => p._id !== state.currentPatientId),
        {
          ...patient,
          evidence: [
            ...patient.evidence,
            ...parsedSymptoms.filter(
              (p) => !patient.evidence.find((e) => e.id === p.id),
            ),
          ],
        },
      ]
    },
    SET_PATIENT_SEX(state, { patientId, sex }) {
      state.patients.find((p) => p._id === patientId).sex = sex
    },
    SET_PATIENT_AGE(state, { patientId, age }) {
      state.patients.find((p) => p._id === patientId).age = age
    },
    ADD_PATIENT_EVIDENCE(state, { patientId, evidence }) {
      state.patients.find((p) => p._id === patientId).evidence.push(evidence)
    },
    REMOVE_PATIENT_EVIDENCE(state, { patientId, index }) {
      state.patients.find((p) => p._id === patientId).evidence.splice(index, 1)
    },
    SET_PATIENT_EVIDENCES(state, { patientId, evidences }) {
      state.patients.find((p) => p._id === patientId).evidence = evidences
    },
    SET_CURRENT_PATIENT_ID(state, patientId) {
      state.currentPatientId = patientId
    },
    SET_PATIENTS_LOADING(state, loadingState) {
      state.arePatientsLoading = loadingState
    },
    SET_DIAGNOSTIC_HISTORY_LOADING(state, loadingState) {
      state.isDiagnosticHistoryLoading = loadingState
    },
    APPEND_DIAGNOSTIC_HISTORY(state, { patientId, diagnosisEntries = [] }) {
      let patientDiagnosticHistory = state.diagnostic_history[patientId]

      state.diagnostic_history = {
        ...state.diagnostic_history,
        [patientId]: [
          ...(patientDiagnosticHistory ? patientDiagnosticHistory : []),
          ...diagnosisEntries,
        ],
      }
    },
    ADD_PATIENT_DIAGNOSIS(state, { patientId, diagnosisEntry }) {
      const patientDiagnosticHistory = state.diagnostic_history[patientId]

      if (patientDiagnosticHistory) {
        patientDiagnosticHistory.push(diagnosisEntry)
      } else {
        state.diagnostic_history[patientId] = [diagnosisEntry]
      }
    },
    SET_DOCTOR_INFORMATION(state, doctorData) {
      const { _id = '', name = '', surname = '', specialty = '' } = doctorData

      state.doctor = {
        _id,
        name,
        surname,
        specialty,
      }
    },
  },
  getters: {
    currentPatient: (state) => {
      return state.patients.find((p) => p._id === state.currentPatientId)
    },
    getPatientById: (state) => (_id) => {
      return state.patients.find((p) => p._id === _id)
    },
  },
  actions: {
    mergeParsedSymptoms({ rootState, commit, getters, state }) {
      commit('MERGE_PARSED_SYMPTOMS', rootState.api.parsedSymptoms)
    },
    prepareAdviser({ rootState, commit, state }, patientId) {
      commit('SET_CURRENT_PATIENT_ID', patientId)
    },
    async loadDoctorInformation({ rootState, commit }, doctorId) {
      const doctorInfo = await medicalDatabaseApi.getDoctorInformation({
        doctorId,
      })
      commit('SET_DOCTOR_INFORMATION', doctorInfo.data)
    },
    async loadDoctorPatients({ commit }, doctorId) {
      commit('SET_PATIENTS_LOADING', true)
      const doctorInfo = await medicalDatabaseApi.getDoctorsPatients({
        doctorId,
      })
      commit('ADD_PATIENTS', doctorInfo.data)
      commit(
        'SET_CURRENT_PATIENT_ID',
        doctorInfo.data.length ? doctorInfo.data[0]._id : 'bulk',
      )
      commit('SET_PATIENTS_LOADING', false)
    },
    async appendCurrentPatientDiagnosis({ rootState, commit, state }) {
      const diagnosisEntry = {
        dateCreated: Date.now(),
        patientId: state.currentPatientId,
        doctorId: state.doctor._id,
        triage: rootState.api.triage,
        conditions: rootState.api.conditions,
      }

      const params = {
        patientId: state.currentPatientId,
        diagnosisEntry,
      }

      const response = await medicalDatabaseApi.addDiagnosticHistoryEntry(
        params,
      )

      router.push('/')
    },
    async getPatientDiagnosisHistory({ rootState, commit, state }, patientId) {
      commit('SET_DIAGNOSTIC_HISTORY_LOADING', true)

      const response = await medicalDatabaseApi.getDiagnosticHistory({
        patientId,
      })

      if (response) {
        commit('APPEND_DIAGNOSTIC_HISTORY', {
          patientId,
          diagnosisEntries: response.data,
        })
      } else {
        console.log('something really strange with diagnosis data...', response)
      }

      commit('SET_DIAGNOSTIC_HISTORY_LOADING', false)
    },
  },
}
