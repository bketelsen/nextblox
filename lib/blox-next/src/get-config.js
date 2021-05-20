import { promises as fs } from "fs"
import path from "path"

const DEFAULT_CONFIG_PATH = "blox-next.json"

export async function getConfig() {
  const configPath = path.resolve(`${process.cwd()}/${DEFAULT_CONFIG_PATH}`)

  try {
    // TODO: Figure out dynamic import.
    const json = await fs.readFile(configPath, "utf-8")
    return JSON.parse(json)
  } catch (error) {
    console.error(error)
  }
}

export async function getSourceConfig(source) {
  const config = await getConfig()

  if (!config || !config[source]) {
    throw new Error(`Type ${source} does not exist in ${DEFAULT_CONFIG_PATH}`)
  }

  return {
    sortBy: "title",
    sortOrder: "asc",
    ...config[source],
  }
}
