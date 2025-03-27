import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { useState } from "react";

const initialReviews = [
  {
    id: "R001",
    customerName: "John Doe",
    review: "Great service!",
    rating: 5,
    status: "Pending",
  },
  {
    id: "R002",
    customerName: "Jane Smith",
    review: "Average experience.",
    rating: 3,
    status: "Approved",
  },
  {
    id: "R003",
    customerName: "Emily Davis",
    review: "Will not recommend.",
    rating: 1,
    status: "Pending",
  },
];

export default function ManageReviews() {
  const [reviews, setReviews] = useState(initialReviews);

  const handleApprove = (id) => {
    setReviews(reviews.map(review => review.id === id ? { ...review, status: "Approved" } : review));
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter(review => review.id !== id));
  };

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-lg font-semibold">Manage Reviews</h1>
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Review ID</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id} className="text-sm">
                <TableCell className="font-normal">{review.id}</TableCell>
                <TableCell>{review.customerName}</TableCell>
                <TableCell>{review.review}</TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>
                  <p
                    className={`w-fit p-1 text-xs rounded-md ${
                      review.status === "Approved"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {review.status}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {review.status === "Pending" && (
                      <Button onClick={() => handleApprove(review.id)} className="bg-blue-500 text-white">Approve</Button>
                    )}
                    <Button onClick={() => handleDelete(review.id)} className="bg-red-500 text-white">Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
