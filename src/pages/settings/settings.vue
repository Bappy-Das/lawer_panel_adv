<template>
  <PageLayout header="Settings Management" background="">
    <div class="input-group-container col-wrap">
      <div class="input-container col-12  input-title">
        <span class="">Role management</span>
        <hr class="settings-hr my-10" />
      </div>
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'role' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-users" style="font-size: 50px"></i>
              <p class="mt-10 text-5-16">Role</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'permissionGroup' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-building-shield" style="font-size: 50px"></i>
              <p class="mt-10 text-5-16">Permission Group</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'permission' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-user-shield" style="font-size: 50px"></i>
              <p class="mt-10 text-5-16">Permission </p>
            </div>
          </div>
        </router-link>
      </div>


    </div>
    <div class="input-group-container col-wrap mt-40">
      <div class="input-container col-12  input-title">
        <span class="">Settings management</span>
        <hr class="settings-hr my-10" />
      </div>
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'department' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-layer-group" style="font-size: 50px"></i>
              <p class="text-5-16 mt-10">Department</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'plans' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-table-list" style="font-size: 50px"></i>
              <p class="text-5-16 mt-10">Plans</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'courierZone' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-location-crosshairs" style="font-size: 50px"></i>
              <p class="text-5-16 mt-10">Courier Zone</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'defultComplain' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-comment-dots" style="font-size: 50px"></i>
              <p class="text-5-16 mt-10">Defult Complain</p>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </PageLayout>
</template>
<script setup>
import { onBeforeMount, onBeforeUnmount, ref, reactive, watch } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";

</script>

<style lang="scss" scoped>
.settings {
  &-card {
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    background: #FFF;
    height: 130px;
    width: 150px;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;

    &:hover {
      box-shadow: 0 0px 20px 0 rgb(0 0 0 / 20%);
      background: #f8fbf8;

      i,
      p {
        color: var(--primary);
      }
    }
  }

  &-container {
    text-align: center;
    margin-bottom: 0;

  }

  &-hr {
    border: 0;
    height: 1px;
    background-image: linear-gradient(60deg, var(--gray-3), transparent);
  }
}
</style>