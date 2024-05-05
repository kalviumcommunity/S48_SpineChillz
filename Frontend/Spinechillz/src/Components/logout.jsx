import React from "react";
import axios from "axios";

function Logout() {
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/logout",
        {},
        { withCredentials: true }
      );
      alert(res.data.message);
    } catch (err) {
      alert("Failed to logout");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
