import { REHAB_CENTERS } from "./constants"

export interface RehabCenter {
  id: number
  name: string
  city: string
  description: string
  phone: string
  address: string
}

// Returns all rehab centers - can be replaced with database query
export function getRehabCenters(): RehabCenter[] {
  return REHAB_CENTERS
}

// Find a specific center by ID
export function getRehabCenterById(id: number): RehabCenter | undefined {
  return REHAB_CENTERS.find((center) => center.id === id)
}

// Get centers by city
export function getRehabCentersByCity(city: string): RehabCenter[] {
  return REHAB_CENTERS.filter((center) => center.city.toLowerCase().includes(city.toLowerCase()))
}
