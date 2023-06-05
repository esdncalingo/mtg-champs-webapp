function Footer() {

  return (
    <div className=" bg-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center text-gray-600">
          <p>
            This website is not affiliated with or endorsed by
            <a href="https://magic.wizards.com" className="text-blue-500 hover:underline" 
              target="_blank" 
              rel="noopener noreferrer">{' Magic: The Gathering'}
            </a>.
          </p>
          <p>Furthermore, the images used on this website are not owned by us. They are sourced from various 
            official MTG sources, including but not limited to Wizards of the Coast. 
            All images are used for informational and illustrative purposes only, 
            and no ownership or copyright is claimed.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
