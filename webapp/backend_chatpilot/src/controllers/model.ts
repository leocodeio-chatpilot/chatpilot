import { Request, Response } from "express";
import client from "../db/client";
import { saveApiSchema } from "../types";

export const saveApikey = async (req: Request, res: Response) => {
  const saveApiData = saveApiSchema.safeParse(req.body);
  if (!saveApiData.success) {
    res.status(400).json({
      message: "Validation failed",
      payload: {
        details: saveApiData.error.errors,
      },
    });
    return;
  }
  const { userId, websiteUrl, websiteName } = saveApiData.data;
  console.log(userId, websiteName, websiteUrl);
  //   const user = await client.user.findUnique({ where: { id: userId } });
  //   console.log(user);
  try {
    // we will make a call to chatpilot here
    const apikey = "updatedbychatpilot";
    const modelApiPaylod = {
      user_id: userId,
      website_name: websiteName,
      website_url: websiteUrl,
      api_key: apikey,
    };
    await client.modelapi.create({
      data: modelApiPaylod,
      select: {
        user_id: true,
        website_name: true,
        website_url: true,
        api_key: true,
      },
    });

    res.status(201).json({
      message: "Api created successfully",
    });
  } catch (err: any) {
    console.error("error while saving api key", err);
    res.status(500).send({
      message: "An unexpected error occurred during signup",
      payload: {
        details: "Internal server error",
      },
    });
  }
};
