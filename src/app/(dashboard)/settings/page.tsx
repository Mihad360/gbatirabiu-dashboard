"use client";

import { useState } from "react";
import { User, Lock, Save } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "owner@elaundry.com",
    phone: "+1 234 567 8900",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    // TODO: dispatch updateProfile API
    toast.success("Profile updated successfully", {
      position: "top-right",
      duration: 3000,
    });
  };

  const handleUpdatePassword = () => {
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      toast.error("Please fill in all password fields", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    if (password.newPassword !== password.confirmPassword) {
      toast.error("New passwords do not match", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    if (password.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }
    // TODO: dispatch changePassword API
    toast.success("Password updated successfully", {
      position: "top-right",
      duration: 3000,
    });
    setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-primary transition";

  return (
    <div className="flex gap-6">
      {/* Left — Profile Card */}
      <div className="w-55 shrink-0">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center gap-3">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
            AD
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-800">{profile.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">System Administrator</p>
          </div>
          {/* Language */}
          <div className="w-full mt-2 flex items-center gap-2 border border-gray-100 rounded-lg px-3 py-2">
            <span className="text-gray-400 text-sm">🌐</span>
            <span className="text-sm text-gray-500">English (US)</span>
          </div>
        </div>
      </div>

      {/* Right — Forms */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <User size={16} className="text-primary" />
            Profile Information
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">
                Full Name
              </label>
              <input
                className={inputClass}
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">
                Email Address
              </label>
              <input
                className={inputClass}
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="text-xs text-gray-500 mb-1.5 block">
              Phone Number
            </label>
            <input
              className={inputClass}
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
            >
              <Save size={14} /> Save Profile
            </button>
          </div>
        </div>

        {/* Security & Password */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-5">
            <Lock size={16} className="text-primary" />
            Security & Password
          </h3>

          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-1.5 block">
              Current Password
            </label>
            <input
              className={inputClass}
              type="password"
              placeholder="••••••••"
              value={password.currentPassword}
              onChange={(e) =>
                setPassword({ ...password, currentPassword: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">
                New Password
              </label>
              <input
                className={inputClass}
                type="password"
                placeholder="••••••••"
                value={password.newPassword}
                onChange={(e) =>
                  setPassword({ ...password, newPassword: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">
                Confirm New Password
              </label>
              <input
                className={inputClass}
                type="password"
                placeholder="••••••••"
                value={password.confirmPassword}
                onChange={(e) =>
                  setPassword({ ...password, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleUpdatePassword}
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
            >
              <Lock size={14} /> Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
