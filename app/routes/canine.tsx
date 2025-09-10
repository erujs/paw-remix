import { useEffect, useState } from "react"
import { usePaw } from "~/contexts/paw-context"
import DynamicCatalog from "~/components/dynamic-catalog"
import { Loader } from "~/components/svg"
import type { DogBreed } from "~/lib/data-types"

export default function Canine() {
  const [dogs, setDogs] = useState<DogBreed[]>([])
  const [loading, setLoading] = useState(true)
  const { setSelected, setAll, setType } = usePaw()

  useEffect(() => {
    async function fetchDogs() {
      try {
        setType("dog")
        const res = await fetch("https://api.thedogapi.com/v1/breeds")
        const data = await res.json()
        setDogs(data)
        setAll(data)
      } catch (err) {
        console.error("Failed to fetch dogs:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDogs()
  }, [setAll, setType])

  if (loading) {
    return <Loader />
  }

  return (
    <DynamicCatalog
      title="Dogs"
      basePath="canine"
      imgPath="https://cdn2.thedogapi.com/images/"
      data={dogs}
      loading={loading}
      onSelect={(dog) => setSelected(dog)}
    />
  )
}
