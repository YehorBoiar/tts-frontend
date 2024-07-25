export let audioContext = null;
export const audioQueue = [];

export const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
};

export const addToAudioQueue = (buffer) => {
  audioQueue.push(buffer);
};

export const clearAudioQueue = () => {
  audioQueue.length = 0;
};
