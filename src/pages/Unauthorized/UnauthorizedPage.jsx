import { useNavigate } from "react-router-dom";
import { unauthorized } from "../../assets/videos";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col w-full h-[100vh] justify-center items-center space-y-2 text-center animate-fadeIn">
      <video muted autoPlay className="h-[400px]">
        <source src={unauthorized} type="video/mp4" />
      </video>
      <h1 className="text-4xl font-semibold text-gray-800 mb-1">
        Access Denied !
      </h1>
      <p className="text-lg text-gray-600 max-w-[800px]">
        Sorry, you don&apos;t have permission to access this page. Please
        contact your administrator if you believe this is an error.
      </p>
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 text-white bg-primary rounded-lg hover:bg-teal-600 transition-all duration-200 flex items-center gap-2"
        >
          Return to Home
        </button>
      </div>
    </section>
  );
}
