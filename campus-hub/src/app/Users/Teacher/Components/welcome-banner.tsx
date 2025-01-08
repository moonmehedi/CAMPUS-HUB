import Image from 'next/image'

export function WelcomeBanner() {
  return (
    <div className="mx-auto max-w-6xl">
      <div 
        className="relative overflow-hidden rounded-lg p-8 text-white flex items-center"
        style={{
          background: 'linear-gradient(180deg, #003B73 0%, #006FD9 100%)'
        }}
      >
        <div className="relative z-10 flex-1">
          <h1 className="text-3xl font-bold">Welcome Back, Abid Hossain</h1>
        </div>

        {/* Image Section */}
        <div className="relative h-30 w-30 flex-shrink-0 ml-4">
          <Image
            src="/Teacher-bg.svg" // Correct path to the image in the public folder
            alt="Teacher background"
            layout="fill"
            objectFit="contain"
            className="opacity-70"
          />
        </div>
      </div>
    </div>
  )
}
