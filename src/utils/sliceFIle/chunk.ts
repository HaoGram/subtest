import SparkMD5 from "spark-md5";

export const createChunk = (file, index, chunkSize) => {
  return new Promise((resolve, reject) => {
    const start = index * chunkSize;
    const end = start + chunkSize;
    const sparkMD5 = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      const chunk = e.target.result;
      sparkMD5.append(chunk)
      const hash = sparkMD5.end()
      resolve({
        start,
        end,
        index,
        hash
      })
    }
    fileReader.readAsArrayBuffer(file.slice(start, end));
  })

}

export const createChunks = (file, chunkSize) => {
  const arr = []
  for (let i = 0; i < file.size; i+=chunkSize) {
    arr.push(file.slice(i, i + chunkSize))
  }
  return arr
}
