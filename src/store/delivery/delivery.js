import { defineStore } from "pinia";
import alert from '@/functions/alert.js';
import toast from '@/functions/toast.js'

import { cloneDeep } from '@/functions/com.js';
const defultState = {
  deliveryBasic: {
    hub_id: "",
    consignment_id: "",
    recipient_name: "",
    recipient_number: "",
    recipient_email: "",
    recipient_alternative_number: "",
    recipient_zone_id: "",
    product_id: "",
    recipient_address: "",
    merchant_id: "",
    store_id: "",
    product_id: "",
    package_description: "",
    delivery_note: "",
    special_instruction: "",
    merchant_order_id: "",
    delivery_operation: {
      delivery_id: "",
      amount_to_be_collected: "",
      received_amount: "",
      charge: "",
      cod_charge: "",
      delivery_plan_id: "",
      return_plan_id: "",
      assigned_rider: "",
      assigned_date: "",
      payment_status: "",
      status: "",
      previous_status: "",
      next_status: "",
      delivery_date: "",
      return_date: "",
      invoice_date: "",
    },
  },
  merchantStoreList: {},
  merchantProductList: [],
  merchantDeliveryPlans: [],
  selectDeliveryPlan: [],
  merchantReturnPlans: [],
  selectReturnPlan: {},
  hubInfoByZone: {},
  actionStatus: "",
  isHub: "Yes",

  deliveryPlan: [],
  returnPlan: [],
  storeProducts: [],
  courierZonesDropDownVal: "",
  merchantDropDownVal: "",
  productDropDownVal: "",
  storeDropDownVal: "",
  hubDropDownVal: "",
  returnPlanDropDownVal: "",
  deliveryPlanDropDownVal: "",
  merchantDeliveryInfo: "",
  csv: {
    headers: "",
    response: "",
    options: [],
    csv_data_file_id: "",
  },

  deliveryList: {},
  loading: false,
  deliveryModal: false,
  trackingModal: false,

  toggleSwitch: true,
  selectList: "Active",
  getFilterData: "",
  filterHub: "",
  filterRider: "",
  filterPaymentStatus: "",
  filterStatus: "",
  merchant_id: "",
  currentItemFlagText: "",
  nextFlagText: "",
  dateRangeSelect: "",
  perPageProduct: 25,
  getStatusList: [],
  selectActionItemId: [],
  selectRemoveItemId: [],
  removeType: "",
  selectActionItem: [],
  selectedHubId: "",
  actionNote: "",
  transitHub: "",
  assignRider: "",
  receivedAmount: "",
  selectedProducts: [],
  delivery_note: [],
  exportDelivery: "",
  existingMerchant: false,
  selectProduct: "",
  selectedModalItemIds: [],
  selectedModalItemReceivedAmounts: [],
  selectedModalItemNotes: [],
  actual_price: "",
  deliveries: [
    {
      id: "",
      current_status: "",
      received_amount: "",
      note: "",
    },
  ],
  totalAmountToBeCollected: 0,
  totalReceivedAmount: 0,
  page: 1,
  trackingData: {},
  hubRiderList: {},
  deliveryDetails: {},
  tabs: 'upload',
  // checkbox: false,
  errorMsg: {},
  paymentStatusList: [],
  errLogsList: [],
  deliveryActionLoading: false,
  modalItemChecked: false,
  isItemChecked: false,
  permissionAccess: false,
  actionStatusList: [],
  totalRCV: 0,
  selectedModalItemAmountToBeCollected: 0,
  selectedModalReceivedAmount: 0,

};
export const useDeliveryStore = defineStore("delivery", {
  state: () => cloneDeep(defultState),
  actions: {
    async handleCreateDelivery(params) {
      try {
        this.loading = true;
        let req = await this.$axios.post("api/admin/create/delivery", params);
        this.loading = false;
        if (req.data.success) {
          this.reset();
          this.$router.push({ name: "deliveries" });
          this.merchant_id = "";
          alert.success({
            title: "New Delivery Created Successfully.",
          });
          return true
        }
      }
      catch (err) {
        this.loading = false;
        return err.response.data.error
      }
    },

    async editDelivery(id) {
      this.loading = true;
      let req = await this.$axios.get("api/admin/edit/delivery/" + id);
      if (req.data.success) {
        this.loading = false;
        for (let key in this.deliveryBasic) {
          if (req.data.data[key]) {
            this.deliveryBasic[key] = req.data.data[key];
          }
        }
        this.getMerchantDeliveryInfo();
        this.getHubInfoByZone()
      }
    },
    async getDeliveryDetails(id) {
      this.loading = true;
      let req = await this.$axios.get("/api/admin/get-delivery-details?id=" + id);
      if (req.data.success) {
        this.loading = false;
        this.deliveryBasic = req.data.data;
        this.deliveryDetails = req.data.data;
        this.getHubInfoByZone()
      }
    },
    async trackingDetails(id) {
      this.trackingData = {};
      this.trackingModal = true;
      // trackingDetails=true
      let req = await this.$axios.get("api/delivery/tracking-details?search_item=" + id);
      if (req.data.success) {
        this.trackingData = req.data.data.data;
      }
    },

    async getRiderListByHubId(id) {
      let req = await this.$axios.get("api/admin/get-rider-list-for-drop-down?hub_id=" + id);
      if (req.data.success) {
        for (let i = 0; req.data.data.length > i; i++) {
          req.data.data[i].name = req.data.data[i].first_name + " " + req.data.data[i].last_name;
        }
        this.hubRiderList = req.data.data
      }
    },

    async getStatus() {
      this.getStatusList = [];
      let req = await this.$axios.get("/api/admin/get-status-list");
      if (req.data.success) {
        this.getStatusList = req.data.data;
        this.actionStatusList = [];
        for (let item of req.data.data) {
          if (item.id !== 10 && item.id !== 11 && item.id !== 17) {
            this.actionStatusList.push(item)
          }
        }
      }
    },

    async getDeliveries() {
      this.loading = true;
      this.deliveryList = {};
      // this.reset();
      if (this.selectList == "Active") { var tableType = ""; } else { var tableType = this.selectList; }
      if (this.dateRangeSelect == "") {
        let today = new Date();
        let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
        var today_date_range = date + '~' + date
      } else {
        var today_date_range = this.dateRangeSelect;
      }
      let options = {
        filter: this.getFilterData,
        date_range: today_date_range,
        filterStatus: this.filterStatus,
        filterPaymentStatus: this.filterPaymentStatus,
        filterRider: this.filterRider,
        filterHub: this.filterHub,
        filterRider: this.filterRider,
        merchant_id: this.merchant_id,
        filterPaymentStatus: this.filterPaymentStatus,
        trash: tableType,
      };
      try {
        let resp = await this.$axios.get("api/admin/deliveries?page=" + this.page + "&per_page=" + this.perPageProduct + "&options=" + JSON.stringify(options) + "&export=" + this.exportDelivery);
        this.loading = false;
        this.totalRCV = 0;
        if (this.exportDelivery) {
          this.forceFileDownload(resp, this.exportDelivery);
        }
        if (resp.data.success) {
          for (let i = 0; resp.data.data.data.length > i; i++) {
            resp.data.data.data[i].checkboxStatus = false;
          }
          this.deliveryList = resp.data.data;

          for (let item of resp.data.data.data) {
            this.totalRCV += item.received_amount
          }
          // console.log(this.totalRCV);
          return resp.data.data;
        }
        return [];
      } catch {
        this.loading = false;
        return [];
      }
    },

    async deliveryAction(params) {
      this.deliveryActionLoading = true
      try {
        let resp = await this.$axios.post("api/admin/delivery/update-status", params);
        if (resp.data.success) {
          this.deliveryActionLoading = false
          if (this.actionStatus === 3) {
            this.$router.push({ name: "deliveryInvoice" });
            this.actionStatus = "";
            alert.success({
              title: "Parcel Updated Successfully.",
            });
            this.actionStatus = "";
            this.filterStatus = "";
            this.filterHub = "";
            this.getFilterData = "";
          } else {
            this.reset();
            this.getDeliveries();
            this.deliveryModal = false;
            this.actionStatus = "";
            this.filterStatus = "";
            this.filterHub = "";
            this.getFilterData = "";

            alert.success({
              title: "Parcel Updated Successfully.",
            });
            this.selectActionItem = [];
            this.selectActionItemId = [];

            this.reset();
            this.getStatus();
          }
        }
      } catch (e) {
        toast.error({ title: `${e.response.data.error}` })
        // toast.error({ title: "Are not allowed for your target status" })
        this.deliveryActionLoading = false
      }
    },


    async amendmentAction(params) {
      this.loading = true
      try {
        let resp = await this.$axios.post("/api/admin/delivery/amendment-update-status", params);
        if (resp.data.success) {
          this.loading = false
          this.getStatus();
          this.getDeliveries();
          this.deliveryModal = false;
          alert.success({
            title: "Parcel Updated Successfully.",
          });
          this.reset();

        }
      } catch {
        this.loading = false
      }
    },

    async getHubInfoByZone() {
      this.getMerchantDeliveryInfo();
      let resp = await this.$axios.get("api/admin/get-hub-info-by-zone?courier_zone_id=" + this.deliveryBasic.recipient_zone_id)
      if (resp.data.success) {
        this.hubInfoByZone = resp.data.data;
      }
    },
    async getPaymentStatusList() {
      this.paymentStatusList = [];
      let resp = await this.$axios.get("api/admin/get-payment-status-list")
      if (resp.data.success) {
        for (const item in resp.data.data) {
          const capitalizedKey = item.charAt(0).toUpperCase() + item.slice(1);
          const status = {
            key: capitalizedKey,
            value: item,
          };
          this.paymentStatusList.push(status);
        }
      }
    },


    async getMerchantDeliveryInfo() {
      this.merchantDeliveryPlans = [];
      this.merchantReturnPlans = [];
      this.merchantStoreList = {};
      this.actual_price = ""
      this.merchantProductList = []
      let resp = await this.$axios.get("api/admin/merchant-deliveries-info?merchant_id=" + this.deliveryBasic.merchant_id + "&courier_zone_id=" + this.deliveryBasic.recipient_zone_id);
      if (resp.data.success) {
        this.merchantStoreList = resp.data.data.store;
        this.getMerchantProduct();
        for (let item of resp.data.data.plans) {
          if (item.plan_merchant_delivery) {
            this.merchantDeliveryPlans = [item.plan_merchant_delivery];
            this.selectDeliveryPlan = item.plan_merchant_delivery
          } else {
            this.merchantReturnPlans = [item.plan_merchant_return];
            this.selectReturnPlan = item.plan_merchant_return;
          }
        }
      }
      return resp.data.data;
    },

    getMerchantProduct(e) {
      // console.log(e)
      this.merchantProductList = [];
      this.actual_price = "";
      this.merchantStoreList.forEach((item) => {
        if (item.id == this.deliveryBasic.store_id) {
          this.merchantProductList = item.store_products
          return 0;
        }
      });
      this.getProductActualPrice()
    },
    getProductActualPrice(e) {
      this.merchantProductList.forEach((item) => {
        if (item.id == this.deliveryBasic.product_id) {
          this.actual_price = item.actual_price;
          return 0;
        }
      });
    },

    async deleteDelivery(id, type) {
      let req = await this.$axios.post("/api/admin/delete/delivery", {
        id: id,
        action_type: type,
      });
      if (req.data.success) {
        this.removeType = "";
        this.getDeliveries();
        if (type == "restore") {
          alert.success({
            title: "Restore Successfully.",
          });
        } else if (type == "hard_delete") {
          alert.success({
            title: "Permanently Deleted from Trash.",
          });
        } else if (type == "soft_delete") {
          alert.success({
            title: "Deleted Successfully",
          });
        }
      }
    },

    async handleUploadCSV(params) {
      this.loading = true;
      try {
        let req = await this.$axios.post("api/admin/upload-csv-document", params);
        if (req.data.success) {
          this.loading = false;
          let header = [];
          let tableData = [];

          for (let i = 0; req.data.data.parsed_data.length > i; i++) {
            let data = req.data.data.parsed_data[i];
            if (i === 0) {
              this.csv.options = data;
              for (let r = 0; data.length > r; r++) {
                let subArr = {
                  title: data[r],
                  field: data[r].toLowerCase().replace(/ /g, "_"),
                  value: data[r],
                  index: r,
                };
                header.push(subArr);
              }
            } else {
              let subObj = {};
              for (let r = 0; data.length > r; r++) {
                subObj[header[r].field] = data[r];
              }
              tableData.push(subObj);
            }
          }
          this.csv.headers = header;
          this.csv.response = tableData;
          this.csv.csv_data_file_id = req.data.data.csv_field_id;
          // console.log(this.csv);
          this.$router.push({ name: "mappingCSVDocument" });
        }
        else {
          this.errorMsg = req.data
          this.loading = false;
          // this.errorlogsForCsv()
        }
      } catch {
        this.loading = false;
      }
    },

    async errorlogsForCsv() {
      this.loading = true;
      if (this.selectList == "Active") { var tableType = ""; } else { var tableType = this.selectList; }
      let options = {
        filter: this.getFilterData,
        date_range: this.dateRangeSelect,
        filterStatus: this.filterStatus,
        trash: tableType,
      };
      try {
        let resp = await this.$axios.get("api/admin/get-csv-error-logs?page=" + this.page + "&options=" + JSON.stringify(options));
        this.loading = false;
        if (resp.data.success) {
          this.errLogsList = resp.data.data
          // return resp.data.data;
        }
        return [];
      } catch {
        this.loading = false;
        return [];
      }
    },

    async handleProcessCSVData(params) {
      this.loading = true;
      let req = await this.$axios.post("api/admin/submit-csv-document", params);
      if (req.data.success) {
        this.loading = false;
        this.$router.push({ name: "uploadSuccess" });
      }
    },

    async reGenerateBarCode(params) {
      this.loading = true;
      let req = await this.$axios.post("api/admin/generate-bar-code", params);
      if (req.data.success) {
        // this.getDeliveries();
        location.reload();
        this.loading = false;
      }
    },

    forceFileDownload(response, filename) {
      // console.log(response.data)
      let blob = new Blob([response.data], {
        type: "text/csv",
      });
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      this.exportDelivery = "";
      // console.log("ghsjkf")
    },

    currentDateTime() {
      let today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return date + " " + time;
    },

    reset() {
      Object.assign(this, cloneDeep(defultState));
    }
  },
});
