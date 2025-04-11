import { MdDashboard } from "react-icons/md";
import { FaUsers, FaHotel, FaChartBar, FaMoneyBillWave, FaHeadset, FaGift, FaCommentDots, FaUserShield } from "react-icons/fa";


export const navitems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: MdDashboard,
  },
  {
    label: "User Management",
    icon: FaUsers,
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
    icon: FaHotel,
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
    icon: FaChartBar,
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
    icon: FaMoneyBillWave,
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
    icon: FaHeadset,
    subItems: [
      {
        label: "Support Tickets",
        href: "/dashboard/support-and-assistance/support-tickets",
      },
    ],
  },
  {
    label: "Offers & Promotions",
    icon: FaGift,
    subItems: [
      {
        label: "Create Offers",
        href: "/dashboard/offers-and-promotions/create-offers",
      },
    ],
  },
  {
    label: "Feedback & Reviews",
    icon: FaCommentDots,
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
    icon: FaUserShield,
    subItems: [
      {
        label: "Add SubAdmin",
        href: "/dashboard/sub-admin/add-subadmin",
      },
    ],
  },
];
