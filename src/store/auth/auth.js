import { defineStore } from "pinia";
import alert from '@/functions/alert.js'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {},
    authenticate: {
      username: "",
      password: "",
    },
    updatePassModal: false,
    changePasswordFor: "",
    userData: {},
    loading: false,
  }),
  actions: {
    //Api call for login user
    async login() {
      let fs = new FormData();
      fs.append("username", this.authenticate.username);
      fs.append("password", this.authenticate.password);
      try {
        let req = await this.$axios.post("api/login", fs);
        if (req.data.success === true) {
          // console.log(req.data.data)
          this.user = req.data.data;
          // localStorage.setItem("_user_data", JSON.stringify(req.data.data));
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem("_user", req.data.data.name);
          localStorage.setItem("_userType", req.data.data.type);
          localStorage.setItem("_user_id", req.data.data.id);
          localStorage.setItem("_first_name", req.data.data.first_name)
          localStorage.setItem("_last_name", req.data.data._last_name)
          localStorage.setItem("_token", req.data.data.access_token);
          document.cookie = ("_token=" + req.data.data.access_token + ";");
          this.$axios.defaults.headers.common["Authorization"] = "Bearer " + req.data.data.access_token;
          this.$router.push("/dashboard");
          return null
        }
      } catch (err) {
        return err.response.data.error
      }
    },
    //Api call for get information about login user
    async getUserByID() {
      this.loading = true;
      try {
        let req = await this.$axios.get("/api/admin/get-user-by-user-id/" + localStorage.getItem("_user_id"));
        if (req.data.success) {
          this.loading = false;
          this.userData = req.data.data;
        }
      }
      catch {
        this.loading = false;
      }
    },

    async logout() {
      //Api call for remove server token then clear browser token
      let req = await this.$axios.get("api/logout")
      if (req.data.success) {
        localStorage.removeItem("_token");
        localStorage.removeItem("_user");
        localStorage.removeItem("_userId");
        localStorage.removeItem("_first_name");
        localStorage.removeItem("_last_name");
        localStorage.removeItem("_merchant_id");
        // localStorage.clear();
        document.cookie = ("_token=;");
        this.$router.push("/");
      }

    },
    async updatePassword(params) {
      let req2 = await this.$axios.post("api/admin/change-password", params);
      if (req2.data.success) {
        this.updatePassModal = false
        alert.success({
          title: "Password Updated Successfully.",
        });
      }
    },
  },
});
