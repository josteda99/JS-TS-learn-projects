import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from "openai";
import type { FromLanguage, Language } from "../types";
import { SUPPORTED_LANGUAGES } from "../constants";

//dont publish this

const apiKey = import.meta.env.VITE_OPENAAI_API_KEY;

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

export async function translate({ fromLanguage, toLanguage, text }: { fromLanguage: FromLanguage; toLanguage: Language; text: string }) {
  if (fromLanguage === toLanguage) return text;
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content:
        "You are a Ai that traslate text, you recieve a text from the user, do not answer, jus translate the text. The original language is surronded by `{{` and `}}`. you can also recive  {{auto}} witch means that you have to detect the language. The language you translate to is surronded by `[[` and `]]`",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: "Hola mundo {{Español}} [[English]]",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: "Hello world",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: "how are you? {{auto}} [[Deutsch]",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: "Wie geht es dir?",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: "Bon dia, com estasa? {{auto}} [[Español]",
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: "Buenos dias, ¿cómo estás?",
    },
  ];

  const fromCode = fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const completion = await openai.createChaatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`,
      },
    ],
  });

  return completion.data.choices[0]?.message?.content;
}
