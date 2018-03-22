/**
 * To splice image files into chunked arrays
 * @param {object} files - files with keys base64 (object) and fileList (object)
 * @param {string} imagesPerPage - max number of images per page
 */
export default (files, imagesPerPage) => {
  const chunkedArray = [];
  const arrayOfImagesWithNames = [];
  const base64Images = files.base64;
  
  base64Images.forEach((src, index) => {
    arrayOfImagesWithNames.push({
      name: files.fileList[index].name.replace(/\.[^/.]+$/, ""),
      src 
    })
  })

  while(arrayOfImagesWithNames.length) {
    chunkedArray.push(arrayOfImagesWithNames.splice(0, imagesPerPage));
  }

  return chunkedArray;
}