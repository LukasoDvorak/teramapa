export type TherapyType =
  | 'Psychoterapie'
  | 'Fyzioterapie'
  | 'Masáže'
  | 'Osteopatie'
  | 'Arteterapie'
  | 'Výživové poradenství'

export interface Therapist {
  id: number
  name: string
  therapy_types: TherapyType[]
  address: string
  city: string
  lat: number
  lng: number
  phone?: string | null
  website?: string | null
  description: string
  created_at?: string
}

export const ALL_THERAPY_TYPES: TherapyType[] = [
  'Psychoterapie',
  'Fyzioterapie',
  'Masáže',
  'Osteopatie',
  'Arteterapie',
  'Výživové poradenství',
]
