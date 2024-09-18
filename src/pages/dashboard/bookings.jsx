import { Button } from "../../components/ui/button";
import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Plus,
  Search,
  Settings,
} from "lucide-react";

import { CalendarIcon, Filter } from "../../components/icons";
import { useState } from "react";
import {
  BusTable,
  FlightTable,
  HolidaysTable,
  HotelTable,
  VisaTable,
  YatchTable,
} from "../../components/bookings";

const BookingsItem = [
  {
    label: "Flight",
    component: <FlightTable />,
  },
  {
    label: "Hotel",
    component: <HotelTable />,
  },
  {
    label: "Bus",
    component: <BusTable />,
  },
  {
    label: "Holidays",
    component: <HolidaysTable />,
  },
  {
    label: "Visa",
    component: <VisaTable />,
  },
  {
    label: "Yatch",
    component: <YatchTable />,
  },
];

export default function Bookings() {
  const [activeBooking, setActiveBooking] = useState("Flight");

  // Find the active component
  const activeComponent = BookingsItem.find(
    (el) => el.label === activeBooking
  )?.component;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Bookings</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
            <Search className="font-thin" size={15} />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search anything"
              className="outline-none bg-transparent"
            />
          </div>
          <Button size="icon" className="bg-white text-neutral-700">
            <BellDot size={20} />
          </Button>
          <Button size="icon" className="bg-white text-neutral-700">
            <CircleHelp size={20} />
          </Button>
          <Button size="icon" className="bg-white text-neutral-700">
            <Settings size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-400/50 rounded-xl" />
            <div>
              <p className="text-sm">Martin Septimus</p>
              <p className="text-xs text-neutral-400">Admin</p>
            </div>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10 text-sm">
        {BookingsItem.map((el) => (
          <button
            key={el.label} // Use the label as the key
            onClick={() => setActiveBooking(el.label)}
            className={`flex flex-col gap-4 ${
              activeBooking === el.label ? "text-blue-700 " : "text-gray-500"
            }`}
          >
            {el.label}
            <div
              className={`${
                activeBooking === el.label
                  ? "bg-blue-700 w-full h-[1px] rounded-full"
                  : ""
              }`}
            />
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
          <Search className="font-thin" size={15} />
          <input
            type="search"
            name=""
            id=""
            placeholder="Search anything"
            className="outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-neutral-400">
            <Filter />
            <span className="text-sm">Status</span>
            <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1 text-neutral-400">
            <CalendarIcon />
            <span className="text-sm">1-8 July 2024</span>
            <ChevronDown size={14} />
          </button>
          <Button className="flex items-center gap-3">
            <Plus size={15} />
            Add booking
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4">{activeComponent}</div>
    </section>
  );
}
