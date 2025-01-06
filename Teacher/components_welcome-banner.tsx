export function WelcomeBanner() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded-lg bg-[#2B4B8C] p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold">Welcome Back, Abid Hossain</h1>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3">
          <div 
            className="h-full w-full bg-[url('/placeholder.svg')] bg-contain bg-right bg-no-repeat opacity-50 welcome-illustration" 
          />
        </div>
      </div>
    </div>
  )
}

