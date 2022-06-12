import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text, className = '' }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a
        className={`text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 ${className}`}
      >
        #{text}
      </a>
    </Link>
  )
}

export default Tag
