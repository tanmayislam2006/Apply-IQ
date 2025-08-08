import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthProvider from "../../../../Hooks/useAuthProvider";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaEdit, FaTrashAlt, FaInfoCircle } from "react-icons/fa";
import DataTable from "../../../../Components/DataTable/DataTable";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useState } from "react";
import JobDetailsModal from "./JobDetailsModal ";
import { useNavigate } from "react-router";

const AppliedJob = () => {
  const { user } = useAuthProvider();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  // fetch applied jobs for the user
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
  // mutation to delete a job
  const { mutate: deleteJob } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/appliedJobs/${id}`);
    },
    onSuccess: () => {
      // Optionally refetch or update the state after deletion
      queryClient.invalidateQueries(["appliedJobs", user?.email]);
      toast.success("Job deleted successfully");
    },
    onError: (error) => {
      toast.error("Error deleting job:", error);
    },
  });
  const handleEdit = (id) => {
   navigate(`/dashboard/editJob/${id}`);
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This entry will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#e11d48", // red-600
      cancelButtonColor: "#6b7280", // gray-500
    });
    if (confirm.isConfirmed) {
      deleteJob(id);
    }
  };

  const handleInfo = (job) => {
    setSelectedJob(job);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };
  const columns = [
    {
      header: "Job Title",
      accessorKey: "jobTitle",
    },
    {
      header: "Company",
      accessorKey: "companyName",
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
            <button
              className="cursor-pointer"
              onClick={() => handleEdit(job._id)}
              title="Edit"
            >
              <FaEdit className="hover:text-blue-500 text-lg" />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => handleDelete(job._id)}
              title="Delete"
            >
              <FaTrashAlt className="hover:text-red-500 text-lg" />
            </button>
            <button
              className="cursor-pointer"
              onClick={() => handleInfo(job)}
              title="Info"
            >
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
        <div className="hidden lg:block">
          <DataTable columns={columns} data={appliedJobs} />
        </div>
      )}
      {/* card view */}
      {!isLoading && appliedJobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
          {appliedJobs.map((job) => (
            <div
              key={job._id}
              className="relative bg-white border-l-4 border-r-4 border-primary shadow-md rounded-xl p-5 transition-all hover:shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {job.jobTitle}
              </h3>
              <p className="text-sm text-gray-600 font-medium">
                {job.companyName}
              </p>
              <p className="text-sm text-gray-500">{job.location}</p>

              <div className="absolute top-4 right-4 flex gap-2 text-primary">
                <button
                  onClick={() => handleEdit(job._id)}
                  title="Edit"
                  className="hover:text-blue-500"
                >
                  <FaEdit className="text-md" />
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  title="Delete"
                  className="hover:text-red-500"
                >
                  <FaTrashAlt className="text-md" />
                </button>
                <button
                  onClick={() => handleInfo(job._id)}
                  title="Info"
                  className="hover:text-green-500"
                >
                  <FaInfoCircle className="text-md" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedJob && <JobDetailsModal job={selectedJob} onClose={closeModal} />}

    </div>
  );
};

export default AppliedJob;
