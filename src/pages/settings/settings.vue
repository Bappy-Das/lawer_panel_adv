<template>
  <PageLayout header="Settings Management" background="">
    <div class="input-group-container col-wrap">
      <!-- <div class="input-container col-12  input-title">
        <span class="">Settings management</span>
        <hr class="settings-hr my-10" />
      </div> -->
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'caseType' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-layer-group" style="font-size: 50px"></i>
              <p class="text-5-16 mt-10">Case Type Setup</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'court' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-warehouse" style="font-size: 50px"></i>
              <!-- <i class="fa-solid fa-table-list" style="font-size: 50px"></i> -->
              <p class="text-5-16 mt-10">Court Setup</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'policeStation' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-building-shield" style="font-size: 50px"></i>
              <p class="text-5-16 mt-10">Police Station</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="input-container col-12-sm mt-10">
        <router-link :to="{ name: 'addAdminUser' }">
          <div class="settings-card">
            <div class="settings-container text-gray-3 text-4-14">
              <i class="fa-solid fa-user-tie" style="font-size: 50px"></i>
              <p class="text-5-16 mt-10">Add New Admin</p>
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