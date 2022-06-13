import NextImage from 'next/image'

const customLoader = ({ src }) => {
  return src
}

const env = process.env.NODE_ENV
const loaderProps = env === 'development' ? { loader: customLoader } : {}

export default function Image(props) {
  return <NextImage {...props} {...loaderProps} />
}
