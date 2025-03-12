// Import forwardRef from React
import { forwardRef } from "react"

// Export React's forwardRef for use in our components
export { forwardRef }

// Simple utility to omit props from an object
export function omitProps(props: Record<string, any>, keysToOmit: string[]) {
  const result = { ...props }
  keysToOmit.forEach((key) => {
    delete result[key]
  })
  return result
}

