import { getAllNodes } from "./get-nodes"

export async function getMdxPathsRaw(sourceName) {
  const nodes = await getAllNodes(sourceName)

  if (!nodes.length) return []

  return await Promise.all(
    nodes.map(async (node) => {
      return {
        ...node,
        params: {
          id: node.id,
        },
      }
    })
  )
}

export async function getMdxPaths(
  sourceName
) {
  const paths = await getMdxPathsRaw(sourceName)
  return paths.map(({ params }) => ({ params }))
}
