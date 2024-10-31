import type { Metadata } from "next";
import { SiGooglemessages } from "react-icons/si";

export const metadata: Metadata = {
  title: "Topic",
  description: "Topic",
};

export default async function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <article className="border-skin-base flex flex-col gap-2 border-x-0 border-t-0 border-b px-3 py-2 md:border md:rounded-t-2xl">
        <div className="flex flex-wrap items-center gap-2 text-skin-secondary">
          <div className="bg-primary/10 p-3 rounded-full">
            <SiGooglemessages className="text-primary text-2xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg text-skin-base">Topic</span>
            <span className="font-medium text-skin-secondary">
              Posts that mention this content
            </span>
          </div>
        </div>
      </article>
      {children}
    </>
  );
}
