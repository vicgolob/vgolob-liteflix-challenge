import { DropzoneOptions, useDropzone } from 'react-dropzone';

import IconClip from '@assets/icons/clip.svg';

function Dropzone({ onDrop, accept, multiple = false }: DropzoneOptions) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
    multiple,
  });

  return (
    <div
      {...getRootProps({
        className:
          'p-10 border-2 border-blue-500 border-dashed w-full font-regular text-white hover:cursor-pointer',
      })}>
      <input className="input-zone" {...getInputProps()} />
      <div className="flex justify-center">
        {isDragActive ? (
          <p>Suelta el archivo aquí</p>
        ) : (
          <>
            <img src={IconClip} alt="agregá un archivo" className="mr-3" />
            <p>agregá un archivo</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Dropzone;
