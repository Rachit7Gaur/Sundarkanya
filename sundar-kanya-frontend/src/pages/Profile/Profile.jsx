import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaSignOutAlt,
  FaHeart,
  FaShoppingBag
} from "react-icons/fa";

import { getProfile } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

import "./Profile.css";

function Profile() {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchProfile(){

      try{

        const res = await getProfile();

        setUser(res.data.user);

      }catch(err){

        console.log(err);

      }finally{

        setLoading(false);

      }

    }

    fetchProfile();

  },[]);

  if(loading){

    return <h2 className="loading">Loading...</h2>;

  }

  return (

    <section className="profile">

      <div className="profile-card">

        <div className="profile-top">

          <div className="avatar">

            {user.name.charAt(0).toUpperCase()}

          </div>

          <h2>{user.name}</h2>

          <p>{user.email}</p>

        </div>

        <div className="profile-info">

          <div className="info-row">

            <FaUser />

            <span>Name</span>

            <strong>{user.name}</strong>

          </div>

          <div className="info-row">

            <FaEnvelope />

            <span>Email</span>

            <strong>{user.email}</strong>

          </div>

          <div className="info-row">

            <FaUserShield />

            <span>Role</span>

            <strong>{user.role}</strong>

          </div>

          <div className="info-row">

            <FaCalendarAlt />

            <span>Joined</span>

            <strong>
              {new Date(user.createdAt).toLocaleDateString()}
            </strong>

          </div>

        </div>

        <div className="profile-actions">

          <button
            onClick={()=>navigate("/orders")}
          >
            <FaShoppingBag />
            My Orders
          </button>

          <button
            onClick={()=>navigate("/wishlist")}
          >
            <FaHeart />
            Wishlist
          </button>

          <button
            className="logout-btn"
            onClick={()=>{
              logout();
              navigate("/login");
            }}
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </section>

  );

}

export default Profile;