import axios from "axios";
import VueCookies from "vue-cookies";

export default {
  infermedicaUrl: "https://api.infermedica.com/v2",
  headers() {
    return {
      "content-type": "application/json",
      "App-Id": VueCookies.get("appId"),
      "App-Key": VueCookies.get("appKey")
    };
  },
  parse(data) {
    return axios({
      method: "post",
      url: `${this.infermedicaUrl}/parse`,
      headers: this.headers(),
      data
    });
  },
  suggest(data) {
    return axios({
      method: "post",
      url: `${this.infermedicaUrl}/suggest`,
      headers: this.headers(),
      data
    });
  },
  diagnosis(data) {
    return axios({
      method: "post",
      url: `${this.infermedicaUrl}/diagnosis`,
      headers: this.headers(),
      data
    });
  },
  explain(data) {
    return axios({
      method: "post",
      url: `${this.infermedicaUrl}/explain`,
      headers: this.headers(),
      data
    });
  },
  triage(data) {
    return axios({
      method: "post",
      url: `${this.infermedicaUrl}/triage`,
      headers: this.headers(),
      data
    });
  }
};
