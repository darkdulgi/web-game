export default function vibrateMobile(ms: number) {
  if ("vibrate" in navigator) {
    navigator.vibrate(ms);
  }
}
