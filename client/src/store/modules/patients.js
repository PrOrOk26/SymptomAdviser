import { router } from '../../components/router/router.js'

export default {
  state: {
    patients: [
      {
        id: 1,
        name: "Vlad",
        surname: "Raniuk",
        sex: "male",
        age: "21",
        evidence: [
          {
            id: "s_156",
            common_name: "Nausea",
            choice_id: "present",
            initial: true
          },
          {
            id: "s_13",
            common_name: "Abdominal pain",
            choice_id: "present",
            initial: true
          },
          {
            id: "s_8",
            common_name: "Diarrhea",
            choice_id: "present",
            initial: true
          }
        ],
        diagnosis_history: []
      },
      {
        id: 2,
        name: "Andrey",
        surname: "Zarubin",
        sex: "male",
        age: "31",
        evidence: [
          {
            id: "s_156",
            common_name: "Nausea",
            choice_id: "present",
            initial: true
          },
          {
            id: "s_13",
            common_name: "Abdominal pain",
            choice_id: "present",
            initial: true
          },
          {
            id: "s_8",
            common_name: "Diarrhea",
            choice_id: "present",
            initial: true
          }
        ],
        diagnosis_history: []
      },
      {
        id: 3,
        name: "Timur",
        surname: "Zhukotynsky",
        sex: "male",
        age: "19",
        evidence: [
          {
            id: "s_156",
            common_name: "Nausea",
            choice_id: "present",
            initial: true
          },
          {
            id: "s_13",
            common_name: "Abdominal pain",
            choice_id: "present",
            initial: true
          },
          {
            id: "s_8",
            common_name: "Diarrhea",
            choice_id: "present",
            initial: true
          }
        ],
        diagnosis_history: []
      }
    ],
    currentPatientId: 1
  },

  mutations: {
    ADD_PATIENT(state, patient) {
      state.patients = [...state.patients, patient];

      // should be an action later, because we need to update the database
    },
    REMOVE_PATIENT(state, patientId) {
      state.patients = [...state.patients.filter(p => p.id !== patientId)];

      // should be an action later, because we need to update the database
    },
    MODIFY_PATIENT_SYMPTOMS(state, { patientId, patientEvidence }) {
      const patient = state.patients.find(p => p.id === patientId);
      state.patients = [
        ...state.patients.filter(p => p.id !== patientId),
        {
          ...patient,
          evidence: [...patient.evidence, patientEvidence]
        }
      ];
    },
    MERGE_PARSED_SYMPTOMS(state, parsedSymptoms) {
      const patient = state.patients.find(p => p.id === state.currentPatientId);
      state.patients = [
        ...state.patients.filter(p => p.id !== state.currentPatientId),
        {
          ...patient,
          evidence: [
            ...patient.evidence,
            ...parsedSymptoms.filter(
              p => !patient.evidence.find(e => e.id === p.id)
            )
          ]
        }
      ];
    },
    SET_PATIENT_SEX(state, { patientId, sex }) {
      state.patients.find(p => p.id === patientId).sex = sex;
    },
    SET_PATIENT_AGE(state, { patientId, age }) {
      state.patients.find(p => p.id === patientId).age = age;
    },
    ADD_PATIENT_EVIDENCE(state, { patientId, evidence }) {
      state.patients.find(p => p.id === patientId).evidence.push(evidence);
    },
    REMOVE_PATIENT_EVIDENCE(state, { patientId, index }) {
      state.patients.find(p => p.id === patientId).evidence.splice(index, 1);
    },
    SET_PATIENT_EVIDENCES(state, { patientId, evidences }) {
      state.patients.find(p => p.id === patientId).evidence = evidences;
    },
    SET_CURRENT_PATIENT_ID(state, patientId) {
      state.currentPatientId = patientId;
    },
    ADD_PATIENT_DIAGNOSIS(state, {patientId, triage, conditions}) {
      debugger;
      state.patients.find(p => p.id === patientId).diagnosis_history.push({
        date: Date.now(),
        triage,
        conditions,
      }); 
      router.push('/')
    }
  },
  getters: {
    currentPatient: state => {
      return state.patients.find(p => p.id === state.currentPatientId);
    },
    getPatientById: state => id => {
      return state.patients.find(p => p.id === id);
    }
  },
  actions: {
    mergeParsedSymptoms({ rootState, commit, getters, state }) {
      commit("MERGE_PARSED_SYMPTOMS", rootState.api.parsedSymptoms);
    },
    prepareAdviser({ rootState, commit }, patientId) {
      commit("SET_CURRENT_PATIENT_ID", patientId);
    },
    appendCurrentPatientDiagnosis({ rootState, commit, state }) {
      debugger;
      commit("ADD_PATIENT_DIAGNOSIS", {
        patientId: state.currentPatientId,
        triage: rootState.api.triage,
        conditions: rootState.api.conditions
      });
    }
  }
};
