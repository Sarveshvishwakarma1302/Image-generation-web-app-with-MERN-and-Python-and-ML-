import React, { useState, useContext } from "react";
import "./Result.css"; // Optional Styling
import { assets } from "../../assets/assets"; // Default image assets
import { AppContext } from "../../context/AppContext"; // Assuming context path

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1); // Default image shown
  const [input, setInput] = useState(""); // User prompt
  const [loading, setLoading] = useState(false); // Loading state
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false); // To show "Download" & "Generate Another"
  const [isInputVisible, setIsInputVisible] = useState(true); // To toggle input visibility

  // Get token and setCredit from AppContext
  const { token, setCredit, navigate } = useContext(AppContext);

  // Function to call NodeJS backend API for image generation
  const generateImage = async (prompt) => {
    try {
const response = await fetch("http://localhost:4000/image/generate-image", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
  body: JSON.stringify({ prompt }),
});

      const data = await response.json();

      if (data.success) {
        console.log("Generated image URL:", data.resultImage);
        setCredit(data.creditBalance); // Update credit in context/state
        return data.resultImage;        // Return generated image URL
      } else {
        alert(data.message || "Image generation failed.");
        setCredit(data.creditBalance); // Update credit even if failure
        if (data.creditBalance === 0) {
          // Redirect to buy credit page if no credits left
          if (navigate) {
            navigate('/BuyCredit');
          } else {
            window.location.href = "/BuyCredit";
          }
        }
        return null;
      }
    } catch (error) {
      console.error("Error while generating image:", error);
      alert("An error occurred while generating the image.");
      return null;
    }
  };

  // On generate button click
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    const imgUrl = await generateImage(input);

    if (imgUrl) {
      setImage(imgUrl);              // Show generated image
      setHasGeneratedOnce(true);    // Show download & generate another
      setIsInputVisible(false);     // Hide input field
      setInput("");                 // Clear input
    }

    setLoading(false);
  };

  // Reset to generate another image
  const handleGenerateAnother = () => {
    setImage(assets.sample_img_1);  // Reset image to default
    setIsInputVisible(true);         // Show input field
    setHasGeneratedOnce(false);      // Hide download button
  };

  return (
    <div className="home">
    <div className="result-container">
      <form onSubmit={handleSubmit}>
        {/* Image Preview */}
        <div className="result-preview">
          {image && <img src={image} alt="Generated Result" />}
          {loading && <p>Loading...</p>}
        </div>

        {/* Input and Generate Button */}
        {isInputVisible && (
          <div className="result-input">
            <input
              type="text"
              placeholder="Write your prompt"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              Generate
            </button>
          </div>
        )}

        {/* Download and Regenerate Buttons */}
        {hasGeneratedOnce && !loading && !isInputVisible && (
          <div className="download">
            <button type="button" onClick={handleGenerateAnother} className="Gen">
              Generate Another
            </button>
            <a
              href={image}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
        )}
      </form>
    </div>
    </div>
  );
};

export default Result;
