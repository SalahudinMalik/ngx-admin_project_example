import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "nb-home",
    link: "/pages/dashboard",
    home: true
  },
  // {
  //   title: 'Accounts',
  //   icon: 'nb-compose',
  //   link: '/pages/accounts',
  //   children: [
  //     {
  //       title: 'Chart Of Accounts',
  //       link: '/pages/accounts/ChartOfAccounts',
  //     },
  //   ],
  // },
  {
    title: "User",
    icon: "nb-person",
    link: "/pages/user",
    children: [
      {
        title: "Add User",
        link: "/pages/user/addUser"
      },
      {
        title: "List User",
        link: "/pages/user/listUser"
      }
    ]
  },
  {
    title: "Package",
    icon: "nb-gear",
    link: "/pages/packages",
    children: [
      {
        title: "Add Package",
        link: "/pages/packages/addPackage"
      },
      {
        title: "List Package",
        link: "/pages/packages/listPackage"
      }
    ]
  },
  {
    title: "Customer",
    icon: "nb-person",
    link: "/pages/customers/",
    children: [
      {
        title: "Add Customer",
        link: "/pages/customers/addCustomer"
      },
      {
        title: "List Customer",
        link: "/pages/customers/listCustomer"
      }
    ]
  },
  {
    title: "Dealer Packages",
    icon: "nb-person",
    link: "/pages/dealerpackage/addDealerPackage"
    // children: [
    //   {
    //     title: 'Add Dealer Packages',
    //     link: '/pages/dealerpackage/addDealerPackage',
    //   },
    // {
    //   title: 'List Customer',
    //   link: '/pages/customers/listCustomer',
    // },
    // ],
  },
  {
    title: "Notifications",
    icon: "nb-notifications",
    link: "/pages/notification/noti"
  },
  {
    title: "Connections",
    icon: "nb-shuffle",
    link: "/pages/connections/",
    children: [
      {
        title: "Add Connection",
        link: "/pages/connections/addConnection"
      },
      {
        title: "List Connections",
        link: "/pages/connections/listConnections"
      },
      {
        title: "Connection Expiration",
        link: "/pages/connections/exConnections"
      }
    ]
  },

  {
    title: "Complaints",
    icon: "nb-gear",
    link: "/pages/complaints",
    children: [
      {
        title: "Add Complaints",
        link: "/pages/complaints/addComplain"
      },

      {
        title: "List Complaints",
        link: "/pages/complaints/listComplain"
      }
    ]
  },
  // {
  //   title: 'Base Station',
  //   icon: 'nb-gear',
  //   link: '/pages/basestation',
  //   children: [
  //     {
  //       title: 'Add Base Station',
  //       link: '/pages/basestation/addBasestation',
  //     },
  //     {
  //       title: 'List Base Station',
  //       link: '/pages/basestation/listBasestation',
  //     },
  //   ],
  // },
  {
    title: "Coverage",
    icon: "nb-location",
    link: "/pages/coverage/cov"
  },

  {
    title: "Permissions",
    icon: "nb-locked",
    link: "/pages/permissions",
    children: [
      {
        title: "Role Permissions",
        link: "/pages/permissions/rolePermissions"
      },
      {
        title: "User Permissions",
        link: "/pages/permissions/userPermissions"
      }
    ]
  }

  // {
  //   title: 'UI Features',
  //   icon: 'nb-keypad',
  //   link: '/pages/ui-features',
  //   children: [
  //     {
  //       title: 'Buttons',
  //       link: '/pages/ui-features/buttons',
  //     },
  //     {
  //       title: 'Grid',
  //       link: '/pages/ui-features/grid',
  //     },
  //     {
  //       title: 'Icons',
  //       link: '/pages/ui-features/icons',
  //     },
  //     {
  //       title: 'Modals',
  //       link: '/pages/ui-features/modals',
  //     },
  //     {
  //       title: 'Popovers',
  //       link: '/pages/ui-features/popovers',
  //     },
  //     {
  //       title: 'Typography',
  //       link: '/pages/ui-features/typography',
  //     },
  //     {
  //       title: 'Animated Searches',
  //       link: '/pages/ui-features/search-fields',
  //     },
  //     {
  //       title: 'Tabs',
  //       link: '/pages/ui-features/tabs',
  //     },
  //   ],
  // },
  // {
  //   title: 'Forms',
  //   icon: 'nb-compose',
  //   children: [
  //     {
  //       title: 'Form Inputs',
  //       link: '/pages/forms/inputs',
  //     },
  //     {
  //       title: 'Form Layouts',
  //       link: '/pages/forms/layouts',
  //     },
  //   ],
  // },
  // {
  //   title: 'Components',
  //   icon: 'nb-gear',
  //   children: [
  //     {
  //       title: 'Tree',
  //       link: '/pages/components/tree',
  //     }, {
  //       title: 'Notifications',
  //       link: '/pages/components/notifications',
  //     },
  //   ],
  // },
  // {
  //   title: 'Maps',
  //   icon: 'nb-location',
  //   children: [
  //     {
  //       title: 'Google Maps',
  //       link: '/pages/maps/gmaps',
  //     },
  //     {
  //       title: 'Leaflet Maps',
  //       link: '/pages/maps/leaflet',
  //     },
  //     {
  //       title: 'Bubble Maps',
  //       link: '/pages/maps/bubble',
  //     },
  //     {
  //       title: 'Search Maps',
  //       link: '/pages/maps/searchmap',
  //     },
  //   ],
  // },
  // {
  //   title: 'Charts',
  //   icon: 'nb-bar-chart',
  //   children: [
  //     {
  //       title: 'Echarts',
  //       link: '/pages/charts/echarts',
  //     },
  //     {
  //       title: 'Charts.js',
  //       link: '/pages/charts/chartjs',
  //     },
  //     {
  //       title: 'D3',
  //       link: '/pages/charts/d3',
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: 'nb-title',
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: '/pages/editors/tinymce',
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: '/pages/editors/ckeditor',
  //     },
  //   ],
  // },
  // {
  //   title: 'Tables',
  //   icon: 'nb-tables',
  //   children: [
  //     {
  //       title: 'Smart Table',
  //       link: '/pages/tables/smart-table',
  //     },
  //   ],
  // },
  // {
  //   title: 'Miscellaneous',
  //   icon: 'nb-shuffle',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: 'nb-locked',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
