function Footer() {

  return (
    <div className=" bg-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <p className="text-gray-600">
            This website is not affiliated with or endorsed by
            <a href="https://magic.wizards.com" className="text-blue-500 hover:underline" 
              target="_blank" 
              rel="noopener noreferrer">{' Magic: The Gathering'}
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
