import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import fs from "fs";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageUrl = req.query.url as string;
  try {
    // Download the image from the different domain
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    // Convert the downloaded image to base64 format
    const base64Data = imageBuffer.toString("base64");
    const base64Str = `data:image/jpeg;base64,${base64Data}`;

    const data = {
      imageUrl: base64Str,
    };

    res.status(200).json(data);
  } catch (error) {
    return null;
  }
}
