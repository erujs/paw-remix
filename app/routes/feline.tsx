import { useEffect, useState } from "react"
import { usePaw } from "~/contexts/paw-context"
import DynamicCatalog from "~/components/dynamic-catalog"
import { Loader } from "~/components/svg"
import type { CatBreed } from "~/lib/data-types"
import type { Route } from "./+types/feline";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Paw Remix" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Feline() {
  const [cats, setCats] = useState<CatBreed[]>([])
  const [loading, setLoading] = useState(true)
  const { setType, setSelected, setAll } = usePaw()

  useEffect(() => {
    async function fetchCats() {
      try {
        setType("cat")
        const res = await fetch(`https://api.thecatapi.com/v1/breeds`)
        const data = await res.json()
        setCats(data)
        setAll(data)
      } catch (err) {
        console.error("Failed to fetch cats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCats()
  }, [setAll, setType])

  if (loading) {
    return <Loader />
  }

  return (
    <DynamicCatalog
      title="Cats"
      basePath="feline"
      imgPath="https://cdn2.thecatapi.com/images/"
      data={cats}
      loading={loading}
      onSelect={(cat) => setSelected(cat)}
    />
  )
}
