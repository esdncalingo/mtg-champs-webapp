import sampleImageOne from '../assets/MOTM.webp'
import sampleImageTwo from '../assets/MOTM02.webp'
import sampleImageHead from '../assets/LOTR-stretch.avif'
import sampleImageHeadOverlay from '../assets/LTR_-_Universes_Beyond_EN.webp'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 w-full text-gray-800">
      {/*Sample Head Cover */}
      <div className=' mb-4'>
        <img className='absolute top-0 bottom-0 m-auto' src={sampleImageHeadOverlay} alt="" />
        <img src={sampleImageHead} alt="" />
      </div>
      <div className='flex gap-4'>
        <div className='grid grid-cols-2'>
          {/* Sample Article */}
          <div className='flex flex-col shadow-md drop-shadow-lg p-1'>
            <span className='text-2xl text-gray-200 font-semibold mb-4 p-1 bg-gray-700'>March of Machine</span>
            <div className='flex gap-2 mb-2'>
              <div className='md:max-w-md lg:max-w-2xl'>
                <img src={sampleImageOne} alt="" />
              </div>
            </div>
            <div className='p-2'>
              <p> The newest Magic: The Gathering set, March of the Machine, </p>
              <p> is a 281-card set already making waves in both tabletop play and MTG Arena. </p>
              <p> In the conclusion to the four-set Phyrexian story arc that began with Dominaria United, </p>
              <p> the stakes are bigger than ever for beloved characters as the Phyrexians set their sights </p>
              <p> on domination of the Multiverse. </p>
            </div>
          </div>

          {/* Sample Article 2*/}
          <div className='flex flex-col shadow-md drop-shadow-lg p-1'>
            <span className='text-2xl text-gray-200 font-semibold mb-4 p-1 bg-gray-700'>March of Machine Aftermath</span>
            <div className='flex gap-2 mb-2'>
              <div className='md:max-w-md lg:max-w-2xl'>
                <img src={sampleImageTwo} alt="" />
              </div>
            </div>
            <div className='p-2'>
            <p> Aftermath is a rare fifth premier set in the Standard environment, </p>
            <p> but it is also a "new kind of thing" and "not a normal expansion". </p>
            <p> It is a micro set of 50 cards following up on March of the Machine, </p>
            <p> and will be released both in tabletop and digital.</p>
            </div>
          </div>
        </div>

        <div>
          {/* Top Commanders */}
          <div className='flex flex-col mb-6'>
            <span className='text-2xl mb-4 font-semibold'>Top Commanders</span>
            <div className='bg-gray-700 rounded p-4 text-gray-200'>
              <ol className='list-decimal list-inside'>
                <li>Atraxa, Praetors' Voice</li>
                <li>Tymna the Weaver</li>
                <li>Thalia and The Gitrog Monster</li>
                <li>Narset, Enlightened Exile</li>
                <li>Lathril, Blade of the Elves</li>
                <li>Kenrith, the Returned King</li>
                <li>Thrasios, Triton Hero</li>
                <li>The Ur-Dragon</li>
                <li>Wilhelt, The Rotcleaver</li>
              </ol>
            </div>
          </div>

          {/* Popular Standard Decks */}
          <div className='flex flex-col'>
            <span className='text-2xl mb-4 font-semibold'>Popular Standard Decks</span>
            <div className='bg-gray-700 rounded p-4 text-gray-200'>
              <ol className='list-decimal list-inside'>
                <li>Mono-Red Aggro</li>
                <li>Grixis Control</li>
                <li>Rakdos Midrange</li>
                <li>Golgari Poison</li>
                <li>Dimir Midrange</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}