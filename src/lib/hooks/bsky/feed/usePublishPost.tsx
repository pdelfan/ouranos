import {
  ComposerOptionsPostRef,
  ComposerOptionsQuote,
} from "@/app/providers/compoter";
import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  AtUri,
  ComAtprotoLabelDefs,
  RichText,
} from "@atproto/api";
import useAgent from "../useAgent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { detectLanguage, jsonToText } from "@/lib/utils/text";
import { compressImage } from "@/lib/utils/image";
import { JSONContent } from "@tiptap/react";
import toast from "react-hot-toast";

interface Props {
  text: JSONContent;
  linkCard: LinkMeta | null;
  replyTo?: ComposerOptionsPostRef;
  quote?: ComposerOptionsQuote;
  languages: string[];
  images?: UploadImage[];
  label: string;
}

export default function usePublishPost(props: Props) {
  const { text, linkCard, replyTo, quote, languages, images, label } = props;
  const agent = useAgent();
  const queryClient = useQueryClient();
  const MAX_POST_LENGTH = 300;

  return useMutation({
    mutationKey: ["publishPost"],
    mutationFn: async () => {
      const richText = new RichText({ text: jsonToText(text) });
      await richText.detectFacets(agent);

      if (richText.graphemeLength > MAX_POST_LENGTH) {
        throw new Error(
          "Post length exceeds the maximum length of 300 characters"
        );
      }

      let lang: string[] = [];

      if (languages.length > 0) {
        lang = languages;
      } else {
        const detectedLanguage = await detectLanguage(richText.text);
        lang = detectedLanguage ?? [];
      }

      let selfLabels: ComAtprotoLabelDefs.SelfLabels | undefined;

      if (label) {
        selfLabels = {
          $type: "com.atproto.label.defs#selfLabels",
          values: [label].map((val) => ({ val })),
        };
      }

      let reply;

      if (replyTo) {
        const replyToUrip = new AtUri(replyTo.uri);
        const parentPost = await agent.getPost({
          repo: replyToUrip.host,
          rkey: replyToUrip.rkey,
        });

        if (parentPost) {
          const parentRef = {
            uri: parentPost.uri,
            cid: parentPost.cid,
          };
          reply = {
            root: parentPost.value.reply?.root || parentRef,
            parent: parentRef,
          };
        }
      }

      // embed can be:
      // images
      // record
      // record with media
      // external (link card, record link, pasted images)

      // re-assign embed based on these conditions
      // TODO: add support for pasted images or record links

      let embed:
        | AppBskyEmbedImages.Main
        | AppBskyEmbedRecord.Main
        | AppBskyEmbedRecordWithMedia.Main
        | AppBskyEmbedExternal.Main
        | undefined;

      let embedRecordWithMedia: AppBskyEmbedRecordWithMedia.Main;
      let embedExternal: AppBskyEmbedExternal.Main | undefined;
      let embedImages: AppBskyEmbedImages.Main = {
        $type: "app.bsky.embed.images",
        images: [],
      };

      // has images
      if (images?.length) {
        for (const img of images) {
          try {
            const blob = await compressImage(img);
            const uploaded = await agent.uploadBlob(
              new Uint8Array(await blob.arrayBuffer()),
              {
                encoding: blob.type,
              }
            );

            embedImages.images.push({
              image: uploaded.data.blob,
              alt: img.altText || "",
            });
          } catch (e) {
            throw new Error("Failed to upload image");
          }
        }
      }

      // record with media
      if (embedImages.images.length && quote?.uri) {
        embedRecordWithMedia = {
          $type: "app.bsky.embed.recordWithMedia",
          media: embedImages,
          record: {
            $type: "app.bsky.embed.record",
            record: {
              uri: quote.uri,
              cid: quote.cid,
            },
          },
        };
        embed = embedRecordWithMedia;
      }
      // media (images and/or with quote)
      else {
        if (embedImages.images.length) {
          embed = embedImages;
        }

        if (quote?.uri) {
          embed = {
            $type: "app.bsky.embed.record",
            record: {
              uri: quote.uri,
              cid: quote.cid,
            },
          };
        }

        // external (link card, record link, or pasted images) and no images and quote
        if (linkCard && !embedImages.images.length && !quote?.uri) {
          // link card
          if (linkCard.url) {
            embedExternal = {
              $type: "app.bsky.embed.external",
              external: {
                uri: linkCard.url,
                title: linkCard.title || "",
                description: linkCard.description || "",
              },
            };

            // need to upload link card image
            if (linkCard.image) {
              try {
                const image = await fetch(linkCard.image);
                const blob = await compressImage(
                  (await image.blob()) as UploadImage
                );
                const uploaded = await agent.uploadBlob(
                  new Uint8Array(await blob.arrayBuffer()),
                  {
                    encoding: blob.type,
                  }
                );
                embedExternal.external.thumb = uploaded.data.blob;
              } catch (e) {
                throw new Error("Failed to upload link card image");
              }
            }
            embed = embedExternal;
          }
        }
      }

      if (!embed && richText.graphemeLength === 0) {
        throw new Error("Your post must contain at least some text or image");
      }

      await agent.post({
        createdAt: new Date().toISOString(),
        text: richText.text,
        facets: richText.facets,
        langs: lang,
        labels: selfLabels,
        reply: reply,
        embed: embed,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
      queryClient.invalidateQueries({ queryKey: ["postThread"] });
      toast.success("Post published");
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}
