<template>
  <PageLayout header="Dashboard" borderLayout="false" padding="0" layoutBorder=false>
    <div class="dashboard">
      <div class="input-group-container col-wrap px-10">

      </div>
      <div class="d-flex-center">
        <div class="input-group-container col-wrap w-100">
          <div class="input-container col-3 col-12-sm pa-20" style="min-width: 225px;">
            <div class="dashboard-card dashboard-percel">
              <div style="width: 65px;">
                icon
              </div>
              <div>
                <div class="font-30 fw-600 text-primary">2</div>
                <div class="text-6-14 text-gray-2">All cases</div>
              </div>
            </div>
          </div>
          <div class="input-container col-3 col-12-sm pa-20" style="min-width: 225px;">
            <div class="dashboard-card dashboard-delivered">
              <div style="width: 65px;">
                icon
              </div>
              <div>
                <div class="font-30 fw-600" :style="{ color: '#E257EE' }">
                  5
                </div>
                <div class="text-6-14 text-gray-2">Running cases</div>
              </div>
            </div>
          </div>
          <div class="input-container col-3 col-12-sm pa-20" style="min-width: 225px;">
            <div class="dashboard-card dashboard-return">
              <div style="width: 65px;">
                icon
              </div>
              <div>
                <div class="font-30 fw-600" :style="{ color: '#F26546' }">
                  5
                </div>
                <div class="text-6-14 text-gray-2">Today's cases</div>
              </div>
            </div>
          </div>
          <div class="input-container col-3 col-12-sm pa-20" style="min-width: 225px;">
            <div class="dashboard-card dashboard-process">
              <div style="width: 65px;">
                icon
              </div>
              <div>
                <div class="font-30 fw-600" :style="{ color: '#12BFA0' }">
                  5
                </div>
                <div class="text-6-14 text-gray-2">Tomorrow's cases</div>
              </div>
            </div>
          </div>
          <div class="input-container col-3 col-12-sm pa-20" style="min-width: 225px;">
            <div class="dashboard-card dashboard-service-charge">
              <div style="width: 65px;">
                icon
              </div>
              <div>
                <div class="font-30 fw-600" :style="{ color: '#38D69A' }">
                  5
                </div>
                <div class="text-6-14 text-gray-2">Not updated cases</div>
              </div>
            </div>
          </div>
          <div class="input-container col-3 col-12-sm pa-20" style="min-width: 225px;">
            <div class="dashboard-card dashboard-sale">
              <div style="width: 65px;">
                icon
              </div>
              <div>
                <div class="font-30 fw-600" :style="{ color: '#68B8F5' }">
                  5
                </div>
                <div class="text-6-14 text-gray-2">Today's notes</div>
              </div>
            </div>
          </div>
          <div class="input-container col-3 col-12-sm pa-20" style="min-width: 225px;">
            <div class="dashboard-card dashboard-invoice">
              <div style="width: 65px;">
                icon
              </div>
              <div>
                <div class="font-30 fw-600" :style="{ color: '#686EF1' }">
                  5
                </div>
                <div class="text-6-14 text-gray-2">Decided cases</div>
              </div>
            </div>
          </div>
          <div class="input-container col-3 col-12-sm pa-20" style="min-width: 225px;">
            <div class="dashboard-card dashboard-service-charge">
              <div style="width: 65px;">
                icon
              </div>
              <div>
                <div class="font-30 fw-600" :style="{ color: '#38D69A' }">
                  5
                </div>
                <div class="text-6-14 text-gray-2">Abandoned cases</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import DatePicker from '@/components/others/DatePicker.vue';

import { useRoute } from "vue-router";
import Btn from "@/components/form/Btn.vue";
import loader from '@/components/loader/loader.vue'

const route = useRoute();


</script>

<style lang="scss" scoped>
.dashboard {

  &-pickup-quantity,
  &-pickup-amount {
    border: 1px solid var(--gray-4);
    border-radius: 8px;
    height: 35px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &-payment {
    border: 1px solid var(--gray-4);
    border-radius: 8px;
    padding: 18px;
  }

  &-card {
    border: 0px !important;
    padding: 15px;
    border-radius: 8px !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    height: 104px;
    // width:258px;
    display: flex;
    cursor: pointer;
    // justify-content: space-around;
    align-items: center;

    &:hover {
      box-shadow: 0 0px 20px 0 rgb(0 0 0 / 20%);
    }

    @media (max-width:481px) {
      width: 100%;
    }
  }

  &-percel {
    background: linear-gradient(0deg, rgba(242, 199, 45, 0.17) 0%, rgba(242, 199, 45, 0) 100%);
  }

  &-delivered {
    background: linear-gradient(0deg, rgba(226, 87, 238, 0.15) 0%, rgba(226, 87, 238, 0) 100%);
  }

  &-return {
    background: linear-gradient(0deg, rgba(242, 101, 70, 0.19) 0%, rgba(242, 102, 72, 0) 100%);
  }

  &-process {
    background: linear-gradient(0deg, rgba(22, 235, 196, 0.18) 0%, rgba(22, 235, 196, 0) 100%)
  }

  &-service-charge {
    background: linear-gradient(0deg, rgba(28, 209, 141, 0.2) 0%, rgba(28, 209, 141, 0) 100%);
  }

  &-sale {
    background: linear-gradient(0deg, rgba(104, 184, 245, 0.2) 0%, rgba(104, 184, 245, 0) 100%);
  }

  &-invoice {
    background: linear-gradient(0deg, rgba(104, 110, 241, 0.2) 0%, rgba(104, 110, 241, 0) 100%);
  }

  &-unInvoice {
    background: linear-gradient(0deg, rgba(245, 114, 114, 0.19) 0%, rgba(245, 114, 114, 0) 100%);
  }


  &-toolTip {
    &-toolTipText {
      visibility: hidden;
      width: 120px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      /* Position the tooltip */
      position: absolute;
      z-index: 1;
      top: -5px;
      left: 105%;
    }
  }

  &:hover &-toolTipText {
    visibility: visible;
  }

  &-circle {
    width: 150px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    border: 1px dotted var(--white);
  }
}
</style>