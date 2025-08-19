import { QdrantClient } from "@qdrant/js-client-rest";
import { getEmbedding } from "./embed";
import { chunks } from "./chunks";

const client = new QdrantClient({ host: "localhost", port: 6333 });

export async function train(chunks: { id: string; text: string }[]) {
  try {
    const chunkEmbeddings = await Promise.all(
      chunks.map(async (chunk) => ({
        id: Number(chunk.id),
        payload: { text: chunk.text },
        vector: await getEmbedding(chunk.text),
      }))
    );

    const operationInfo = await client.upsert("test_collection", {
      wait: true,
      points: chunkEmbeddings,
    });
    console.log("Training completed successfully:", operationInfo);
  } catch (error) {
    console.error("Error during training:", error);
  }
}

train(chunks);
