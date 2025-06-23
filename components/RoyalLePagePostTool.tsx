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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const summarizeWriteup = (writeup: string) => {
    let summary = writeup.split(".")[0];
    if (summary.length > 160) {
      summary = summary.slice(0, 157) + "...";
    }
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
      sparkle: "✨",
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

${hashtags}
    `;

    setGeneratedText(text.trim());
  };

  const downloadImage = () => {
    const element = document.getElementById("post-image");
    if (!element) return;
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "rlp_social_post.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="p-6 space-y-4 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold text-center text-red-700">Royal LePage RCR Realty Social Post Creator</h1>

      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <input className="w-full border p-2 rounded" name="address" placeholder="Address" onChange={handleInputChange} />
        <input className="w-full border p-2 rounded" name="price" placeholder="Price" onChange={handleInputChange} />
        <input className="w-full border p-2 rounded" name="bedrooms" placeholder="Number of Bedrooms" onChange={handleInputChange} />
        <input className="w-full border p-2 rounded" name="bathrooms" placeholder="Number of Bathrooms" onChange={handleInputChange} />
        <input className="w-full border p-2 rounded" name="lotSize" placeholder="Lot Size" onChange={handleInputChange} />
        <textarea className="w-full border p-2 rounded" name="listingWriteup" placeholder="Paste Listing Write-up" onChange={handleInputChange} />
        <textarea className="w-full border p-2 rounded" name="openHouseInfo" placeholder="Open House Info (optional)" onChange={handleInputChange} />
        <input className="w-full border p-2 rounded" name="agentName" placeholder="Your Name" onChange={handleInputChange} />
        <input className="w-full border p-2 rounded" name="mobileNumber" placeholder="Mobile Number" onChange={handleInputChange} />

        <select
          className="w-full border p-2 rounded"
          value={formData.postType}
          onChange={(e) => setFormData((prev) => ({ ...prev, postType: e.target.value }))}
        >
          <option value="New Listing">New Listing</option>
          <option value="Price Improvement">Price Improvement</option>
          <option value="Open House">Open House</option>
          <option value="Sold">Sold</option>
        </select>

        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
        <button onClick={generateSocialText} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Generate Social Media Text
        </button>
      </div>

      {generatedText && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Generated Post</h2>
          <textarea value={generatedText} readOnly rows={10} className="w-full border p-2 rounded" />

          <div id="post-image" className="relative w-full max-w-xl mx-auto h-96 rounded-xl overflow-hidden shadow-lg border border-gray-300">
            {formData.image && <img src={formData.image} alt="Home" className="w-full h-full object-cover" />}
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 text-white p-4 flex flex-col justify-between">
              <div className="text-2xl font-bold">{formData.postType}</div>
              <div className="text-center">
                <div className="text-lg font-semibold">{formData.address}</div>
                <div className="text-md">💰 {formData.price}</div>
                <div className="text-sm">🛏️ {formData.bedrooms} | 🛁 {formData.bathrooms} | 🌳 {formData.lotSize}</div>
              </div>
              <div className="text-sm text-right">{formData.agentName} • {formData.mobileNumber}</div>
            </div>
            {/* Replace this image URL with your actual logo path or delete if not used */}
            <img src="/rcr-logo.png" className="absolute bottom-4 right-4 w-20" alt="RCR Logo" />
          </div>

          <button onClick={downloadImage} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default RoyalLePagePostTool;
