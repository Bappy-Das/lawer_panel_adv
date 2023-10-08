import { createRouter, createWebHistory } from 'vue-router'
import { usePannelLayoutStore } from '@/store/layout/pannelLayout'

const routes = [
  {
    path: "/admin",
    name: "admin",
    pageTitle: "Admin",
    component: () => import("@/layouts/pannel/Pannel.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/pages/dashboard/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          requiresAuth: true,
        },
      },
      {
        path: "/notes",
        name: "notes",
        component: () => import("@/pages/notes/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          requiresAuth: true,
        },
      },
      {
        path: "/all_cases",
        name: "allCases",
        component: () => import("@/pages/notes/index.vue"),
        meta: {
          pageTitle: "All Casess",
          requiresAuth: true,
        },
      },
      {
        path: "/running_cases",
        name: "runningCases",
        component: () => import("@/pages/dashboard/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          requiresAuth: true,
        },
      },
      {
        path: "/today_cases",
        name: "todayCases",
        component: () => import("@/pages/dashboard/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          requiresAuth: true,
        },
      },
      {
        path: "/today_cases",
        name: "todayCases",
        component: () => import("@/pages/dashboard/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          requiresAuth: true,
        },
      },
      {
        path: "/tomorrow_cases",
        name: "tomorrowCases",
        component: () => import("@/pages/dashboard/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          requiresAuth: true,
        },
      },
      {
        path: "/not_updated",
        name: "notUpdatedCases",
        component: () => import("@/pages/dashboard/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          requiresAuth: true,
        },
      },
      {
        path: "/decided",
        name: "decidedCases",
        component: () => import("@/pages/dashboard/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          requiresAuth: true,
        },
      },
      {
        path: "/abandoned",
        name: "abandonedCases",
        component: () => import("@/pages/dashboard/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          requiresAuth: true,
        },
      },
      {
        path: "/user-profile",
        name: "userProfile",
        component: () => import("@/pages/user-profile/user-profile.vue"),
        meta: {
          pageTitle: "User Profile",
          requiresAuth: true
        },
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/pages/settings/settings.vue"),
        meta: {
          pageTitle: "Settings",
          requiresAuth: true
        },
      },

      {
        path: "/forecast",
        name: "forecast",
        component: () => import("@/pages/forecast/index.vue"),
        meta: { pageTitle: "Forecast" },
      },
      {
        path: '/button-component',
        name: 'buttonComponent',
        component: () => import('@/pages/components/Btn.vue'),
        meta: { pageTitle: 'Button Component', }
      },
      {
        path: '/modal-component',
        name: 'modalComponent',
        component: () => import('@/pages/components/Modal.vue'),
        meta: { pageTitle: 'Modal Component', }
      },
      {
        path: '/menu-component',
        name: 'menuComponent',
        component: () => import('@/pages/components/Menu.vue'),
        meta: { pageTitle: 'Menu Component', }
      },
      {
        path: '/input-box-component',
        name: 'inputBoxComponent',
        component: () => import('@/pages/components/InputBox.vue'),
        meta: { pageTitle: 'Input Box Component', }
      },
      {
        path: '/select-box-component',
        name: 'selectBoxComponent',
        component: () => import('@/pages/components/SelectBox.vue'),
        meta: { pageTitle: 'Select Box Component', }
      },
      {
        path: '/message-box-component',
        name: 'LongTextBoxComponent',
        component: () => import('@/pages/components/LongTextBox.vue'),
        meta: { pageTitle: 'Message Box Component', }
      },
      {
        path: '/check-box-component',
        name: 'checkBoxComponent',
        component: () => import('@/pages/components/CheckBox.vue'),
        meta: { pageTitle: 'Check Box Component', }
      },
      {
        path: '/radio-box-component',
        name: 'radioBoxComponent',
        component: () => import('@/pages/components/RadioBox.vue'),
        meta: { pageTitle: 'Radio Box Component', }
      },
      {
        path: '/file-upload-component',
        name: 'fileUploadComponent',
        component: () => import('@/pages/components/FileUpload.vue'),
        meta: { pageTitle: 'File Upload Component' }
      },
      {
        path: '/data-table-component',
        name: 'dataTableComponent',
        component: () => import('@/pages/components/DataTable.vue'),
        meta: { pageTitle: 'Data Table Component', }
      },
      {
        path: '/loader',
        name: 'loader',
        component: () => import('@/pages/components/Loader.vue'),
        meta: { pageTitle: 'Loader Component', }
      },
      {
        path: '/datepicker',
        name: 'datepicker',
        component: () => import('@/pages/components/DatePicker.vue'),
        meta: { pageTitle: 'DatePicker Component', }
      },
    ],
  },

  {
    path: "/",
    component: () => import("@/layouts/simple/Simple.vue"),
    children: [
      {
        path: "/",
        name: "login",
        component: () => import("@/pages/auth/login.vue"),
        meta: { pageTitle: "Login" },
      },
      // {
      //   path: "/merchant/registration",
      //   name: "merchantRegistration",
      //   component: () => import("@/pages/auth/registration.vue"),
      //   meta: { pageTitle: "Registration" },
      // },

    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/message/Message.vue"),
    children: [
      {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: () => import("@/pages/error-page/404.vue"),
        meta: { pageTitle: "404" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})
// router.beforeEach((to, from, next) => {
//   let pannelLayout = usePannelLayoutStore();
//   window.currentRoute = to.name
//   pannelLayout.activeRoute = to.name;
//   next();
// });


router.beforeEach((to, from, next) => {
  let pannelLayout = usePannelLayoutStore();
  window.currentRoute = to.name;
  pannelLayout.activeRoute = to.name;
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    if (!localStorage.getItem("_token")) {
      next({ path: '/' })
    } else {
      next() // go to wherever I'm going
    }

  } else {
    next() // does not require auth, make sure to always call next()!
  }
})
export default router
