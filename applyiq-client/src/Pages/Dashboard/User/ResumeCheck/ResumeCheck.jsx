import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFileUpload, FaPaste } from "react-icons/fa";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ResumeCheck = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("resume", data.resume[0]);
    formData.append("jobDescriptionText", data.jobDescriptionText || "");
    if (data.jobDescriptionFile?.[0]) {
      formData.append("jobDescriptionFile", data.jobDescriptionFile[0]);
    }

    try {
      const res = await axiosSecure.post("/api/resume-checker", formData);
      setResult(res.data);
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Vai developer er taka nai");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#0D1B2A]">
        AI Resume Checker
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Resume Upload */}
        <div>
          <label className="block font-semibold mb-2 text-primary">
            Upload Your Resume (PDF or DOCX)
          </label>
          <input
            type="file"
            accept=".pdf,.docx"
            {...register("resume", { required: true })}
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Job Description Paste */}
        <div>
          <label className="font-semibold mb-2 text-primary flex items-center gap-2">
            <FaPaste /> Paste Job Description
          </label>
          <textarea
            {...register("jobDescriptionText")}
            placeholder="Paste job description here..."
            className="textarea textarea-bordered w-full min-h-[120px]"
          />
        </div>

        {/* OR Upload Job Description */}
        <div>
          <label className="font-semibold mb-2 text-primary flex items-center gap-2">
            <FaFileUpload /> Or Upload JD File (.txt / .pdf / .docx)
          </label>
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            {...register("jobDescriptionFile")}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Check Resume"}
        </button>
      </form>

      {/* Result Section */}
      {result && (
        <div className="mt-10 bg-gray-50 p-5 rounded-md border">
          <h3 className="text-xl font-semibold text-[#0D1B2A] mb-3">
            Match Score: {result.score}%
          </h3>
          <p className="mb-2">
            <strong className="text-primary">Missing Skills:</strong>
          </p>
          <ul className="list-disc ml-6 mb-4 text-sm text-gray-700">
            {result.missing?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="mb-2">
            <strong className="text-primary">Suggestions:</strong>
          </p>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            {result.suggestions?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ResumeCheck;
