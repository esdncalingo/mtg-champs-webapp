function Navbar() {

  let token: any = sessionStorage.getItem('token')
  
  return (
    <div className="bg-gray-800">
      <div className=" max-w-full px-4 sm:px-6 lg:px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-white text-xl font-bold">MTG-Champs</a>
          </div>

          <div className="flex items-center">
            {token ? <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Tournaments</a> : ''}
            {token ? <a href="/dashboard/mydecks" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Dashboard</a> : ''}
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">About</a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">Contact</a>
            <a href={token ? "/" : "/Signin"} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md">{token ? 'Account' :'Login'}</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
