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
    // Naive summary: take the first sentence and shorten if needed
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
