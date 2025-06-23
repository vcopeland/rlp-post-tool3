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
      bedrooms: "🛌",
      bathrooms: "🚱",
      lotSize: "🌳",
      openHouse: "🗓️",
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

${hashtags}`;

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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#cc0000', textAlign: 'center' }}>Royal LePage RCR Realty Social Post Creator</h1>
      <div style={{ marginBottom: '20px' }}>
        <input name="address" placeholder="Address" onChange={handleInputChange} style={{ width: '100%', marginBottom: '8px' }} />
        <input name="price" placeholder="Price" onChange={handleInputChange} style={{ width: '100%', marginBottom: '8px' }} />
        <input name="bedrooms" placeholder="Number of Bedrooms" onChange={handleInputChange} style={{ width: '100%', marginBottom: '8px' }} />
        <input name="bathrooms" placeholder="Number of Bathrooms" onChange={handleInputChange} style={{ width: '100%', marginBottom: '8px' }} />
        <input name="lotSize" placeholder="Lot Size" onChange={handleInputChange} style={{ width: '100%', marginBottom: '8px' }} />
        <textarea name="listingWriteup" placeholder="Paste Listing Write-up" onChange={handleInputChange} style={{ width: '100%', marginBottom: '8px' }} />
        <textarea name="openHouseInfo" placeholder="Open House Info (optional)" onChange={handleInputChange} style={{ width: '100%', marginBottom: '8px' }} />
        <input name="agentName" placeholder="Your Name" onChange={handleInputChange} style={{ width: '100%', marginBottom: '8px' }} />
        <input name="mobileNumber" placeholder="Mobile Number" onChange={handleInputChange} style={{ width: '100%', marginBottom: '8px' }} />
        <select name="postType" onChange={handleInputChange} style={{ width: '100%', marginBottom: '8px' }}>
          <option value="New Listing">New Listing</option>
          <option value="Price Improvement">Price Improvement</option>
          <option value="Open House">Open House</option>
          <option value="Sold">Sold</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginBottom: '12px' }} />
        <button onClick={generateSocialText}>Generate Social Media Text</button>
      </div>

      {generatedText && (
        <div style={{ marginTop: '20px' }}>
          <h2>Generated Post</h2>
          <textarea value={generatedText} readOnly rows={10} style={{ width: '100%' }} />

          <div id="post-image" style={{ position: 'relative', width: '100%', maxWidth: '600px', height: '400px', margin: '20px auto', borderRadius: '16px', overflow: 'hidden', border: '1px solid #ccc' }}>
            {formData.image && <img src={formData.image} alt="Home" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', color: 'white', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{formData.postType}</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: '600' }}>{formData.address}</div>
                <div style={{ fontSize: '16px' }}>💰 {formData.price}</div>
                <div style={{ fontSize: '14px' }}>🛌 {formData.bedrooms} | 🚱 {formData.bathrooms} | 🌳 {formData.lotSize}</div>
              </div>
              <div style={{ fontSize: '14px', textAlign: 'right' }}>{formData.agentName} • {formData.mobileNumber}</div>
            </div>
            <img src="/rcr-logo.jpg" style={{ position: 'absolute', bottom: '8px', right: '8px', width: '80px' }} alt="RCR Logo" />
          </div>
          <button onClick={downloadImage}>Download Image</button>
        </div>
      )}
    </div>
  );
};

export default RoyalLePagePostTool;
