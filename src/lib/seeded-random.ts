/**
 * Small deterministic PRNG (mulberry32). Given the same seed, always
 * produces the same sequence — keeps components that generate procedural
 * 3D layouts pure (no Math.random() during render), while still looking
 * randomized to the eye.
 */
export function createSeededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
