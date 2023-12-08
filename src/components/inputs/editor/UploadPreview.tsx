import Button from "@/components/actions/button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import Textarea from "../textarea/Textarea";

interface Props {
  images: UploadImage[];
  onUpdate: React.Dispatch<SetStateAction<UploadImage[] | undefined>>;
}

export default function UploadPreview(props: Props) {
  const { images, onUpdate } = props;
  const [showAltTextModal, setShowAltTextModal] = useState(false);
  const [altText, setAltText] = useState("");
  const [selectedImage, setSelectedImage] = useState<UploadImage | null>(null);

  const handleRemove = (image: UploadImage) => {
    onUpdate((prev) =>
      prev?.filter((prevImage) => prevImage.url !== image.url)
    );
  };

  return (
    <section>
      <div className="grid grid-cols-2 gap-2 my-2 w-full">
        {images.map((image) => (
          <div
            key={image.url}
            className="relative cursor-pointer h-fit animate-fade"
          >
            <Button
              className="absolute top-0  m-2 p-2 bg-black/50 text-white rounded-full hover:bg-neutral-700"
              icon="ph:x-bold"
              onClick={(e) => {
                e.preventDefault();
                handleRemove(image);
              }}
            />
            <div className="absolute bottom-0 m-2">
              <Dialog.Root open={showAltTextModal}>
                <Dialog.Trigger>
                  <div
                    className="py-2 px-3 bg-black/50 text-white text-sm font-medium rounded-full hover:bg-neutral-700"
                    onClick={() => {
                      setSelectedImage(image);
                      setShowAltTextModal(true);
                      setAltText(image.altText ?? "");
                    }}
                  >
                    {image.altText ? "Edit alt text" : "Add alt text"}
                  </div>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Content>
                    {selectedImage && (
                      <section className="flex flex-col justify-between bg-white p-3 bottom-0 z-50 fixed  w-full h-full md:h-fit md:border-t shadow-xl rounded-t-3xl overflow-scroll animate-fade-up animate-duration-200">
                        <div>
                          <Image
                            src={selectedImage.url}
                            alt="Uploaded image"
                            width={200}
                            height={200}
                            className="rounded-xl object-cover  max-h-80 md:max-w-xl mx-auto"
                          />
                          <div className="flex items-center gap-2 md:max-w-xl mx-auto mt-3">
                            <Icon
                              icon="ep:warning-filled"
                              className="text-2xl text-neutral-600 shrink-0"
                            />
                            <small className="text-neutral-500">
                              Alt text describes images for users with
                              disabilities and helps give context to everyone.
                            </small>
                          </div>
                          <div className="mt-2 mb-10 md:max-w-xl mx-auto">
                            <Textarea
                              rows={6}
                              autoFocus={false}
                              placeholder="Describe what's happening in this image"
                              defaultValue={selectedImage.altText ?? ""}
                              onChange={(e) =>
                                setAltText(e.currentTarget.value)
                              }
                            />
                            <div className="flex justify-end gap-3 mt-1">
                              <Button
                                onClick={() => {
                                  setShowAltTextModal(false);
                                  setAltText("");
                                }}
                                className="px-4 py-2 text-sm font-semibold border rounded-full hover:bg-neutral-50"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => {
                                  setShowAltTextModal(false);
                                  onUpdate((prev) =>
                                    prev?.map((prevImage) =>
                                      prevImage.url === selectedImage.url
                                        ? Object.assign(prevImage, {
                                            altText:
                                              altText !== selectedImage.altText
                                                ? altText
                                                : selectedImage.altText,
                                          })
                                        : prevImage
                                    )
                                  );
                                }}
                                className="bg-primary py-2 px-6 rounded-full text-white hover:bg-primary-dark"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </section>
                    )}
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
            <Image
              src={image.url}
              alt="Uploaded image"
              width={200}
              height={200}
              className="rounded-xl object-cover aspect-square w-full max-h-40"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
