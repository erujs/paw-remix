import { Canine, Feline } from "~/components/svg";
import { PawPrint } from "lucide-react";

export function Welcome() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-canine to-feline">
      <div className="container space-y-8">
        <div className="space-y-4 px-4">
          <div className="flex items-center justify-center gap-2 text-center">
            <PawPrint className="h-13 w-13 text-white transform scale-x-[-1]" />
            <h1 className="text-5xl font-bold text-white font-sans">
              Paw
            </h1>
            <img
              src="/remix.svg"
              alt="Remix"
              className="h-[2.25rem] w-auto object-contain"
            />
          </div>
          <p className="text-lg text-white text-center">
            Explore a curated catalog of cats and dogs.
            Built with Remix conventions. <br />
            Select a category below to begin exploring.
          </p>
        </div>
        <div className="flex justify-center">
          <Feline />
          <Canine />
        </div>
      </div>
    </main>
  );
}
