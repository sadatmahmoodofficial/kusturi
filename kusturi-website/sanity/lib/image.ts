import imageUrlBuilder from '@sanity/image-url';

import { dataset, projectId } from '../env';

const builder = imageUrlBuilder({
  projectId,
  dataset,
});

export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0]);
}