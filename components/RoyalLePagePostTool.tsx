"use client";
import React, { useState } from "react";
import html2canvas from "html2canvas";

const RoyalLePagePostTool = () => {
  const [formData, setFormData] = useState({
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    lotSize: "",
    listingWriteup: "",
    openHouseInfo: "",
    postType: "New Listing",
    agentName: "",
    mobileNumber: "",
    image: null as string | null,
  });

  const [generatedText, setGeneratedText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const summarizeWriteup = (writeup: string) => {
    let summary = writeup.split(".")[0];
    if (summary.length > 160) summary = summary.slice(0, 157) + "...";
    return summary.trim();
  };

  const generateSocialText = () => {
    const { address, price, bedrooms, bathrooms, lotSize, listingWriteup, openHouseInfo, postType } = formData;
    const emojis = {
      price: "💰",
      bedrooms: "🛏️",
      bathrooms: "🛁",
      lotSize: "🌳",
      openHouse: "📅",
      house: "🏡",
      sparkle: "✨"
    };

    const hashtags = "#RoyalLePage #NewListing #DreamHome #HouseGoals #RealEstateCanada";
    const summary = summarizeWriteup(listingWriteup);

    const text = `
${emojis.house} ${postType}!
${emojis.sparkle} ${address} - Listed at ${price}

${emojis.bedrooms} Bedrooms: ${bedrooms}
${emojis.bathrooms} Bathrooms: ${bathrooms}
${emojis.lotSize} Lot Size: ${lotSize}

${summary}

${openHouseInfo ? `${emojis.openHouse} Open House: ${openHouseInfo}` : ""}

Contact me for more info or to book a showing!

${hashtags}`.trim();

    setGeneratedText(text);
  };

  const downloadImage = () => {
    const element = document.getElementById("post-image");
    if (element) {
      html2canvas(element).then((canvas) => {
        const link = document.createElement("a");
        link.download = "rlp_social_post.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h1 style={{ textAlign: "center", color: "#cc0000", fontSize: 28, fontWeight: "bold" }}>
        Royal LePage RCR Realty Social Post Creator
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
        <input name="address" placeholder="Address" onChange={handleInputChange} />
        <input name="price" placeholder="Price" onChange={handleInputChange} />
        <input name="bedrooms" placeholder="Number of Bedrooms" onChange={handleInputChange} />
        <input name="bathrooms" placeholder="Number of Bathrooms" onChange={handleInputChange} />
        <input name="lotSize" placeholder="Lot Size" onChange={handleInputChange} />
        <textarea name="listingWriteup" placeholder="Paste Listing Write-up" onChange={handleInputChange} />
        <textarea name="openHouseInfo" placeholder="Open House Info (optional)" onChange={handleInputChange} />
        <input name="agentName" placeholder="Your Name" onChange={handleInputChange} />
        <input name="mobileNumber" placeholder="Mobile Number" onChange={handleInputChange} />
        <select name="postType" onChange={handleInputChange}>
          <option value="New Listing">New Listing</option>
          <option value="Price Improvement">Price Improvement</option>
          <option value="Open House">Open House</option>
          <option value="Sold">Sold</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={generateSocialText}>Generate Social Media Text</button>
      </div>

      {generatedText && (
        <div style={{ marginTop: 40 }}>
          <h2>Generated Post:</h2>
          <textarea readOnly rows={10} style={{ width: "100%" }} value={generatedText} />

          <div id="post-image" style={{
            position: "relative",
            marginTop: 20,
            width: "100%",
            height: 400,
            overflow: "hidden",
            borderRadius: 16,
            border: "1px solid #ccc"
          }}>
            {formData.image && (
              <img src={formData.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 16
            }}>
              <div style={{ fontSize: 24, fontWeight: "bold" }}>{formData.postType}</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 18 }}>{formData.address}</div>
                <div style={{ fontSize: 16 }}>💰 {formData.price}</div>
                <div style={{ fontSize: 14 }}>🛏️ {formData.bedrooms} | 🛁 {formData.bathrooms} | 🌳 {formData.lotSize}</div>
              </div>
              <div style={{ fontSize: 12, textAlign: "right" }}>
                {formData.agentName} • {formData.mobileNumber}
              </div>
            </div>
          </div>

          <button onClick={downloadImage} style={{ marginTop: 10 }}>Download Image</button>
        </div>
      )}
    </div>
  );
};

export default RoyalLePagePostTool;
