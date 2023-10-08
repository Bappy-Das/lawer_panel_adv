<template>
  <div class="login-abc">
    <div class="login-rightside-content">
      <div class="login-rightside-head ">
        <div class="text-5-26 text-title mb-12">Login</div>
      </div>
      <div class="login-form mb-21">
        <div class="input-title">
          Email/Phone<span class="input-title-require">*</span>
        </div>
        <div>
          <InputBox placeholder="Enter Email/Phone" size="lg" :showDetail="true" autocomplete="off" name="username"
            :validate="Yup.string().required()" @input="errorMsg = ''">
            <template v-slot:left>
              <div class="d-flex-v-center pl-15 pr-10">
                <i class="fa-solid fa-user-tie font-20" style="color: #666460"></i>
              </div>
            </template>
          </InputBox>
        </div>
        <div class="input-title">
          Password<span class="input-title-require">*</span>
        </div>
        <div>
          <InputBox placeholder="Enter Password" :inputType="showPass ? '' : 'password'" size="lg" :showDetail="true"
            autocomplete="off" name="password" :validate="Yup.string().required()" @input="errorMsg = ''">
            <template v-slot:left>
              <div class="d-flex-v-center pl-15 pr-10">
                <i :class="[showPass ? 'fa-solid fa-unlock' : 'fa-solid fa-lock', 'font-20']" style="color: #666460"></i>
              </div>
            </template>
            <template v-slot:right>
              <div class="d-flex-v-center pl-10 pr-15 cursor-pointer" @click="showPass = !showPass">
                <i :class="[showPass ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash', 'font-20']"
                  style="color: #666460"></i>
              </div>
            </template>
          </InputBox>
        </div>
      </div>
      <Message height="20px" class="mb-10" type="error" :message="errorMsg"></Message>
      <div class="d-flex-center-between mb-40">
        <div class="d-flex d-flex-v-center">
          <CheckBox class="checkbox" />
          <span class="mx-10 mt-2 text-gray-3 text-4-14">Remember me</span>
        </div>
      </div>

      <div class="d-flex-center-between">
        <div>
          <router-link :to="{ name: 'dashboard' }">
            <Btn class="btn-primary btn-squire-lg text-white">Login</Btn>
          </router-link>

        </div>
      </div>
    </div>
  </div>
  <!-- //// -->
  <!-- </div> -->
</template>

<script setup>
import { onUnmounted, ref, onMounted } from "vue";
import { initializeValidator, setValidators, validate, setErrors } from "@/functions/validate.js";
import * as Yup from "yup";
import InputBox from "../../components/form/InputBox.vue";
import Btn from "../../components/form/Btn.vue";
import CheckBox from "../../components/form/CheckBox.vue";
import logo from "@/assets/image/logo.svg";
import top_icon from "@/assets/image/top_icon.svg";
import top_dot from "@/assets/image/top_dot.svg";
import bike from "@/assets/image/bike.svg";
import bycycle from "@/assets/image/cycle.svg";
import plane from "@/assets/image/plane.svg";
import truck from "@/assets/image/truck.svg";
import box from "@/assets/image/box.svg";
import Message from "@/components/validate/Message.vue";
// import { useAuthStore } from "@/store/auth/auth";

initializeValidator();

// const auth = useAuthStore();
const showPass = ref(false);
const errorMsg = ref();

// onMounted(() => {
//   document.addEventListener('keypress', listenkeypress)
// })
// onUnmounted(() => {
//   document.removeEventListener('keypress', listenkeypress)
// })
// const genValidate = setValidators(["username", "password"]);
// const postLogin = async () => {
//   let validateInput = await validate(genValidate);
//   if (validateInput.status === true) {
//     let response = await auth.login();
//     if (response) {
//       errorMsg.value = response;
//     }
//   }
// };
// const listenkeypress = (e) => {
//   if (e.code == 'Enter') {
//     postLogin()
//   }
// }
</script>
<style lang="scss" scoped>
.login {
  &-abc {

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  &-rightside {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow-y: scroll;

    &-content {
      width: 100%;
      max-width: 500px;
      padding: 30px 20px 40px 20px;
    }
  }
}
</style>