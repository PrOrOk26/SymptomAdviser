import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  apiUrl: "http://localhost:3000",
  headers() {
    return {
      "content-type": "application/json"
    };
  },
  loadRiskFactors() {
    return axios({
      method: "get",
      url: `${this.apiUrl}/api/risk_factors`,
      headers: this.headers()
    });
  },
  getDoctorsPatients(params) {
    const { doctorId } = params;

    return axios({
      method: "get",
      url: `${this.apiUrl}/doctors/${doctorId}/patients`,
      headers: this.headers()
    });
  },
  getDoctorInformation(params) {
    const { doctorId } = params;

    return axios({
      method: "get",
      url: `${this.apiUrl}/doctors/${doctorId}`,
      headers: this.headers()
    });
  },
  addDiagnosticHistoryEntry({ patientId, diagnosisEntry }) {
    return axios({
      method: "post",
      url: `${this.apiUrl}/patients/${patientId}/diagnostic_history`,
      headers: this.headers(),
      data: JSON.stringify(diagnosisEntry)
    }).catch(function(error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  }
};
