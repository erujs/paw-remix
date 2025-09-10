import { createContext, useContext, useState, type ReactNode } from "react"
import type { PawBreed, PawType } from "~/lib/data-types"

interface PawContextType {
  type: PawType | null
  setType: (type: PawType) => void

  selected: PawBreed | null
  setSelected: (breed: PawBreed) => void

  all: PawBreed[]
  setAll: (breeds: PawBreed[]) => void
}

const PawContext = createContext<PawContextType | undefined>(undefined)

export function PawProvider({ children }: { children: ReactNode }) {
  const [type, setType] = useState<PawType | null>(null)
  const [selected, setSelected] = useState<PawBreed | null>(null)
  const [all, setAll] = useState<PawBreed[]>([])

  return (
    <PawContext.Provider value={{ type, setType, selected, setSelected, all, setAll }}>
      {children}
    </PawContext.Provider>
  )
}

export function usePaw() {
  const context = useContext(PawContext)
  if (!context) {
    throw new Error("usePaw must be used within a PawProvider")
  }
  return context
}
