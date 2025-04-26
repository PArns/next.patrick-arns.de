import Desktop from "@/components/os/desktop";
import DesktopWindow from "@/components/os/window";
import { GetBackgroundImages } from "@/data-provider/contentful/provider/background-image-provider";
import { GetSocialMediaLinks } from "@/data-provider/contentful/provider/social-media-link-provider";
import PageBaseConfiguration, {
  RegisteredDesktopWindows,
  SlotProps,
} from "@/configuration";

export default async function AppLayout(
  props: SlotProps & { params: Promise<{ lng: string }> },
) {
  const params = await props.params;

  const config = PageBaseConfiguration();
  const backgroundImages = await GetBackgroundImages();
  const socialMediaLinks = await GetSocialMediaLinks();
  const desktopWindows = await RegisteredDesktopWindows(params.lng);

  return (
    <Desktop
      backgroundImages={backgroundImages}
      socialMediaLinks={socialMediaLinks}
      desktopWindows={desktopWindows}
      pageName={config.title}
      locale={params.lng}
    >
      {desktopWindows.map((win) => (
        <DesktopWindow
          key={win.key}
          width={win.width}
          height={win.height}
          maxWidth={win.maxWidth}
          route={win.route}
          title={win.title}
          icon={win.icon}
          isInitiallyOpen={win.isInitiallyOpen}
          id={win.key}
        >
          {props[win.key as keyof SlotProps]}
        </DesktopWindow>
      ))}
    </Desktop>
  );
}
