import { galleryImage } from './galleryImage'
import { menuCategory } from './menuCategory'
import { menuItem } from './menuItem'
import { siteSettings } from './siteSettings'
import { specialOffer } from './specialOffer'
import { testimonial } from './testimonial'

export const schema = {
  types: [
    siteSettings,
    menuCategory,
    menuItem,
    specialOffer,
    testimonial,
    galleryImage,
  ],
}
