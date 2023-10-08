<template>
  <div class="login-container">
    <div class="login-loginLeft">
      <div class="flex-auto">
        <div class="login-loginLeft-login-icon-top_dot">
          <img class="icon" :src="top_dot" alt="top_dot-icon" />
        </div>
        <div class="login-loginLeft-login-icon-bike">
          <img class="icon" :src="bike" alt="bike-icon" />
        </div>
        <div class="login-loginLeft-login-icon-top_icon">
          <img class="icon" :src="top_icon" alt="top_icon" />
        </div>
        <div class="login-loginLeft-login-icon-plane">
          <img class="icon" :src="plane" alt="bike-icon" />
        </div>
        <div class="px-5 login-loginLeft-login-logo">
          <img class="icon" :src="logo" alt="logo-icon" />
        </div>
        <div class="login-loginLeft-login-icon-bycycle">
          <img class="icon" :src="bycycle" alt="bycycle-icon" />
        </div>
        <div class="login-loginLeft-login-icon-truck">
          <img class="icon" :src="truck" alt="truck-icon" />
        </div>
        <div class="login-loginLeft-login-icon-box">
          <img class="icon" :src="box" alt="box-icon" />
        </div>
      </div>
    </div>
    <div class="login-rightside">
      <div class="login-rightside-content">
        <div class="login-rightside-head mb-50">
          <div class="text-5-26 text-title mb-12">Login</div>
          <div class="text-gray-6 text-4-14">
            Log back in below to check dashboard rgfddhgdf
          </div>
        </div>
        <div class="login-form mb-21">
          <div class="input-title">
            Email/Phone<span class="input-title-require">*</span>
          </div>
          <div>
            <InputBox placeholder="Enter Email/Phone" v-model="auth.authenticate.username" size="lg" :showDetail="true"
              autocomplete="off" name="username" :validate="Yup.string().required()" @input="errorMsg = ''">
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10">
                  <i class="xit-font-admin-user font-20" style="color: #666460"></i>
                </div>
              </template>
            </InputBox>
          </div>
          <div class="input-title">
            Password<span class="input-title-require">*</span>
          </div>
          <div>
            <InputBox placeholder="Enter Password" v-model="auth.authenticate.password"
              :inputType="showPass ? '' : 'password'" size="lg" :showDetail="true" autocomplete="off" name="password"
              :validate="Yup.string().required()" @input="errorMsg = ''">
              <template v-slot:left>
                <div class="d-flex-v-center pl-15 pr-10">
                  <i class="xit-font-lock font-20" style="color: #666460"></i>
                </div>
              </template>
              <template v-slot:right>
                <div class="d-flex-v-center pl-10 pr-15 cursor-pointer" @click="showPass = !showPass">
                  <i :class="[showPass ? 'xit-font-eye-slash' : 'xit-font-eye', 'font-20']" style="color: #666460"></i>
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
          <div class="text-info-lighter text-4-14">Forgot Password ?</div>
        </div>

        <div class="d-flex-center-between">
          <!-- <div class="text-4-14 text-gray-6">
            Don't have an account ?
            <router-link :to="{ name: 'merchantRegistration' }" class="text-primary">Register here</router-link>
          </div> -->
          <div>
            <Btn class="btn-primary btn-squire-lg text-white" @click="postLogin()">Login</Btn>
          </div>
        </div>
      </div>
    </div>
  </div>
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

import { useAuthStore } from "@/store/auth/auth";

initializeValidator();

const auth = useAuthStore();
const showPass = ref(false);
const errorMsg = ref();

onMounted(() => {
  document.addEventListener('keypress', listenkeypress)
})
onUnmounted(() => {
  document.removeEventListener('keypress', listenkeypress)
})

const genValidate = setValidators(["username", "password"]);

const postLogin = async () => {
  let validateInput = await validate(genValidate);
  if (validateInput.status === true) {
    let response = await auth.login();
    if (response) {
      errorMsg.value = response;
    }
  }

};
const listenkeypress = (e) => {
  if (e.code == 'Enter') {
    postLogin()
  }
}
</script>
<style lang="scss" scoped>
.login {
  &-container {
    display: grid;
    grid-template-columns: 1fr 1.45fr;
    height: 100vh;
    background-color: var(--white);

    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
    }
  }

  &-loginLeft {
    left: 0%;
    right: 55.56%;
    top: 0%;
    bottom: 0%;
    height: 100vh;
    background: linear-gradient(179.52deg,
        #f0ba1b -0.42%,
        rgba(240, 186, 27, 0.4) 6.35%,
        rgba(240, 186, 27, 0.2) 14.25%,
        rgba(240, 186, 27, 0.47) 26.18%,
        #f0ba1b 99.58%);

    @media (max-width: 1100px) {
      display: none;
    }

    &-login-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 45vh;
    }

    &-login-icon {
      &-top_dot {
        position: absolute;
        left: 0%;
        right: 95.64%;
        top: 0%;
        bottom: 86.13%;
      }

      &-top_icon {
        position: absolute;
        left: 31.9%;
        right: 57.85%;
        top: 1.24%;
        bottom: 90.92%;

        transform: rotate(-30deg);
      }

      &-bike {
        position: absolute;
        left: 5%;
        right: 84.53%;
        top: 27.76%;
        bottom: 60.72%;
        opacity: 0.7;
      }

      &-plane {
        position: absolute;
        left: 28.76%;
        right: 62.07%;
        top: 25.76%;
        bottom: 60.72%;
      }

      &-bycycle {
        position: absolute;
        left: 4.93%;
        right: 87.46%;
        top: 61.09%;
        bottom: 29.78%;
      }

      &-truck {
        position: absolute;
        left: 28.76%;
        right: 62.07%;
        top: 62.23%;
        bottom: 29.46%;
      }

      &-box {
        position: absolute;
        left: 0%;
        right: 92%;
        // top: 90%;
        bottom: 0.92%;
        width: 104px;
      }
    }
  }

  &-rightside {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    overflow-y: scroll;

    &-content {
      width: 100%;
      max-width: 590px;
      padding: 30px 20px 40px 20px;
    }
  }
}
</style>