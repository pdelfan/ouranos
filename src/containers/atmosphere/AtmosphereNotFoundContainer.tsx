import Link from "next/link";
import Alert from "@/components/feedback/alert/Alert";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import WhiteWindLogo from "@/assets/images/whtwndLogo.jpg";
import LinkatLogo from "@/assets/images/LinkatLogo.jpg";
import FrontpageLogo from "@/assets/images/frontpageLogo.jpg";

interface Props {
  url: string;
  title: string;
  description: string;
  logo: string;
}

function AtmosphereItem(props: Props) {
  const { url, title, description, logo } = props;

  return (
    <Link href={url}>
      <article className="flex items-start gap-3 p-3 border border-skin-base rounded-xl bg-skin-base hover:bg-skin-secondary">
        <Avatar src={logo} size="md" />
        <div className="flex flex-col">
          <span className="text-skin-base font-medium">{title}</span>
          <span className="text-skin-secondary text-sm">{description}</span>
        </div>
      </article>
    </Link>
  );
}

export default function AtmosphereNotFoundContainer() {
  return (
    <section className="p-3 bg-skin-base border-skin-base md:border-x border-b md:rounded-b-2xl">
      <Alert variant="info" message="No apps found" />
      <p className="font-medium text-skin-base mt-5">
        Ouranos currently supports the following apps in the atmosphere:
      </p>
      <ul className="flex flex-col gap-2 mt-2">
        <li>
          <AtmosphereItem
            url="/dashboard/user/frontpage.fyi"
            title="Frontpage"
            description="A decentralised and federated link aggregator built on the same technologies as Bluesky."
            logo={FrontpageLogo.src}
          />
        </li>
        <li>
          <AtmosphereItem
            url="/dashboard/user/linkat.blue"
            title="Linkat"
            description="Create your Link in Bio for Bluesky."
            logo={LinkatLogo.src}
          />
        </li>
        <li>
          <AtmosphereItem
            url="/dashboard/user/whtwnd.com"
            title="White Wind"
            description="A Markdown blog service (AppView) which uses atproto."
            logo={WhiteWindLogo.src}
          />
        </li>
      </ul>
    </section>
  );
}
