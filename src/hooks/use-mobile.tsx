import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * A hook to determine if the current viewport is a mobile device.
 * It uses the `matchMedia` API for robust detection.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // useEffect only runs on the client, so `window` is safe to use.
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Handler for when the media query match state changes.
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    // Add listener
    mql.addEventListener("change", onChange)

    // Set the initial state on component mount.
    setIsMobile(mql.matches)

    // Cleanup the listener when the component unmounts.
    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return isMobile
}
