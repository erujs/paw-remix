import { createContext, useContext, useState, type ReactNode } from "react"
import type { PawBreed, PawType } from "~/lib/data-types"

interface PawContextType {
  type: PawType | null
  setType: (type: PawType) => void

  all: Record<PawType, PawBreed[]>
  setAll: (type: PawType, breeds: PawBreed[]) => void

  selected: Record<PawType, PawBreed | null>
  setSelected: (type: PawType, breed: PawBreed) => void
}

const PawContext = createContext<PawContextType | undefined>(undefined)

export function PawProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<PawType | null>(null)
  const [all, setAllState] = useState<Record<PawType, PawBreed[]>>({ cat: [], dog: [] })
  const [selected, setSelectedState] = useState<Record<PawType, PawBreed | null>>({ cat: null, dog: null })

  const setAll = (t: PawType, breeds: PawBreed[]) => setAllState(prev => ({ ...prev, [t]: breeds }))
  const setSelected = (t: PawType, breed: PawBreed) => setSelectedState(prev => ({ ...prev, [t]: breed }))

  return (
    <PawContext.Provider value={{ type, setType, all, setAll, selected, setSelected }}>
      {children}
    </PawContext.Provider>
  )
}

export function usePaw() {
  const context = useContext(PawContext)
  if (!context) throw new Error("usePaw must be used within a PawProvider")
  return context
}
