import React, { useRef, useEffect, useState } from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

interface CanvasDraggableImageProps {
  imageUrl: string;
  value: number;
  rotatingAngle: number;
  resetCanvas: boolean;
  saveImage: boolean;
  onReset: () => void;
}

const CanvasDraggableImage: React.FC<CanvasDraggableImageProps> = ({
  imageUrl,
  value: scale,
  rotatingAngle,
  resetCanvas,
  onReset,
  saveImage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [localImageUrl, setLocalImageUrl] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

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
        setLocalImageUrl(data.imageUrl);
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
      ? (localImageUrl as string)
      : imageUrl;

    console.log("71 imageUrl", imageObj.src);

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

  useEffect(() => {
    if (saveImage) {
      if (canvasRef) {
        const canvas = canvasRef.current;
        if (canvas) {
          const imageUrl = canvas.toDataURL();
          console.log(imageUrl);
        }
      }
    }
  }, [saveImage]);

  console.log("isLoading", isLoading);

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
