import { Button } from "../../../components/ui/button";

export default function CustomReports() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold">Custom Reports</h1>
      <Button className="mb-4">Generate New Report</Button>
      <div className="bg-white rounded-xl p-4">
        <p className="text-sm">
          Select your report parameters to generate a custom report.
        </p>
        {/* Add form or filters for customizing reports here */}
      </div>
    </section>
  );
}
