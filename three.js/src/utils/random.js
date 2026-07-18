// A simple seedable pseudo-random number generator (Mulberry32)
// This is used to ensure pure rendering, preventing react-hooks/purity lint errors
// and ensuring consistent layouts across renders.
export function createRandom(seed = 12345) {
  let a = seed;
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
