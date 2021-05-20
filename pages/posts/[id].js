import { getMdxNode, getMdxPaths } from '@/lib/blox-next/src/server';

//import Image from "next/image"
//import Link from "next/link"
//import { useHydrate } from "next-mdx/client"
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize'

export default function PostPage({ post,source }) {

  return (
    <div>
      <MDXRemote {...source} />

    </div>
  )
}

export async function getStaticPaths() {
    console.log("static paths")
  return {
    paths: await getMdxPaths("articles"),
    fallback: false,
  }
}

export async function getStaticProps(context) {
    console.log("static props")

  const post = await getMdxNode("articles", context)

  if (!post) {
    return {
      notFound: true,
    }
  }
  console.log(post.body)
  const mdxSource = await serialize(post.body, { scope: post })
  console.log(mdxSource)
  return {
    props: {
      post: post,
      source: mdxSource,

    },
  }
}
