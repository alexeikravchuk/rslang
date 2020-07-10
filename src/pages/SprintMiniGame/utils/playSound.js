export const playSound = (sound) => {
  const audio = new Audio(`${process.env.PUBLIC_URL}/audio/${sound}.mp3`)
  audio.play()
}
