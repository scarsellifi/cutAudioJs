## Description
This project is a JavaScript library developed to cut sections from one or multiple MP3 audio files and return either an audio buffer or a WAV file for download.

## Features
- Cut segments from one or multiple audio files.
- Return a single audio buffer or a WAV file for download.

## How to Use - DEMO
1. Open the web page with the application.
2. Click the "Cut and Play Audio" button to initiate the process.
3. The library processes predefined segments of `test_.mp3` and either plays them back or returns a WAV file.

Try [DEMO](https://scarsellifi.github.io/cutAudioJs/)

## Code Snippet
```javascript
import { AudioData, cutAudioApp } from "./cutAudio.js";

const audioDataArray = [
  new AudioData("test_.mp3", 6, 12),
  new AudioData("test_.mp3", 0, 6),
];

document.getElementById("cutAudioBtn").addEventListener("click", async () => {
  let wavBlob = await cutAudioApp.cutAudio(audioDataArray);
  cutAudioApp.playAudio(wavBlob, "audioElement"); // Optional: can also provide download
});
```

## Requirements
- A modern web browser with JavaScript enabled.
- Suitable audio files in MP3 format available for processing.