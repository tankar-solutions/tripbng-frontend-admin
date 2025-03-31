import { Button } from "../../../components/ui/button";
import HeaderNav from "../../../components/layout/HeaderNav";

export default function CustomReports() {
  return (
    <section className="flex flex-col gap-6">
      <HeaderNav title="Customer-Report" />
        <div className="flex items-end justify-end">
        <Button className="mb-2 w-1/6">Download Report</Button></div>
      <div className="bg-white rounded-xl p-4">
        <p className="text-sm">
          Select your report parameters to generate a custom report.
        </p>
        {/* Add form or filters for customizing reports here */}
      </div>
    </section>
  );
}
