
import HeaderNav from "../../components/layout/HeaderNav";
import {
  ArrowLightDown,
  ArrowLightUp,
  CrossBokmark,
  Dollor,
  FlyingFlight,
  Verified,
} from "../../components/icons";

import { Button } from "../../components/ui/button";
import {
  BellDot,
  ChevronDown,
  CircleHelp,
  Search,
  Settings,
} from "lucide-react";

const DashboardSummmary = [
  {
    label: "Completed FLights",
    number: 125,
    icon: <ArrowLightUp />,
    mainIcon: <Verified />,
    percentage: "1.35%",
  },
  {
    label: "Active Flights",
    number: 80,
    icon: <ArrowLightUp />,
    mainIcon: <FlyingFlight />,
    percentage: "3.68",
  },
  {
    label: "Cancelled Flights",
    number: 25,
    icon: <ArrowLightDown />,
    mainIcon: <CrossBokmark />,
    percentage: "1.45%",
  },
  {
    label: "Total Revenue",
    number: 15000,
    icon: <ArrowLightUp />,
    mainIcon: <Dollor />,
    percentage: "5.94%",
  },
];

export default function Dashboard() {
  return (
    <section className="flex flex-col gap-6">
     <HeaderNav title="Dashboard" />
      <div className="grid grid-cols-4 gap-4">
        {DashboardSummmary.map((el) => (
          <div
            key={el.label}
            className="flex justify-between items-center bg-white rounded-xl p-4"
          >
            <div className="flex flex-col gap-1">
              <p className="text-xs text-neutral-400">{el.label}</p>
              <p className="text-xl font-bold">{el.number}</p>
              <div className="flex items-center px-2 rounded bg-orange-400/20 w-fit text-xs gap-2">
                {el.icon}
                <span>{el.percentage}</span>
              </div>
            </div>
            <div className="rounded-full bg-orange-400 w-fit p-2">
              {el.mainIcon}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
