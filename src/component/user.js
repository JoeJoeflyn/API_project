import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function User() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState();
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [pagin, setPagin] = useState(1);
  const [input, setInput] = useState({ title: "", post: "" });
  const [showModal, setShowModal] = useState(false);
  // get users api
  useEffect(() => {
    setLoading(true);
    fetch(`https://6315b28e33e540a6d3823a08.mockapi.io/blogs?p=${pagin}&l=5`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        return <h1>{err}</h1>;
      });
  }, [pagin]);
  // UI effect when a post have been deleted
  useEffect(() => {
    setLoading(true);
    fetch(`https://6315b28e33e540a6d3823a08.mockapi.io/blogs?p=${pagin}&l=5`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        return <h1>{err}</h1>;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleted]);

  //
  const backToList = async () => {
    fetch(`https://6315b28e33e540a6d3823a08.mockapi.io/blogs?p=1&l=5`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        setSearch("");
      })
      .catch((err) => {
        return <h1>{err}</h1>;
      });
  };

  // delete features
  const handleDelete = async (id) => {
    fetch(`https://6315b28e33e540a6d3823a08.mockapi.io/blogs/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const deletedPosts = data.filter((post) => post.id !== id);
        setData(deletedPosts);
        setDeleted(true);
        setDeleted(false);
      })
      .catch((err) => {
        return <h1>{err}</h1>;
      });
  };

  // Add features
  const handleSubmit = async () => {
    fetch(`https://6315b28e33e540a6d3823a08.mockapi.io/blogs`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: input.title,
        post: input.post,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((newData) => {
        setData([...data, newData]);
        setInput({ title: "", post: "" });
      })
      .catch((err) => {
        return <h1>{err}</h1>;
      });
  };
  // Edit features
  const hanldeEdit = async (id) => {
    fetch(`https://6315b28e33e540a6d3823a08.mockapi.io/blogs/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: input.title,
        post: input.post,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        setData(
          data.map((sgData) => {
            if (sgData.id === id) {
              return {
                ...sgData,
                post: input.post,
                title: input.title,
              };
            }
            return sgData;
          })
        );
        setInput({ title: "", post: "" });
        setEdit();
      })
      .catch((err) => {
        return <h1>{err}</h1>;
      });
  };

  const searchFunc = async (title) => {
    fetch(`https://6315b28e33e540a6d3823a08.mockapi.io/blogs?search=${title}`)
      .then((response) => {
        return response.json();
      })
      .then((dataSearch) => {
        setData(dataSearch);
      })
      .catch((err) => {
        return <h1>{err}</h1>;
      });
  };

  useEffect(() => {
    fetch(
      `https://6315b28e33e540a6d3823a08.mockapi.io/blogs?sortBy=createdAt${
        select === "Order by" ? "" : "&order=desc"
      }`
    )
      .then((response) => {
        return response.json();
      })
      .then((dataOrdered) => {
        setData(dataOrdered);
      })
      .catch((err) => {
        return <h1>{err}</h1>;
      });
  }, [select]);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false);
                      setInput({ title: "", post: "" });
                      setEdit();
                    }}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="my-4 text-slate-500 text-lg leading-relaxed">
                    <div>
                      <label
                        htmlFor="small-input"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Post title
                      </label>
                      <input
                        value={input.title}
                        onChange={(e) =>
                          setInput({ ...input, title: e.target.value })
                        }
                        placeholder="Welcome to the jungle, my juicer...etc"
                        type="text"
                        id="small-input"
                        className="block w-full p-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Post
                      </label>
                      <textarea
                        value={input.post}
                        onChange={(e) =>
                          setInput({ ...input, post: e.target.value })
                        }
                        id="message"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Put down your post, big drama, big react, mega drama"
                      ></textarea>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setInput({ title: "", post: "" });
                      setEdit();
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      edit ? hanldeEdit(edit) : handleSubmit();
                      setShowModal(false);
                    }}
                  >
                    {edit ? "update" : "add post"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {!loading ? (
        <div className="m-auto w-3/4 mt-8">
          <div className="mb-3 flex justify-between pt-0">
            {search ? (
              <button onClick={backToList} className="hover:opacity-60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            ) : (
              ""
            )}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Soy"
              className="px-3 py-3 w-4/5 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none"
            />
            <button
              onClick={() => {
                searchFunc(search);
              }}
              className="bg-slate-800 text-white font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg hover:bg-slate-900 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
            >
              search
            </button>
            <button
              className="bg-slate-800 text-white font-bold uppercase text-sm px-6 py-3 rounded-3xl shadow hover:shadow-lg hover:bg-slate-900 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(true)}
            >
              Add post
            </button>
          </div>
          <div className="relative ml-auto w-full lg:max-w-sm">
            <select
              value={select}
              onChange={(e) => setSelect(e.target.value)}
              className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
            >
              <option>Order by</option>
              <option>Time</option>
            </select>
          </div>
          {data.map((sgData) => {
            return (
              <div
                key={sgData.id}
                className=" lg:max-w-full lg:flex border-b-2"
              >
                <div className="p-4 flex flex-col w-full leading-normal">
                  <div className="ml-auto">
                    <button
                      onClick={() => {
                        setEdit(sgData.id);
                        setInput({ title: sgData.title, post: sgData.post });
                        setShowModal(true);
                      }}
                      className="hover:opacity-60"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                      </svg>
                    </button>
                    <button
                      className="ml-2 hover:opacity-60"
                      onClick={() => handleDelete(sgData.id)}
                    >
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
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <Link to={`user/${sgData.id}`}>
                    <div className="hover:bg-slate-50">
                      <div className="flex items-center mb-4">
                        <img
                          className="w-10 h-10 rounded-full mr-4"
                          src={sgData.avatar}
                          alt={sgData.name}
                        />
                        <div className="text-sm">
                          <p className="text-gray-900 leading-none">
                            {sgData.name}
                          </p>
                          <p className="text-gray-600">
                            {formatDistanceToNow(new Date(sgData.createdAt))}{" "}
                            ago
                          </p>
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="text-gray-900 font-bold text-xl mb-2">
                          {sgData.title}
                        </div>
                        <p className="text-gray-700 text-base">{sgData.post}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-sm text-gray-600 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            />
                          </svg>
                          {sgData.city}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-center my-6">
            <button
              onClick={() => setPagin((init) => init - 1)}
              disabled={pagin === 1}
              className="inline-flex items-center py-2 px-4 mr-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="mr-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Previous
            </button>
            <button
              onClick={() => setPagin((init) => init + 1)}
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
              <svg
                aria-hidden="true"
                className="ml-2 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="ml-24" role="status">
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
