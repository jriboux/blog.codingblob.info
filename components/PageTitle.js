export default function PageTitle({ className = '', children }) {
  return (
    <h1
      className={`text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 ${className}`}
    >
      <span className="inline-block bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-500">
        {children}
      </span>
    </h1>
  )
}
