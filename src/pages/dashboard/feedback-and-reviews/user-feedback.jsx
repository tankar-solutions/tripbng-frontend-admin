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

const initialFeedback = [
  {
    id: "F001",
    userName: "John Doe",
    feedback: "Loved the experience!",
    rating: 5,
  },
  {
    id: "F002",
    userName: "Jane Smith",
    feedback: "It was okay, could be better.",
    rating: 3,
  },
  {
    id: "F003",
    userName: "Emily Davis",
    feedback: "Had a terrible experience.",
    rating: 1,
  },
];

export default function UserFeedback() {
  const [feedbacks, setFeedbacks] = useState(initialFeedback);

  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
  };

  return (
    <section className="flex flex-col gap-6">
      <HeaderNav title="User-feedback" />
      <div className="bg-white rounded-xl p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Feedback ID</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback.id} className="text-sm">
                <TableCell className="font-normal">{feedback.id}</TableCell>
                <TableCell>{feedback.userName}</TableCell>
                <TableCell>{feedback.feedback}</TableCell>
                <TableCell>{feedback.rating}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(feedback.id)}
                    className="bg-red-500 text-white"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
