export interface Secret {
  id: string
  content: string
  timestamp: number
  darknessLevel: number
  likes?: number
  comments?: Comment[]
  interactions?: number
  username?: string
  ipAddress?: string
}

export interface Comment {
  id: string
  content: string
  timestamp: number
  username?: string
}

export interface CreateSecretParams {
  content: string
  timestamp: number
  username?: string
}

export interface AdConfig {
  position: "top" | "bottom" | "inline"
  format?: "banner" | "square" | "skyscraper"
  provider?: "google" | "facebook" | "amazon"
}

