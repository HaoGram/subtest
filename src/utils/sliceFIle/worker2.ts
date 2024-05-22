import {createChunk} from "./chunk.ts";

self.onmessage = async function (e) {
  const {file, CHUNK_SIZE, startIndex, endIndex} = e.data;
  const proms = []
  for (let i = startIndex; i < endIndex; i++) {
    proms.push(createChunk(file, i, CHUNK_SIZE))
  }
  const chunks = await Promise.all(proms);
  // console.log('chunks', chunks)
  self.postMessage(chunks);
};

