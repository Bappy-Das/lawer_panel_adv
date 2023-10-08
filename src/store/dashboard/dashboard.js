import { defineStore } from "pinia";
import alert from '@/functions/alert.js'
import { cloneDeep } from '@/functions/com.js';

const defultState = {
    AccountData: {},
    topFiveMerchantiList: {},
    daraEntry: {},
    topFiveHubiList: {},
    topRiderList: {},
    dateRangeSelect: "",
    hubData: {},
    loading: false,
    totalHubsLoading: false,
    ridersLoading: false,

    totalInTransit: 0,
    totalInAssigned: 0,
    totalCashCollected: 0,
    totalInCashToBeCollected: 0,
    totalDelivered: 0,
    totalExchanged: 0,
    totalHold: 0,
    totalReturned: 0,
}

export const useDashboardStore = defineStore("dashboard", {
    state: () => cloneDeep(defultState),
    actions: {
        async getAccountData() {
            this.loading = true;
            try {
                let resp = await this.$axios.get("api/admin/get-dashboard-account?filter=" + this.dateRangeSelect);
                this.loading = false;
                if (resp.data.success) {
                    this.AccountData = resp.data.data;
                    return resp.data.data;

                } return [];
            }
            catch { this.loading = false; return []; }
        },

        async getTopFiveMerchant() {
            this.loading = true;
            try {
                let resp = await this.$axios.get("api/admin/get-top-five-merchants?filter=" + this.dateRangeSelect);
                this.loading = false;
                if (resp.data.success) {
                    this.topFiveMerchantiList = resp.data.data;
                    return resp.data.data;

                } return [];
            }
            catch { this.loading = false; return []; }
        },
        async getDataEntryInfo() {
            this.loading = true;
            try {
                let resp = await this.$axios.get("/api/admin/get-dashboard-data-entry?filter=" + this.dateRangeSelect);
                this.loading = false;
                if (resp.data.success) {
                    this.daraEntry = resp.data.data;
                    return resp.data.data;

                } return [];
            }
            catch { this.loading = false; return []; }
        },

        async getTopFiveHubs() {
            this.totalHubsLoading = true;
            // dashboard.totalInTransit = " "
            this.totalInTransit = 0;
            this.totalInAssigned = 0;
            this.totalCashCollected = 0;
            this.totalInCashToBeCollected = 0;
            this.totalDelivered = 0;
            this.totalExchanged = 0;
            this.totalHold = 0;
            this.totalReturned = 0;
            try {
                let resp = await this.$axios.get("api/admin/get-top-five-hubs?filter=" + this.dateRangeSelect);
                this.totalHubsLoading = false;
                if (resp.data.success) {
                    this.topFiveHubiList = resp.data.data;
                    // console.log(resp.data.data.data)
                    for (let item of this.topFiveHubiList.data) {
                        this.totalInTransit += item.in_transit;
                        this.totalInAssigned += item.assigned;
                        this.totalCashCollected += item.cash_collected;
                        this.totalInCashToBeCollected += item.cash_hand_overed;
                        this.totalDelivered += item.delivered;
                        this.totalExchanged += item.exchanged;
                        this.totalHold += item.hold;
                        this.totalReturned += item.returned;

                    }
                    return resp.data.data;

                } return [];
            }
            catch { this.totalHubsLoading = false; return []; }
        },

        async getRider() {
            this.ridersLoading = true;
            try {
                let resp = await this.$axios.get("api/admin/get-top-riders?filter=" + this.dateRangeSelect);
                this.ridersLoading = false;
                if (resp.data.success) {
                    this.topRiderList = resp.data.data;
                    return resp.data.data;

                } return [];
            }
            catch { this.ridersLoading = false; return []; }
        },
        async getDataEntryDashboardByHub() {
            this.loading = true;
            try {
                let resp = await this.$axios.get("api/admin/get-data-entry-dashboard-by-hub?filter=" + this.dateRangeSelect);
                this.loading = false;
                if (resp.data.success) {
                    this.topDataEntryDashboardByHubList = resp.data.data;
                    return resp.data.data;

                } return [];
            }
            catch { this.loading = false; return []; }
        },

        async getHubDashboardData() {
            this.loading = true;
            try {
                let resp = await this.$axios.get("/api/admin/hub-dashboard-statistics");
                this.loading = false;
                if (resp.data.success) {
                    this.hubData = resp.data.data;
                };
            }
            catch { this.loading = false; }
        },

        reset() {
            Object.assign(this, cloneDeep(defultState));
        },
    },
});
