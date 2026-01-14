import { User } from "../models/userModel.js";
import axios from "axios";

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.userId; 

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.creditBalance <= 0) {
      return res.status(403).json({
        success: false,
        message: "No credit balance",
        creditBalance: user.creditBalance,
      });
    }

    //  Call Flask API
    const flaskRes = await axios.post("http://localhost:5000/generate", { prompt });

    if (!flaskRes.data.success) {
      return res.status(500).json({
        success: false,
        message: "Flask image generation failed",
      });
    }

    const resultImage = flaskRes.data.image_url;

    //  Deduct 1 credit
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $inc: { creditBalance: -1 } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Image Generated",
      creditBalance: updatedUser.creditBalance,
      resultImage,
    });

  } catch (error) {
    console.error("Error in generateImage:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};
