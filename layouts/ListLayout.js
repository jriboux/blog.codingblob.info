import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import Card from '@/components/Card'
import Image from '@/components/Image'
import PostPage from '../pages/blog/page/[page]'
import PageTitle from '@/components/PageTitle'

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  searchbar = true,
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts
  const getDisplayPosts = (displayPosts) => {
    let content = []
    for (let idx in displayPosts) {
      const frontMatter = displayPosts[idx]
      const { slug, date, title, summary, tags, featured_image } = frontMatter
      content.push(
        <li
          key={slug}
          className="rounded-md shadow-2xl shadow-neutral-500/40 dark:shadow-secondary-500/40"
        >
          <article className="flex h-full w-full flex-col items-stretch">
            <figure className="relative flex-grow">
              {featured_image && (
                <div
                  className="rounded-t-md bg-center"
                  style={{
                    backgroundImage: `url(/static${featured_image})`,
                    backgroundSize: '150%',
                  }}
                >
                  <div className="rounded-t-md backdrop-blur-3xl">
                    <Link href={`/blog/${slug}`}>
                      <Image
                        alt={title}
                        src={`/static${featured_image}`}
                        className="w-full object-contain object-center drop-shadow-[5px_10px_15px_rgba(0,0,0,0.5)]"
                        width={544}
                        height={306}
                        layout="responsive"
                      />
                    </Link>
                  </div>
                </div>
              )}
              <dl className="px-4 py-2">
                <dt className="sr-only">Publié le</dt>
                <dd className="text-base font-medium text-secondary-500 dark:text-secondary-400">
                  <time dateTime={date} className="text-xs">
                    {formatDate(date)}
                  </time>
                </dd>
              </dl>
              <figcaption className="px-4 pb-4 text-lg font-semibold">
                <h3 className="pb-2">
                  <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                    {title}
                  </Link>
                </h3>
                {summary && (
                  <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {summary}
                  </div>
                )}
              </figcaption>
            </figure>
            <div className="flex flex-wrap gap-x-2 gap-y-1 px-4 pb-4">
              {tags.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </div>
          </article>
        </li>
      )
    }
    return content
  }

  return (
    <>
      <div className="divide-y divide-neutral-500/30">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <PageTitle>{title}</PageTitle>
          {searchbar && (
            <div className="relative max-w-lg">
              <input
                aria-label="Trouver un article"
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Trouver un article..."
                className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}
        </div>

        <ul className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2 xl:grid-cols-3">
          {!filteredBlogPosts.length && 'Aucun article trouvé.'}
          {getDisplayPosts(displayPosts)}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
