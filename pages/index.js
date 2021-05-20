import BlogList from '@/components/BlogList';
import {getNode,getAllNodes} from '@/lib/blox-next/src/server';

export default function Home({page, posts}) {
  return (
    <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
    <div className="py-6">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Home</h1>
      </div>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">
        <BlogList title="Recent Posts" posts={posts}/>
      </div>
    </div>
  </main>
  )
}

export async function getStaticProps() {
  const page = await getNode("pages","index");  
  const posts = await getAllNodes("articles");  
  return {
    props: {
      page: page,
      posts: posts
    },
  }
}