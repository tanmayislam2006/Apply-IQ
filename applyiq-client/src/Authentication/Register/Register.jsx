import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash, FaUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import useAuthProvider from "../../Hooks/useAuthProvider";
import useAxios from "../../Hooks/useAxios";
import defaultAvatar from "../../assets/logo.png";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const Register = () => {
  const { createAccount, googleLogin, refetchUserData } = useAuthProvider();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [preview, setPreview] = useState(defaultAvatar);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("image", file);
      axios
        .post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMMGBB_API_KEY
          }`,
          formData
        )
        .then((res) => {
          if (res.data.success) {
            setImage(res.data.data.url);
          } else {
            toast.error("Image upload failed");
          }
        })
        .catch(() => toast.error("Image upload error"));
    }
  };

  const onSubmit = async (data) => {
    try {
      const result = await createAccount(data.email, data.password);
      if (result?.user) {
        const profileInfo = {
          name: data.fullName,
          email: data.email,
          profileImage: image || defaultAvatar,
        };
        await axiosInstance.post("/register", { profileInfo });
        await refetchUserData();
        toast.success("Account created successfully");
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      if (res?.user) {
        const profileInfo = {
          name: res.user.displayName,
          email: res.user.email,
          profileImage: res.user.photoURL,
        };
        await refetchUserData();
        toast.success("Logged in with Google");
        navigate("/");
      }
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10  rounded-2xl shadow-lg p-6 relative">
      {/* Close button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-3 right-3 text-red-500 text-2xl font-bold"
      >
        <IoClose />
      </button>

      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Create Your ApplyIQ Account
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Profile Image */}
        <div className="flex flex-col items-center col-span-2">
          <div className="relative w-24 h-24">
            <img
              src={image || preview}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-primary/20"
            />
            <label
              htmlFor="image"
              className="absolute bottom-0 right-0 bg-primary p-1 rounded-full cursor-pointer"
            >
              <FaUserCircle className="text-white" size={22} />
            </label>
            <input
              type="file"
              id="image"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">Upload Profile Image</p>
        </div>

        {/* Full Name */}
        <div className="col-span-2">
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.fullName ? "border-red-500" : "border-primary/20"
            } focus:outline-none focus:border-primary`}
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="col-span-2">
          <input
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.email ? "border-red-500" : "border-primary/20"
            } focus:outline-none focus:border-primary`}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="col-span-2 relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.password ? "border-red-500" : "border-primary/20"
            } focus:outline-none focus:border-primary`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "At least 8 characters",
              },
              validate: {
                hasUpper: (v) =>
                  /[A-Z]/.test(v) || "Must contain an uppercase letter",
                hasSymbol: (v) =>
                  /[!@#$%^&*]/.test(v) || "Must contain a special character",
              },
            })}
          />
          <span
            className="absolute right-4 top-4 text-gray-400 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="col-span-2 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition cursor-pointer"
        >
          Register
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-2 my-4">
        <hr className="flex-grow border-t border-gray-200" />
        <span className="text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-t border-gray-200" />
      </div>

      {/* Google login */}
      <button
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg text-primary font-medium hover:bg-primary/5 cursor-pointer"
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>

      {/* Login link */}
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-primary font-semibold underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
