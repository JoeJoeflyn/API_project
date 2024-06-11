import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function UserDetail() {
  let { userId } = useParams();

  const [sgData, setSgData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://6315b28e33e540a6d3823a08.mockapi.io/blogs/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setSgData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return (
    <>
      {!loading ? (
        <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-40">
          <div className="px-6">
            <Link to={"/"} className="hover:text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                />
              </svg>
            </Link>
            <div className="flex flex-wrap justify-center">
              <div className="w-full flex justify-center">
                <div className="relative">
                  <img
                    src={sgData.avatar}
                    alt={sgData.name}
                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                  />
                </div>
              </div>
              <div className="w-full text-center mt-20">
                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                  <div className="p-3 flex">
                    <span className="text-sm text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-bold block uppercase tracking-wide text-slate-700">
                      {sgData.phone}
                    </span>
                  </div>
                  <div className="p-3 flex">
                    <span className="text-sm text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-bold block uppercase tracking-wide text-slate-700">
                      {sgData.job}
                    </span>
                  </div>
                  <div className="p-3 flex">
                    <span className="text-sm text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-bold block uppercase tracking-wide text-slate-700">
                      {sgData.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-2">
              <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
                {sgData.name}
              </h3>
              <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                {sgData.city}
              </div>
            </div>
            <div className="mt-6 py-6 border-t border-slate-200 text-left">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <p className="text-lg">{sgData.title}</p>
                  <p className="font-light leading-relaxed text-slate-600 mt-2 mb-4">
                    {sgData.post}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ml-24 mt-6" role="status">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
}
