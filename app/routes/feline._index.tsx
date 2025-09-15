import { useEffect } from "react"
import { useAPI } from "~/hooks/use-api"
import { usePaw } from "~/contexts/paw-context"
import DynamicCatalog from "~/components/dynamic-catalog"
import { Loader } from "~/components/svg"
import type { CatBreed } from "~/lib/data-types"
import type { Route } from "./+types/feline._index"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Paw Remix" },
    { name: "description", content: "Cats catalog" },
  ]
}

export default function Feline() {
  const type = "cat"
  const { all, setAll, setSelected } = usePaw()

  const { data: cats, loading, error } = useAPI<CatBreed[]>(
    all[type]?.length ? undefined : "https://api.thecatapi.com/v1/breeds"
  )

  useEffect(() => {
    if (cats && (!all[type] || all[type].length === 0)) {
      setAll(type, cats)
    }
  }, [cats, all, setAll, type])

  if (error) throw new Error(error)
  if (loading && !all[type]?.length) return <Loader />

  return (
    <DynamicCatalog
      title="Cats"
      basePath="feline"
      imgPath="https://cdn2.thecatapi.com/images/"
      data={all[type] || cats || []}
      loading={loading}
      onSelect={cat => setSelected(type, cat)}
    />
  )
}
