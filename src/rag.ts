import { getEmbedding } from "./embed";
import readlineSync from "readline-sync";
import { generateText } from "./generate";
import { QdrantClient } from "@qdrant/js-client-rest";

function buildPrompt(context: string, question: string): string {
  return `You are a helpful assistant for Proentegre. 
Use the given context to answer the question as accurately as possible. 
If the context does not contain the answer, simply say you don't know. 
Keep the answer short, clear, and direct. Do not mention the context.
Reply only in Turkish.

Context:
${context}

Question:
${question}

Answer:`;
}

const client = new QdrantClient({ host: "localhost", port: 6333 });

const main = async () => {
  while (true) {
    const question = readlineSync.question(
      "\nsorunuzu yazin (çikmak için q): "
    );

    if (question.toLowerCase() === "q") {
      break;
    }

    const questionEmbedding = await getEmbedding(question);

    let topChunk = await client.query("test_collection", {
      query: questionEmbedding,
      limit: 1,
      with_payload: true,
    });

    if (!topChunk.points[0]?.payload?.text) {
      throw new Error("No matching content found");
    }

    const prompt = buildPrompt(
      topChunk.points[0].payload.text as string,
      question
    );

    const response = await generateText(prompt);

    console.log(
      "en alakali context: ",
      topChunk.points[0].payload.text,
      topChunk.points[0].score
    );
    console.log("\n");
    console.log(response);
  }
};

main();
