export default function PageLoading() {
    return (
      <div className="bg-white p-6 mx-auto my-auto max-w-xl  text-black  h-screen">
        <div className="mx-auto my-auto ">
          <div className="flex items-center justify-center align-middle h-screen">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  