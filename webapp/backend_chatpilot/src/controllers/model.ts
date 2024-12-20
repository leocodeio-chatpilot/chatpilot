import { Request, Response } from "express";
import client from "../db/client";
import { saveApiSchema, queryApiSchema } from "../types";
import axios from "axios";

export const saveApikey = async (req: Request, res: Response) => {
  console.log("save api key called");
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
  // console.log(userId, websiteName, websiteUrl);
  // const user = await client.user.findUnique({ where: { id: userId } });
  // console.log(user);
  try {
    // we will make a call to chatpilot here
    let apikey = "updatedbychatpilot";

    try {
      const chatpilotApi = process.env.BACKEND_PYTHON_MODEL_API;
      const apikeyResponse = await axios.post(`${chatpilotApi}/sample`, {
        url: websiteUrl,
      });
      // console.log(apikeyResponse);
      apikey = apikeyResponse.data;
    } catch (err: any) {
      console.log("error while getting the apikey from chatpilot server");
      res.status(500).send({
        message: "An unexpected error occurred during signup",
        payload: {
          details: "Internal server error",
        },
      });
      return;
    }
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

export const getApiByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // console.log(userId);
    if (!userId) {
      res.status(400).json({
        message: "you did not provide userId correctly",
        payload: {},
      });
      return;
    }
    const userApis = await client.modelapi.findMany({
      where: { user_id: userId },
    });
    if (!userApis) {
      res.status(404).json({
        message: "you donot have any apis for this userId",
        payload: {},
      });
      return;
    }
    // console.log(userApis);
    res.status(200).json({
      message: "Apis fetched sucessfully!!",
      payload: {
        userApis: userApis,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Server error occured!!", payload: {} });
  }
};

export const queryModelApi = async (req: Request, res: Response) => {
  console.log("debug log 0 - model.ts", req.body);
  const queryData = queryApiSchema.safeParse(req.body);
  if (!queryData.success) {
    res.status(400).json({
      message: "you did not provide query_text or api_key correctly",
      payload: {},
    });
    return;
  }
  const { queryText, apiKey } = queryData.data;
  console.log("debug log 1 - model.ts", queryText, apiKey);
  try {
    const modelApi = await client.modelapi.findUnique({
      where: { api_key: apiKey },
    });
    if (!modelApi) {
      res.status(404).json({
        message: "you did not provide correct api_key",
        payload: {},
      });
      return;
    }
    // console.log(modelApi);
    const chatpilotApi = process.env.BACKEND_PYTHON_MODEL_API;
    const modelResponse = await axios.post(`${chatpilotApi}/query`, {
      query_text: queryText,
      api_key: apiKey,
    });
    console.log("debug log 2 - model.ts", modelResponse.data.results);
    res.status(200).json({
      message: "query successfull",
      payload: {
        response: modelResponse.data.results,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Server error occured!!",
      payload: {},
    });
  }
};