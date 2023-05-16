type Props = {}

export default function Deck({}: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Deck Name</h3>
      <p className="text-gray-600">Number of Cards: 60</p>
      <a href="#" className="text-blue-500 hover:underline mt-2">View Details</a>
    </div>
  )
}