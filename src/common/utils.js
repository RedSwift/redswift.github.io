export default (files, imagesPerPage) => {
  const chunkedArray = [];
  
  while(files.length) {
    chunkedArray.push(files.splice(0, imagesPerPage));
  }

  return chunkedArray;
}