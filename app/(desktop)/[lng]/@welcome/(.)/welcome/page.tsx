import TranslateSwitch, {
  Translation,
} from "@/components/translate/translate-switch";

import initTranslations from "@/components/translate/i18n";
import BlogTeaser from "@/components/blog/blog-teaser";
import { getPageAlternates } from "@/helper/localization";
import AboutAuthor from "@/parts/about-author";

export async function generateMetadata(props: {
  params: Promise<{ lng: string; pageNumber: number; tag: string | undefined }>;
}) {
  const params = await props.params;
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["titles"],
  });

  return {
    title: t("welcome"),
    alternates: getPageAlternates("welcome"),
    openGraph: {
      type: "website",
      locale: params.lng,
    },
  };
}

export default async function Welcome(props: {
  params: Promise<{ lng: string }>;
}) {
  const params = await props.params;
  return (
    <div className="@container mx-auto">
      <div className="flex">
        <article className="m-4 rounded-md bg-white p-4 dark:bg-neutral-800">
          <TranslateSwitch locale={params.lng}>
            <Translation lang="de">
              <h1 className="mb-2 text-2xl">Hallo Fremder!</h1>
              <p className="mb-4">
                Wie man in den letzten Wochen gesehen hat, tut sich gerade so
                einiges auf diesen Seiten.
              </p>
              <p className="mb-4">
                Neben einem leicht geänderten Layout, geht es aber vor allem
                gerade &quot;unter der Haube&quot; zur Sache.
              </p>
              <p className="mb-4">
                Nachdem GatsbyJS ja leider beschlossen hat, das kostenlose
                Hosting einzustellen, bin ich mit Sack &amp; Pack auf Next.js
                und Vercel Pro umgezogen.
              </p>
              <p className="mb-4">
                Leider hat das auch bedeutet, dass ich das alte, ebenfalls
                selbst geschriebene Framework meiner Seite nicht mehr weiter
                verwenden konnte. Der Grund ist hier vor allem, dass Gatsby
                Bilder beim Kompilieren berechnet und aktualisiert, was leider
                mit Vercel ziemlich inkompatibel ist, zumindest wenn es so viele
                Bilder wie hier sind.
              </p>
              <p className="mb-4">
                Da das alte Framework für den Inhalt der &quot;Fenster&quot;
                aber auch überwiegend <i>IFrames</i> verwendet hat, und dies
                gerade mit Google so einiges an Problemen gemacht hat, kommt
                diese Version nun komplett ohne <i>IFrames</i> aus.
              </p>
              <p className="mb-4">
                Zusätzlich ist die Seite nun auch in Deutsch und Englisch
                verfügbar, was nicht zuletzt dem geschuldet ist, dass ich
                überwiegend im englischen Bereich arbeite und ungern deutsche
                Seiten verlinkt habe.
              </p>
              <p>
                Zudem ist das Framework und der Inhalt der Seite nun explizit
                Open Source und bei{" "}
                <a
                  href="https://github.com/PArns/next.patrick-arns.de"
                  className="external"
                  target="_blank"
                >
                  GitHub zu finden
                </a>
                !
              </p>
            </Translation>
            <Translation lang="en">
              <h1 className="mb-2 text-2xl">Hello Stranger!</h1>
              <p className="mb-4">
                As you may have noticed in recent weeks, there&apos;s been quite
                a bit happening on these pages.
              </p>
              <p className="mb-4">
                In addition to a slightly modified layout, there&apos;s a lot
                going on &quot;under the hood&quot; right now.
              </p>
              <p className="mb-4">
                Unfortunately, after GatsbyJS decided to discontinue its free
                hosting, I packed up and migrated to Next.js and Vercel Pro.
              </p>
              <p className="mb-4">
                Unfortunately, this also meant that I could no longer use the
                old, self-written framework of my site. The main reason for this
                is that Gatsby calculates and updates images during compilation,
                which is unfortunately quite incompatible with Vercel,
                especially when there are as many images as there are here.
              </p>
              <p className="mb-4">
                Since the old framework for the content of the
                &quot;windows&quot; primarily used <i>IFrames</i>, which caused
                quite a few problems with Google, this version now completely
                avoids the use of <i>IFrames</i>.
              </p>
              <p className="mb-4">
                In addition, the site is now available in both German and
                English, not least because I primarily work in the
                English-speaking domain and prefer not to link to German sites.
              </p>
              <p>
                Furthermore, the framework and content of the site are now
                explicitly open source and can be found on{" "}
                <a
                  href="https://github.com/PArns/next.patrick-arns.de"
                  className="external"
                  target="_blank"
                >
                  GitHub
                </a>
                !
              </p>
            </Translation>
          </TranslateSwitch>
        </article>
        <div className="hidden pt-4 pr-4 @2xl:block">
          <AboutAuthor lng={params.lng} />
        </div>
      </div>

      <BlogTeaser locale={params.lng} maxEntries={1} className="m-4 mt-0" />
    </div>
  );
}
