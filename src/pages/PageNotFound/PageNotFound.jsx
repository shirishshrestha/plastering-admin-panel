import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col w-full h-[100vh] justify-center items-center space-y-4 text-center animate-fadeIn">
      <h1 className="text-4xl font-semibold text-gray-800 mb-4 animate-bounce">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-600">
        It seems like the page you're looking for doesn’t exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 text-white bg-primary rounded-lg hover:bg-teal-600 transition-all duration-200 flex items-center gap-2"
      >
        Go to Home
      </button>
    </section>
  );
}
