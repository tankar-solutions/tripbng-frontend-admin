import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function UserDetail() {
  const { state } = useLocation();
  const user = state?.user;

  const [showSection, setShowSection] = useState("");

  const toggleSection = (section) => {
    setShowSection(showSection === section ? "" : section);
  };

  const bookingStats = {
    flights: 4,
    hotels: 2,
    holidays: 1,
    buses: 3,
  };

  const flightBookings = [
    { id: "FL001", airline: "IndiGo", from: "Delhi", to: "Mumbai", date: "2024-04-10", status: "Confirmed" },
    { id: "FL002", airline: "Air India", from: "Ahmedabad", to: "Goa", date: "2024-04-14", status: "Cancelled" },
    { id: "FL003", airline: "SpiceJet", from: "Bangalore", to: "Kolkata", date: "2024-04-20", status: "Confirmed" },
    { id: "FL004", airline: "Vistara", from: "Chennai", to: "Hyderabad", date: "2024-04-28", status: "Pending" },
  ];

  const hotelBookings = [
    { name: "The Leela Palace", location: "Udaipur", checkIn: "2024-05-10", nights: 2 },
    { name: "Taj Lakeview", location: "Bhopal", checkIn: "2024-06-12", nights: 1 },
  ];

  const holidayPackages = [
    { package: "Goa Escape", days: 4, people: 2, status: "Booked" },
  ];

  const busTickets = [
    { route: "Surat to Mumbai", date: "2024-05-08", seat: "A2", status: "Confirmed" },
    { route: "Rajkot to Ahmedabad", date: "2024-05-20", seat: "B1", status: "Cancelled" },
    { route: "Baroda to Pune", date: "2024-06-01", seat: "C3", status: "Confirmed" },
  ];

  if (!user) return <div className="p-6">No user data available.</div>;

  return (
    <section className="flex flex-col gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Role:</strong> {user.Usertype}</p>
          <p>
            <strong>Status:</strong>
            <span className={`ml-2 px-2 py-1 rounded-md text-xs ${user.isActive ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </p>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Flights Booked" count={bookingStats.flights} onClick={() => toggleSection("flights")} />
          <StatCard label="Hotels Booked" count={bookingStats.hotels} onClick={() => toggleSection("hotels")} />
          <StatCard label="Holiday Packages" count={bookingStats.holidays} onClick={() => toggleSection("holidays")} />
          <StatCard label="Bus Tickets" count={bookingStats.buses} onClick={() => toggleSection("buses")} />
        </div>

        {showSection === "flights" && <FlightTable data={flightBookings} />}
        {showSection === "hotels" && <HotelTable data={hotelBookings} />}
        {showSection === "holidays" && <HolidayTable data={holidayPackages} />}
        {showSection === "buses" && <BusTable data={busTickets} />}
      </div>
    </section>
  );
}

function StatCard({ label, count, onClick }) {
  return (
    <div onClick={onClick} className="p-4 bg-gray-100 rounded-xl text-center shadow-sm hover:shadow-md transition cursor-pointer">
      <p className="text-3xl font-bold text-blue-600">{count}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function FlightTable({ data }) {
  return (
    <BookingSection title="Flight Booking Details">
      <table className="w-full border text-sm bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Flight ID</th>
            <th className="p-2 border">Airline</th>
            <th className="p-2 border">From</th>
            <th className="p-2 border">To</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map(f => (
            <tr key={f.id} className="hover:bg-gray-50">
              <td className="p-2 border">{f.id}</td>
              <td className="p-2 border">{f.airline}</td>
              <td className="p-2 border">{f.from}</td>
              <td className="p-2 border">{f.to}</td>
              <td className="p-2 border">{f.date}</td>
              <td className="p-2 border">
                <StatusBadge status={f.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BookingSection>
  );
}

function HotelTable({ data }) {
  return (
    <BookingSection title="Hotel Booking Details">
      <table className="w-full border text-sm bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Hotel Name</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Check-in</th>
            <th className="p-2 border">Nights</th>
          </tr>
        </thead>
        <tbody>
          {data.map((h, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-2 border">{h.name}</td>
              <td className="p-2 border">{h.location}</td>
              <td className="p-2 border">{h.checkIn}</td>
              <td className="p-2 border">{h.nights}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </BookingSection>
  );
}

function HolidayTable({ data }) {
  return (
    <BookingSection title="Holiday Package Details">
      <table className="w-full border text-sm bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Package</th>
            <th className="p-2 border">Days</th>
            <th className="p-2 border">People</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((h, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-2 border">{h.package}</td>
              <td className="p-2 border">{h.days}</td>
              <td className="p-2 border">{h.people}</td>
              <td className="p-2 border"><StatusBadge status={h.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </BookingSection>
  );
}

function BusTable({ data }) {
  return (
    <BookingSection title="Bus Ticket Details">
      <table className="w-full border text-sm bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Route</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Seat</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((b, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="p-2 border">{b.route}</td>
              <td className="p-2 border">{b.date}</td>
              <td className="p-2 border">{b.seat}</td>
              <td className="p-2 border"><StatusBadge status={b.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </BookingSection>
  );
}

function BookingSection({ title, children }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      {children}
    </div>
  );
}

function StatusBadge({ status }) {
  const colorMap = {
    Confirmed: "bg-green-200 text-green-700",
    Cancelled: "bg-red-200 text-red-700",
    Pending: "bg-yellow-200 text-yellow-700",
    Booked: "bg-blue-200 text-blue-700",
  };
  return (
    <span className={`px-2 py-1 text-xs rounded-md ${colorMap[status] || "bg-gray-200 text-gray-700"}`}>
      {status}
    </span>
  );
}
