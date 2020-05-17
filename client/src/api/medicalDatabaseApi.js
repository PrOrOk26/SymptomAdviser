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

    debugger;
    return axios({
      method: "get",
      url: `${this.apiUrl}/doctors/${doctorId}`,
      headers: this.headers()
    });
  }
};
