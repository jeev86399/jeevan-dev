import { Bloom as BloomEffect } from '@react-three/postprocessing'

/**
 * Reusable Bloom post-processing wrapper.
 * Drop inside <EffectComposer> in any scene.
 *
 * Props:
 *   intensity        – bloom brightness  (default 1.5)
 *   threshold        – luminance cutoff  (default 0.2)
 *   smoothing        – edge smoothing    (default 0.9)
 *   height           – render height px  (default 300)
 */
export default function Bloom({
  intensity = 1.5,
  threshold = 0.2,
  smoothing = 0.9,
  height = 300,
}) {
  return (
    <BloomEffect
      luminanceThreshold={threshold}
      luminanceSmoothing={smoothing}
      height={height}
      intensity={intensity}
    />
  )
}
