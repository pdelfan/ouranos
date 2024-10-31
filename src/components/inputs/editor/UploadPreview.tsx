import Button from "@/components/actions/button/Button";
import { PiWarningCircleFill } from "react-icons/pi";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import Textarea from "../textarea/Textarea";
import { CgClose } from "react-icons/cg";

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
      <div className="my-2 grid w-full grid-cols-2 gap-2">
        {images.map((image) => (
          <div key={image.url} className="animate-fade relative h-fit">
            <Button
              className="text-skin-secondary bg-skin-secondary hover:bg-skin-muted border border-skin-base hover:text-skin-base absolute top-0 m-2 rounded-full p-2"
              onClick={(e) => {
                e.preventDefault();
                handleRemove(image);
              }}
            >
              <CgClose className="text-xl" />
            </Button>
            <div className="absolute bottom-0 m-2">
              <Dialog.Root open={showAltTextModal}>
                <Dialog.Trigger>
                  <Button
                    className="text-skin-secondary bg-skin-secondary hover:bg-skin-muted border border-skin-base hover:text-skin-base rounded-full px-3 py-2 text-sm font-medium"
                    onClick={() => {
                      setSelectedImage(image);
                      setShowAltTextModal(true);
                      setAltText(image.altText ?? "");
                    }}
                  >
                    {image.altText ? "Edit alt text" : "Add alt text"}
                  </Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Content>
                    {selectedImage && (
                      <section className="animate-fade-up animate-duration-200 bg-skin-base border-skin-base fixed bottom-0 z-50 flex h-full w-full flex-col justify-between overflow-scroll rounded-t-3xl p-3 shadow-2xl md:h-fit md:border-t">
                        <div>
                          <Image
                            src={selectedImage.url}
                            alt="Uploaded image"
                            width={200}
                            height={200}
                            className="mx-auto max-h-80 rounded-xl object-cover md:max-w-xl border border-skin-base"
                          />
                          <div className="mx-auto mt-3 flex items-center gap-2 md:max-w-xl">
                            <PiWarningCircleFill className="text-skin-base shrink-0 text-2xl" />
                            <small className="text-skin-secondary">
                              Alt text describes images for users with
                              disabilities and helps give context to everyone.
                            </small>
                          </div>
                          <div className="mx-auto mt-2 md:max-w-xl">
                            <Textarea
                              rows={6}
                              autoFocus={false}
                              placeholder="Describe what's happening in this image"
                              defaultValue={selectedImage.altText ?? ""}
                              onChange={(e) =>
                                setAltText(e.currentTarget.value)
                              }
                              className="resize-none"
                            />
                            <div className="mt-2 flex justify-end gap-3">
                              <Button
                                onClick={() => {
                                  setShowAltTextModal(false);
                                  setAltText("");
                                }}
                                className="border-skin-base text-skin-base hover:bg-skin-secondary rounded-full border px-4 py-2 text-sm font-semibold"
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
                                className="bg-primary hover:bg-primary-dark text-skin-icon-inverted rounded-full px-6 py-2 text-sm font-semibold"
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
              className="aspect-square max-h-40 w-full rounded-xl object-cover border border-skin-base"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
