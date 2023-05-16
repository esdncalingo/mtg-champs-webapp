function Navbar() {
  
  return (
    <div className="bg-gray-800">
      <div className=" max-w-full px-4 sm:px-6 lg:px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white text-xl font-bold">MTG-Champs</a>
          </div>

          <div className="flex items-center">
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">My Deck</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Home</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">About</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Contact</a>
            <a href="/Signin" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Login</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
