import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaSignOutAlt,
  FaHeart,
  FaShoppingBag
} from "react-icons/fa";

import {
  getProfile,
  updateSettings,
} from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

function Profile() {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);


  const [showEditModal, setShowEditModal] = useState(false);

    const [editData, setEditData] = useState({
      name: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
    });
  useEffect(() => {

    async function fetchProfile(){

      try{

        const res = await getProfile();

              setEditData({
        name: res.data.user.name || "",
        phone: res.data.user.phone || "",
        gender: res.data.user.gender || "",
        dateOfBirth: res.data.user.dateOfBirth
          ? res.data.user.dateOfBirth.slice(0,10)
          : "",
      });

        setUser(res.data.user);

      }catch(err){

        console.log(err);

      }finally{

        setLoading(false);

      }

    }

    fetchProfile();

  },[]);

  const [showAddressModal, setShowAddressModal] = useState(false);

const [addressData, setAddressData] = useState({
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
});


  const handleSaveProfile = async () => {
  try {

    const res = await updateSettings({
      name: editData.name,
      phone: editData.phone,
      gender: editData.gender,
      dateOfBirth: editData.dateOfBirth,
    });

    setUser(res.data.user);

   setAddressData({
      fullName: res.data.user.address?.fullName || "",
      phone: res.data.user.address?.phone || "",
      addressLine: res.data.user.address?.addressLine || "",
      city: res.data.user.address?.city || "",
      state: res.data.user.address?.state || "",
      pincode: res.data.user.address?.pincode || "",
    });

    setShowEditModal(false);

    toast.success("Profile updated successfully");
  } catch (error) {

    console.log(error);

     toast.error(
  error.response?.data?.message || "Unable to update profile"
);
  }
};

