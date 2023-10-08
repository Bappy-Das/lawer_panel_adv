<template>
  <div v-if="dashboard.loading">
    <loader2></loader2>
  </div>
  <div v-else class="dashboard">
    <div class="dashboard-header-main mb-30">
      Dashboard
    </div>
    <!-- <div class="d-flex flex-column-sm mb-20">
      <div class="text-5-20 text-gray-2 mr-10">Brief Stats</div>
      <div style="min-width: 240px;">
        <DatePicker placeholder="Select Date Range" range rangePreset v-model="dashboard.dateRangeSelect" reset
          format="dd-MM-yyyy" @change="datafilter()" />
      </div>
    </div> -->
    <div class="d-grid dashboard-cards">
      <div class="dashboard-card dashboard-merchant">
        <div class="dashboard-head">
          <span style="color: #cd26c7">All cases</span>
        </div>
        <hr style="border: 1px solid rgba(211, 64, 206, 0.15);" />
        <div class="d-flex-center-between dashboard-card-content">
          <div class="d-flex-start-center flex-column dashboard-merchant-gradient_info">
            <div class="text-5-14 text-gray-2">Total Cases</div>
          </div>
          <div class="vertical-line mx-5"></div>
          <div class="flex-auto mx-10">
            <div class="text-5-14 mt-15 text-gray-3">sdfsfgsfg</div>

          </div>
        </div>
      </div>

      <div class="dashboard-card dashboard-account">
        <div class="dashboard-head">
          <span style="color: #3778be">Running cases</span>
        </div>
        <hr style="border: 1px solid rgba(55, 120, 190, 0.15)" />
        <div class="d-flex-center-between dashboard-card-content">
          <div class="d-flex-start-center flex-column dashboard-account-gradient_info">
            <div class="text-5-14 text-gray-2">Total Collection</div>
            <div>
              <span class="dashboard-card-quantity" style="color: #3778be">
                {{ (dashboard.AccountData.total_collection)?.toFixed(0) }}
              </span>
            </div>
          </div>
          <div class="vertical-line mx-5"></div>
          <div class="flex-auto mx-10">
            <div class="text-5-14 mt-15 text-gray-3">Revenue :
              <span class="text-success">
                {{ (dashboard.AccountData.total_revenue)?.toFixed(0) }}
              </span>
            </div>
            <div class="my-5">
              <div class="text-4-12 text-gray-2">Delivery :
                <span class="text-success">
                  {{
                    dashboard.AccountData.total_delivery != 0 ?
                    dashboard.AccountData.total_delivery?.toFixed(0) - dashboard.AccountData.total_cod?.toFixed(0) : 0 }}
                </span>
              </div>
              <div class="text-4-12 text-gray-2"> Return :
                <span class="text-warning">
                  {{ (dashboard.AccountData.total_returned_or_exchanged)?.toFixed(0) }}
                </span>
              </div>
              <div class="text-4-12 text-gray-2"> Cod :
                <span style="color: #ee6acf">
                  {{ (dashboard.AccountData.total_cod)?.toFixed(0) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="dashboard-card dashboard-data-entry">
        <div class="dashboard-head">
          <span style="color: #0bb9ae">data entry</span>
        </div>
        <hr style="border: 1px solid rgba(4, 173, 163, 0.15)" />

        <div class="d-flex-center-between dashboard-card-content">
          <div class="d-flex-start-center flex-column dashboard-data-entry-gradient_info">
            <div class="text-5-14 text-gray-2">Today Data Entry</div>
            <div>
              <span class="dashboard-card-quantity" style="color: #0bb9ae">{{ dashboard.daraEntry.entry_today }}</span>
            </div>
          </div>
          <div class="vertical-line mx-5"></div>
          <div class="flex-auto mx-10">
            <div class="text-5-14 mt-15 text-gray-3">Data Entries</div>
            <div class="my-5">
              <div class="text-4-12 text-gray-2">
                This year:
                <span class="text-success" style="color: #59aff1">{{ dashboard.daraEntry.entry_this_year }}</span>
              </div>
              <div class="text-4-12 text-gray-2">
                This month: <span style="color: #ffb84c">{{ dashboard.daraEntry.entry_this_month }}</span>
              </div>
              <div class="text-4-12 text-gray-2">
                Yesterday: <span style="color: #ee6acf">{{ dashboard.daraEntry.entry_yesterday }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <TableSkeleton></TableSkeleton> -->
    <div class="input-group-container col-wrap mt-20 ">
      <div class="input-container col-12 col-12-md pa-4">
        <div v-if="dashboard.totalHubsLoading">
          <TableSkeleton></TableSkeleton>
        </div>

        <div v-else class="full-table full-table-hub">
          <table>
            <thead>
              <th class="text-6-16 text-gray-2">
                Total Hub <span class="ml-5 text-warning"></span>
              </th>
              <th class="text-4-14 text-info">In Transit</th>
              <th class="text-4-14 text-info">Assign To</th>
              <th class="text-4-14 text-success">Delivery</th>
              <th class="text-4-14 text-danger">Return</th>
              <th class="text-4-14 text-warning">Hold</th>
              <th class="text-4-14 text-info">Cash Collected</th>
              <th class="text-4-14 text-success">Cash Handover</th>
            </thead>
            <div v-if="dashboard.topFiveHubiList?.data.length === 0" class="my-50 text-center">
              No item to show.
            </div>

            <tbody v-else class="text-gray-2 text-4-14">
              <tr v-for="(item, index) in dashboard.topFiveHubiList?.data" :key="index">
                <td v-if="item?.hub"><span class="table-icon my-8"></span>{{ item?.hub }}</td>
                <td class="text-info">{{ item?.in_transit }}</td>
                <td class="text-info">{{ item?.assigned }}</td>
                <td class="text-success">{{ item?.delivered }}</td>
                <td class="text-danger">{{ item?.returned }}</td>
                <td class="text-warning">{{ item?.hold }}</td>
                <td class="text-info">{{ item?.cash_collected }}</td>
                <td class="text-success">{{ item?.cash_hand_overed }}</td>
              </tr>
              <tr>

                <td class="text-bold">Summation :</td>
                <td class="text-bold">{{ dashboard.totalInTransit }}</td>
                <td class="text-bold">{{ dashboard.totalInAssigned }}</td>
                <td class="text-bold">{{ dashboard.totalDelivered }}</td>
                <td class="text-bold">{{ dashboard.totalReturned }}</td>
                <td class="text-bold">{{ dashboard.totalHold }}</td>
                <td class="text-bold">{{ dashboard.totalCashCollected }}</td>
                <td class="text-bold">{{ dashboard.totalInCashToBeCollected }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ridersLoading -->
      <div class="input-container col-12 col-12-md pa-4">
        <div v-if="dashboard.ridersLoading">
          <TableSkeleton></TableSkeleton>
        </div>
        <div v-else class="dashboard-card dashboard-rider">
          <div class="input-group-container col-wrap mt-20 mb-40">
            <div class="input-container col-12 col-12-md pa-4">
              <div class="dashboard-head text-gray-2">RIDER</div>
              <hr class="hr-line" />
            </div>
            <div class="input-container col-3 col-12-md pa-4">
              <div class="flex-auto py-40 px-20">
                <div class="text-gray-3 text-5-18 my-5">
                  Total rider: <span style="color: #59aff1">{{ dashboard.topRiderList?.total_riders }}</span>
                </div>
                <div class="text-gray-3 text-5-18 my-5">
                  Total Return: <span class="text-danger">{{ dashboard.topRiderList.total_returned }}</span>
                </div>
                <div class="text-gray-3 text-5-18 my-5">
                  Total Delivery: <span class="text-success">{{ dashboard.topRiderList?.total_delivered }}</span>
                </div>
              </div>
            </div>
            <div class="input-container col-9 col-12-md pa-10">
              <div class="full-table full-table-hub"
                :style="{ 'height': dashboard.topRiderList.rider_list?.data != 0 ? '520px' : '200px', 'border': '2px solid var(--gray-5)' }">
                <!-- <div class="full-table full-table-hub" style="height: 550px;border: 2px solid var(--gray-5);"> -->
                <table>
                  <thead>
                    <th class="text-6-16 text-gray-2" style="min-width:200px"> Rider Name </th>
                    <th class="text-4-14 text-info" style="min-width:100px">Assigned</th>
                    <th class="text-4-14 text-success" style="min-width:100px">Delivery</th>
                    <th class="text-4-14 text-danger" style="min-width:100px">Return</th>
                    <th class="text-4-14 text-warning" style="min-width:120px">Commission</th>
                    <th class="text-4-14 text-success" style="min-width:120px">Delivery Ratio</th>
                    <th class="text-4-14 text-danger" style="min-width:120px">Return Ratio</th>
                  </thead>
                  <tbody class="text-gray-2 text-4-14">
                    <tr v-for="(item, index) in dashboard.topRiderList.rider_list?.data" :key="index">
                      <td class="text-bold"><i class="fa-solid fa-person-biking mx-10 pt-2"></i>{{
                        item?.rider_name }}
                      </td>
                      <td class="text-4-12 text-info">{{ item?.total_assigned }}</td>
                      <td class="text-4-12 text-success">{{ item?.delivered }}</td>
                      <td class="text-4-12 text-danger">{{ item?.returned }}</td>
                      <td class="text-4-12 text-warning">{{ item?.commission }}</td>
                      <td>
                        <span class="text-success">{{ ((item.delivered / item.total_assigned) * 100)?.toFixed(2) }}
                          %</span>
                      </td>
                      <td>
                        <span class="text-danger">{{ ((item.returned / item.total_assigned) * 100)?.toFixed(2) }} %</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeUnmount, ref, reactive, watch } from "vue";

import PageLayout from "@/components/layout/PageLayout.vue";
import DataTable from "@/components/table/DataTable.vue";
import loader2 from "@/components/loader/loader2.vue";
import { useDashboardStore } from "@/store/dashboard/dashboard"
import DatePicker from '@/components/others/DatePicker.vue';
import TableSkeleton from "@/components/TableSkeleton/TableSkeleton.vue";
import { useRoute } from "vue-router";
const dashboard = useDashboardStore();
const route = useRoute();

dashboard.getAccountData();
dashboard.getTopFiveMerchant();
dashboard.getDataEntryInfo();
dashboard.getTopFiveHubs();
dashboard.getRider();

const datafilter = () => {
  dashboard.getAccountData();
  dashboard.getTopFiveMerchant();
  dashboard.getDataEntryInfo();
  dashboard.getTopFiveHubs();
  dashboard.getRider();
}

// beforeEach(function () {
//   console.log("top beforeEach");
// });

</script>