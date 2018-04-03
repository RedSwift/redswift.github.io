import XLSX from 'xlsx';

export default (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // if file is not an xlsx extension, reject
    const fileName = file.name
    const fileExtension = fileName.split('.').pop()
    
    if (fileExtension !== 'xlsx') {
      return reject('File needs to be an excel file in .xlsx format')
    } 
    
    reader.onload = function(file) {
      const data = file.target.result;
      const workbook = XLSX.read(data, {type: 'binary'});
      const firstSheetName = workbook.SheetNames[0]
    
      const sheet = workbook.Sheets[firstSheetName]
      const jsonSheet = XLSX.utils.sheet_to_json(sheet)
    
      if (jsonSheet.length <= 0) {
        return reject('File cannot be empty')
      }
    
      resolve(jsonSheet)
    };

    reader.readAsBinaryString(file)
  });
}
