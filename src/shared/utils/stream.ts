import { Stream } from 'stream';

export const streamToBuffer = (stream: Stream) => {
  const chunks: Buffer[] = [];
  return new Promise<Buffer>((resolve, reject) => {
    stream.on('data', (chunk) => {
      const buffer = Buffer.from(chunk);
      chunks.push(buffer);
    });
    stream.on('error', () => reject('read'));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
};
