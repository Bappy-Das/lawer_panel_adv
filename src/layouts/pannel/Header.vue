<template>
  <div class="pannel--header" :style="{ height: `${pannelLayout.headerHeight}px` }">
    <transition :name="pannelLayout.floatingLeftMenu ? 'fade-left-menu' : 'slide-left-menu'">
      <div class="pannel--header-spacer" v-if="pannelLayout.leftMenuStat && !pannelLayout.floatingLeftMenu"
        :style="{ width: `${pannelLayout.leftMenuWidth}px` }">
      </div>
    </transition>
    <div class="pannel--header-content d-flex">
      <div @click="pannelLayout.toggleLeftMenu" class="cursor-pointer pa-5">
        <img class="mx-5" :src="menuIcon" alt="arrow-icon" />
      </div>
      <div class="d-flex-center-between pa-5 w-100">
        <div></div>
        <div class="w-50 d-flex-center profile-header">
          <!-- <div class="d-grid"
            style="grid-template-columns: repeat(3, 1fr); justify-items: center; align-items: center; grid-column-gap: 24px; grid-row-gap: 24px;">
            <div class="cursor-pointer">
              <Menu closeOnClick>
                <template v-slot:preview>
                  <div style="cursor: pointer">
                    <i class="fa-regular fa-bell text-gray-1" style="font-size: 20px"></i>
                  </div>
                </template>
                <template v-slot:menu="{ closeMenu }">
                  <div style="width: 400px; height: 400px">
                    <div @click="closeMenu()" class="pa-20 cursor-pointer">
                      Close menu
                    </div>
                    <div class="px-20">Menu Content</div>
                  </div>
                </template>
              </Menu>
            </div>
            <div class="cursor-pointer">
              <router-link :to="{ name: 'settings' }">
                <div class="pb-5">
                  <div style="cursor: pointer" class="d-flex-center">
                    <i class="fa-solid fa-gear text-gray-1" style="font-size: 20px"></i>
                  </div>
                </div>
              </router-link>
            </div>
            <div class="pannel--header-vertical-line"></div>
          </div> -->
          <div class="cursor-pointer">
            <Menu>
              <template v-slot:preview>
                <div style="width: 200px; cursor: pointer" class="pb-5">
                  <div class="d-flex ml-7">
                    <div class="text-7-14 flex-auto text-gray-2" style="display-">{{ user ? user : full_name }}</div>
                    <div class="d-flex pannel--header-avater">
                      <i class="fa-solid fa-user text-gray-1" style="font-size: 20px"></i>
                      <i class="xit-font-arrow-down" style="font-size: 24px" />
                    </div>
                  </div>
                </div>
              </template>
              <template v-slot:menu>
                <div style="width: 150px; height: 133px; padding:25px 14px 17px 10px">
                  <router-link :to="{ name: 'userProfile' }">
                    <div class="text-4-14 mb-12 cursor-pointer text-title">
                      <i class="fa-solid fa-user text-gray-1 pa-3" style="font-size: 15px"></i> My Profile
                    </div>
                  </router-link>
                  <div class="text-4-14 mb-12 cursor-pointer text-title">
                    <i class="fa-solid fa-unlock text-gray-1 pa-3"></i> Change Pass
                  </div>
                  <div class="text-4-14 cursor-pointer text-title" @click="auth.logout">
                    <i class="fa-solid fa-right-from-bracket pa-3"></i> Log out
                  </div>
                </div>
              </template>
            </Menu>
          </div>
        </div>
        <div class="collapse-menu">
          <Menu>
            <template v-slot:preview>
              <div style="display: flex;justify-content: end; width: 80px; cursor: pointer" class="pb-5">
                <div class="d-flex ml-7">
                  <div class="d-flex pannel--header-avater">
                    <img class="pa-5" :src="menuIcon" alt="arrow-icon" />
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:menu>
              <div style="width: 150px; height: 200px; padding:16px 14px 17px 10px">
                <div class="text-4-14 mb-12 cursor-pointer">
                  <i class="fa-solid fa-user text-gray-1 pa-3"></i> Profile
                </div>
                <div class="text-4-14 mb-12 cursor-pointer">
                  <i class="fa-regular fa-bell text-gray-1 pa-3"></i> Notification
                </div>
                <div class="text-4-14 mb-12 cursor-pointer">
                  <i class="fa-solid fa-gear text-gray-1 pa-3"></i> Settings
                </div>
                <div class="text-4-14 mb-12 cursor-pointer">
                  <i class="fa-solid fa-unlock text-gray-1 pa-3"></i> Change Pass
                </div>
                <div class="text-4-14 cursor-pointer" @click="auth.logout">
                  <i class="fa-solid fa-right-from-bracket pa-3"></i> Log out
                </div>
              </div>
            </template>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputBox from "@/components/form/InputBox.vue";
import menuIcon from "@/assets/image/line.png";
import Menu from "@/components/pop/Menu.vue";
import { usePannelLayoutStore } from "@/store/layout/pannelLayout";
import { reactive, ref } from "vue";
import { useAuthStore } from "@/store/auth/auth";
const auth = useAuthStore();
const modalToggle = ref(false);
const pannelLayout = usePannelLayoutStore();
// auth.getUserByID();


let user = localStorage.getItem('_user');
let first_name = localStorage.getItem('_first_name');
let last_name = localStorage.getItem('_last_name');
const full_name = first_name + ' ' + last_name;
// console.log(user)
// auth.getUser();

</script>

<style lang="scss" scoped>
.collapse-menu {
  display: block;

  // text-align: end;
  @media only screen and (min-width: 600px) {
    display: none;
  }
}

.profile-header {

  @media only screen and (max-width: 600px) {
    display: none;
  }
}
</style>