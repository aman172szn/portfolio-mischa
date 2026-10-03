let placeholderAudioSource: string | null = null;

function writeString(view: DataView, offset: number, value: string) {
  for (let index = 0; index < value.length; index += 1) {
    view.setUint8(offset + index, value.charCodeAt(index));
  }
}

export function getPlaceholderAudioSource() {
  if (placeholderAudioSource) {
    return placeholderAudioSource;
  }

  const sampleRate = 8_000;
  const durationSeconds = 8;
  const sampleCount = sampleRate * durationSeconds;
  const buffer = new ArrayBuffer(44 + sampleCount * 2);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + sampleCount * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, sampleCount * 2, true);

  for (let index = 0; index < sampleCount; index += 1) {
    const fade = Math.min(index / 800, (sampleCount - index) / 800, 1);
    const sample = Math.sin((index / sampleRate) * Math.PI * 2 * 220) * 0.08 * fade;
    view.setInt16(44 + index * 2, sample * 0x7fff, true);
  }

  placeholderAudioSource = URL.createObjectURL(
    new Blob([view], { type: 'audio/wav' }),
  );

  return placeholderAudioSource;
}
