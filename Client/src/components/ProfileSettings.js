import React, { useEffect, useState } from "react";
import "./ProfileSettings.css";

function ProfileSettings() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Load user from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name || "");
      setPhone(storedUser.phone || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add an API call to update the user details in DB
    alert("Profile updated successfully!");

    // Optionally update localStorage with new values
    const updatedUser = { ...user, name, phone };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input type="email" value={user.email} disabled />
        </label>
        <label>
          Role:
          <input type="text" value={user.role} disabled />
        </label>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileSettings;
