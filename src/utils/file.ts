import * as path from "path";
import * as fs from "fs/promises";

export async function createFileWithDirectories(
  filePath: string,
  content: string
): Promise<void> {
  const dir = path.dirname(filePath);

  try {
    await fs.mkdir(dir, { recursive: true });

    await fs.writeFile(filePath, content);
  } catch (error) {
    console.error("Erro ao criar arquivo:", error);
  }
}
