// /app/api/post-assistant/route.ts
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const token = process.env.GITHUB_AI_API_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

const openai = new OpenAI({ baseURL: endpoint, apiKey: token });

export async function POST(req: NextRequest) {
  const { text, promptType } = await req.json();

  let prompt = "";

  switch (promptType) {
    case "generate":
      prompt = "Create a social media post caption about: " + text;
      break;
    case "improve":
      prompt = "Improve this social media caption: " + text;
      break;
    case "hashtags":
      prompt = "Generate hashtags from this social media caption: " + text;
      break;
    case "funny":
      prompt = "Rewrite this caption in a humorous tone: " + text;
      break;
    case "summarize":
      prompt = "Summarize this post into one sentence: " + text;
      break;
    default:
      prompt = text;
  }

  try {
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      top_p: 1,
      model: model,
    });
    const aiText = response.choices[0].message.content;

    console.log(response);
    return NextResponse.json({ result: aiText });
  } catch (err) {
    console.error("The sample encountered an error:", err);
    return NextResponse.json({ error: "Something went wrong" });
  }
}

export async function main() {}
