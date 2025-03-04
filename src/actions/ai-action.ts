"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export default async function generateAiCaption(image: string, title: string) {
  const chatSession = model.startChat({
    generationConfig,
  });

  const prompt = `
Generate a meme caption based on an input image and a meme title.

input:

{
image: ${image}
title: ${title}
}

Output Format:

{ caption: 'string' }

Instructions:

- The caption must humorously align with the meme title.
- Keep the caption concise and witty.
- Do not include any additional context or commentary.

`;

  const result = await chatSession.sendMessage(prompt);
  const caption = result.response.text();
  const cleanedCaption = JSON.parse(
    caption.replace(/```(?:json)?\n?/g, "").trim()
  );
  return cleanedCaption.caption;
}
