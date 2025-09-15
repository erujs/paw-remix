import { Canine, Feline } from "~/components/svg";
import { PawPrint } from "lucide-react";

export function Welcome() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-canine to-feline">
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-center">
            <PawPrint className="h-12 w-12 text-white" />
            <h1 className="text-4xl font-bold text-white font-sans">
              Paw
            </h1>
            <img
              src="/remix.svg"
              alt="Remix"
              className="h-[1.5rem] w-auto object-contain"
            />
          </div>

          <p className="text-white text-center">
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
