import { useState, useMemo, useRef, useEffect } from "react"
import { Link } from "react-router"
import { Loader } from "~/components/svg"
import { Input } from "~/components/ui/input"
import type { CatalogProps } from "~/lib/data-types"

export default function DynamicCatalog({
  title,
  basePath,
  imgPath,
  data,
  onSelect,
  loading = false,
  batchSize = 20,
}: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCount, setVisibleCount] = useState(batchSize)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  // Normalize filter fields across dogs/cats
  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return data.filter((item) => {
      const fields: string[] = [
        item.name,
        item.temperament ?? "",
        item.origin ?? "",
        item.life_span ?? "",
      ]

      if (item.type === "dog") {
        fields.push(item.breed_group ?? "", item.bred_for ?? "")
      }
      if (item.type === "cat") {
        fields.push(item.description ?? "")
      }

      return fields.some((field) => field.toLowerCase().includes(term))
    })
  }, [data, searchTerm])

  // Reset visible items when search changes
  useEffect(() => {
    setVisibleCount(batchSize)
  }, [searchTerm, batchSize])

  // Infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + batchSize, filteredItems.length)
          )
        }
      },
      { threshold: 1.0 }
    )

    const current = loaderRef.current
    observer.observe(current)

    return () => {
      observer.unobserve(current)
      observer.disconnect()
    }
  }, [filteredItems.length, batchSize])

  if (loading) {
    return <Loader />
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
      {/* Header / Search */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto p-4">
          <div className="flex items-center space-x-1 text-xl text-white mb-4">
            <Link
              to="/"
              className="text-foreground hover:underline transition-colors"
            >
              Home
            </Link>
            <span className="text-foreground">/</span>
            <span className="text-foreground font-semibold">{title}</span>
          </div>

          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder={`Search ${title.toLowerCase()} breeds...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>

          <div className="text-center mt-2 text-sm text-foreground">
            {filteredItems.length} of {data.length} breeds
          </div>
        </div>
      </div>

      {/* Grid (masonry-ish) */}
      <div className="mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.slice(0, visibleCount).map((item) => (
            <Link
              key={item.id}
              to={`/${basePath}/${item.id}`}
              onClick={() => onSelect?.(item)}
            >
              <div className="break-inside-avoid cursor-pointer mb-4 hover:scale-105 transition-transform">
                <h3 className="font-semibold text-lg mb-2 text-card-foreground">
                  {item.name}
                </h3>
                {item.reference_image_id && (
                  <img
                    src={`${imgPath}${item.reference_image_id}.jpg`}
                    alt={`${item.name} breed`}
                    onError={(e) => {
                      const target = e.currentTarget
                      target.onerror = null
                      target.src = `${imgPath}${item.reference_image_id}.png`
                    }}
                    className="w-full h-auto object-cover transition-transform rounded-lg"
                    loading="lazy"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Infinite Scroll Sentinel */}
        {visibleCount < filteredItems.length && (
          <div
            ref={loaderRef}
            className="flex justify-center py-6 text-muted-foreground"
          >
            <Loader />
          </div>
        )}

        {/* Empty Search State */}
        {filteredItems.length === 0 && searchTerm && (
          <div className="text-center">
            <p className="text-muted-foreground">
              No breeds found matching "{searchTerm}"
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
