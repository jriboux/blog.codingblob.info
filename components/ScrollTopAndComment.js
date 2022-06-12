import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) setShow(true)
      else setShow(false)
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment').scrollIntoView()
  }
  return (
    <div
      className={`fixed right-8 bottom-8 hidden flex-col gap-3 ${show ? 'md:flex' : 'md:hidden'}`}
    >
      {siteMetadata.comment.provider && (
        <button
          aria-label="Scroll To Comment"
          type="button"
          onClick={handleScrollToComment}
          className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M18 10c0 3.9-3.6 7-8 7a8.8 8.8 0 0 1-4-1l-4 1 1.3-3.1A6.4 6.4 0 0 1 2 10c0-3.9 3.6-7 8-7s8 3.1 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
          </svg>
        </button>
      )}
      <button
        aria-label="Scroll To Top"
        type="button"
        onClick={handleScrollTop}
        className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3.3 9.7a1 1 0 0 1 0-1.4l6-6a1 1 0 0 1 1.4 0l6 6a1 1 0 0 1-1.4 1.4L11 5.4V17a1 1 0 1 1-2 0V5.4L4.7 9.7a1 1 0 0 1-1.4 0z" />
        </svg>
      </button>
    </div>
  )
}

export default ScrollTopAndComment
