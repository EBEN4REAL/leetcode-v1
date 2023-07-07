import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import RangeSlider from "@/components/Range_slider/Range_slider";
import DraggableImage from "@/components/DraggableImg";

interface UploadAvatarProps {
  onModalClose: () => void;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ onModalClose }) => {
  const [value, setRangeValue] = useState<number>(1.02);
  const [key, setKey] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>(
    "https://assets.leetcode.com/users/avatars/avatar_1687989636.png"
  );

  const [rotatingAngle, setRotatingAngle] = useState<number>(0);
  const canvasWrapperRef = useRef(null);
  const [resetCanvas, setResetCanvas] = useState<boolean>(false);
  const [saveImage, setSaveImage] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileUpload = () => {
    const fileUpload = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;

    if (fileUpload) {
      fileUpload.click();
    }
  };

  useEffect(() => {
    const imageInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;

    if (imageInput) {
      imageInput.addEventListener("change", handleImageSelection);
    }

    function handleImageSelection(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImageUrl(imageUrl);
      }
    }
  });

  function rotateImg(mode: string) {
    const angle = mode === "clockwise" ? 90 : -90;
    setRotatingAngle((prev) => prev + angle);
  }

  function resetImage() {
    setRotatingAngle(0);
    setResetCanvas((prev) => !prev);
    setRangeValue(1);
  }

  function handleImageSave() {
    setSaveImage((prev) => !prev);
  }

  return (
    <div className=" top-0 left-0 w-full h-full bg-[#000000b5] z-10  fixed backdrop-blur-sm">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 min-h-[400px] min-w-[450px] rounded-md">
        <div className="h-[50px] w-full bg-white flex items-center justify-between rounded-tl-md rounded-tr-md">
          <span className="text-lg text-black pl-3">Upload a New Avatar</span>
          <span
            aria-hidden="true"
            onClick={() => onModalClose()}
            className="text-2xl mr-3 text-gray-300 font-bold cursor-pointer"
          >
            ×
          </span>
          <span className="sr-only">Close</span>
        </div>
        <div className="bg-[#151414] w-full flex flex-col items-center justify-center gap-5 py-8">
          <div
            className="h-[200px] w-[200px] relative group ring-8 ring-white rounded-[10px] flex justify-center items-center overflow-auto"
            ref={canvasWrapperRef}
          >
            <DraggableImage
              key={key}
              value={value}
              imageUrl={imageUrl}
              rotatingAngle={rotatingAngle}
              resetCanvas={resetCanvas}
              onReset={() => setResetCanvas(false)}
              saveImage={saveImage}
              onModalClose={() => onModalClose()}
              onUploadingChange={(uploading) =>
                setUploading((prev) => uploading)
              }
            />
          </div>
          <div className="flex gap-2">
            <div
              className="rounded-md cursor-pointer px-3 py-1 bg-white"
              onClick={() => rotateImg("antiClockwise")}
            >
              <i className="fa fa-undo" aria-hidden="true"></i>
            </div>
            <div
              className="rounded-md px-3 cursor-pointer py-1 bg-white rotate-0"
              onClick={() => rotateImg("clockwise")}
            >
              <i className="fa fa-repeat" aria-hidden="true"></i>
            </div>
            <div
              className="rounded-md px-2 py-1 bg-white cursor-pointer"
              onClick={() => resetImage()}
            >
              <span>Reset</span>
            </div>
          </div>
        </div>
        <div className="bg-white w-full pt-2">
          <div className="border border-[#ccc] h-[17px] mx-3 rounded  relative">
            <RangeSlider
              onRangeChange={(value) => {
                setRangeValue(value);
              }}
              className="absolute top-[3px] left-1/2 -translate-x-1/2 -translate-y-1/2 px-3"
              value={value}
            />
          </div>
        </div>
        <div className="flex justify-center w-full bg-white py-1 pb-3 ">
          <div
            className="flex items-center gap-2 my-3 rounded-md border border-[#ddd] mx-2 py-1.5 px-2.5 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleFileUpload()}
          >
            <i className="fa fa-file-image-o"></i>
            <span className="text-[#333] text-sm">Choose Image...</span>
          </div>
          <input id="file-upload" type="file" className="hidden" />
        </div>
        <div className="bg-white flex justify-end rounded-bl-md rounded-br-md pb-3 pt-3">
          <div className="flex gap-0">
            <div
              className="flex items-center gap-2 my- text-[#00acff] font-bold  rounded-md border bg-[#efefef] border-[#ddd] py-1.5 px-2.5 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleImageSave()}
            >
              <i className="fa fa-floppy-o" aria-hidden="true"></i>
              <span className="text-sm">
                {uploading ? (
                  <span className="font-italic">uploading...</span>
                ) : (
                  "Save"
                )}
              </span>
            </div>
            <div
              className="flex items-center gap-2 my- rounded-md border bg-[#efefef] border-[#ddd] mx-2 py-1.5 px-2.5 hover:bg-gray-100 cursor-pointer text-[#00acff] font-bold "
              onClick={() => onModalClose()}
            >
              <span className="text-sm">Cancel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAvatar;
