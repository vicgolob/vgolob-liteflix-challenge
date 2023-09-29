import { FormEvent, useCallback, useRef, useState } from 'react';

import { Modal, NavBar, Dropzone, CloseButton } from '@components/index';
import Logo from '@assets/logo.svg';
import { ReactComponent as IconSpinner } from '@assets/icons/spinner.svg';

function AddMovieModal({
  showPhoneScreenLayout,
  onClose,
}: {
  showPhoneScreenLayout: boolean;
  onClose: Function;
}) {
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<Blob | null>(null);
  const acceptedFileTypes = {
    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp'],
  };
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const [showDropzone, setShowDropzone] = useState(true);
  const readerRef = useRef<FileReader | null>(null);

  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    setShowDropzone(false);
    const file = acceptedFiles[0];

    const reader = new FileReader();
    readerRef.current = reader;
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setLoadingProgress(progress);
      }
    };

    reader.onload = function (e) {
      setImageFile(file);
      setUploadStatus('complete');
    };

    reader.onerror = () => {
      setUploadStatus('error');
    };

    reader.readAsDataURL(file);
    return file;
  }, []);

  function isFormValid() {
    return imageFile !== null && name.length > 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function printUploadStatusMessage() {
    if (!uploadStatus) {
      return `cargando {loadingProgress}%`;
    }
    if (uploadStatus === 'complete') {
      return '100% cargado';
    } else {
      return '¡error! no se pudo cargar la película';
    }
  }

  function printUploadStatusButtonText() {
    if (!uploadStatus) {
      return <span className="text-white font-bold">cancelar</span>;
    } else {
      return <span className="text-white font-bold">reintentar</span>;
    }
  }

  const cancelUpload = () => {
    if (readerRef.current) {
      readerRef.current.abort();
      setUploadStatus('error');
    }
  };

  const resetUpload = () => {
    readerRef.current = null;
    setImageFile(null);
    setShowDropzone(true);
    setLoadingProgress(0);
    setUploadStatus('');
  };

  function onUploaStatusButtonPress() {
    if (!uploadStatus) {
      return cancelUpload();
    } else {
      return resetUpload();
    }
  }

  function buildSelectFile() {
    return (
      <form
        className="my-8 md:my-0 w-10/12 flex flex-col space-y-6 items-center"
        onSubmit={handleSubmit}>
        <h2 className="font-bold text-aqua text-xl mb-6">agregar película</h2>
        {showDropzone ? (
          <Dropzone
            onDrop={onDrop}
            accept={acceptedFileTypes}
            multiple={false}
          />
        ) : (
          <div className="w-full text-white font-regular">
            <p className="my-4">{printUploadStatusMessage()}</p>
            <div className="h-4">
              <div
                className={`h-full rounded-full ${
                  uploadStatus === 'error' ? 'bg-orchid' : 'bg-aqua'
                }`}
                style={{ width: `${loadingProgress}%` }}></div>
            </div>
            <div className="my-4 flex justify-end">
              {uploadStatus === 'complete' ? (
                <span className="text-lg text-aqua font-light">¡Listo!</span>
              ) : (
                <button className="text-lg" onClick={onUploaStatusButtonPress}>
                  {printUploadStatusButtonText()}
                </button>
              )}
            </div>
          </div>
        )}
        <input
          type="text"
          placeholder="título"
          className="w-60 bg-transparent text-white font-regular placeholder:font-regular text-center border-b-2 border-b-white focus:outline-none"
          onChange={(e) => setName(e.target.value.trim().toLocaleLowerCase())}
        />
        <button
          className="w-60 font-regular text-lg text-black p-4 bg-white disabled:bg-white/50"
          disabled={!isFormValid()}
          onClick={requestUpload}>
          subir película
        </button>
      </form>
    );
  }

  function requestUpload() {
    setUploadStatus('request-upload');
    const formData = new FormData();
    formData.append('title', name);
    formData.append('file', imageFile as Blob);

    fetch(`${process.env.REACT_APP_LITEFLIX_API}/movies/add`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('It was not possible to upload the file');
        }
        setUploadStatus('with-error');
      })
      .then((data) => {
        setUploadStatus('request-complete');
      })
      .catch((error) => {
        console.error('Unexpected error - unable to upload the file', error);
        setUploadStatus('with-error');
      });
  }

  function buildRequestUpload() {
    if (uploadStatus === 'request-upload') {
      return (
        <div className="my-8 md:my-0 h-40 flex flex-col items-center justify-center">
          <h2 className="text-white font-regular text-xl">
            un momento, estamos terminando
          </h2>
          <div className="flex space-x-4 mt-4 items-center">
            <div className="h-6 w-6 rounded-full delay-75 animate-pulse bg-white"></div>
            <div className="h-6 w-6 rounded-full delay-100 animate-pulse bg-white"></div>
            <div className="h-6 w-6 rounded-full delay-150 animate-pulse bg-white"></div>
          </div>
        </div>
      );
    }
    if (uploadStatus === 'with-error') {
      return (
        <div className="my-8 md:my-0 flex flex-col items-center justify-center">
          <span className="text-white font-regular">
            No fue posible procesar la carga del archivo al servidor
          </span>
          <button
            className="bg-white font-regular w-60 py-3"
            onClick={() => onClose()}>
            cerrar
          </button>
        </div>
      );
    } else {
      return (
        <div className="text-white flex flex-col items-center justify-center space-y-4">
          <img src={Logo} alt="Liteflix" className="w-60" />
          <h2 className="text-xl font-bold">¡Felicitaciones!</h2>
          <p>{name} fue correctamente subida.</p>
          <button
            className="bg-white text-black w-60 py-3"
            onClick={() => onClose()}>
            ir a home
          </button>
        </div>
      );
    }
  }

  return (
    <Modal>
      {showPhoneScreenLayout && (
        <NavBar showPhoneScreenLayout={true} onMenuButtonPress={onClose} />
      )}
      <div className="relative flex flex-col items-center space-y-10">
        {!showPhoneScreenLayout && (
          <div className="absolute right-0">
            <CloseButton onPress={onClose} />
          </div>
        )}
        {!['request-upload', 'request-complete'].includes(uploadStatus)
          ? buildSelectFile()
          : buildRequestUpload()}
      </div>
    </Modal>
  );
}

export default AddMovieModal;
