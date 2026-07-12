import { useEffect, useState } from "react";
import { changePassword } from "../../services/userService";
import toast from "react-hot-toast";
import {
  getSettings,
  updateSettings,
} from "../../services/userService";
import "./Settings.css";

const Settings = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      fullName: "",
      phone: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    },
  });

  const [passwordForm, setPasswordForm] = useState({
  currentPassword: "",
  newPassword: "",
});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setForm(data);
    } catch {
      toast.error("Unable to load settings");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddress = (e) => {
    setForm({
      ...form,
      address: {
        ...form.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateSettings(form);
      toast.success("Settings updated successfully");
    } catch {
      toast.error("Update failed");
    }
  };

  const handlePasswordChange = async (e) => {
  e.preventDefault();

  try {
    await changePassword(passwordForm);

    toast.success("Password changed successfully");

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
    });

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to change password"
    );
  }
};

  return (
    <div className="settings-page">
      <h1>Account Settings</h1>

      <form onSubmit={handleSubmit}>

        <h2>Personal Information</h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <h2>Default Shipping Address</h2>

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.address.fullName}
          onChange={handleAddress}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.address.phone}
          onChange={handleAddress}
        />

        <input
          name="addressLine"
          placeholder="Address"
          value={form.address.addressLine}
          onChange={handleAddress}
        />

        <input
          name="city"
          placeholder="City"
          value={form.address.city}
          onChange={handleAddress}
        />

        <input
          name="state"
          placeholder="State"
          value={form.address.state}
          onChange={handleAddress}
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.address.pincode}
          onChange={handleAddress}
        />

        <button type="submit">
          Save Changes
        </button>

      </form>

      <div className="password-section">

        <h2>Change Password</h2>

        <form onSubmit={handlePasswordChange}>

        <input
        type="password"
        placeholder="Current Password"
        value={passwordForm.currentPassword}
        onChange={(e)=>
        setPasswordForm({
        ...passwordForm,
        currentPassword:e.target.value
        })
        }
        />


        <input
        type="password"
        placeholder="New Password"
        value={passwordForm.newPassword}
        onChange={(e)=>
        setPasswordForm({
        ...passwordForm,
        newPassword:e.target.value
        })
        }
        />


        <button type="submit">
        Change Password
        </button>

        </form>

        </div>
    </div>
  );
};

export default Settings;