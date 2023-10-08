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
          // requiresAuth: true,
        },
      },
      {
        path: "/notes",
        name: "notes",
        component: () => import("@/pages/notes/index.vue"),
        meta: {
          pageTitle: "Dashboard",
          // requiresAuth: true,
        },
      },
      {
        path: "/notes",
        name: "newNote",
        component: () => import("@/pages/notes/newNotes.vue"),
        meta: {
          pageTitle: "Dashboard",
          // requiresAuth: true,
        },
      },
      {
        path: "/all_cases",
        name: "allCases",
        component: () => import("@/pages/cases/allCases.vue"),
        meta: {
          pageTitle: "All Casess",
          // requiresAuth: true,
        },
      },
      {
        path: "/running_cases",
        name: "runningCases",
        component: () => import("@/pages/cases/runningCase.vue"),
        meta: {
          pageTitle: "Running Case",
          // requiresAuth: true,
        },
      },
      {
        path: "/today_cases",
        name: "todayCases",
        component: () => import("@/pages/cases/todayCases.vue"),
        meta: {
          pageTitle: "Dashboard",
          // requiresAuth: true,
        },
      },

      {
        path: "/tomorrow_cases",
        name: "tomorrowCases",
        component: () => import("@/pages/cases/tomorrowCases.vue"),
        meta: {
          pageTitle: "Dashboard",
          // requiresAuth: true,
        },
      },
      {
        path: "/not_updated",
        name: "notUpdatedCases",
        component: () => import("@/pages/cases/notUpdatedCases.vue"),
        meta: {
          pageTitle: "Not Updated Cases",
          // requiresAuth: true,
        },
      },
      {
        path: "/decided",
        name: "decidedCases",
        component: () => import("@/pages/cases/decidedCases.vue"),
        meta: {
          pageTitle: "Dashboard",
          // requiresAuth: true,
        },
      },
      {
        path: "/abandoned",
        name: "abandonedCases",
        component: () => import("@/pages/cases/abandonedCases.vue"),
        meta: {
          pageTitle: "Dashboard",
          // requiresAuth: true,
        },
      },
      {
        path: "/user-profile",
        name: "userProfile",
        component: () => import("@/pages/user-profile/user-profile.vue"),
        meta: {
          pageTitle: "User Profile",
          // requiresAuth: true
        },
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/pages/settings/settings.vue"),
        meta: {
          pageTitle: "Settings",
          // requiresAuth: true
        },
      },
      {
        path: "/case-type",
        name: "caseType",
        component: () => import("@/pages/settings/caseType/caseType.vue"),
        meta: {
          pageTitle: "Case Type",
          // requiresAuth: true
        },
      },
      {
        path: "/court",
        name: "court",
        component: () => import("@/pages/settings/courtSetup/courtSetup.vue"),
        meta: {
          pageTitle: "Court",
          // requiresAuth: true
        },
      },
      {
        path: "/police-station",
        name: "policeStation",
        component: () => import("@/pages/settings/policeStation/policeStation.vue"),
        meta: {
          pageTitle: "Police Station",
          // requiresAuth: true
        },
      },
      {
        path: "/user",
        name: "addAdminUser",
        component: () => import("@/pages/settings/addAdminUser/addAdminUser.vue"),
        meta: {
          pageTitle: "Police Station",
          // requiresAuth: true
        },
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
