import { pipeline } from "@xenova/transformers";

export const getEmbedding = async (text: string) => {
  try {
    const embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-mpnet-base-v2"
    );

    const output = await embedder(text, { pooling: "mean", normalize: true });
    const embedding = Array.from(output.data);

    const paddedEmbedding = new Array(1536).fill(0);
    for (let i = 0; i < Math.min(embedding.length, 1536); i++) {
      paddedEmbedding[i] = embedding[i];
    }

    return paddedEmbedding;
  } catch (error) {
    console.error("Embedding generation failed:", error);
    throw new Error("Failed to generate embedding");
  }
};
