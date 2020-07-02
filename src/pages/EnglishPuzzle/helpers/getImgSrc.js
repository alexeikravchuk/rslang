import { paintings } from '../constants/data_paintings';

export function getImageSrc(level, page) {
  const src = './images/paintings/';
  let paintingInfo = paintings[level - 1][page - 1];
  paintingInfo = {
    ...paintingInfo,
    imageSrc: `${src}${paintingInfo.imageSrc}`,
    cutSrc: `${src}${paintingInfo.cutSrc}`,
  };

  return paintingInfo;
}
