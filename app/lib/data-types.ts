export type PawType = "dog" | "cat"

export interface BaseBreed {
  id: string | number
  name: string
  life_span?: string
  temperament?: string
  origin?: string
  reference_image_id?: string
  weight?: { imperial: string; metric: string }
}

export interface DogBreed extends BaseBreed {
  id: number
  type: "dog"
  bred_for?: string
  breed_group?: string
  height?: { imperial: string; metric: string }
}

export interface CatBreed extends BaseBreed {
  id: string
  type: "cat"
  description?: string
  wikipedia_url?: string
  cfa_url?: string
  vetstreet_url?: string
  vcahospitals_url?: string
  adaptability?: number
  affection_level?: number
  intelligence?: number
  energy_level?: number
}

export type PawBreed = DogBreed | CatBreed

export interface Image {
  id: string
  url: string
  width: number
  height: number
}

export interface DetailPageProps {
  title: string
  basePath: string
  data: PawBreed | null
  images: Image[]
  loading?: boolean
}

export interface CatalogProps {
  title: string
  basePath: string
  imgPath: string
  data: PawBreed[]
  onSelect?: (data: PawBreed) => void
  loading?: boolean
  batchSize?: number
}
