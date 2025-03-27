import { Button } from "../../../components/ui/button";
import {
  BadgeCheck,
  BellDot,
  ChevronDown,
  CircleHelp,
  Ellipsis,
  MoveLeft,
  Plus,
  Search,
  Settings,
} from "lucide-react";

import { CalendarIcon, Filter } from "../../../components/icons";
import { useNavigate } from "react-router-dom";

export default function UserDetails() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">User Details</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white rounded-xl p-2 text-neutral-400 text-sm">
            <Search className="font-thin" size={15} />
            <input
              type="search"
              name=""
              id=""
              placeholder="Search users or bookings"
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
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-sm"
        >
          <MoveLeft
            className="font-thin bg-white rounded-xl p-1 text-neutral-900"
            size={30}
          />
          <p>Back to Payments</p>
        </button>
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
            Add Users
          </Button>
        </div>
      </div>
      <div className="rounded-xl flex gap-4 text-sm">
        <div className="rounded-xl bg-white p-4">
          <div className="flex items-center justify-between">
            <p>Profile</p>
            <Ellipsis size={15} />
          </div>
          <div className="flex justify-center items-center flex-col gap-4">
            <div className="w-20 h-20 rounded-full bg-orange-400/50" />
            <div className="flex items-center justify-center gap-2">
              <p>Paris Milton</p>
              <BadgeCheck size={15} className="text-blue-800" />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white p-4">ask,ldcnjkabscjk</div>
      </div>
    </section>
  );
}
