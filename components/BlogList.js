import { formatDate } from "@/utils/helpers";

  
  export default function BlogList({title,posts}) {
    return (
      <div className="px-4 pt-16 pb-20 bg-white sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
              <p className="text-xl text-gray-500">Get weekly articles in your inbox on how to grow your business.</p>
              <form className="flex flex-col mt-6 sm:flex-row lg:mt-0 lg:justify-end">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email-address"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 lg:max-w-xs"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-shrink-0 w-full mt-2 rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
                  <button
                    type="button"
                    className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:inline-flex"
                  >
                    Notify me
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="grid gap-16 pt-10 mt-6 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {posts.map((post) => (
              <div key={post.title}>
                <p className="text-sm text-gray-500">
                  <time dateTime={post.publish_date}>{formatDate(post.publish_date)}</time>
                </p>
                <a href="#" className="block mt-2">
                  <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                  <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                </a>
                <div className="mt-3">
                  <a href={`/posts/${post.id}`} className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                    Read full story
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  