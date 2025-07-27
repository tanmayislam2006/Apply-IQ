import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";
import useAxios from "../../../../Hooks/useAxios";

const CalendarSuccess = () => {
  const axiosInstance = useAxios();
  const [params] = useSearchParams();
  const [tokens, setTokens] = useState(null);
  const [eventLink, setEventLink] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Get tokens from URL after redirect
  useEffect(() => {
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    if (access_token && refresh_token) {
      setTokens({ access_token, refresh_token });
      toast.success("✅ Google Calendar Connected!");
    } else {
      toast.error("❌ Token not found");
    }
  }, [params]);

  // Submit event form
  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.post("/api/calendar/event", {
        ...data,
        tokens,
      });
      setEventLink(res.data.eventLink);
      toast.success("✅ Event created successfully!");
      reset();
    } catch (err) {
      console.error("Event creation failed", err);
      toast.error("❌ Failed to create event");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">
        Google Calendar Integration
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Event Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description")}
          />
        </div>

        <div>
          <label className="label">Location</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("location")}
          />
        </div>

        <div>
          <label className="label">Date & Time</label>
          <input
            type="datetime-local"
            className="input input-bordered w-full"
            {...register("dateTime", { required: "Date & Time is required" })}
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm">{errors.dateTime.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-success w-full">
          Create Calendar Event
        </button>
      </form>

      {eventLink && (
        <div className="mt-6 text-center">
          <a
            href={eventLink}
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            View Event in Google Calendar
          </a>
        </div>
      )}
    </div>
  );
};

export default CalendarSuccess;
