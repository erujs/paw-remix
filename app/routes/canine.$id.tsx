import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { usePaw } from "~/contexts/paw-context"
import DetailPage from "~/components/dynamic-details"
import { Loader } from "~/components/svg"
import type { DogBreed, Image, PawBreed } from "~/lib/data-types"

export default function DogDetailContainer() {
  const { id } = useParams<{ id: string }>()
  const { selected, all, setAll, setType } = usePaw()

  const [dog, setDog] = useState<DogBreed | null>(null)
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      setLoading(true)
      setType("dog")

      try {
        // Try from context first (narrow to dogs only)
        let found: DogBreed | null =
          (selected && selected.type === "dog" && selected.id === Number(id)
            ? selected
            : (all.find(
                (d: PawBreed) => d.type === "dog" && d.id === Number(id)
              ) as DogBreed | undefined)) || null

        // If not found, fetch from API
        if (!found) {
          const breedRes = await fetch("https://api.thedogapi.com/v1/breeds")
          const breeds: DogBreed[] = await breedRes.json()
          setAll(breeds)
          found = breeds.find((b) => b.id === Number(id)) || null
        }

        setDog(found)

        // Always fetch breed images
        const imageRes = await fetch(
          `https://api.thedogapi.com/v1/images/search?limit=12&breed_ids=${id}`
        )
        const imageData: Image[] = await imageRes.json()
        setImages(imageData)
      } catch (err) {
        console.error("Failed to fetch dog details:", err)
        setDog(null)
        setImages([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, setAll, setType])

  if (loading && !dog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <DetailPage
      title="Dogs"
      basePath="canine"
      data={dog}
      images={images}
      loading={loading}
    />
  )
}
