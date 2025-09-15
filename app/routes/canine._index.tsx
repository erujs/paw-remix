import { useEffect } from "react"
import { useAPI } from "~/hooks/use-api"
import { usePaw } from "~/contexts/paw-context"
import DynamicCatalog from "~/components/dynamic-catalog"
import { Loader } from "~/components/svg"
import type { DogBreed } from "~/lib/data-types"
import type { Route } from "./+types/canine._index"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Paw Remix" },
    { name: "description", content: "Welcome to React Router!" },
  ]
}

export default function Canine() {
  const type = "dog"
  const { all, setAll, setSelected } = usePaw()

  const { data: dogs, loading, error } = useAPI<DogBreed[]>(
    all[type]?.length ? undefined : "https://api.thedogapi.com/v1/breeds"
  )

  useEffect(() => {
    if (dogs && (!all[type] || all[type].length === 0)) {
      setAll(type, dogs)
    }
  }, [dogs, all, setAll, type])

  if (error) throw new Error(error)
  if (loading && !all[type]?.length) return <Loader />

  return (
    <DynamicCatalog
      title="Dogs"
      basePath="canine"
      imgPath="https://cdn2.thedogapi.com/images/"
      data={all[type] || dogs || []}
      loading={loading}
      onSelect={dog => setSelected(type, dog)}
    />
  )
}