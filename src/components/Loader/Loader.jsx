import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Loader = () => {
  return (
    <div className="h-full w-full bg-primary fixed z-10 top-0 left-0 flex items-center justify-center">
      <DotLottieReact
        autoplay
        loop
        src="https://lottie.host/60536e0b-45dc-4920-b2cc-712007c38ee2/k56mKpn4dv.lottie"
        style={{ height: "300px", width: "300px" }}
      />
    </div>
  );
};