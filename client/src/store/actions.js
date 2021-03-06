import api from "../api/InfermedicaApi";
import medicalDatabaseApi from "../api/medicalDatabaseApi.js";
import constants from "../api/constants";
import { arrayContains, findIndex } from "../utils";

export default {
  parse: async ({ rootState, getters, commit, dispatch }, value) => {
    try {
      commit("SET_LOADING", true);
      const res = await api.parse({
        text: value
      });

      res.data.mentions.forEach(mention => {
        const evidence = {
          id: mention.id,
          choice_id: mention.choice_id,
          common_name: mention.common_name,
          initial: true
        };
        if (!arrayContains(rootState.api.parsedSymptoms, { id: mention.id })) {
          commit("ADD_PARSED_SYMPTOM", evidence);
        }
      });
      commit("SET_LOADING", false);
      commit("SET_IS_ERROR", false);
    } catch (error) {
      dispatch("logError", error);
    }
  },

  loadRiskFactors: async ({ commit, dispatch }) => {
    try {
      commit("SET_LOADING", true);
      const res = await medicalDatabaseApi.loadRiskFactors();
      console.log(res);
      dispatch("addRiskFactors", {
        riskFactors: constants.defaultRiskFactors,
        data: res.data
      });
      dispatch("addRiskFactors", {
        riskFactors: constants.defaultRiskCountries,
        data: res.data
      });
      commit("SET_LOADING", false);
      commit("SET_IS_ERROR", false);
    } catch (err) {
      dispatch("logError", err);
    }
  },

  suggest: async ({ rootState, getters, commit, dispatch }) => {
    try {
      commit("SET_LOADING", true);
      const res = await api.suggest({
        sex: getters.currentPatient.sex,
        age: getters.currentPatient.age,
        selected: getters.evidenceIds
      });
      commit("SET_SUGGESTIONS", res.data);
      commit("SET_LOADING", false);
      commit("SET_IS_ERROR", false);
    } catch (err) {
      dispatch("logError", err);
    }
  },

  diagnosis: async ({ getters, commit, dispatch }, evidences) => {
    try {
      commit("SET_LOADING", true);
      const res = await api.diagnosis(getters.diagnosisData);

      commit("SET_SHOULD_STOP", res.data.should_stop);
      if (res.data.should_stop === true) {
        commit("SET_CONDITIONS", res.data.conditions);
        dispatch("triage");
      }

      if (evidences && evidences.length > 0) {
        // for selecting previous question
        res.data.question.selected = [];
        evidences.forEach(evidence => {
          const { type } = res.data.question;
          if (type === "group_single") {
            res.data.question.selected = evidence.id.toString();
          } else if (
            type === "group_multiple" &&
            evidence.choice_id === "present"
          ) {
            const questionIndex = findIndex(
              res.data.question.items,
              evidence.id
            );
            res.data.question.items[questionIndex].selected = true;
            res.data.question.selected.push(evidence.id);
          } else {
            const choiceId = findIndex(
              res.data.question.items[0].choices,
              evidence.choice_id
            );
            res.data.question.items[0].choices[choiceId].selected = true;
          }
        });
      }
      commit("SET_QUESTION", res.data.question);
      commit("SET_LOADING", false);
      commit("SET_IS_ERROR", false);
    } catch (err) {
      dispatch("logError", err);
    }
  },

  explain: async ({ rootState, getters, commit, dispatch }, conditionId) => {
    try {
      const index = findIndex(rootState.api.conditions, conditionId);
      const condition = rootState.api.conditions[index];
      if (
        condition.supporting_evidence ||
        condition.conflicting_evidence ||
        condition.unconfirmed_evidence
      ) {
        commit("RESET_CONDITION_EXPLAIN", index);
      } else {
        commit("SET_LOADING", true);
        const res = await api.explain({
          ...getters.diagnosisData,
          target: conditionId
        });
        commit("SET_CONDITION_EXPLAIN", { data: res.data, index });
        commit("SET_LOADING", false);
      }
    } catch (err) {
      dispatch("logError", err);
    }
  },

  triage: async ({ getters, commit, dispatch }) => {
    try {
      commit("SET_LOADING", true);
      const res = await api.triage(getters.diagnosisData);
      commit("SET_TRIAGE", res.data);
      commit("SET_LOADING", false);
    } catch (err) {
      dispatch("logError", err);
    }
  }
};
