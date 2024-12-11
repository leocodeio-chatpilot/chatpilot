import z from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const logoutSchema = z.object({
  token: z.string(),
});

export const profileSchema = z.object({
  token: z.string(),
});

export const saveApiSchema = z.object({
  userId: z.string(),
  websiteName: z.string(),
  websiteUrl: z.string(),
});

export const queryApiSchema = z.object({
  queryText: z.string(),
  apiKey: z.string(),
});

export const generateApiSchema = z.object({
  url: z.string(),
});

export type User = {
  id: string;
  email: string;
  username: string;
};

export type TokenPayload = {
  id: string;
  email: string;
  username: string;
};

export type ResponseData = {
  message: string;
  payload: any;
};

export type SaveApiPaylod = {
  userId: string;
  websiteName: string;
  websiteUrl: string;
};
