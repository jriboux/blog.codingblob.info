import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import Image from '@/components/Image'

const FeaturedImage = ({ featuredImage, title, link, className = '', ...rest }) => {
  const image = (
    <Image
      alt={title}
      src={`/static${featuredImage}`}
      className={`w-full scale-90 object-contain object-center drop-shadow-[5px_10px_15px_rgba(0,0,0,0.5)] ${className}`}
      {...rest}
    />
  )

  return (
    <div className="relative overflow-hidden rounded-t-md bg-center">
      <span className="absolute inset-0 block rounded-t-md">
        <Image
          alt=""
          src={`/static${featuredImage}`}
          className="scale-[3] object-contain object-center"
          {...rest}
        />
      </span>
      <div className="backdrop-blur-3xl">
        {link && <Link href={link}>{image}</Link>}
        {!link && image}
      </div>
    </div>
  )
}

export default FeaturedImage
