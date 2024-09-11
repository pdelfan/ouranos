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
        <Button className="text-skin-secondary bg-skin-tertiary flex items-center justify-center gap-1 rounded-full px-4 py-2 text-sm font-medium hover:brightness-95 disabled:cursor-not-allowed">
          Edit Profile
        </Button>
      </Dialog.Trigger>
      <Dialog.Overlay className="animate-fade animate-duration-200 bg-skin-overlay-muted fixed inset-0 z-50 h-screen w-screen" />
      <Dialog.Content className="animate-fade animate-duration-200 bg-skin-base border-skin-base fixed left-[50%] top-[50%] z-50 h-fit max-h-[90svh] w-[90svw] max-w-xl translate-x-[-50%] translate-y-[-50%] overflow-auto rounded-2xl border p-3 shadow-2xl">
        <h2 className="text-skin-base mb-2 text-center text-xl font-semibold">
          Edit My Profile
        </h2>
        <div className="relative">
          <div className="bg-skin-muted absolute bottom-3 right-3 rounded-full p-1">
            <BiSolidCamera className="text-skin-icon-base" />
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
                  className="h-[9rem] rounded-2xl object-cover hover:cursor-pointer"
                />
              </div>
            )}
          </Dropzone>
          <div className="absolute bottom-0 translate-y-1/2 transform px-3 ">
            <div className="bg-skin-muted absolute bottom-3 right-3 rounded-full p-1">
              <BiSolidCamera className="text-skin-icon-base" />
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
                    className="bg-skin-base h-[95px] w-[95px] rounded-full border-4 border-transparent object-cover hover:cursor-pointer"
                  />
                </div>
              )}
            </Dropzone>
          </div>
        </div>
        <div className="mx-auto mt-14 md:max-w-xl">
          <div>
            <h3 className="text-skin-base mb-2 text-xl font-semibold">
              Display Name
            </h3>
            <Input
              maxLength={MAX_DISPLAY_NAME_LENGTH}
              placeholder="Your name"
              defaultValue={profile.displayName || profile.handle}
              onChange={(e) => setDisplayName(e.currentTarget.value)}
            />
          </div>
          <div>
            <h3 className="text-skin-base my-2 text-xl font-semibold">
              Description
            </h3>
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
        <div className="mt-2 flex justify-end gap-2">
          <Dialog.Close className="text-skin-base border-skin-base hover:bg-skin-secondary rounded-full border px-4 py-2 text-sm font-semibold">
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
            className={`bg-primary hover:bg-primary-dark text-skin-icon-inverted rounded-full px-4 py-2 text-sm font-semibold ${
              updateProfile.isPending && "animate-pulse animate-duration-1000"
            }`}
          >
            {updateProfile.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
