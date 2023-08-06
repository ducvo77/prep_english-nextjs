import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

interface ResponseData {
  result: string | undefined;
}

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    topic: string;
    data: string;
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

  const { topic, data } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(topic, data),
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

function generatePrompt(topic: string, data: string) {
  return `Please help me correct this article errors such as spelling, grammar, wording, ... fix all errors to make this IELT article the most complete, based on the topic and article information I provide below:
  - Topic: ${topic}
  - My article: ${data}
  `;
}
