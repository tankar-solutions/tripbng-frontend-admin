import React, { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { Check } from "lucide-react"; 

const MarkupSettings = () => {
  const [profiles, setProfiles] = useState([
    { name: "vikas", agents: 1 },
    { name: "travel agent", agents: 1 },
  ]);
  const [showB2CModal, setShowB2CModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Airlines");


  const [activeTab, setActiveTab] = useState("Markup Setting");
  const tabs = ["Markup Setting", "Email Setup", "KYC Setup", "Inventory Settings"];

  const [searchTerm, setSearchTerm] = useState("");
  const [newProfile, setNewProfile] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProfile = () => {
    if (newProfile.trim() !== "") {
      setProfiles([...profiles, { name: newProfile, agents: 0 }]);
      setNewProfile("");
      setShowModal(false);
    }
  };

  return (
    <div className="p- text-[17px]">
        <div className="bg-white rounded-xl shadow-lg p-10 max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex space-x-6 border-b pb-3 mb-5 text-lg">
      {tabs.map((tab) => (
        <div
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-1 cursor-pointer ${
            activeTab === tab
              ? "border-b-2 border-blue-900 text-blue-900 font-semibold"
              : "text-gray-500 hover:text-blue-900"
          }`}
        >
          {tab}
        </div>
      ))}
    </div>
    <p className="text-base text-black bg-gray-100 p-5 rounded mb-5">
        Define service wise markup for your master B2B account, Sub accounts and for your website if you have B2C WL.
        </p>

        <h2 className="text-2xl font-semibold mb-5">Master Login Markup Settings</h2>


        <div className="flex space-x-2 mb-10">
            <button className="px-5 py-3 bg-blue-900 text-white rounded-lg text-[16px] font-semibold">
            B2B Markup
          </button>
          <button
            className="px-5 py-3 bg-teal-500 text-white rounded-lg text-[16px] font-semibold"
            onClick={() => setShowB2CModal(true)}
            >
            B2C Markup
            </button>
        </div>

        <div className="flex justify-between items-center mb-5">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-6 py-3 rounded w-1/2 text-[16px]"
          />
          <button
            className="px-5 py-4 bg-blue-700 text-white rounded-lg font-semibold"
            onClick={() => setShowModal(true)}
          >
            + Create New Profile
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-200 text-[16px]">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-4 px-4 border">Profile</th>
                <th className="py-4 px-4 border">Applied On</th>
                <th className="py-4 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border flex items-center gap-2">
                      <FaUserFriends className="text-blue-900" />
                      {item.name}
                    </td>
                    <td className="py-4 px-4 border">{item.agents} Agents</td>
                    <td className="py-4 px-4 border">
                      <button className="text-blue-900 font-medium hover:underline">
                        Set Markup
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Profile</h2>
            <input
              type="text"
              placeholder="Enter profile name"
              value={newProfile}
              onChange={(e) => setNewProfile(e.target.value)}
              className="border px-4 py-2 w-full rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProfile}
                className="px-4 py-2 rounded bg-blue-900 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

        {showB2CModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-7xl h-[90vh] flex overflow-hidden">

            <button
                onClick={() => setShowB2CModal(false)}
                className="absolute top-12 right-60 text-gray-600 hover:text-red-600 z-50 text-2xl"
                >
                ✖
                </button>
                <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
                    <h3 className="text-lg font-bold mb-4">Default Profile</h3>
                    <ul className="space-y-2">
                    {["Airlines", "Holidays", "Hotel", "Visa", "Bus", "Insurance"].map(
                        (item) => (
                        <li
                            key={item}
                            onClick={() => setSelectedTab(item)}
                            className={`cursor-pointer px-3 py-2 rounded transition ${
                            selectedTab === item
                                ? "bg-gray-300 text-black"
                                : "hover:bg-gray-200"
                            }`}
                        >
                            {item}
                        </li>
                        )
                    )}
                    </ul>
                </div>

                <div className="flex-1 p-16 overflow-y-auto">

                    {selectedTab === "Airlines" && (
                    <>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-6">
                        {[
                            "Domestic One Way",
                            "Domestic Round Trip",
                            "International One Way",
                            "International Round Way",
                           ].map((label, i) => (
                            <div key={i}>
                            <label className="block mb-2 text-m font-medium">{label}*</label>
                            <div className="flex items-center gap-2">
                                <input
                                type="number"
                                defaultValue="0"
                                className="border px-3 py-2 rounded-lg w-20"
                                />
                                <div className="relative w-full max-w-[250px]">
                                <select className="border px-3 py-2 rounded-lg w-full truncate">
                                    <option>Flat for Full Booking</option>
                                    <option>Flat Per Pax</option>
                                    <option>Flat Per Pax Per Segment</option>
                                    <option>Flat Per Pax Segment Full Booking</option>
                                    <option>Percentage(%) Per Pax</option>
                                    <option>Percentage(%) for Full Booking</option>
                                    <option>Percentage(%) Per Pax Per Segment</option>
                                    <option>Percentage(%) Per Segment Full Booking</option>
                                </select>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>

                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Save</button>

                        <h3 className="text-lg font-semibold mb-3">Group Inquiry Markup</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-6">
                        {["Domestic One Way", "Domestic Round Trip", "International One Way", "International Round Way"].map((label, i) => (
                            <div key={i}>
                            <label className="block mb-2 text-m font-medium">{label}*</label>
                            <div className="flex items-center gap-2">
                                <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                                <div className="relative w-full max-w-[250px]">
                                <select className="border px-3 py-2 rounded-lg w-full truncate">
                                    <option>Flat for Full Booking</option>
                                    <option>Flat Per Pax</option>
                                    <option>Percentage(%) Per Pax</option>
                                    <option>Percentage(%) for Full Booking</option>
                                </select>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Save</button>

                        <h3 className="text-lg font-semibold mb-3">Amendment Markup (Domestic)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-6">
                        {["Cancellation Quotation", "Instant Cancellation", "Reissue",
                         "Air No Show" , "Air Void", "Air Meal",
                        "Air Baggage","Air Correction","Miscellaneous Quotation",
                        "Miscellaneous Quotation - Refund"].map((label, i) => (
                            <div key={i}>
                            <label className="block mb-2 text-m font-medium">{label}*</label>
                            <div className="flex items-center gap-2">
                                <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                                <div className="relative w-full max-w-[250px]">
                                <select className="border px-3 py-2 rounded-lg w-full truncate">
                                    <option>Flat for Full Amendment</option>
                                    <option>Flat Per Pax</option>
                                    <option>Percentage(%) for Full Amendment</option>
                                    <option>Percentage(%) Per Pax</option>
                                </select>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Save</button>


                        <h3 className="text-lg font-semibold mb-3">Amendment Markup (International)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-6">
                        {["Cancellation Quotation", "Instant Cancellation", "Reissue",
                         "Air No Show" , "Air Void", "Air Meal",
                        "Air Baggage","Air Correction","Miscellaneous Quotation",
                        "Miscellaneous Quotation - Refund"].map((label, i) => (
                            <div key={i}>
                            <label className="block mb-2 text-m font-medium">{label}*</label>
                            <div className="flex items-center gap-2">
                                <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                                <div className="relative w-full max-w-[250px]">
                                <select className="border px-3 py-2 rounded-lg w-full truncate">
                                    <option>Flat for Full Amendment</option>
                                    <option>Flat Per Pax</option>
                                    <option>Percentage(%) for Full Amendment</option>
                                    <option>Percentage(%) Per Pax</option>
                                </select>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Save</button>

                        <h3 className="text-lg font-semibold mb-3">Airline Wise Markup </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-6">
                        {["Carrier", "Domestic One Way", "Domestic Round Trip",
                         "International One Way" , "International Round Trip"].map((label, i) => (
                            <div key={i}>
                            <label className="block mb-2 text-m font-medium">{label}*</label>
                            <div className="flex items-center gap-2">
                                <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                                <div className="relative w-full max-w-[250px]">
                                <select className="border px-3 py-2 rounded-lg w-full truncate">
                                    <option>Flat for Full Booking</option>
                                    <option>Flat Per Pax</option>
                                    <option>Flat Per Pax Per Segment</option>
                                    <option>Flat Per Pax Segment Full Booking</option>
                                    <option>Percentage(%) Per Pax</option>
                                    <option>Percentage(%) for Full Booking</option>
                                    <option>Percentage(%) Per Pax Per Segment</option>
                                    <option>Percentage(%) Per Segment Full Booking</option>
                                </select>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Save</button>

                    </>
                    )}

                    {selectedTab === "Holidays" && (
                    <div>
                        <div className=" grid-cols-1 md:grid-cols-3 gap-6 mb-6 flex">
                        {["Domestic Packages", "Domestic Packages"].map((label, i) => (
                            <div key={i}>
                            <label className="block mb-2 text-m font-medium">{label}*</label>
                            <div className="flex items-center gap-2">
                                <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                                <select className="border px-3 py-2 rounded-lg flex-1">
                                <option>Percentage(%) for Full Booking</option>
                                <option>Percentage(%) Per Pax</option>
                                </select>
                            </div>
                            </div>
                        ))}
                        </div>
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Save</button>

                        <h3 className="text-lg font-semibold mb-3">Destination Wise Markup</h3>
                        <div className="flex flex-col md:flex-row md:gap-6 mb-6">
                        <div className="mb-4 md:mb-0">
                            <label className="block mb-2 text-m font-medium">Destination Name*</label>
                            <div className="flex items-center gap-2">
                            <select className="border px-24 py-2 rounded-lg flex-1">
                                <option>Abu Dhabi</option>
                                <option>Almaty</option>
                                <option>Andaman</option>
                                <option>Abdhra Pradesh</option>
                                <option>Assam</option>
                                <option>Australia</option>
                                <option>Bali</option>
                                <option>Baku & Gabala</option>
                            </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-m font-medium">Markup*</label>
                            <div className="flex items-center gap-2">
                            <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                            <select className="border px-3 py-2 rounded flex-1">
                                <option>Percentage(%) for Full Booking</option>
                                <option>Percentage(%) Per Pax</option>
                            </select>
                            </div>
                        </div>
                        </div>

                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Add</button>
                        
                    </div>
                    )}


                    {selectedTab === "Hotel" && (
                    <div>
                        <div className=" grid-cols-1 md:grid-cols-3 gap-6 mb-6 flex">
                        {["Domestic", "International","Cancellation Markup"].map((label, i) => (
                            <div key={i}>
                            <label className="block mb-2 text-m font-medium">{label}*</label>
                            <div className="flex items-center gap-2">
                                <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                                <select className="border px-3 py-2 rounded-lg flex-1">
                                <option>Flat fot Full Booking</option>
                                <option>Flat per Pax</option>
                                <option>Percentage(%) for Full Booking</option>
                                <option>Percentage(%) Per Pax</option>
                                </select>
                            </div>
                            </div>
                        ))}
                        </div>
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Save</button>
                        
                    </div>
                    )}


                    {selectedTab === "Visa" && (
                    <div>
                        <div className=" grid-cols-1 md:grid-cols-3 gap-6 mb-6 flex">
                        {["Visa"].map((label, i) => (
                            <div key={i}>
                            <label className="block mb-2 text-m font-medium">{label}*</label>
                            <div className="flex items-center gap-2">
                                <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                                <select className="border px-3 py-2 rounded-lg flex-1">
                                <option>Percentage(%) for Full Booking</option>
                                <option>Percentage(%) Per Pax</option>
                                </select>
                            </div>
                            </div>
                        ))}
                        </div>
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Save</button>

                        <h3 className="text-lg font-semibold mb-3">Destination Wise Markup</h3>
                        <div className="flex flex-col md:flex-row md:gap-6 mb-6">
                        <div className="mb-4 md:mb-0">
                            <label className="block mb-2 text-m font-medium">Destination*</label>
                            <div className="flex items-center gap-2">
                            <select className="border px-24 py-2 rounded-lg flex-1">

                                <option>Abu Dhabi</option>
                                <option>Almaty</option>
                                <option>Andaman</option>
                                <option>Abdhra Pradesh</option>
                                <option>Assam</option>
                                <option>Australia</option>
                                <option>Bali</option>
                                <option>Baku & Gabala</option>
                            </select>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-m font-medium">Markup*</label>
                            <div className="flex items-center gap-2">
                            <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                            <select className="border px-3 py-2 rounded-lg flex-1">
                                <option></option>
                                <option>Flat for Full Booking</option>
                                <option>Flat Per Pax</option>
                                <option>Percentage(%) for Full Booking</option>
                                <option>Percentage(%) Per Pax</option>
                            </select>
                            </div>
                        </div>
                        </div>

                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Add</button>
                        
                    </div>
                    )}

                    {selectedTab === "Bus" && (
                    <div>
                        <div className=" grid-cols-1 md:grid-cols-3 gap-6 mb-6 flex">
                        {["Bus" ,"Cancellation"].map((label, i) => (
                            <div key={i}>
                            <label className="block mb-2 text-m font-medium">{label}*</label>
                            <div className="flex items-center gap-2">
                                <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                                <select className="border px-3 py-2 rounded-lg flex-1">
                                <option>Flat per Pax</option>
                                <option>Percentage(%) Per Pax</option>
                                </select>
                            </div>
                            </div>
                        ))}
                        </div>
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Save</button>
                        
                    </div>
                    )}


                    {selectedTab === "Insurance" && (
                    <div>
                        <div className=" grid-cols-1 md:grid-cols-3 gap-6 mb-6 flex">
                        {["Insurance" ,"Insurance Cancel"].map((label, i) => (
                            <div key={i}>
                            <label className="block mb-2 text-m font-medium">{label}*</label>
                            <div className="flex items-center gap-2">
                                <input type="number" defaultValue="0" className="border px-3 py-2 rounded-lg w-20" />
                                <select className="border px-3 py-2 rounded-lg flex-1">
                                <option>Flat per Full Booking</option>
                                <option>Flat per Pax</option>
                                <option>Percentage(%) Full Booking</option>
                                <option>Percentage(%) Per Pax</option>
                                </select>
                            </div>
                            </div>
                        ))}
                        </div>
                        <button className="bg-blue-900 text-white px-10 py-2 rounded-lg mb-6">Save</button>
                        
                    </div>
                    )} 
                </div>
                </div>
            </div>
            )}



    </div>
  );
};

export default MarkupSettings;
