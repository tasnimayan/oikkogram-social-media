// /app/api/post-assistant/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const token = process.env.GITHUB_AI_API_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const openai = new OpenAI({ baseURL: endpoint, apiKey: token });

export async function POST(req: NextRequest) {
  const { text, promptType, tone } = await req.json();

  let prompt = "";
  const toneText = tone ? `Use a ${tone} tone.` : "";

  switch (promptType) {
    case "generate":
      prompt = `You are a creative social media assistant. Based on the idea: "${text}", write a compelling social media post caption. ${toneText}`;
      break;

    case "improve":
      prompt = `You are a social media expert. Improve the following caption to make it more engaging and well-written. ${toneText}\n\nOriginal caption: "${text}"`;
      break;

    case "hashtags":
      prompt = `Generate a list of relevant, popular, and creative hashtags based on the following post: "${text}". ${toneText} Only return the hashtags, separated by spaces.`;
      break;

    case "summarize":
      prompt = `Summarize the following social media post into one clear sentence. ${toneText}\n\nPost: "${text}"`;
      break;

    default:
      prompt = text;
  }

  try {
    // const response = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: prompt }],
    //   temperature: 1,
    //   top_p: 1,
    //   model: model,
    // });
    // const aiText = response.choices[0].message.content;

    // console.log(response);
    // return NextResponse.json({ result: aiText });
    console.log(prompt);
    return NextResponse.json({ result: prompt });
  } catch (err) {
    console.error("The sample encountered an error:", err);
    return NextResponse.json({ error: "Something went wrong" });
  }
}

export async function main() {}
