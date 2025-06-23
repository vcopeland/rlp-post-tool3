"use client";

import { useState } from "react";

export default function RoyalLePagePostTool() {
  const [propertyType, setPropertyType] = useState("Residential");
  const [description, setDescription] = useState("");

  const generatePost = () => {
    const post = `🏡 New ${propertyType} Listing!\n\n${description}`;
    alert(post);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Royal LePage Post Tool</h1>

      <label htmlFor="propertyType">Property Type:</label>
      <select
        id="propertyType"
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
      >
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Condo">Condo</option>
        <option value="Vacant Land">Vacant Land</option>
      </select>

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={6}
        placeholder="Enter property details here..."
        style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
      />

      <button
        onClick={generatePost}
        style={{
          padding: "10px 20px",
          backgroundColor: "#d62828",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Generate Post
      </button>
    </div>
  );
}
