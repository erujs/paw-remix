import { useEffect, useMemo } from "react"
import { useParams } from "react-router"
import { useAPI } from "~/hooks/use-api"
import { usePaw } from "~/contexts/paw-context"
import DetailPage from "~/components/dynamic-details"
import { Loader } from "~/components/svg"
import type { DogBreed, Image } from "~/lib/data-types"

export default function DogDetailContainer() {
  const { id } = useParams<{ id: string }>()
  const type: "dog" = "dog"
  const { all, selected, setAll, setSelected, setType } = usePaw()

  useEffect(() => setType(type), [setType])

  const dogFromContext = useMemo(
    () => selected[type]?.id === Number(id) ? selected[type] : all[type]?.find(d => d.id === Number(id)) || null,
    [id, selected, all, type]
  )

  const { data: breeds, loading: breedsLoading } = useAPI<DogBreed[]>(
    dogFromContext ? undefined : "https://api.thedogapi.com/v1/breeds"
  )

  useEffect(() => {
    if (breeds && all[type]?.length === 0) setAll(type, breeds)
  }, [breeds, all, setAll, type])

  const dog = dogFromContext || breeds?.find(b => b.id === Number(id)) || null
  useEffect(() => {
    if (dog && selected[type]?.id !== Number(id)) setSelected(type, dog)
  }, [dog, selected, setSelected, type, id])

  const { data: images, loading: imagesLoading } = useAPI<Image[]>(
    dog ? `https://api.thedogapi.com/v1/images/search?limit=12&breed_ids=${id}` : undefined
  )

  const loading = breedsLoading || imagesLoading

  if (loading || !dog) return <Loader />

  return (
    <DetailPage
      title="Dogs"
      basePath="canine"
      data={dog}
      images={images || []}
      loading={loading}
    />
  )
}
