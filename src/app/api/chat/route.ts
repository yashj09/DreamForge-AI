// import { openai } from '@ai-sdk/openai';
// import { streamText } from 'ai';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const result = streamText({
//     model: openai('gpt-4o'),
//     messages,
//   });

//   return result.toDataStreamResponse();
// }

import { NextRequest, NextResponse } from "next/server";
import { vertex } from "@ai-sdk/google-vertex";
import { experimental_generateImage as generateImage } from "ai";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json(); // Get prompt from request body

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const { image } = await generateImage({
      model: vertex.image("imagen-3.0-generate-001"),
      prompt,
      aspectRatio: "16:9",
    });

    return NextResponse.json({ image: image.base64 }); // Return image URL
  } catch (error) {
    console.error("Image generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
