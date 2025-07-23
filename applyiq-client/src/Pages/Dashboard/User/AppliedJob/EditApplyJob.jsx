import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaPen } from "react-icons/fa";

const statusOptions = [
  { value: "wishlist", label: "Wishlist" },
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const tagOptions = [
  { value: "Full-time", label: "Full-time" },
  { value: "Frontend", label: "Frontend" },
  { value: "Urgent", label: "Urgent" },
  { value: "Remote", label: "Remote" },
];

const resumeOptions = [
  { value: "resume_v1.pdf", label: "Resume v1" },
  { value: "resume_v2.pdf", label: "Resume v2" },
];

const EditApplyJob = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { data: jobInfo, isLoading } = useQuery({
    queryKey: ["appliedJobs", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appliedJobs/${id}`);
      return res.data;
    },
  });
  console.log(jobInfo);

  const { mutate: updateJob } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/appliedJobs/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Job updated successfully");
      queryClient.invalidateQueries(["appliedJobs"]);
      navigate("/dashboard/appliedJob");
    },
    onError: () => toast.error("Failed to update job"),
  });

  const onSubmit = (data) => {
    updateJob(data);
    console.log(data);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-xl p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center text-primary flex items-center justify-center gap-3">
          <FaPen /> Edit Job Application
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Top Section */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Job Title */}
            <div>
              <label className="label">Job Title</label>
              <input
                {...register("jobTitle", { required: "Job title is required" })}
                className="input input-bordered w-full"
                deafaultValue={jobInfo.jobTitle}
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="label">Company Name</label>
              <input
                {...register("companyName", {
                  required: "Company name is required",
                })}
                className="input input-bordered w-full"
                defaultValue={jobInfo.companyName}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Salary */}
            <div>
              <label className="label">Salary Range</label>
              <input
                {...register("salary", { required: "Salary is required" })}
                className="input input-bordered w-full"
                defaultValue={jobInfo.salary}
              />
              {errors.salary && (
                <p className="text-red-500 text-sm">{errors.salary.message}</p>
              )}
            </div>

            {/* Job Link */}
            <div>
              <label className="label">Job Link</label>
              <input
                type="url"
                {...register("jobLink", {
                  required: "Job link is required",
                })}
                defaultValue={jobInfo.jobLink}
                className="input input-bordered w-full"
              />
              {errors.jobLink && (
                <p className="text-red-500 text-sm">{errors.jobLink.message}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="label">Location</label>
              <input
                {...register("location", { required: "Location is required" })}
                className="input input-bordered w-full"
                defaultValue={jobInfo.location}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Application Date */}
            <div>
              <label className="label">Application Date</label>
              <input
                type="date"
                {...register("applicationDate", {
                  required: "Application date is required",
                })}
                className="input input-bordered w-full"
                defaultValue={jobInfo.applicationDate}
              />
              {errors.applicationDate && (
                <p className="text-red-500 text-sm">
                  {errors.applicationDate.message}
                </p>
              )}
            </div>
          </div>
          {/* Tags */}
          <div>
            <label className="label">Tags</label>
            <Controller
              name="tags"
              deafaultValue={jobInfo.tags || []}
              control={control}
              render={({ field }) => (
                <Select
                  isMulti
                  options={tagOptions}
                  value={tagOptions.filter((option) =>
                    field.value?.includes(option.value)
                  )}
                  onChange={(options) =>
                    field.onChange(options.map((o) => o.value))
                  }
                  placeholder="Select tags"
                />
              )}
            />
          </div>
          {/* Status + Resume  */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="label">Status</label>
              <Controller
                name="status"
                defaultValue={jobInfo.status}
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <Select
                    options={statusOptions}
                    value={statusOptions.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(option) => field.onChange(option.value)}
                    placeholder="Select Status"
                  />
                )}
              />
              {errors.status && (
                <p className="text-red-500 text-sm">{errors.status.message}</p>
              )}
            </div>
            {/* Resume */}
            <div>
              <label className="label">Resume Version Used</label>
              <Controller
                name="resumeVersion"
                defaultValue={jobInfo.resumeVersion}
                control={control}
                render={({ field }) => (
                  <Select
                    options={resumeOptions}
                    value={resumeOptions.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(option) => field.onChange(option.value)}
                    placeholder="Select resume"
                  />
                )}
              />
            </div>
          </div>

          {/* Description & Notes */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Job Description */}
            <div>
              <label className="label">Job Description</label>
              <Controller
                defaultValue={jobInfo.jobDescription}
                name="jobDescription"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <textarea
                    className="textarea textarea-bordered w-full h-18"
                    {...field}
                    placeholder="Enter job description"
                  />
                )}
              />
              {errors.jobDescription && (
                <p className="text-red-500 text-sm">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="label">Notes</label>

              <Controller
                defaultValue={jobInfo.notes}
                name="notes"
                control={control}
                render={({ field }) => (
                  <textarea
                    className="textarea textarea-bordered w-full h-18"
                    {...field}
                    placeholder="Notes (optional)"
                  />
                )}
              />
            </div>
          </div>

          {/* Follow-up Date & Contact */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Follow-up Date */}
            <div className="">
              <label className="label">Next Follow-up Date</label>
              <input
                defaultValue={jobInfo.nextFollowUp}
                type="date"
                {...register("nextFollowUp")}
                className="input input-bordered w-full"
              />
            </div>
            {/* Contact Person */}
            <div className="">
              <div>
                <label className="label">Contact Name (Recruiter)</label>
                <input
                  defaultValue={jobInfo.contactName}
                  {...register("contactName")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Contact Email (Recruiter)</label>
              <input
                defaultValue={jobInfo.contactEmail}
                type="email"
                {...register("contactEmail")}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label">Contact Phone (Recruiter)</label>
              <input
                defaultValue={jobInfo.contactPhone}
                type="tel"
                {...register("contactPhone")}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div>
            <button type="submit" className="btn btn-primary w-full mt-4">
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditApplyJob;
