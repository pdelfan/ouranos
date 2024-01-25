import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "../button/Button";
import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import FallbackBanner from "@/assets/images/fallbackBanner.png";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { BiSolidCamera } from "react-icons/bi";
import Textarea from "@/components/inputs/textarea/Textarea";
import Input from "@/components/inputs/input/Input";
import Dropzone from "react-dropzone";
import { useUpdateProfile } from "@/lib/hooks/bsky/actor/useUpdateProfile";

interface Props {
  profile: ProfileViewDetailed;
}

export default function EditProfile(props: Props) {
  const { profile } = props;
  const [showModal, setShowModal] = useState(false); // [1
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<UploadImage | null>(null);
  const [avatarImage, setAvatarImage] = useState<UploadImage | null>(null);

  const MAX_DISPLAY_NAME_LENGTH = 64;
  const MAX_DESCRIPTION_LENGTH = 256;

  const updateProfile = useUpdateProfile({
    displayName: displayName,
    description: description,
    banner: bannerImage ? bannerImage : null,
    avatar: avatarImage ? avatarImage : null,
  });

  const onReset = () => {
    setDisplayName(null);
    setDescription(null);
    setBannerImage(null);
    setAvatarImage(null);
  };

  return (
    <Dialog.Root
      open={showModal}
      onOpenChange={() => {
        setShowModal((prev) => !prev);
        onReset();
      }}
    >
      <Dialog.Trigger asChild>
        <Button className="flex items-center justify-center gap-1 font-medium text-sm disabled:cursor-not-allowed rounded-full py-2 px-4 bg-neutral-100 text-neutral-500 hover:brightness-95">
          Edit Profile
        </Button>
      </Dialog.Trigger>
      <Dialog.Overlay className="z-50 bg-black/80 fixed inset-0 w-screen h-screen animate-fade animate-duration-200" />
      <Dialog.Content className="z-50 bg-white w-[90svw] p-3 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-fit max-h-[90svh] max-w-xl md:border-t shadow-2xl rounded-2xl overflow-auto animate-fade animate-duration-200">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Edit My Profile
        </h2>
        <div className="relative">
          <div className="absolute  right-3 bottom-3 bg-neutral-200 p-1 rounded-full">
            <BiSolidCamera />
          </div>
          <Dropzone
            maxFiles={1}
            multiple={false}
            accept={{
              "image/*": [".jpeg", ".png"],
            }}
            onDrop={(file) => {
              const updatedImage = Object.assign(file[0], {
                url: URL.createObjectURL(file[0]),
              });
              setBannerImage(updatedImage);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Image
                  src={
                    bannerImage
                      ? bannerImage.url
                      : profile?.banner ?? FallbackBanner
                  }
                  alt="Banner"
                  width={800}
                  height={100}
                  className="object-cover h-[9rem] rounded-2xl hover:cursor-pointer"
                />
              </div>
            )}
          </Dropzone>
          <div className="absolute bottom-0 transform translate-y-1/2 px-3 ">
            <div className="absolute right-3 bottom-3 bg-neutral-200 p-1 rounded-full">
              <BiSolidCamera />
            </div>
            <Dropzone
              maxFiles={1}
              multiple={false}
              accept={{
                "image/*": [".jpeg", ".png"],
              }}
              onDrop={(file) => {
                const updatedImage = Object.assign(file[0], {
                  url: URL.createObjectURL(file[0]),
                });
                setAvatarImage(updatedImage);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Image
                    src={
                      avatarImage
                        ? avatarImage.url
                        : profile?.avatar ?? FallbackAvatar
                    }
                    alt="Avatar"
                    width={95}
                    height={95}
                    className="object-cover rounded-full h-[95px] w-[95px] border-4 border-white hover:cursor-pointer"
                  />
                </div>
              )}
            </Dropzone>
          </div>
        </div>
        <div className="mt-14 md:max-w-xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2">Display Name</h3>
            <Input
              maxLength={MAX_DISPLAY_NAME_LENGTH}
              placeholder="Your name"
              defaultValue={profile.displayName ?? profile.handle}
              onChange={(e) => setDisplayName(e.currentTarget.value)}
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold my-2">Description</h3>
            <Textarea
              rows={4}
              maxLength={MAX_DESCRIPTION_LENGTH}
              placeholder="Describe yourself"
              defaultValue={profile.description ?? ""}
              onChange={(e) => setDescription(e.currentTarget.value)}
              className="resize-none"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-2 justify-end">
          <Dialog.Close className="px-4 py-2 text-sm text-neutral-600 font-semibold border rounded-full hover:bg-neutral-50">
            Cancel
          </Dialog.Close>
          <Button
            onClick={() => {
              updateProfile.mutateAsync(undefined, {
                onSuccess: () => {
                  onReset();
                  setShowModal(false);
                },
              });
            }}
            disabled={updateProfile.isPending}
            className={`bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary-dark ${
              updateProfile.isPending && "animate-pulse"
            }`}
          >
            {updateProfile.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
