const Auth = () => {
  return (
    <div className="relative min-h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-top bg-cover">
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.9) 3%, rgba(0,0,0,0.6) 18%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.70) 52%, rgba(0,0,0,0.75) 72%, rgba(0,0,0,0.95) 100%)",
        }}
      />
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-10 lg:px-37 py-6 max-w-[1600px] mx-auto flex justify-between items-center">
        <img src="/images/logo.png" alt="Logo" className="h-10" />
      </nav>
      <main className="relative z-20 flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-md bg-black/55 rounded-md p-15 text-white shadow-lg">
          <h1 className="text-3xl font-semibold mb-6">Sign In</h1>

          <form className="space-y-3"> 
            <label className="block">
              <input
                type="email"
                required
                className="mt-3 w-full px-4 py-4 rounded border border-[#808080] bg-transparent text-white placeholder-[#b9b9b9] focus:outline-none focus:border-white"
                placeholder="Your email or phone number"
              />
            </label>

            <label className="block">
              <input
                type="password"
                required
                className="mt-1 w-full px-4 py-4 rounded border border-[#808080] bg-transparent text-white placeholder-[#b9b9b9] focus:outline-none focus:border-white"
                placeholder="Password"
              />
            </label>

             <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md mt-2 font-medium"
            >
              Sign In
            </button>

            <div className="flex flex-col gap-5 mt-2">
              <div className="flex justify-center">
                <a
                  className="underline text-gray-300 text-sm transition-colors duration-150 hover:text-gray-400"
                  href="#"
                  style={{ textUnderlineOffset: '3px' }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex justify-start">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input type="checkbox" className="w-4 h-4 rounded bg-[#333] accent-red-600" />
                  Remember me
                </label>
              </div>
            </div>

           
          </form>

          <div className="mt-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center">
                <span className="text-gray-400 text-sm">New to Netflix?</span>
                <a
                  className="ml-1 text-white font-extrabold text-sm transition-all duration-150 hover:underline"
                  href="#"
                  style={{ textUnderlineOffset: '3px' }}
                >
                  Sign up now.
                </a>
              </div>
              <div className="mt-5 text-xs text-left text-gray-400">
                This page is protected by Google reCAPTCHA to ensure you are not a bot.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;


