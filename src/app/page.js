import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <>
    <div className="w-full h-[300vh] flex relative mainCont max-sm:hidden">
      <HeroSection />
    </div>
    <div className="w-full h-screen flex justify-center text-[18px] leading-[18px] items-center text-[#91531d] px-[7vw]">
      <p>Open this link on a PC/Laptop for a better experience.</p>
    </div>
    </>
  );
}
