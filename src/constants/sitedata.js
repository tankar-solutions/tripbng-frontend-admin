export const navitems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "User Management",
    subItems: [
      {
        label: "Users",
        href: "/dashboard/user-management/customers",
      },
      {
        label: "Corporates",
        subItems: [
          {
            label: "Approved Corporates",
            href: "/dashboard/user-management/corporates/approved",
          },
          {
            label: "Unapproved Corporates",
            href: "/dashboard/user-management/corporates/unapproved",
          },
        ],
      },
      {
        label: "Agents",
        subItems: [
          {
            label: "Approved Agents",
            href: "/dashboard/user-management/agents/approved",
          },
          {
            label: "Unapproved Agents",
            href: "/dashboard/user-management/agents/unapproved",
          },
        ],
      },
      {
        label: "Admins",
        href: "/dashboard/user-management/admins",
      },
    ],
  },
  {
    label: "Booking Management",
    subItems: [
      {
        label: "Flights",
        href: "/dashboard/booking-management/flights",
      },
      {
        label: "Hotels",
        href: "/dashboard/booking-management/hotels",
      },
      {
        label: "Buses",
        href: "/dashboard/booking-management/buses",
      },
      {
        label: "Holidays",
        href: "/dashboard/booking-management/holidays",
      },
      {
        label: "Visa Services",
        href: "/dashboard/booking-management/visa-services",
      },
    ],
  },
  {
    label: "Report & Analytics",
    subItems: [
      {
        label: "Revenue Report",
        href: "/dashboard/report-and-analytics/revenue-report",
      },
      {
        label: "User Activity Reports",
        href: "/dashboard/report-and-analytics/user-activity-report",
      },
      {
        label: "Booking Trends",
        href: "/dashboard/report-and-analytics/booking-trends",
      },
      {
        label: "Custom Reports",
        href: "/dashboard/report-and-analytics/custom-reports",
      },
    ],
  },
  {
    label: "Payments & Transactions",
    subItems: [
      {
        label: "Transaction Monitoring",
        href: "/dashboard/payments-and-transactions/transation-monitoring",
      },
      {
        label: "Refund Management",
        href: "/dashboard/payments-and-transactions/refund-management",
      },
      {
        label: "Commission Management",
        href: "/dashboard/payments-and-transactions/comission-management",
      },
    ],
  },
  {
    label: "Support & Assistance",
    subItems: [
      {
        label: "Support Tickets",
        href: "/dashboard/support-and-assistance/support-tickets",
      },
    ],
  },
  {
    label: "Offers & Promotions",
    subItems: [
      {
        label: "Create Offers",
        href: "/dashboard/offers-and-promotions/create-offers",
      },
    ],
  },
  {
    label: "Feedback & Reviews",
    subItems: [
      {
        label: "Manage Reviews",
        href: "/dashboard/offers-and-promotions/manage-reviews",
      },
      {
        label: "User Feedback",
        href: "/dashboard/offers-and-promotions/user-feedback",
      },
    ],
  },
  {
    label: "SubAdmin",
    subItems: [
      {
        label: "Add SubAdmin",
        href: "/dashboard/sub-admin/add-subadmin",
      },
    ],
  },
];
