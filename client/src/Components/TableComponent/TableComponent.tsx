import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

import Button from "../Button/Button"; // Giả sử bạn có component Button
import { deleteUser } from "../../api/auth";

const TableComponent = ({ data }: { data: any[] | null | undefined }) => {
  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleDelete = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("ok");
      deleteMutation.mutate(userId);
    }
  };

  return (
    <table className="table-auto shadow-md mt-4 p-4 w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Verified</th>
          <th className="px-4 py-2">Role</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={item._id || index}
            className="text-center border hover:bg-gray-100"
          >
            <td className="px-4 py-2">
              <div className="flex items-center justify-center">
                <img
                  className="h-8 w-8 rounded-full ring-2 ring-white mr-2"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span>{item?.name}</span>
              </div>
            </td>
            <td className="px-4 py-2">{item?.email}</td>
            <td className="px-4 py-2">{item?.verified?.toString()}</td>
            <td className="px-4 py-2">{item?.role}</td>
            <td className="px-4 py-2">
              <div className="flex justify-center gap-2">
                <Button style={{ background: "blue" }}>
                  <Link
                    to={`/dashboard/user/${item._id}`}
                    className="text-white"
                  >
                    Update
                  </Link>
                </Button>
                <Button
                  style={{ background: "red" }}
                  onClick={() => handleDelete(item._id)}
                  disabled={deleteMutation.isLoading}
                >
                  Delete
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
