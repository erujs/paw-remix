import { Link } from "react-router"
import { Button } from "~/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Loader } from "~/components/svg"
import type { DetailPageProps } from "~/lib/data-types"

export default function DetailPage({
  title,
  basePath,
  data,
  images,
  loading = false,
}: DetailPageProps) {
  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {title.slice(0, -1)} not found
          </h1>
          <Link to={`/${basePath}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {title.toLowerCase()}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${title.toLowerCase() === "cats"
        ? "bg-gradient-to-b from-feline/20 via-feline/40 to-feline/70"
        : title.toLowerCase() === "dogs"
          ? "bg-gradient-to-b from-canine/20 via-canine/40 to-canine/70"
          : "bg-background"
        }`}
    >
      {/* Breadcrumb */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto p-4">
          <div className="flex items-center space-x-1 text-xl">
            <Link to="/" className="text-foreground hover:underline">
              Home
            </Link>
            <span className="text-foreground">/</span>
            <Link to={`/${basePath}`} className="text-foreground hover:underline">
              {title}
            </Link>
            <span className="text-foreground">/</span>
            <span className="text-foreground font-semibold truncate inline-block align-bottom">
              {data.name}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto p-4">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl p-8 mb-8 bg-background/30 backdrop-blur-md border border-white/20 shadow-lg">
            <h1 className="text-4xl font-bold mb-6 text-card-foreground">
              {data.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shared fields */}
              {data.life_span && (
                <div>
                  <h3 className="font-semibold mb-1">Life Span</h3>
                  <p className="text-muted-foreground">{data.life_span}</p>
                </div>
              )}
              {data.temperament && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Temperament</h3>
                  <p className="text-muted-foreground">{data.temperament}</p>
                </div>
              )}
              {data.origin && (
                <div>
                  <h3 className="font-semibold mb-1">Origin</h3>
                  <p className="text-muted-foreground">{data.origin}</p>
                </div>
              )}

              {/* Dog-specific */}
              {data.type === "dog" && (
                <>
                  {data.bred_for && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Bred For</h3>
                      <p className="text-muted-foreground">{data.bred_for}</p>
                    </div>
                  )}
                  {data.breed_group && (
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Breed Group</h3>
                      <p className="text-muted-foreground">{data.breed_group}</p>
                    </div>
                  )}
                  {data.height?.metric && (
                    <div>
                      <h3 className="font-semibold mb-1">Height</h3>
                      <p className="text-muted-foreground">
                        {data.height.metric} cm ({data.height.imperial} in)
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Cat-specific */}
              {data.type === "cat" && (
                <>
                  {data.description && (
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-lg mb-2">Description</h3>
                      <p className="text-muted-foreground">{data.description}</p>
                    </div>
                  )}
                  {data.affection_level && (
                    <div>
                      <h3 className="font-semibold mb-1">Affection Level</h3>
                      <p className="text-muted-foreground">
                        {data.affection_level} / 5
                      </p>
                    </div>
                  )}
                  {data.intelligence && (
                    <div>
                      <h3 className="font-semibold mb-1">Intelligence</h3>
                      <p className="text-muted-foreground">
                        {data.intelligence} / 5
                      </p>
                    </div>
                  )}
                  {data.energy_level && (
                    <div>
                      <h3 className="font-semibold mb-1">Energy Level</h3>
                      <p className="text-muted-foreground">
                        {data.energy_level} / 5
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* Links (cats only, optional) */}
              {data.type === "cat" &&
                (data.wikipedia_url ||
                  data.cfa_url ||
                  data.vetstreet_url ||
                  data.vcahospitals_url) && (
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-lg mb-2">Learn More</h3>
                    <ul className="list-disc pl-5 text-muted-foreground">
                      {data.wikipedia_url && (
                        <li>
                          <a
                            href={data.wikipedia_url}
                            className="hover:underline"
                          >
                            Wikipedia
                          </a>
                        </li>
                      )}
                      {data.cfa_url && (
                        <li>
                          <a href={data.cfa_url} className="hover:underline">
                            CFA
                          </a>
                        </li>
                      )}
                      {data.vetstreet_url && (
                        <li>
                          <a
                            href={data.vetstreet_url}
                            className="hover:underline"
                          >
                            Vetstreet
                          </a>
                        </li>
                      )}
                      {data.vcahospitals_url && (
                        <li>
                          <a
                            href={data.vcahospitals_url}
                            className="hover:underline"
                          >
                            VCA Hospitals
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Gallery</h2>
            {loading ? (
              <Loader />
            ) : images.length > 0 ? (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                {images.map((image, index) => (
                  <div key={image.id} className="break-inside-avoid mb-4">
                    <div className="relative overflow-hidden rounded-lg bg-muted">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={`${data.name} ${index + 1}`}
                        width={image.width}
                        height={image.height}
                        className="w-full h-auto object-cover transition-transform hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No images available for this breed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
