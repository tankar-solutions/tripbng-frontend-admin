import { Button } from "../../../components/ui/button";
import HeaderNav from "../../../components/layout/HeaderNav";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useState } from "react";

const initialOffers = [
  {
    id: "O001",
    title: "10% off on all bookings",
    description: "Get 10% off your next booking with code SAVE10.",
    validity: "2024-09-30",
  },
  {
    id: "O002",
    title: "Free Cancellation",
    description: "Enjoy free cancellation on all flights booked this month.",
    validity: "2024-09-25",
  },
];

export default function CreateOffers() {
  const [offers, setOffers] = useState(initialOffers);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validity, setValidity] = useState("");

  const handleAddOffer = () => {
    const newOffer = {
      id: `O00${offers.length + 1}`,
      title,
      description,
      validity,
    };
    setOffers([...offers, newOffer]);
    setTitle("");
    setDescription("");
    setValidity("");
  };

  return (
    <section className="flex flex-col gap-6">
        <HeaderNav title="Create-Offers" />
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Offer Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Offer Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={validity}
          onChange={(e) => setValidity(e.target.value)}
          className="border p-2 rounded"
        />
        <Button onClick={handleAddOffer}>Add Offer</Button>
      </div>

      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Offer ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Validity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id} className="text-sm">
                <TableCell className="font-normal">{offer.id}</TableCell>
                <TableCell>{offer.title}</TableCell>
                <TableCell>{offer.description}</TableCell>
                <TableCell>{offer.validity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
