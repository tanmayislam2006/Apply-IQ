import React from "react";
 // adjust based on your project
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useAuthProvider from "../../../../Hooks/useAuthProvider";

const Profile = () => {
  const { user } = useAuthProvider(); // Assume this returns the user data as described

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <img
          src={user?.profileImage}
          alt={user?.name}
          className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-primary shadow"
        />
        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
          {user?.name}
        </h2>
        <p className="text-gray-500">{user?.email}</p>

        <div className="mt-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Role:</span>
            <span className="capitalize">{user?.role}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Service Plan:</span>
            <span className="uppercase text-primary font-bold">
              {user?.service_plan}
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <span className="font-medium">Verified:</span>
            {user?.isVerified ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Joined on:{" "}
            {new Date(user?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        <button className="cursor-pointer mt-6 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
