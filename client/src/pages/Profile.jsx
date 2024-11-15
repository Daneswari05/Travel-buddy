import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card } from "../components";

import { getUserTrips } from "../services/tripApi";

import { logoutUser } from "../store/reducers/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const { user } = userData;

  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [activeTab, setActiveTab] = useState("trips");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleEdit = () => {
    console.log("Edit Profile");
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/";
    console.log("Logout");
  };

  useEffect(() => {
    setIsLoading(true);
    getUserTrips(user._id)
      .then((trips) => {
        setTrips(trips);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
        setIsLoading(false);
      });
  }, [user._id]);
  useEffect(() => {
    const filtered = trips.filter((trip) =>
      trip.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTrips(filtered);
  }, [trips, searchTerm]);

  return (
    <div
      className="container"
      style={{
        padding: "2rem",
      }}
    >
      <div className="row" style={{ gap: "2rem" }}>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          alt="profile pic"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "fill",
          }}
        />
        <div
          className="inner-container"
          style={{
            alignItems: "flex-start",
          }}
        >
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{`Total ${trips.length} trips created`}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "red",
                color: "white",
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div
        className="inner-container"
        style={{
          width: "100%",
          padding: "2rem 5rem",
          gap: "2rem",
        }}
      >
        <div className="row" style={{ width: "100%" }}>
          <div
            className="row"
            style={{
              gap: "0.5rem",
            }}
          >
            <button
              className={`tab ${activeTab === "trips" ? "active" : ""}`}
              onClick={() => handleTabChange("trips")}
            >
              Your Trips
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
          }}
        >
          {activeTab === "trips" && (
            <div
              key={filteredTrips.length}
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gridGap: "2rem",
              }}
            >
              {isLoading ? (
                <p
                  className="row"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2rem",
                  }}
                >
                  Loading trips...
                </p>
              ) : filteredTrips.length === 0 ? (
                <div
                  className="inner-container"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2rem",
                  }}
                >
                  <h2>No Trips Found</h2>
                  <Link to="/create-trip" className="button">
                    Create a Trip
                  </Link>
                </div>
              ) : (
                filteredTrips.map((trip) => (
                  <Link key={trip.id} to={`/trips/${trip._id}`}>
                    <Card trip={trip} />
                  </Link>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
