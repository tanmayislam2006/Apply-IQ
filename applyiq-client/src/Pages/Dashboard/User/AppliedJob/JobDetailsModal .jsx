// src/Components/JobDetailsModal.jsx

import React from "react";
import { FaTimes } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const statusColors = {
  wishlist: "bg-yellow-100 text-yellow-800",
  applied: "bg-blue-100 text-blue-800",
  interview: "bg-green-100 text-green-800",
  offer: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-xl shadow-2xl relative overflow-y-auto max-h-[90vh] p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-6 right-6 text-gray-400 hover:text-red-500 transition-colors duration-200"
        >
          <FaTimes size={30} />
        </button>

        {/* Header Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            {job.jobTitle}
          </h2>
          <p className="text-lg text-gray-600 font-medium mb-4">
            {job.companyName}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                statusColors[job.status] || "bg-gray-200 text-gray-800"
              }`}
            >
              {job.status}
            </span>
            {job.tags?.length > 0 &&
              job.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Location
              </h4>
              <p className="text-gray-800">{job.location}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Salary
              </h4>
              <p className="text-gray-800">{job.salary || "Not specified"}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Application Date
              </h4>
              <p className="text-gray-800">{job.applicationDate}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Next Follow-Up
              </h4>
              <p className="text-gray-800">
                {job.nextFollowUp || "Not scheduled"}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Resume Version
              </h4>
              <p className="text-gray-800">
                {job.resumeVersion || "Not specified"}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Job Link
              </h4>
              <a
                href={job.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline inline-flex items-center"
              >
                View posting <FiExternalLink className="ml-1" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Name
              </h4>
              <p className="text-gray-800">
                {job.contactName || "Not available"}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Email
              </h4>
              <p className="text-gray-800 break-all">
                {job.contactEmail || "Not available"}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Phone
              </h4>
              <p className="text-gray-800">
                {job.contactPhone || "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Job Description
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {job.jobDescription || "No description provided"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
              Notes
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {job.notes || "No notes added"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsModal;
