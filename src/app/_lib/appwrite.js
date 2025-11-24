"use client";
import { Client } from "appwrite";

export const appwrite = new Client();

appwrite
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
