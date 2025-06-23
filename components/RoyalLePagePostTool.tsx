'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
    image: null
  });

  const [generatedText, setGeneratedText] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const summarizeWriteup = (writeup) => {
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

${hashtags}
    `;

    setGeneratedText(text.trim());
  };

  const downloadImage = () => {
    const element = document.getElementById("post-image");
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
      <Card>
        <CardContent className="space-y-4 p-4">
          <Input name="address" placeholder="Address" onChange={handleInputChange} />
          <Input name="price" placeholder="Price" onChange={handleInputChange} />
          <Input name="bedrooms" placeholder="Number of Bedrooms" onChange={handleInputChange} />
          <Input name="bathrooms" placeholder="Number of Bathrooms" onChange={handleInputChange} />
          <Input name="lotSize" placeholder="Lot Size" onChange={handleInputChange} />
          <Textarea name="listingWriteup" placeholder="Paste Listing Write-up" onChange={handleInputChange} />
          <Textarea name="openHouseInfo" placeholder="Open House Info (optional)" onChange={handleInputChange} />
          <Input name="agentName" placeholder="Your Name" onChange={handleInputChange} />
          <Input name="mobileNumber" placeholder="Mobile Number" onChange={handleInputChange} />

          <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, postType: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select Post Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="New Listing">New Listing</SelectItem>
              <SelectItem value="Price Improvement">Price Improvement</SelectItem>
              <SelectItem value="Open House">Open House</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
            </SelectContent>
          </Select>

          <Input type="file" accept="image/*" onChange={handleImageChange} />

          <Button onClick={generateSocialText}>Generate Social Media Text</Button>
        </CardContent>
      </Card>

      {generatedText && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Generated Post</h2>
          <Textarea value={generatedText} readOnly rows={10} />
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
            <img src="/rcr-logo.jpg" className="absolute bottom-4 right-4 w-20" alt="RCR Logo" />
          </div>
          <Button onClick={downloadImage}>Download Image</Button>
        </div>
      )}
    </div>
  );
};

export default RoyalLePagePostTool;
