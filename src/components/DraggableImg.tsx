import React, { useRef, useEffect, useState } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

import firebase from "firebase/app";
import "firebase/storage";
import { toast } from "react-toastify";
import { auth } from "@/firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

interface CanvasDraggableImageProps {
  imageUrl: string;
  value: number;
  rotatingAngle: number;
  resetCanvas: boolean;
  saveImage: boolean;
  onReset: () => void;
  onUploadingChange: (uploading: boolean) => void;
  uploadSuccessful: (bool: boolean) => void;
  onModalClose: () => void;
}

const CanvasDraggableImage: React.FC<CanvasDraggableImageProps> = ({
  imageUrl,
  value: scale,
  rotatingAngle,
  resetCanvas,
  onReset,
  saveImage,
  onUploadingChange,
  uploadSuccessful,
  onModalClose
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [localImageUrl, setLocalImageUrl] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const [uploading, setUploading] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  const userId = auth?.currentUser?.uid;
  const storage = getStorage();
  const storageRef = ref(storage, `profilePictures/${userId}/${user?.email}`);

  const handleDrag = (event: DraggableEvent, data: DraggableData) => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.left = `${data.x}px`;
      canvas.style.top = `${data.y}px`;
    }
  };

  useEffect(() => {
    const convertImageUrl = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/convert-image?url=${encodeURIComponent(imageUrl)}`
        );
        const data = await response.json();
        const blob = base64ToBlob(data.imageUrl)
        const blobUrl = URL.createObjectURL(blob)
        setLocalImageUrl(blobUrl);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error converting image:", error);
      }
    };

    if (!imageUrl.includes("blob")) {
      convertImageUrl();
    }
  }, [imageUrl]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const image = imageRef.current;

    if (!canvas || !context || !image) return;

    const imageObj = new Image();
    imageObj.src = !imageUrl.includes("blob")
      ? localImageUrl
      : imageUrl;

    imageObj.onload = () => {
      const scaledWidth = imageObj.width * scale;
      const scaledHeight = imageObj.height * scale;

      context.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      context.translate(scaledWidth / 2, scaledHeight / 2);
      context.rotate((rotatingAngle * Math.PI) / 180);
      context.translate(-scaledWidth / 2, -scaledHeight / 2);

      if (resetCanvas && context) {
        context.resetTransform();
        context?.resetTransform();
        onReset();
      }
      if (!imageUrl.includes("blob")) {
        setLoading(false);
      }
      context.drawImage(imageObj, 0, 0, scaledWidth, scaledHeight);
    };
  }, [
    imageUrl,
    localImageUrl,
    onReset,
    position,
    resetCanvas,
    rotatingAngle,
    scale,
  ]);


  function base64ToBlob(base64: string, mimeType: string = "image/jpeg"): Blob {
    const byteString = atob(base64.split(",")[1]);
    const buffer = new ArrayBuffer(byteString.length);
    const byteCharacters = new Uint8Array(buffer);

    for (let i = 0; i < byteString.length; i++) {
      byteCharacters[i] = byteString.charCodeAt(i);
    }

    return new Blob([buffer], { type: mimeType });
  }

  const handleUpload = (base64: string) => {
    onUploadingChange(true);
    const blob = base64ToBlob(base64);

    uploadBytes(storageRef, blob).then(() => {
      onModalClose();
      toast.success("Picture uploaded successfully", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      onUploadingChange(false);
      uploadSuccessful(true);
    });
  };

  useEffect(() => {
    if (saveImage) {
      if (canvasRef) {
        const canvas = canvasRef.current;
        if (canvas) {
          const imageUrl = canvas.toDataURL();
          handleUpload(imageUrl);
        }
      }
    }
  }, [saveImage]);

  return (
    <>
      {!isLoading && (
        <Draggable onDrag={handleDrag} defaultPosition={{ x: 0, y: 0 }}>
          <canvas
            ref={canvasRef}
            style={{
              border: "1px solid black",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Draggable Image"
              style={{ visibility: "hidden" }}
            />
          </canvas>
        </Draggable>
      )}
      {isLoading && (
        <div className="h-full w-full rounded-md animate-pulse absolute bg-gray-100"></div>
      )}
    </>
  );
};

export default CanvasDraggableImage;

// import React, { useRef, useEffect, useState } from "react";
// import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
// import firebase from "firebase/app";
// import "firebase/storage";
// import { toast } from "react-toastify";

// import { auth } from '@/firebase/firebase';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { useAuthState } from "react-firebase-hooks/auth";

// interface CanvasDraggableImageProps {
//   imageUrl: string;
//   value: number;
//   rotatingAngle: number;
//   resetCanvas: boolean;
//   saveImage: boolean;
//   onReset: () => void;
//   onModalClose: () => void;
//   onUploadingChange: (uploading: boolean) => void;
//   uploadSuccessful: (bool: boolean) =>  void
// }

// const CanvasDraggableImage: React.FC<CanvasDraggableImageProps> = ({
//   imageUrl,
//   value: scale,
//   rotatingAngle,
//   resetCanvas,
//   onReset,
//   saveImage,
//   onModalClose,
//   onUploadingChange,
//   uploadSuccessful
// }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const imageRef = useRef<HTMLImageElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [localImageUrl, setLocalImageUrl] = useState<string>();
//   const [isLoading, setLoading] = useState<boolean>(false);
//   const [uploading, setUploading] = useState<boolean>(false);
//   const [user] = useAuthState(auth);

//   const userId = auth?.currentUser?.uid;
//   const storage = getStorage();
//   const storageRef = ref(storage, `profilePictures/${userId}/${user?.email}`);

//   const handleDrag = (event: DraggableEvent, data: DraggableData) => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       canvas.style.left = `${data.x}px`;
//       canvas.style.top = `${data.y}px`;
//     }
//   };

//   useEffect(() => {
//     const convertImageUrl = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `/api/convert-image?url=${encodeURIComponent(imageUrl)}`
//         );
//         const data = await response.json();
//         setLocalImageUrl(data.imageUrl);
//         setLoading(false);
//       } catch (error) {
//         setLoading(false);
//       }
//     };

//     if (!imageUrl.includes("blob")) {
//       convertImageUrl();
//     }
//   }, [imageUrl]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const context = canvas?.getContext("2d");
//     const image = imageRef.current;

//     if (!canvas || !context || !image) return;

//     const imageObj = new Image();
//     imageObj.src = !imageUrl.includes("blob")
//       ? (localImageUrl as string)
//       : imageUrl;

//     imageObj.onload = () => {
//       const scaledWidth = imageObj.width * scale;
//       const scaledHeight = imageObj.height * scale;

//       context.clearRect(0, 0, canvas.width, canvas.height);

//       canvas.width = scaledWidth;
//       canvas.height = scaledHeight;

//       context.translate(scaledWidth / 2, scaledHeight / 2);
//       context.rotate((rotatingAngle * Math.PI) / 180);
//       context.translate(-scaledWidth / 2, -scaledHeight / 2);

//       if (resetCanvas && context) {
//         context.resetTransform();
//         context?.resetTransform();
//         onReset();
//       }
//       if (!imageUrl.includes("blob")) {
//         setLoading(false);
//       }
//       context.drawImage(imageObj, 0, 0, scaledWidth, scaledHeight);
//     };
//   }, [
//     imageUrl,
//     localImageUrl,
//     onReset,
//     position,
//     resetCanvas,
//     rotatingAngle,
//     scale,
//   ]);

//   function base64ToBlob(base64: string, mimeType: string = "image/jpeg"): Blob {
//     const byteString = atob(base64.split(",")[1]);
//     const buffer = new ArrayBuffer(byteString.length);
//     const byteCharacters = new Uint8Array(buffer);

//     for (let i = 0; i < byteString.length; i++) {
//       byteCharacters[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([buffer], { type: mimeType });
//   }

//   const handleUpload = (base64: string) => {
//     onUploadingChange(true);
//     const blob = base64ToBlob(base64);

//     uploadBytes(storageRef, blob).then(() => {
//       onModalClose();
//       toast.success("Picture uploaded successfully", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "dark",
//       });
//       onUploadingChange(false);
//       uploadSuccessful(true)
//     });
//   };

//   useEffect(() => {
//     if (saveImage) {
//       if (canvasRef) {
//         const canvas = canvasRef.current;
//         if (canvas) {
//           const imageUrl = canvas.toDataURL();
//           handleUpload(imageUrl);
//         }
//       }
//     }
//   }, [saveImage]);

//   return (
//     <>
//       {!isLoading && (
//         <Draggable onDrag={handleDrag} defaultPosition={{ x: 0, y: 0 }}>
//           <canvas
//             ref={canvasRef}
//             style={{
//               border: "1px solid black",
//               cursor: isDragging ? "grabbing" : "grab",
//             }}
//           >
//             <img
//               ref={imageRef}
//               src={imageUrl}
//               alt="Draggable Image"
//               style={{ visibility: "hidden" }}
//             />
//           </canvas>
//         </Draggable>
//       )}
//     </>
//   );
// };

// export default CanvasDraggableImage;
