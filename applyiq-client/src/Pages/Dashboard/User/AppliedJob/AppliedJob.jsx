import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuthProvider from "../../../../Hooks/useAuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import DataTable from "../../../../Components/DataTable/DataTable";

const AppliedJob = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();

  const {
    data: appliedJobs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["appliedJobs", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/appliedJobs?email=${user.email}`);
      return res.data;
    },
  });

  const handleEdit = (id) => {
    console.log("Edit job:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete job:", id);
  };

  const handleInfo = (id) => {
    console.log("View info for job:", id);
  };

  const columns = [
    {
      header: "Job Title",
      accessorKey: "jobTitle",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    },
    {
      header: "Company",
      accessorKey: "companyName",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const job = row.original;
        return (
          <div className="flex gap-2 text-primary">
            <button className="cursor-pointer" onClick={() => handleEdit(job._id)} title="Edit">
              <FaEdit className="hover:text-blue-500 text-lg" />
            </button>
            <button className="cursor-pointer" onClick={() => handleDelete(job._id)} title="Delete">
              <FaTrashAlt className="hover:text-red-500 text-lg" />
            </button>
            <button className="cursor-pointer" onClick={() => handleInfo(job._id)} title="Info">
              <FaInfoCircle className="hover:text-green-500 text-lg" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Applied Jobs</h2>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading applied jobs.</p>}
      {!isLoading && appliedJobs.length === 0 && (
        <p className="text-gray-500">You have not applied for any jobs yet.</p>
      )}

      {!isLoading && appliedJobs.length > 0 && (
        <DataTable columns={columns} data={appliedJobs} />
      )}
    </div>
  );
};

export default AppliedJob;
