import { useEffect, useMemo } from "react"
import { useParams } from "react-router"
import { useAPI } from "~/hooks/use-api"
import { usePaw } from "~/contexts/paw-context"
import DetailPage from "~/components/dynamic-details"
import { Loader } from "~/components/svg"
import type { CatBreed, Image } from "~/lib/data-types"

export default function CatDetailContainer() {
  const { id } = useParams<{ id: string }>()
  const type: "cat" = "cat"
  const { all, selected, setAll, setSelected, setType } = usePaw()

  useEffect(() => setType(type), [setType])

  const catFromContext = useMemo(
    () => selected[type]?.id === id ? selected[type] : all[type]?.find(c => c.id === id) || null,
    [id, selected, all, type]
  )

  const { data: breeds, loading: breedsLoading } = useAPI<CatBreed[]>(
    catFromContext ? undefined : "https://api.thecatapi.com/v1/breeds"
  )

  useEffect(() => {
    if (breeds && all[type]?.length === 0) setAll(type, breeds)
  }, [breeds, all, setAll, type])

  const cat = catFromContext || breeds?.find(b => b.id === id) || null
  useEffect(() => {
    if (cat && selected[type]?.id !== id) setSelected(type, cat)
  }, [cat, selected, setSelected, type, id])

  const { data: images, loading: imagesLoading } = useAPI<Image[]>(
    cat ? `https://api.thecatapi.com/v1/images/search?limit=12&breed_ids=${id}` : undefined
  )

  const loading = breedsLoading || imagesLoading

  if (loading || !cat) return <Loader />

  return (
    <DetailPage
      title="Cats"
      basePath="feline"
      data={cat}
      images={images || []}
      loading={loading}
    />
  )
}
