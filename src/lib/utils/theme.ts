export interface Theme {
  name: string
  description: string
  thumbnail?: string
  background?: string
  images: string[]
}

export const resolveThumbnail = (theme: Theme) => {
  const {
    thumbnail,
    background,
    images
  } = theme
  if (thumbnail) {
    return thumbnail
  }
  if (background) {
    return background
  }
  if (images && images.length) {
    return images[0]
  }
  return null
}