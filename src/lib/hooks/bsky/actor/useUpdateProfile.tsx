import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { compressImage } from "@/lib/utils/image";
import { useAgent } from "@/app/providers/agent";

interface Props {
  displayName: string | null;
  description: string | null;
  banner: UploadImage | null;
  avatar: UploadImage | null;
}

export function useUpdateProfile(props: Props) {
  const { displayName, description, banner, avatar } = props;
  const agent = useAgent();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await agent.upsertProfile(async (existing) => {
        const profile = existing || {};
        if (displayName || displayName === "") {
          profile.displayName = displayName;
        }
        if (description || description === "") {
          profile.description = description;
        }
        if (banner) {
          const blob = await compressImage(banner);
          const uploaded = await agent.uploadBlob(
            new Uint8Array(await blob.arrayBuffer()),
            {
              encoding: blob.type,
            },
          );
          profile.banner = uploaded.data.blob;
        }
        if (avatar) {
          const blob = await compressImage(avatar);
          const uploaded = await agent.uploadBlob(
            new Uint8Array(await blob.arrayBuffer()),
            {
              encoding: blob.type,
            },
          );
          profile.avatar = uploaded.data.blob;
        }
        return profile;
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: () => {
      toast.error("Could not update profile", { id: "Profile update error" });
    },
  });

  return mutation;
}
