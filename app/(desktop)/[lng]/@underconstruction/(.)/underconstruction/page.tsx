import TranslateSwitch, {
  Translation,
} from "@/components/translate/translate-switch";

export async function generateMetadata() {
  return {
    title: "Under Construction",
  };
}

export default async function UnderConstruction({
  params,
}: {
  params: { lng: string };
}) {
  return (
    <div className="m-4">
      <TranslateSwitch locale={params.lng}>
        <Translation lang="de">
          <h1 className="mb-2 text-2xl">Hallo Fremder!</h1>
          <p className="mb-4">
            Wie man in den letzten Wochen gesehen hat, tut sich gerade so
            einiges auf diesen Seiten.
          </p>
          <p className="mb-4">
            Neben einem leicht geänderten Layout, geht es aber vor allem gerade
            &quot;unter der Haube&quot; zur Sache.
          </p>
          <p className="mb-4">
            Nachdem GatsbyJS ja leider beschlossen hat, das kostenlose Hosting
            einzustellen, bin ich mit Sack &amp; Pack auf Next.js und Vercel Pro
            umgezogen.
          </p>
          <p className="mb-4">
            Leider hat das auch bedeutet, dass ich das alte, ebenfalls selbst
            geschriebene Framework meiner Seite nicht mehr weiter verwenden
            konnte. Der Grund ist hier vor allem, dass Gatsby Bilder beim
            Kompilieren berechnet und aktualisiert, was leider mit Vercel
            ziemlich inkompatibel ist, zumindest wenn es so viele Bilder wie
            hier sind.
          </p>
          <p className="mb-4">
            Da das alte Framework für den Inhalt der &quot;Fenster&quot; aber
            auch überwiegend <i>IFrames</i> verwendet hat, und dies gerade mit
            Google so einiges an Problemen gemacht hat, kommt diese Version nun
            komplett ohne <i>IFrames</i> aus.
          </p>
          <p className="mb-4">
            Zusätzlich ist die Seite nun auch in Deutsch und Englisch verfügbar,
            was nicht zuletzt dem geschuldet ist, dass ich überwiegend im
            englischen Bereich arbeite und ungern deutsche Seiten verlinkt habe.
          </p>
          <p className="mb-4">
            Zudem ist das Framework und der Inhalt der Seite nun explizit Open
            Source und bei{" "}
            <a
              href="https://github.com/PArns/next.patrick-arns.de"
              className="text-sky-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub zu finden
            </a>
            !
          </p>
        </Translation>
        <Translation lang="en">
          <h1 className="mb-2 text-2xl">Hello Stranger!</h1>
          <p className="mb-4">
            As you may have noticed in recent weeks, there's been quite a bit
            happening on these pages.
          </p>
          <p className="mb-4">
            In addition to a slightly modified layout, there's a lot going on
            &quot;under the hood&quot; right now.
          </p>
          <p className="mb-4">
            Unfortunately, after GatsbyJS decided to discontinue its free
            hosting, I packed up and migrated to Next.js and Vercel Pro.
          </p>
          <p className="mb-4">
            Unfortunately, this also meant that I could no longer use the old,
            self-written framework of my site. The main reason for this is that
            Gatsby calculates and updates images during compilation, which is
            unfortunately quite incompatible with Vercel, especially when there
            are as many images as there are here.
          </p>
          <p className="mb-4">
            Since the old framework for the content of the &quot;windows&quot;
            primarily used <i>IFrames</i>, which caused quite a few problems
            with Google, this version now completely avoids the use of{" "}
            <i>IFrames</i>.
          </p>
          <p className="mb-4">
            In addition, the site is now available in both German and English,
            not least because I primarily work in the English-speaking domain
            and prefer not to link to German sites.
          </p>
          <p className="mb-4">
            Furthermore, the framework and content of the site are now
            explicitly open source and can be found on{" "}
            <a
              href="https://github.com/PArns/next.patrick-arns.de"
              className="text-sky-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            !
          </p>
        </Translation>
      </TranslateSwitch>
    </div>
  );
}