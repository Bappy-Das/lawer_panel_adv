import { defineStore } from "pinia";
import alert from '@/functions/alert.js'
import { cloneDeep } from '@/functions/com.js';

export const useCommonStore = defineStore("common", {
    state: () => ({
        menuItems: [],
        loading: false,

    }),
    actions: {
        // side menu call
        async getMenuList() {
            this.menuItems = [];
            this.loading = true;
            let resp = await this.$axios.get("/api/admin/menu-list");
            this.loading = false;
            if (resp.data.success) {
                const userType = parseInt(localStorage.getItem('_userType'));
                const excludedRoutes = [];

                if ([5, 6, 7].includes(userType)) {
                    excludedRoutes.push('dataentry', 'accountDashboard', 'dashboard', 'distribution', 'return');
                } else if (userType === 14) {
                    excludedRoutes.push('dataentry', 'dashboard', 'distribution', 'return');
                } else if (userType === 11) {
                    excludedRoutes.push('accountDashboard', 'dashboard', 'distribution', 'return');
                } else {
                    excludedRoutes.push('dataentry', 'accountDashboard', 'hubDashboard', 'distribution', 'return');
                }
                // } else if ([1, 8, 9].includes(userType)) {
                //     excludedRoutes.push('dataentry', 'accountDashboard', 'hubDashboard', 'distribution', 'return');
                // }

                for (let item of resp.data.data) {
                    if (!excludedRoutes.includes(item.route_name)) {
                        this.menuItems.push(item);
                    }
                }
                // console.log(this.menuItems);

                return resp.data.data;
            }

            return [];
        },

    },
});



// async getMenuList() {
//     this.menuItems = [];
//     let resp = await this.$axios.get("/api/admin/menu-list");
//     this.loading = false;
//     if (resp.data.success) {

//         if (localStorage.getItem('_userType') == 5 || localStorage.getItem('_userType') == 6 || localStorage.getItem('_userType') == 7) {
//             for (let item of resp.data.data)
//                 if (item.route_name !== 'dataentry' && item.route_name !== 'accountDashboard' && item.route_name !== 'dashboard' && item.route_name !== 'distribution' && item.route_name !== 'return') {
//                     this.menuItems.push(item)
//                 }
//         }
//         else if (localStorage.getItem('_userType') == 14) {
//             for (let item of resp.data.data)
//                 if (item.route_name !== 'dataentry' && item.route_name !== 'dashboard' && item.route_name !== 'dashboard' && item.route_name !== 'distribution' && item.route_name !== 'return') {
//                     this.menuItems.push(item)
//                 }
//         }
//         else if (localStorage.getItem('_userType') == 11) {
//             for (let item of resp.data.data)
//                 if (item.route_name !== 'accountDashboard' && item.route_name !== 'dashboard' && item.route_name !== 'dashboard' && item.route_name !== 'distribution' && item.route_name !== 'return') {
//                     this.menuItems.push(item)
//                 }
//         }
//         else (localStorage.getItem('_userType') == 1 || localStorage.getItem('_userType') == 8 || localStorage.getItem('_userType') == 9) {
//             for (let item of resp.data.data)
//                 if (item.route_name !== 'dataentry' && item.route_name !== 'accountDashboard' && item.route_name !== 'hubDashboard' && item.route_name !== 'distribution' && item.route_name !== 'return') {
//                     this.menuItems.push(item)
//                 }
//         }
//         return resp.data.data;
//     } return [];
// },
