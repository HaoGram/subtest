import SparkMD5 from 'spark-md5'
import workerScript from './worker2.js?worker'
import {createChunk, createChunks} from "@/utils/sliceFIle/chunk.ts";


const CHUNK_SIZE = 1024 * 1024 * 5 // 5MB

export const sliceFIle = async (file) => {
  const result = []
  const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
  for (let i = 0; i < chunkCount; i++) {
    const chunk = await createChunk(file, i, CHUNK_SIZE)
    result.push(chunk)
  }
  return result
}

const THREAD_COUNT = 4 || navigator.hardwareConcurrency || 4
export const sliceFIleByWorker = (file) => {
  return new Promise((resolve, reject) => {
    const result = []
    let finishedCount = 0

    const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT)
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 创建一个新的 worker 线程
      const worker = new Worker(new URL('./worker2.ts', import.meta.url), {
        type: 'module'
      })
      // 计算每个线程开始和结束索引
      const startIndex = i * workerChunkCount
      let endIndex= startIndex + workerChunkCount
      if (endIndex >= chunkCount) {
        endIndex = chunkCount
      }
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startIndex,
        endIndex
      })
      worker.onmessage = (e) => {
        const data = e.data
        for (let j = startIndex; j < endIndex; j++) {
          result[j] = data[j - startIndex]
        }
        worker.terminate()
        finishedCount ++
        if (finishedCount >= THREAD_COUNT) {
          resolve(result)
        }
      }
    }

  })
}


const fileHash = (chunks) => {
return new Promise((resolve, reject) => {
  const spark = new SparkMD5()
  function _readChunk(i) {
    if (i >= chunks.length) {
      resolve(spark.end())
      return
    }
    const blob = chunks[i]
    const reader = new FileReader()
    reader.onload = (e) => {
      const bytes = e.target.result;
      // 增量计算
      spark.append(bytes)
      _readChunk(i + 1)
    }
    reader.readAsArrayBuffer(blob)
  }
  _readChunk(0)
})
}
export const sliceFile2 = async (file) => {
  const chunks = createChunks(file, CHUNK_SIZE)
  const hash = await fileHash(chunks)
  return {
    chunks,
    hash
  }
}

