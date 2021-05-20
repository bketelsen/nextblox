import { getConfig, getSourceConfig } from "./get-config"

import { GetStaticPropsContext } from "next"
import { promises as fs } from "fs"
import path from "path"
import { serialize } from 'next-mdx-remote/serialize'

export async function getNode(
  sourceName,
  id
) {
  const nodes = await getAllNodes(sourceName)
  const node = nodes.find((n) => {
    return n["id"] === id
  });
  return node;
}

export async function getAllNodes(
    sourceName
  ) {
    const { sortBy, sortOrder } = await getSourceConfig(sourceName)
    const config = await getConfig()
    const dataPath =  config["data"]
    const data = await getData(dataPath)
    const records = data[sourceName]
    if (!records.length) return []
  

  
    const adjust = sortOrder === "desc" ? -1 : 1
    return records.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return -1 * adjust
      }
      if (a[sortBy] > b[sortBy]) {
        return 1 * adjust
      }
      return 0
    })
    
  }

  export async function getData(dataPath){
    const dataFile = path.resolve(`${process.cwd()}/${dataPath}`)
  
    try {
      // TODO: Figure out dynamic import.
      // Switch to next-mdx.config.js?
      const json = await fs.readFile(dataFile, "utf-8")
      return JSON.parse(json)
    } catch (error) {
      console.error(error)
    }
  }

  export async function getMdxNode(
    sourceName,
    context,
    params
  ) {
    if (!context || (typeof context !== "string" && !context.params.id)) {
      new Error(`id params missing from context`)
    }
    const node = await getNode(sourceName, context.params.id)
    if (!node) return null
  
    return {
      ...node,
      mdx: await renderNodeMdx(node, params),
    }
  }

  async function renderNodeMdx(node, params) {
    return await serialize(node.body, {
      ...params,
      scope: {
        ...params?.scope,
        ...node,
      },
    })
  }
  