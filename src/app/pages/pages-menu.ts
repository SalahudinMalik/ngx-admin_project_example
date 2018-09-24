import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [

  ///////////////////////////////////////////////////////////////////Dash Board///////////////////////////////////////////////////////////////////

  {
    title: "Dashboard",
    icon: "nb-home",
    link: "/pages/dashboard",
  },

  ///////////////////////////////////////////////////////////////////Accounts///////////////////////////////////////////////////////////////////

  {
    title: 'Accounts',
    icon: 'nb-compose',
    link: '/pages/accounts',
    children: [
      {
        title: 'Chart Of Accounts',
        link: '/pages/accounts/chart-of-accounts',
      },
      {
        title: 'Journal Entry',
        link: '/pages/accounts/journal-entry',
      },
      {
        title: 'Journal Entry List',
        link: '/pages/accounts/journal-entry-list',
      },
      {
        title: 'General Ledger',
        link: '/pages/accounts/general-ledger',
      },
      {
        title: 'Payment Entry',
        link: '/pages/accounts/payment-entry',
      }],
  },

 
  ///////////////////////////////////////////////////////////////////Customer///////////////////////////////////////////////////////////////////

  {
    title: "Customers",
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
////////////////////////////////////////invoices ///////////////////////////////////////////////////////
{
  title: "Invoice",
  icon: "nb-compose",
  link: "/pages/invoices/add-invoice",
  children: [
    {
      title: "Add Invoice",
      link: "/pages/invoices/add-invoice"
    },
    {
      title: "List Invoice",
      link: "/pages/invoices/list-invoice"
    }
  ]
},
 ///////////////////////////////////////////////////////////////////Connection///////////////////////////////////////////////////////////////////

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
      title: "Renew Connections",
      link: "/pages/connections/renew",
    },
    {
      title: "List Connections",
      link: "/pages/connections/listConnections"
    },
    {
      title: "Connection Expiration",
      link: "/pages/connections/exConnections"
    },

  ]
},
 ///////////////////////////////////////////////////////////////////// Login Manager/////////////////////////////////////////////////////////////

 {
  title: "Login Manager",
  icon: "nb-home",
  link: "/pages/login-manager",
  children: [
    {
      title: 'Document Verification',
      link: '/pages/login-manager/document-verification',
    },
    {
      title: 'Connection Verification',
      link: '/pages/login-manager/recharge-connection',
    },
  ],
},

  ///////////////////////////////////////////////////////////////////User///////////////////////////////////////////////////////////////////

  {
    title: "Users",
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

  ///////////////////////////////////////////////////////////////////Package///////////////////////////////////////////////////////////////////

  {
    title: "Packages",
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

  ///////////////////////////////////////////////////////////////////Dealer Packages///////////////////////////////////////////////////////////////////

  {
    title: "Dealer Packages",
    icon: "nb-person",
    link: "/pages/dealerpackage/addDealerPackage",
    home: true,
  },
  ///////////////////////////////////////////////////////////////////Stock///////////////////////////////////////////////////////////////////

  {
    title: "Stock",
    icon: "nb-bar-chart",
    link: "/pages/stock",
    children: [
      {
        title: "Warehouses",
        link: "/pages/stock/warehouses"
      },
      {
        title: "Items",
        link: "/pages/stock/items"
      },
      {
        title: "Stock In",
        link: "/pages/stock/stock-in"
      },
      {
        title: "Stock Out",
        link: "/pages/stock/stock-out"
      }
    ]
  },

  ///////////////////////////////////////////////////////////////////Coverage///////////////////////////////////////////////////////////////////

  {
    title: "Coverage",
    icon: "nb-location",
    link: "/pages/coverage/cov"
  },

  ///////////////////////////////////////////////////////////////////////Complaints//////////////////////////////////////////////////////////////

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

  ////////////////////////////////////////////////////////////////////////Base Station//////////////////////////////////////////////////////////////

  {
    title: 'Base Station',
    icon: 'nb-gear',
    link: '/pages/basestation',
    children: [
      {
        title: 'Add Base Station',
        link: '/pages/basestation/addBasestation',
      },
      {
        title: 'List Base Station',
        link: '/pages/basestation/listBasestation',
      },
    ],
  },

 
  ///////////////////////////////////////////////////////////////////Notifications///////////////////////////////////////////////////////////////////

  {
    title: "Notifications",
    icon: "nb-notifications",
    link: "/pages/notification",
    children: [
      {
        title: "Add Notification",
        link: "/pages/notification/add"
      },
      {
        title: "List Notification",
        link: "/pages/notification/list"
      },
    ]
  },

  ///////////////////////////////////////////////////////////////////////Configuration//////////////////////////////////////////////////////////////

  {
    title: "Configurations",
    icon: "nb-gear",
    link: "/pages/configuration",
    children: [
      {
        title: "Rules",
        link: "/pages/configuration/rules",
      },
      {
        title: "Rules List",
        link: "/pages/configuration/rules-list",
      }
    ]
  },

  ////////////////////////////////////////////////////////////////////////Permissions//////////////////////////////////////////////////////////////

  {
    title: "Permissions",
    icon: "nb-locked",
    link: "/pages/permissions",
    children: [
      {
        title: "Assign Views",
        link: "/pages/permissions/assign-views"
      },
      {
        title: "Role Permissions",
        link: "/pages/permissions/rolePermissions"
      },
      {
        title: "User Permissions",
        link: "/pages/permissions/userPermissions"
      }
    ]
  },
  ///////////////////////////////////////////////////////////////////Dealer Packages///////////////////////////////////////////////////////////////////

  {
    title: "Help",
    icon: "nb-play",
    link: "/pages/help",
    home: true,
  },

  ///////////////////////////////////////////////////////////////////////// < Menu End >////////////////////////////////////////////////////////////////////////

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
