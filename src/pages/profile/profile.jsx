import React, { useEffect,useState } from "react";
import { Pencil } from "lucide-react";
import { HiDocumentText } from 'react-icons/hi';
import { FaHotel, FaPlaneDeparture, FaBus, FaUmbrellaBeach, FaPassport, FaShieldAlt } from 'react-icons/fa';
import { FaMobileAlt, FaWhatsapp, FaKey } from "react-icons/fa";


export default function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [bankDetails, setBankDetails] = useState([]);
  const [isContactEdit, setIsContactEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [bankForm, setBankForm] = useState({
    bankName: '',
    branchName: '',
    accountNumber: '',
    ifscCode: '',
    accountHolderName: ''
  });

  const handleBankFormChange = (e) => {
    const { name, value } = e.target;
    setBankForm((prev) => ({ ...prev, [name]: value }));
  };

  const [formData, setFormData] = useState({
    agencyName: "Khajooora Tours And Travels Llp",
    mobileNumber: "9904956474",
    contactPerson: "VIKASH BALVANTBHAI DETROJA",
    pinCode: "363650",
    email: "info@tripbookngo.com",
    signupDate: "11-06-2024",
    currency: "INR",
    website: "-",
    address: "SURVEY NO 64/1 NEAR DHARESWAR COTTONS, C/O KHAJOOORA HOTEL AND...",
  });

  const [loginData, setLoginData] = useState([]);

  useEffect(() => {
    const storedLogins = JSON.parse(localStorage.getItem("loginData")) || [];
    setLoginData(storedLogins.slice(0, 10));
  }, []);

  const [contactDetails, setContactDetails] = useState([
    { icon: <FaHotel className="text-blue-600 w-5 h-5" />, label: 'Hotel', phone: '91 9904956474', email: 'info@tripbookngo.com' },
    { icon: <FaPlaneDeparture className="text-blue-600 w-5 h-5" />, label: 'Flight', phone: '91 9876543210', email: 'flight@tripbookngo.com' },
    { icon: <FaBus className="text-blue-600 w-5 h-5" />, label: 'Bus', phone: '91 9123456789', email: 'bus@tripbookngo.com' },
    { icon: <FaUmbrellaBeach className="text-blue-600 w-5 h-5" />, label: 'Holiday', phone: '91 9988776655', email: 'holiday@tripbookngo.com' },
    { icon: <FaPassport className="text-blue-600 w-5 h-5" />, label: 'Visa', phone: '91 9090909090', email: 'visa@tripbookngo.com' },
    { icon: <FaShieldAlt className="text-blue-600 w-5 h-5" />, label: 'Insurance', phone: '91 9009009000', email: 'insurance@tripbookngo.com' }
  ]);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setBankForm({
      bankName: '',
      branchName: '',
      accountNumber: '',
      ifscCode: '',
      accountHolderName: ''
    });
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBankDetails(prev => [...prev, bankForm]);
    handleCloseForm();
  };


  const handleSave = () => {
    setIsEditOpen(false);
  };

  const handleContactChange = (index, field, value) => {
    const updated = [...contactDetails];
    updated[index][field] = value;
    setContactDetails(updated);
  };

  const handleContactSave = () => {
    setIsContactEdit(false);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen text-black">
      <main className="flex-1 text-[17px]">
        <div className="bg-white rounded-xl shadow-lg p-10 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 bg-blue-600 text-white text-3xl font-bold rounded-full flex items-center justify-center">
                KL
              </div>
              <div>
                <h2 className="text-3xl font-semibold">{formData.agencyName}</h2>
                <p className="text-black text-base mt-1">
                  Account Code: <span className="font-semibold text-black">18425</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold border-b pb-2 w-full">
              Basic Information
            </h3>
            <button
              onClick={() => setIsEditOpen(true)}
                className="ml-4 flex items-center gap-2 px-5 py-2.5 text-base border border-black rounded-lg hover:bg-gray-50"
                >
              <Pencil size={18} />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 text-[17px]">
            <Info label="Agency Name" value={formData.agencyName} />
            <Info label="Mobile Number" value={formData.mobileNumber} />
            <Info label="Contact Person Name" value={formData.contactPerson} />
            <Info label="Pin Code" value={formData.pinCode} />
            <Info label="Email ID" value={formData.email} />
            <Info label="Signup Date" value={formData.signupDate} />
            <Info label="Base Currency" value={formData.currency} />
            <Info label="Website URL" value={formData.website} />
            <div className="col-span-2">
              <Info label="Address" value={formData.address} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto mt-10">
          <h2 className="text-xl font-semibold mb-1">KYC Information</h2>
          <p className="text-m text-black mb-6">
            Verify your KYC details, contact your relationship officer if you have any query related to KYC.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {['Incorporation Certificate', 'Company Pan Card', 'Gst Certificate'].map((doc, i) => (
              <div key={i} className="border rounded-lg p-4 flex flex-col items-center text-center shadow-sm">
                <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded mb-2">
                  Audited
                </span>
                <HiDocumentText className="w-10 h-10 text-blue-600 mb-3" />
                <p className="font-medium text-black mb-4">{doc}</p>
                <button className="flex items-center gap-1 bg-white border text-blue-600 px-4 py-1.5 rounded shadow-sm hover:bg-gray-50">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16h16V4H4zm8 4v8m0 0l-3-3m3 3l3-3" />
                  </svg>
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto mt-8 relative">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <p className="text-m text-black mb-6">
            You can set service wise contact details for your customers. These information will display on all ticket/voucher print.
          </p>

          {!isContactEdit ? (
            <button
              onClick={() => setIsContactEdit(true)}
              className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Pencil size={18} />
              Edit
            </button>
          ) : (
            <button
              onClick={handleContactSave}
              className="absolute top-6 right-6 bg-blue-700 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-800"
            >
              Save Contact Info
            </button>
          )}

          <div className="grid grid-cols-1 gap-6 text-[16px]">
            {contactDetails.map((item, i) => (
              <div key={i} className="p-4 transition grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-black font-semibold mb-1">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {isContactEdit ? (
                    <input
                      type="text"
                      className="w-full border rounded p-2 mt-2"
                      value={item.phone}
                      onChange={(e) => handleContactChange(i, 'phone', e.target.value)}
                    />
                  ) : (
                    <p className="text-black mt-1">
                      Contact Number: <strong>{item.phone}</strong>
                    </p>
                  )}
                </div>
                <div className="text-black mt-1 font-medium">
                  {isContactEdit ? (
                    <input
                      type="email"
                      className="w-full border rounded p-2"
                      value={item.email}
                      onChange={(e) => handleContactChange(i, 'email', e.target.value)}
                    />
                  ) : (
                    <>
                      Email ID<br />
                      {item.email}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto mt-8 relative">
            <h2 className="text-2xl font-semibold mb-2">Login Details</h2>
            <p className="text-black mb-4">Modify/manage your account login credentials.</p>

            <div className="space-y-4">
                {/* Mobile Number */}
                <div className="flex justify-between items-center border-b pb-2">
                <div>
                    <p className="text-black text-sm">Mobile Number</p>
                    <p className="font-medium text-lg">9904956474 <span className="text-green-600 text-sm ml-2">✔ Verified</span></p>
                </div>
                <button className="text-blue-600 font-medium hover:underline">Change Number?</button>
                </div>

                {/* Email ID */}
                <div className="flex justify-between items-center border-b pb-2">
                <div>
                    <p className="text-black text-sm">Email ID</p>
                    <p className="font-medium text-lg">info@tripbookngo.com <span className="text-green-600 text-sm ml-2">✔ Verified</span></p>
                </div>
                <button className="text-blue-600 font-medium hover:underline">Change Email?</button>
                </div>

                {/* Password */}
                <div className="flex justify-between items-center">
                <div>
                    <p className="text-black text-sm">Password</p>
                    <p className="font-medium text-lg">********</p>
                </div>
                <button className="text-blue-600 font-medium hover:underline">Change Password?</button>
                </div>
            </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto mt-8 relative">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Two-factor Authentication</h2>
                    <span className="text-sm font-medium bg-red-100 text-red-600 px-3 py-1 rounded-full">DISABLE</span>
                </div>

                <p className="text-black mb-6">
                    Enable two-factor authentication to add an extra layer of security. A second login step can keep your account secure, even if your password is compromised. To enable it, all you need is a smart phone.
                </p>
                <div className="space-y-4">

                        <div className="flex justify-between items-start p-4">
                            <div className="flex gap-3">
                            <FaKey className="text-2xl text-black mt-1" />
                            <div>
                                <p className="font-medium text-lg">Authenticator App</p>
                                <p className="text-m text-black">
                                Use an authentication app or browser extension to get two-factor authentication codes when prompted.
                                </p>
                            </div>
                            </div>
                            <button className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded-md">
                            Enable
                            </button>
                        </div>


                        <div className="flex justify-between items-start p-4">
                            <div className="flex gap-3">
                            <FaMobileAlt className="text-2xl text-black mt-1" />
                            <div>
                                <p className="font-medium text-lg">SMS/Text Message</p>
                                <p className="text-m text-black">
                                Get one-time codes sent to your phone via SMS to complete authentication requests.
                                </p>
                            </div>
                            </div>
                            <button className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded-md">
                            Enable
                            </button>
                        </div>

                        <div className="flex justify-between items-start p-4">
                            <div className="flex gap-3">
                            <FaWhatsapp className="text-2xl text-black mt-1" />
                            <div>
                                <p className="font-medium text-lg">WhatsApp Message</p>
                                <p className="text-m text-black">
                                Get one-time codes sent to your phone via WhatsApp to complete authentication requests.
                                </p>
                            </div>
                            </div>
                            <button className="bg-gray-200 hover:bg-gray-300 text-sm font-medium px-4 py-2 rounded-md">
                            Enable
                            </button>
                        </div>
                     </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto mt-8 relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Bank Details</h2>
          <p className="text-sm text-gray-500">Provide your bank details to make offline transactions like withdraw wallet balance.</p>
        </div>
        <button
          onClick={handleAddClick}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          + Add
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black">Bank Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black">Branch Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black">Account Number</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black">IFSC Code</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-black">Account Holder Name</th>
            </tr>
          </thead>
          <tbody>
            {bankDetails.length > 0 ? (
              bankDetails.map((item, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-black">{item.bankName}</td>
                  <td className="px-4 py-2 text-sm text-black">{item.branchName}</td>
                  <td className="px-4 py-2 text-sm text-black">{item.accountNumber}</td>
                  <td className="px-4 py-2 text-sm text-black">{item.ifscCode}</td>
                  <td className="px-4 py-2 text-sm text-black">{item.accountHolderName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-10 text-center text-black">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <p className="text-sm">No Data</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FORM POPUP */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add Bank Details</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="bankName"
                value={bankForm.bankName}
                onChange={handleBankFormChange}
                placeholder="Bank Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="branchName"
                value={bankForm.branchName}
                onChange={handleBankFormChange}
                placeholder="Branch Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="accountNumber"
                value={bankForm.accountNumber}
                onChange={handleBankFormChange}
                placeholder="Account Number"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="ifscCode"
                value={bankForm.ifscCode}
                onChange={handleBankFormChange}
                placeholder="IFSC Code"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="accountHolderName"
                value={bankForm.accountHolderName}
                onChange={handleBankFormChange}
                placeholder="Account Holder Name"
                className="border p-2 rounded"
              />
              <div className="col-span-2 flex gap-4 mt-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Save
                </button>
                <button type="button" onClick={handleCloseForm} className="bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 max-w-7xl mx-auto mt-8 relative">
            <h2 className="text-xl font-semibold mb-1">Last Login Session</h2>
            <p className="text-sm text-black mb-4">
              Check your last 10 login history of your account. If you find any
              suspicious login activity kindly change your account password.
            </p>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-gray-200">
                <thead className="bg-blue-100 text-black">
                  <tr>
                    <th className="py-2 px-4 border border-gray-200">Login Time</th>
                    <th className="py-2 px-4 border border-gray-200">IP Address</th>
                    <th className="py-2 px-4 border border-gray-200">Browser Details</th>
                  </tr>
                </thead>
                <tbody>
                  {loginData.length > 0 ? (
                    loginData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border border-gray-200">{item.time}</td>
                        <td className="py-2 px-4 border border-gray-200">{item.ip}</td>
                        <td className="py-2 px-4 border border-gray-200 truncate max-w-xs">
                          {item.browser}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="py-4 px-4 border border-gray-200 text-center text-gray-500"
                        colSpan="3"
                      >
                        No login history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>


      </main>

      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-8 rounded-xl w-full max-w-4xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <div className="grid grid-cols-2 gap-6">
              {Object.keys(formData).map((key) => (
                <div key={key} className={key === "address" ? "col-span-2" : ""}>
                  <Input
                    label={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-8 gap-4">
              <button onClick={() => setIsEditOpen(false)} className="px-5 py-2 rounded-md border border-gray-400">
                Cancel
              </button>
              <button onClick={handleSave} className="px-5 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Info = ({ label, value }) => (
  <div>
    <p className="text-black font-semibold">{label}</p>
    <p className="text-black">{value}</p>
  </div>
);

const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-black mb-1">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);
