export const loadImages = async (images: string[], onProgress?: (value: number) => void) => {
  if (images) {
    let loaded = 0
    return Promise.all(images.map((image) => {
      return loadImage(image)
        .then(() => {
          loaded++
          onProgress(loaded)
        })
        .catch((error) => {
          loaded++
          onProgress(loaded)
          throw error
        })
    }))
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