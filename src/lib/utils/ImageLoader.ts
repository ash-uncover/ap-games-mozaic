export const loadImages = async (images: string[]) => {
  if (images) {
    return Promise.all(images.map(loadImage))
  }
  return Promise.resolve()
}

export const loadImage = async (image: string) => {
  return new Promise((resolve, reject) => {
    const imageElem = document.createElement('img')
    imageElem.src = image
    imageElem.onload = resolve
    imageElem.onerror = reject
  })
}