import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { usePaw } from "~/contexts/paw-context"
import DetailPage from "~/components/dynamic-details"
import { Loader } from "~/components/svg"
import type { CatBreed, Image, PawBreed } from "~/lib/data-types"

export default function CatDetailContainer() {
  const { id } = useParams<{ id: string }>()
  const { selected, all, setAll, setType } = usePaw()

  const [cat, setCat] = useState<CatBreed | null>(null)
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      setLoading(true)
      setType("cat")

      try {
        // Try from context first (narrowing to cats only)
        let found: CatBreed | null =
          (selected && selected.type === "cat" && selected.id === id
            ? selected
            : (all.find(
                (c: PawBreed) => c.type === "cat" && c.id === id
              ) as CatBreed | undefined)) || null

        // If not found, fetch from API
        if (!found) {
          const breedRes = await fetch("https://api.thecatapi.com/v1/breeds")
          const breeds: CatBreed[] = await breedRes.json()
          setAll(breeds) // cats fit in union
          found = breeds.find((b) => b.id === id) || null
        }

        setCat(found)

        // Always fetch breed images
        const imageRes = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=12&breed_ids=${id}`
        )
        const imageData: Image[] = await imageRes.json()
        setImages(imageData)
      } catch (err) {
        console.error("Failed to fetch cat details:", err)
        setCat(null)
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, setAll, setType])

  if (loading && !cat) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <DetailPage
      title="Cats"
      basePath="feline"
      data={cat}
      images={images}
      loading={loading}
    />
  )
}
