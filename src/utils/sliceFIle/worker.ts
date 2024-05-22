const workerCode = () => {
  // Listen to message from the main thread
  self.onmessage = function (e) {
    const {files, CHUNK_SIZE, startIndex, endIndex} = e.data;
    console.log('worker', e.data)

  };
};

let code = workerCode.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));
const blob = new Blob([code], { type: 'application/javascript' });
const workerScriptURL = URL.createObjectURL(blob);

export default workerScriptURL;
