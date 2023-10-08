<template>
  <div :class="['pannel--left-menubar', { 'pannel--left-menubar-floating': pannelLayout.floatingLeftMenu },]"
    :style="{ width: `${pannelLayout.leftMenuWidth}px` }" @click="closeHoverLeftMenu">
    <div class="pannel--left-menubar-main" :style="{ width: `${pannelLayout.leftMenuWidth}px`, height: '100vh' }">
      <div class="pannel--left-menubar-header">
        <div class="pannel--left-menubar-logo mb-15 mx-15">
          <router-link :to="{ name: 'dashboard' }">
            logo here
            <!-- <img class="icon" :src="black_bg_logo" alt="black_bg_logo-icon" /> -->
          </router-link>
        </div>
      </div>
      <div class="bg-white opacity-01 mr-20" style="height:1px"></div>
      <div class="pannel--left-menubar-btn-container">
        <div>
          <div v-for="(item, index) in menuItems" :key="index">
            <div v-if="item.headerText" class="text-primary text-4-12 pa-7 pt-15">
              {{ item.headerText }}
              <hr class="hr-line">
            </div>
            <div v-else-if="item.routeName">
              <router-link :to="{ name: item.routeName }">
                <div
                  :class="['pannel--left-menubar-btn', { 'pannel--left-menubar-active-btn': pannelLayout.activeRoute == item.routeName, }]"
                  @click="closeAllMenu">
                  <div class="d-flex-center-start">
                    <span class="mt-5" :style="{ width: '20px' }"><i :class="item.icon"></i></span>
                    <div class="ml-10 text-5-12">{{ item.name }}</div>
                  </div>
                </div>
              </router-link>
            </div>

            <div v-else>
              <div :class="[{ 'pannel--left-menubar-sub-active': item.show }]">
                <div :class="['pannel--left-menubar-btn', { 'pannel--left-menubar-toggle-active-btn': item.show }]"
                  @click="closeSubItem(item)">
                  <div class="d-flex-v-center w-100">
                    <span class="mt-5" :style="{ width: '20px' }"><i :class="item.icon"></i></span>
                    <div class="ml-10 d-flex-center-between w-100">
                      <div class="text-5-12">{{ item.name }}</div>
                      <div v-if="item.show"> - </div>
                      <div v-else> + </div>
                    </div>
                  </div>
                </div>
                <transition name="expand-left-menu-btn" @enter="enter" @after-enter="afterEnter" @leave="leave">
                  <div class="pannel--left-menubar-sub-container" v-if="item.show">
                    <div v-for="(subItems, subIndex) in item.items" :key="'subitem-' + subIndex">
                      <router-link :to="{ name: subItems.routeName }" v-if="subItems.can_view">
                        <div
                          :class="['pannel--left-menubar-sub-btn', { 'pannel--left-menubar-sub-active-btn': pannelLayout.activeRoute == subItems.routeName }]">
                          {{ subItems.name }}
                        </div>
                      </router-link>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ml-25 mr-50">
        <div class="bg-white opacity-01 mr-20" style="height:1px"></div>
        <div class="py-30 text-white text-4-12">&copy;XIT 2022</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import { menuData } from "./js/menu.js";
import { usePannelLayoutStore } from "@/store/layout/pannelLayout";
import { useCommonStore } from "@/store/common/common";
import black_bg_logo from "@/assets/image/black_bg_logo.svg";
import LeftMenuSkeleton from "@/components/TableSkeleton/LeftMenuSkeleton.vue";


const pannelLayout = usePannelLayoutStore();

const closeHoverLeftMenu = (e) => {
  if (e.target.closest(".pannel--left-menubar-main") == null) {
    pannelLayout.leftMenuStat = false;
  }
};
const menuItems = reactive(menuData);
console.log(menuItems);

const enter = (el) => {
  el.style.height = "auto";
  const height = getComputedStyle(el).height;
  el.style.height = 0;

  getComputedStyle(el);
  setTimeout(() => {
    el.style.height = height;
  });
};
const afterEnter = (el) => {
  el.style.height = "auto";
};
const leave = (el) => {
  el.style.height = getComputedStyle(el).height;

  getComputedStyle(el);
  setTimeout(() => {
    el.style.height = 0;
  });
};

const closeAllMenu = () => {
  // console.log('left menu',menuItems);
  for (let item of menuItems) {
    if (item.show) {
      item.show = false;
    }
  }
}

const closeSubItem = (item) => {
  for (let subItem of menuItems) {
    if (subItem.show) {
      subItem.show = false;
    }
  }
  item.show = !item.show;
}
</script>
