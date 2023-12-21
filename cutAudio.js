/**
 * Asynchronously cuts a section from an audio file.
 *
 * @param {ArrayBuffer} audioData - The ArrayBuffer of the audio file.
 * @param {number} startTime - The start time in seconds for the cut.
 * @param {number} endTime - The end time in seconds for the cut.
 * @returns {Promise<AudioBuffer>} A Promise that resolves to the cut AudioBuffer.
 *
 * @example
 * // Assuming you have an ArrayBuffer of audio data
 * cutAudioFileAsync(audioData, 10, 20)
 *   .then(cutBuffer => {
 *     // Do something with the cut audio buffer
 *   })
 *   .catch(error => {
 *     console.error('Error cutting audio file:', error);
 *   });
 *
 * @description
 * This function takes an ArrayBuffer of an audio file and cuts a portion of it from startTime to endTime.
 * It returns a Promise that resolves to an AudioBuffer of the cut section.
 * The function utilizes the Web Audio API for decoding and manipulating the audio data.
 */
export async function cutAudioFileAsync(audioData, startTime, endTime) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Funzione per decodificare in modo asincrono l'audio
  function decodeAudioDataAsync(audioContext, audioData) {
    return new Promise((resolve, reject) => {
      audioContext.decodeAudioData(audioData, resolve, reject);
    });
  }

  try {
    const decodedData = await decodeAudioDataAsync(audioContext, audioData);
    const sampleRate = decodedData.sampleRate;
    const startOffset = startTime * sampleRate;
    const endOffset = endTime * sampleRate;

    // Crea un nuovo buffer per la porzione desiderata dell'audio
    const cutBuffer = audioContext.createBuffer(
      decodedData.numberOfChannels,
      endOffset - startOffset,
      sampleRate
    );

    // Copia i dati audio nel nuovo buffer
    for (let channel = 0; channel < decodedData.numberOfChannels; channel++) {
      const channelData = decodedData.getChannelData(channel);
      cutBuffer.copyToChannel(
        channelData.subarray(startOffset, endOffset),
        channel
      );
    }

    return cutBuffer;
  } catch (e) {
    console.error("Error with decoding audio data", e);
    throw e;
  }
}
