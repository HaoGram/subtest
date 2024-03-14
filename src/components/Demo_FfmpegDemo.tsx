import { useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import {Typography} from "@douyinfe/semi-ui";
const {Title, Text} = Typography;

export function Demo_FfmpegDemo() {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const messageRef = useRef<HTMLParagraphElement | null>(null)

  const load = async (type?: string) => {
    console.log('load')
    // js 包
    let baseURL = "/library/@ffmpeg/core/package/dist/esm";

    if (type === 'multi') {
      // CAUTION: As SharedArrayBuffer is required for multithread version, make sure you have have fulfilled [Security Requirements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements).
      baseURL = "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
    }

    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log('message', message)
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    // toBlobURL is used to bypass CORS issue, urls with the same
    // domain can be used directly.
    try {

      await ffmpeg.load({
        // coreURL: `${baseURL}/ffmpeg-core.js`,

        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
        ...(type === 'multi' ? {
          workerURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.worker.js`,
            "text/javascript"
          ),
        } : {})
      });
      console.log('loaded___')

      setLoaded(true);

    } catch (e) {
      console.error('load-error:', e)
    }
  };

  const transcode = async () => {
    const videoURL = "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi";
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile("input.avi", await fetchFile(videoURL));
    await ffmpeg.exec(["-i", "input.avi", "output.mp4"]);
    const fileData = await ffmpeg.readFile('output.mp4');
    const data = new Uint8Array(fileData as ArrayBuffer);
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(
        new Blob([data.buffer], { type: 'video/mp4' })
      )
    }
  };

  return (

    <div>
      <Title heading={2}>Transcode .avi to .mp4 video</Title>
      {
        loaded ? (
          <>
            <video ref={videoRef} controls></video>
            <br />
            <button onClick={transcode}>Transcode avi to mp4</button>
            <p ref={messageRef}></p>
          </>
        ) : (
          <div style={{display: 'flex', gap: 15}}>
            <button onClick={() => load()}>Load ffmpeg-core(~31 MB) [single-thread]</button>
            <button onClick={() => load('multi')}>Load ffmpeg-core(~31 MB)[multi-thread]</button>
          </div>

        )
      }
    </div>
  )
}

