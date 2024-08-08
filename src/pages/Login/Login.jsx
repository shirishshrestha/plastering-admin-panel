import { loginBg, logo } from "../../assets/images";

const Login = () => {
  return (
    <section class="bg-[#f1f1e6] h-full w-full">
      <div class="main_container mx-auto">
        <div class="flex justify-center items-center h-screen">
          <div class="w-[70%] h-[70%] grid grid-cols-[0.8fr,1fr] rounded-2xl overflow-hidden shadow-xl bg-white">
            <div class="w-full">
              <figure class="relative h-full">
                <div class="w-full h-full px-[2rem] flex items-center justify-center absolute top-0 left-0 bg-[#182C3A]/70">
                  <figure class="flex flex-col items-center gap-[0.5rem]">
                    <img src={logo} alt="logo" class="h-[50px]" />
                    <figcaption>
                      <h2 class="text-[1.4rem] text-[#f1f1e6] font-bold text-center leading-[150%]">
                        Plastering Estimates & Insights
                      </h2>
                      <p class="font-[500] text-[#f1f1e6] text-center text-[14px] mt-2 leading-[150%]">
                        Our expertise lies in wall and ceiling lining, and we
                        offer thorough plastering estimates for both residential
                        and commercial projects.
                      </p>
                    </figcaption>
                  </figure>
                </div>
                <img src={loginBg} alt="" class="h-full object-cover" />
              </figure>
            </div>
            <div class="flex flex-col w-full justify-center items-center flex-shrink-0">
              <div class="mb-[1rem] flex flex-col items-center gap-[0.3rem]">
                <h2 class="text-[1rem] text-[#71a8c4] font-semibold text-center leading-[150%]">
                  Welcome To
                </h2>
                <h1 class="text-[1.6rem] text-[#182C3A] font-bold text-center leading-[150%]">
                  Plastering Estimates & Insights
                </h1>
                <p class="font-[500] text-[12px] w-[75%] text-center leading-[150%]">
                  Log in to seamlessly track & analyze every aspect of your
                  activities for enhanced eroductivity and ensight
                </p>
              </div>
              <form onsubmit="formHandler(event)" class="w-[70%]">
                <div class="mb-4">
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                  >
                    Username
                  </label>
                  <div class="border px-2 py-2 border-gray-300 shadow-sm rounded-md focus-within:ring-indigo-500 transition-all duration-75 ease-in-out focus-within:border-indigo-500 flex gap-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#71a8c4"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>

                    <input
                      type="text"
                      name="username"
                      id="username"
                      autocomplete="off"
                      class="block w-full rounded-md focus:outline-none"
                    />
                  </div>
                </div>
                <div class="mb-6">
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                  >
                    Password
                  </label>
                  <div class="border px-2 py-2 border-gray-300 shadow-sm rounded-md focus-within:ring-indigo-500 transition-all duration-75 ease-in-out focus-within:border-indigo-500 flex gap-3 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#71a8c4"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>

                    <input
                      type="password"
                      name="password"
                      autocomplete="off"
                      id="password"
                      class="block w-full rounded-md focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type=" button"
                  class="w-full bg-[#182C3A] hover:bg-[#182C3A]/90 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all ease-in-out duration-200"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