const handleSaveAddress = async () => {
  try {

    const res = await updateSettings({
      address: {
        fullName: addressData.fullName,
        phone: addressData.phone,
        addressLine: addressData.addressLine,
        city: addressData.city,
        state: addressData.state,
        pincode: addressData.pincode,
      },
    });

    setUser(res.data.user);

    setShowAddressModal(false);

    toast.success("Address updated successfully");

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Unable to update address"
    );

  }
};
  if(loading){

    return <h2 className="loading">Loading...</h2>;

  }

  return (

    <section className="profile">

      <div className="profile-card">

<div className="profile-header">

  <div className="profile-avatar">
    {user.name.charAt(0).toUpperCase()}
  </div>

  <div className="profile-user-info">
    <h2>{user.name}</h2>

    <p className="member-badge">
      ✦ Premium Member
    </p>

    <span>
      Member Since{" "}
      {new Date(user.createdAt).toLocaleDateString()}
    </span>
  </div>

  <button
    className="edit-profile-btn"
    onClick={() => setShowEditModal(true)}
  >
    Edit Profile
  </button>

</div>
<div className="profile-section">

  <div className="section-title">
    <h3>Personal Information</h3>
    <span>Your account details</span>
  </div>

  <div className="profile-grid">

    <div className="profile-item">
      <FaUser />
      <div>
        <small>Full Name</small>
        <h4>{user.name}</h4>
      </div>
    </div>

    <div className="profile-item">
      <FaEnvelope />
      <div>
        <small>Email Address</small>
        <h4>{user.email}</h4>
      </div>
    </div>

    <div className="profile-item">
      📞
      <div>
        <small>Phone Number</small>
        <h4>{user.phone || "Not Added"}</h4>
      </div>
    </div>

    <div className="profile-item">
      👤
      <div>
        <small>Gender</small>
        <h4>{user.gender || "Not Added"}</h4>
      </div>
    </div>

    <div className="profile-item">
      🎂
      <div>
        <small>Date of Birth</small>
        <h4>
          {user.dateOfBirth
            ? new Date(user.dateOfBirth).toLocaleDateString()
            : "Not Added"}
        </h4>
      </div>
    </div>

    <div className="profile-item">
      <FaCalendarAlt />
      <div>
        <small>Member Since</small>
        <h4>
          {new Date(user.createdAt).toLocaleDateString()}
        </h4>
      </div>
    </div>

  </div>

</div>

<div className="profile-section">

  <div className="section-title">
    <h3>Default Shipping Address</h3>
    <span>Your default delivery address</span>
  </div>

  <div className="address-card">

    <div className="address-icon">
      📍
    </div>

    <div className="address-details">

      <h4>
        {user.address?.fullName || user.name}
      </h4>

      <p>
        {user.address?.phone || "Phone not added"}
      </p>

      <p>
        {user.address?.addressLine || "No address added"}
      </p>

      <p>
        {user.address?.city || ""}
        {user.address?.city && ", "}
        {user.address?.state || ""}
      </p>

      <p>
        {user.address?.pincode || ""}
      </p>

    </div>

    <button
      className="edit-address-btn"
      onClick={() => setShowAddressModal(true)}
    >
      Edit Address
    </button>

  </div>

</div>

<div className="profile-section">

  <div className="section-title">
    <h3>Quick Actions</h3>
    <span>Manage your account</span>
  </div>

  <div className="quick-actions">

    <div
      className="action-card"
      onClick={() => navigate("/orders")}
    >
      <div className="action-left">
        <FaShoppingBag className="action-icon" />
        <div>
          <h4>My Orders</h4>
          <p>View your order history</p>
        </div>
      </div>

      <span className="action-arrow">›</span>
    </div>

    <div
      className="action-card"
      onClick={() => navigate("/wishlist")}
    >
      <div className="action-left">
        <FaHeart className="action-icon" />
        <div>
          <h4>Wishlist</h4>
          <p>Your saved jewellery</p>
        </div>
      </div>

      <span className="action-arrow">›</span>
    </div>

    <div
      className="action-card logout-card"
      onClick={() => {
        logout();
        navigate("/login");
      }}
    >
      <div className="action-left">
        <FaSignOutAlt className="action-icon" />
        <div>
          <h4>Logout</h4>
          <p>Sign out securely</p>
        </div>
      </div>

      <span className="action-arrow">›</span>
    </div>

  </div>

</div>

        

      </div>
{/* Edit Profile Modal */}

{showEditModal && (
  <div className="profile-modal-overlay">

    <div className="profile-modal">

      <h2>Edit Profile</h2>

      <div className="profile-modal-input">
        <label>Full Name</label>
        <input
          type="text"
          value={editData.name}
          onChange={(e) =>
            setEditData({
              ...editData,
              name: e.target.value,
            })
          }
        />
      </div>

      <div className="profile-modal-input">
        <label>Phone Number</label>
        <input
          type="text"
          value={editData.phone}
          onChange={(e) =>
            setEditData({
              ...editData,
              phone: e.target.value,
            })
          }
        />
      </div>

      <div className="profile-modal-input">
        <label>Gender</label>
        <select
          value={editData.gender}
          onChange={(e) =>
            setEditData({
              ...editData,
              gender: e.target.value,
            })
          }
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="profile-modal-input">
        <label>Date of Birth</label>
        <input
          type="date"
          value={editData.dateOfBirth}
          onChange={(e) =>
            setEditData({
              ...editData,
              dateOfBirth: e.target.value,
            })
          }
        />
      </div>

      <div className="profile-modal-buttons">

        <button
          type="button"
          className="cancel-modal-btn"
          onClick={() => setShowEditModal(false)}
        >
          Cancel
        </button>

<button
  type="button"
  className="save-modal-btn"
  onClick={handleSaveProfile}
>
  Save Changes
</button>

      </div>

    </div>

  </div>
)}

{showAddressModal && (

<div className="profile-modal-overlay">

<div className="profile-modal">

<h2>Edit Shipping Address</h2>

<div className="profile-modal-input">
<label>Full Name</label>

<input
type="text"
value={addressData.fullName}
onChange={(e)=>
setAddressData({
...addressData,
fullName:e.target.value
})
}
/>

</div>

<div className="profile-modal-input">

<label>Phone Number</label>

<input
type="text"
value={addressData.phone}
onChange={(e)=>
setAddressData({
...addressData,
phone:e.target.value
})
}
/>

</div>

<div className="profile-modal-input">

<label>Address</label>

<textarea
rows="3"
value={addressData.addressLine}
onChange={(e)=>
setAddressData({
...addressData,
addressLine:e.target.value
})
}
/>

</div>

<div className="profile-modal-input">

<label>City</label>

<input
type="text"
value={addressData.city}
onChange={(e)=>
setAddressData({
...addressData,
city:e.target.value
})
}
/>

</div>

<div className="profile-modal-input">

<label>State</label>

<input
type="text"
value={addressData.state}
onChange={(e)=>
setAddressData({
...addressData,
state:e.target.value
})
}
/>

</div>

<div className="profile-modal-input">

<label>Pincode</label>

<input
type="text"
value={addressData.pincode}
onChange={(e)=>
setAddressData({
...addressData,
pincode:e.target.value
})
}
/>

</div>

<div className="profile-modal-buttons">

<button
type="button"
className="cancel-modal-btn"
onClick={()=>
setShowAddressModal(false)
}
>

Cancel

</button>

<button
type="button"
className="save-modal-btn"
onClick={handleSaveAddress}
>

Save Address

</button>

</div>

</div>

</div>

)}
    </section>

  );

}

export default Profile;