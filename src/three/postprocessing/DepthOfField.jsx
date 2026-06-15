import { DepthOfField as DOFEffect } from '@react-three/postprocessing'

/**
 * Reusable Depth-of-Field post-processing wrapper.
 * Drop inside <EffectComposer> in any scene.
 *
 * Props:
 *   focusDistance  – distance to focus point, 0–1   (default 0.01)
 *   focalLength    – focal length, 0–1              (default 0.02)
 *   bokehScale     – bokeh bubble size              (default 3)
 *   height         – render height px               (default 480)
 */
export default function DepthOfField({
  focusDistance = 0.01,
  focalLength = 0.02,
  bokehScale = 3,
  height = 480,
}) {
  return (
    <DOFEffect
      focusDistance={focusDistance}
      focalLength={focalLength}
      bokehScale={bokehScale}
      height={height}
    />
  )
}
