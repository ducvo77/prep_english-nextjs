// https://www.youtube.com/watch?v=I14_HrJktIs
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

interface ResponseData {
  result: string | undefined;
}

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    describe: string;
    part: string;
    level: string;
  };
}

interface ErrorType {
  error: {
    message: string;
  };
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData | ErrorType>
) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured",
      },
    });
    return;
  }

  const { describe, part, level } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(describe, part, level),
      temperature: 0.6,
      max_tokens: 2048,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    const response = completion.data.choices[0].text?.trim();
    res.status(200).json({ result: response });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(describe: string, part: string, level: string) {
  return `You are a teacher preparing for the IELTS Speaking test for your students. Help your students practice by giving the following required IELT format:
  1. Subject: ${describe}
  2. Part in IELTS test: ${part}
  3. Easy difficulty level: ${level}
  4. Suggestions for the above question
  5. Sample answers you can refer to
  `;
}
