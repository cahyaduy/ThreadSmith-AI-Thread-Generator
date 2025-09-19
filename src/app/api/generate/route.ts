import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { topic, tone, length } = await req.json();

    // Konversi string length ke angka
    const lengthMap: Record<string, number> = {
      short: 3,
      medium: 5,
      long: 7,
    };
    const numPosts = lengthMap[length] || 5;

    const prompt = `Write a Twitter/X thread about "${topic}" with a ${tone} tone, consisting of ${numPosts} posts.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    console.log("Full completion object:", JSON.stringify(completion, null, 2));

    const text = completion.choices[0].message?.content || "No result";
    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to generate thread" }, { status: 500 });
  }
}
