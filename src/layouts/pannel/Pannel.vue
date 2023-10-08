<template>
  <div class="pannel--layout">
    <Header />
    <transition :name="pannelLayout.floatingLeftMenu ? 'fade-left-menu' : 'slide-left-menu'">
      <LeftMenu v-if="pannelLayout.leftMenuStat" />
    </transition>

    <Body>
      <!-- <router-view /> -->

      <router-view v-slot="{ Component, route }">
        <transition name="fade-route" mode="out-in">
          <div :key="route.name">
            <component :is="Component"></component>
          </div>
        </transition>
      </router-view>
    </Body>
  </div>
</template>
<script setup>
import { onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
/**
 * * Import Pusher Notifications
 */
// import '@/pusherNotification.js';
import Header from './Header.vue';
import LeftMenu from './LeftMenu.vue';
import Body from './Body.vue';
import Swal from 'sweetalert2';

import toast from '@/functions/toast';
import { usePannelLayoutStore } from '@/store/layout/pannelLayout'

const pannelLayout = usePannelLayoutStore();

// Implemented Pusher Notifications
onMounted(async () => {
  window.Echo.private('admin-notifier')
    .listenToAll(function (e) {
      // console.log('listenall')
      // console.log(e);
    }).listen('.admin-notifications', (e) => {
      // console.log(e);
      toast.success({
        title: "Notification!",
        text: e.notification.message
      });
    })
});

onBeforeMount(() => {
  pannelLayout.innitialize()
  window.addEventListener('resize', pannelLayout.resizeController);
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', pannelLayout.resizeController);
});
</script>