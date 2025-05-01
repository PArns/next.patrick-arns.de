import Image from "next/image";

import initTranslations from "@/components/translate/i18n";
import TypeWriter from "@/components/type-writer";

import JumbotronPic from "@/public/images/profilePic-sp.png";
import { getPageAlternates } from "@/helper/localization";

import { WindowTitle } from "@/components/os/windowManager";
import TimeLine, { TimeLineItem } from "@/components/timeline";
import TranslateSwitch, {
  Translation,
} from "@/components/translate/translate-switch";

import CyberGhost1 from "@/public/cyberghost/cyberghost1.jpg";
import CyberGhost2 from "@/public/cyberghost/cyberghost2.png";
import CyberGhost3 from "@/public/cyberghost/cyberghost3.png";
import CyberGhost35 from "@/public/cyberghost/cyberghost35.png";
import CyberGhost4 from "@/public/cyberghost/cyberghost4.png";
import CyberGhost5 from "@/public/cyberghost/cyberghost5.png";
import CyberGhost55 from "@/public/cyberghost/cyberghost55.png";
import CyberGhost6 from "@/public/cyberghost/cyberghost6.png";
import CyberGhost7 from "@/public/cyberghost/cyberghost7.png";
import CyberGhost8 from "@/public/cyberghost/cyberghost8.png";
import Age from "@/components/age";
import AppLink from "@/components/os/app-link";
import WindowDefaultContainer from "@/components/os/window/default-container";
import PageBaseConfiguration from "@/configuration";

export async function generateStaticParams() {
  const config = PageBaseConfiguration();
  return config.supportedLocales.map((lng) => ({ lng }));
}

export async function generateMetadata(props: {
  params: Promise<{ lng: string; pageNumber: number; tag: string | undefined }>;
}) {
  const params = await props.params;
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["titles"],
  });

  return {
    title: t("me"),
    alternates: getPageAlternates("me"),
    openGraph: {
      type: "website",
      locale: params.lng,
    },
  };
}
export default async function AboutMe(props: {
  params: Promise<{ lng: string }>;
}) {
  const params = await props.params;
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["titles"],
  });

  return (
    <WindowDefaultContainer>
      <WindowTitle id="me" title={t("me")} />

      <header className="relative w-full overflow-hidden rounded-lg bg-cover bg-no-repeat text-center">
        <div className="relative flex flex-row">
          <div className="flex w-full items-center justify-center">
            <div>
              <h1 className="text-xl font-bold @md:text-3xl @xl:text-5xl">
                <div>Life is simple</div>
                <div className="width-32text-clip text-sky-500 @md:mt-3">
                  <TypeWriter
                    words={[
                      "Eat,",
                      "Sleep,",
                      "Code,",
                      "Amusement Parks",
                      "& Repeat!",
                    ]}
                    loop={true}
                    cursor
                    cursorStyle="|"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </div>
              </h1>
            </div>
          </div>
          <div className="w-max @xl:pr-12 @4xl:pr-24">
            <Image src={JumbotronPic} alt="Patrick" height={500} />
          </div>
        </div>
      </header>

      <div className="flex flex-col">
        <section className="mb-4 flex w-full flex-col rounded-md bg-white p-4 dark:bg-neutral-800">
          <h1 className="mb-2 text-2xl">Patrick Arns</h1>

          <TranslateSwitch locale={params.lng}>
            <Translation lang="de">
              <p>
                Mittlerweile gute{" "}
                <Age birthday="1982-04-01" single="Jahr" plural="Jahre" /> alt
                und seit{" "}
                <Age birthday="2002-11-01" single="Jahre" plural="Jahren" /> als
                Entwickler und Teamlead für{" "}
                <a href="https://kape.com" target="_blank" className="external">
                  Kape Technologies
                </a>{" "}
                tätig.
              </p>
              <p>
                Im Jahr 2006 habe ich mein Studium an der FH Aachen
                abgeschlossen und darf mich seitdem Diplom-Informatiker (FH)
                Patrick Arns nennen.
              </p>
              <p className="pt-2">
                In meiner Freizeit stehe ich jeden Samstag für die{" "}
                <a
                  href="https://hundefreunde-herzogenrath.de"
                  target="_blank"
                  className="external"
                >
                  Hundefreunde Herzogenrath e.V.
                </a>{" "}
                als Trainer auf dem Platz, auch wenn ich mittlerweile leider
                keine eigene Fellnase mehr habe. Das ist für mich der perfekte
                Ausgleich zum doch manchmal stressigen Job als Entwickler.
              </p>

              <p className="pt-2">
                Ansonsten verbringe ich meine Wochenenden am liebsten in einem{" "}
                <AppLink href="/coaster" id="coaster" className="external">
                  Freizeitpark
                </AppLink>{" "}
                irgendwo auf der Welt.
              </p>
              <p className="pt-2">
                Wenn du mehr über meinen beruflichen Werdegang erfahren
                möchtest, dann schau doch mal auf mein{" "}
                <a
                  href="https://www.linkedin.com/in/patrick-arns"
                  target="_blank"
                  className="external"
                >
                  LinkedIn-Profil
                </a>
                .
              </p>
            </Translation>

            <Translation lang="en">
              <p>
                Now well over{" "}
                <Age birthday="1982-04-01" single="year" plural="years" /> old
                and working as a developer and team lead for{" "}
                <a href="https://kape.com" target="_blank" className="external">
                  Kape Technologies
                </a>{" "}
                since <Age birthday="2002-11-01" single="year" plural="years" />
                .
              </p>
              <p>
                In 2006 I completed my studies at the FH Aachen and since then I
                can call myself a computer scientist (FH) Patrick Arns.
              </p>
              <p className="pt-2">
                In my free time, I work every Saturday as a dog trainer for the{" "}
                <a
                  href="https://hundefreunde-herzogenrath.de"
                  target="_blank"
                  className="external"
                >
                  Hundefreunde Herzogenrath e.V.
                </a>
                , even though I no longer have a furry friend of my own. This is
                the perfect counterbalance to the sometimes stressful job as a
                developer for me.
              </p>

              <p className="pt-2">
                Otherwise, I like to spend my weekends in a{" "}
                <AppLink href="/coaster" id="coaster" className="external">
                  theme park
                </AppLink>{" "}
                somewhere around the world.
              </p>
              <p className="pt-2">
                If you want to know more about my professional background, check
                out my{" "}
                <a
                  href="https://www.linkedin.com/in/patrick-arns"
                  target="_blank"
                  className="external"
                >
                  LinkedIn profile
                </a>
                .
              </p>
            </Translation>
          </TranslateSwitch>
        </section>

        <section className="flex w-full flex-col rounded-md bg-white p-4 dark:bg-neutral-800">
          <TranslateSwitch locale={params.lng}>
            <Translation lang="de">
              <h1 className="mb-2 text-2xl">
                CyberGhost - Vom Startup zum Unicorn
              </h1>
              <p>
                Einen Großteil meines Berufslebens habe ich einem der weltweit
                größten VPNs gewidmet&nbsp;-&nbsp;
                <a
                  href="https://cyberghostvpn.com"
                  target="_blank"
                  className="external"
                >
                  CyberGhost VPN
                </a>
                . Seit 2002, vom ersten Release 2003 bis heute, sind unzählige
                Stunden und kreative Energie in CyberGhost geflossen. Dabei
                begann CyberGhost als klassisches Startup, nicht in einer
                Garage, sondern in einem kleinen Wellblechbüro in der Nähe von
                Aachen.
              </p>
              <p className="pt-2">
                Anfangs komplett und exklusiv unter Windows (ja, sogar unsere
                Server waren damals Windows-Server), ist CyberGhost mittlerweile
                zu einem der größten VPN-Anbieter weltweit gewachsen. Mit 8
                Standorten weltweit und über 1.200 Mitarbeitern gehört
                CyberGhost heute zur&nbsp;
                <a href="https://kape.com" target="_blank" className="external">
                  Kape Gruppe
                </a>
                , zu der auch die VPN-Anbieter&nbsp;
                <a
                  href="https://privateinternetaccess.com"
                  target="_blank"
                  className="external"
                >
                  Private Internet Access
                </a>
                &nbsp;und&nbsp;
                <a
                  href="https://expressvpn.com"
                  target="_blank"
                  className="external"
                >
                  ExpressVPN
                </a>
                &nbsp;gehören. CyberGhost verfügt dabei aktuell über mehr als
                11.500 VPN Server in 100 Ländern weltweit!
              </p>
              <p className="pt-2">
                Auch nach&nbsp;
                <Age birthday="2002-11-01" plural="Jahren" single="Jahre" />
                &nbsp;bin ich nach wie vor für die Entwicklung von CyberGhost
                und unseren anderen Brands verantwortlich - selbst wenn sich die
                Aufgabenbereiche vom 2-Mann-Startup zum 1.200-Mann-Unicorn
                natürlich verändert haben. Dennoch gilt die Devise: &quot;Once a
                Ghostie, always a Ghostie&quot;
              </p>
              <p className="pt-2">
                Kape zählt mittlerweile zu den größten VPN-Anbietern weltweit
                und betreut rund 7 Millionen zahlende Kunden!
              </p>
            </Translation>

            <Translation lang="en">
              <h1 className="mb-2 text-2xl">
                CyberGhost - From startup to unicorn
              </h1>
              <p>
                I&apos;ve dedicated a large part of my professional life to one
                of the world&apos;s largest VPNs -&nbsp;
                <a
                  href="https://cyberghostvpn.com"
                  target="_blank"
                  className="external"
                >
                  CyberGhost VPN
                </a>
                . Since 2002, from the first release in 2003 to today, countless
                hours and creative energy have gone into CyberGhost. It started
                as a classic startup, not in a garage, but in a small corrugated
                iron office near Aachen.
              </p>
              <p className="pt-2">
                Initially completely and exclusively on Windows (yes, even our
                servers were Windows servers back then), CyberGhost has now
                grown into one of the largest VPN providers in the world. With 8
                locations worldwide and over 1,200 employees, CyberGhost is now
                part of the&nbsp;
                <a href="https://kape.com" target="_blank" className="external">
                  Kape Group
                </a>
                , which also includes the VPN providers&nbsp;
                <a
                  href="https://privateinternetaccess.com"
                  target="_blank"
                  className="external"
                >
                  Private Internet Access
                </a>
                &nbsp;and&nbsp;
                <a
                  href="https://expressvpn.com"
                  target="_blank"
                  className="external"
                >
                  ExpressVPN
                </a>
                . CyberGhost currently operates more than 11,500 VPN servers in
                100 countries worldwide!
              </p>
              <p className="pt-2">
                Even after&nbsp;
                <Age birthday="2002-11-01" plural="years" single="year" />, I am
                still responsible for the development of CyberGhost and our
                other brands - even if the scope of tasks has changed from a
                2-man startup to a 1,200-man unicorn. However, the motto
                remains: &quot;Once a Ghostie, always a Ghostie&quot;
              </p>
              <p className="pt-2">
                Kape has now grown into one of the largest VPN providers in the
                world, serving around 7 million paying customers!
              </p>
            </Translation>
          </TranslateSwitch>
        </section>

        <TimeLine className="py-6 @2xl:px-12">
          <TimeLineItem title="SimonTools CyberGhost" time={"2003"} icon="home">
            <div className="pb-3 text-sm text-neutral-600 dark:text-neutral-400">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  <p>
                    Die ursprüngliche Version von CyberGhost war damals noch
                    kein klassisches VPN im heutigen Sinne, sondern lediglich
                    eine Schnittstelle, die ein Internet Explorer Browser Plugin
                    fernsteuerte und in diesem einen Proxy setzte.
                  </p>
                  <p className="pt-2">
                    Damals noch unter der Produktlinie SimonTools beheimatet,
                    war CyberGhost ein rein deutsches Produkt der Mobile
                    Concepts GmbH - jenem 2-Mann Keller Startup - und wurde über
                    den Ulmer Softwareverlag S.A.D. vertrieben.
                  </p>
                </Translation>
                <Translation lang="en">
                  <p>
                    The original version of CyberGhost was not yet a classic VPN
                    as we know it today, but merely an interface that controlled
                    an Internet Explorer browser plugin and set up a proxy in
                    it.
                  </p>
                  <p className="pt-2">
                    Back then, still under the SimonTools product line,
                    CyberGhost was a purely German product by Mobile Concepts
                    GmbH - that 2-man basement startup - and was distributed by
                    the Ulm software publisher S.A.D.
                  </p>
                </Translation>
              </TranslateSwitch>
            </div>
            <div>
              <Image
                src={CyberGhost1}
                width={400}
                height={400}
                alt="CyberGhost"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem
            title="SimonTools CyberGhost 2"
            time={"2004"}
            icon="rocket"
          >
            <div className="pb-3 text-sm text-neutral-600 dark:text-neutral-400">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  <p>
                    Nur 1 Jahr später erschien CyberGhost 2 in der heute
                    bekannten gelben Farbe. An der Technik hatte sich wenig
                    geändert, lediglich eine neue verschlüsselte Favoritenliste
                    war hinzugekommen.
                  </p>
                </Translation>
                <Translation lang="en">
                  <p>
                    Just 1 year later, CyberGhost 2 appeared in the now-familiar
                    yellow color. The technology had changed little, with only a
                    new encrypted favorites list added.
                  </p>
                </Translation>
              </TranslateSwitch>
            </div>
            <div>
              <Image
                src={CyberGhost2}
                width={400}
                height={400}
                alt="CyberGhost 2004"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem
            title="SimonTools CyberGhost VPN"
            time={"2006"}
            icon="rocket"
          >
            <div className="pb-3 text-sm text-neutral-600 dark:text-neutral-400">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  <p>
                    CyberGhost VPN bzw. CyberGhost 3 war das erste richtige VPN
                    mit eigenen OpenVPN basierten Servern.
                  </p>
                  <p className="pt-2">
                    Da CyberGhost in der Zwischenzeit doch eine beachtliche
                    Nutzerbasis hatte, haben wir das Produkt damals komplett neu
                    entwickelt. Neben besagtem VPN-Netzwerk verfügte CyberGhost
                    3 auch über einen verschlüsselten Online-Speicher, der
                    damals in enger Zusammenarbeit mit der Strato GmbH
                    entstanden ist.
                  </p>
                  <p className="pt-2">
                    Zur Neuausrichtung gehörte damals auch ein neues Logo -
                    intern nur &quot;Mützenmann&quot; genannt.
                  </p>
                </Translation>
                <Translation lang="en">
                  <p>
                    CyberGhost VPN, or CyberGhost 3, was the first real VPN with
                    its own OpenVPN-based servers.
                  </p>
                  <p className="pt-2">
                    As CyberGhost had gained a considerable user base by then,
                    we completely rebuilt the product. In addition to the proper
                    VPN network, CyberGhost 3 also featured an encrypted online
                    storage solution, which was developed in close collaboration
                    with Strato GmbH.
                  </p>
                  <p className="pt-2">
                    The rebranding also included a new logo - internally
                    nicknamed &quot;Mützenmann&quot; (Hat Man).
                  </p>
                </Translation>
              </TranslateSwitch>
            </div>
            <div>
              <Image
                src={CyberGhost3}
                width={400}
                height={400}
                alt="SimonTools CyberGhost VPN"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem
            title="SimonTools CyberGhost VPN 3.5"
            time={"2008"}
            icon="rocket"
          >
            <div className="pb-3 text-sm text-neutral-600 dark:text-neutral-400">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  <p>
                    CyberGhost 3.5 bekam nach 2 Jahren eine kleine Modellpflege
                    und auch hier das klassische CyberGhost-Gelb (übrigens der
                    Farbcode #FFCC00, den sicher jeder unserer Designer
                    auswendig kennt).
                  </p>
                  <p className="pt-2">
                    CyberGhost 3.5 war auch die erste Version, die nicht mehr
                    unter der SimonTools-Reihe erschien - sondern erstmals als
                    eigenständiges Produkt.
                  </p>
                </Translation>
                <Translation lang="en">
                  <p>
                    After 2 years, CyberGhost 3.5 received a minor update,
                    retaining the classic CyberGhost yellow (incidentally the
                    color code #FFCC00, which all of our designers know by
                    heart).
                  </p>
                  <p className="pt-2">
                    CyberGhost 3.5 was also the first version not to be released
                    under the SimonTools series - but for the first time as a
                    standalone product.
                  </p>
                </Translation>
              </TranslateSwitch>
            </div>
            <div>
              <Image
                src={CyberGhost35}
                width={400}
                height={400}
                alt="SimonTools CyberGhost VPN 3.5"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem title="CyberGhost 4" time={"2010"} icon="rocket">
            <div className="pb-3 text-sm text-neutral-600 dark:text-neutral-400">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  <p>
                    Mit CyberGhost 4 kehrte nach vielen Jahren unser geliebter
                    Ghostie zurück - das Maskottchen, das auch nach über 20
                    Jahren CyberGhost immer noch dafür sorgt, dass CyberGhost
                    eine eigene Persönlichkeit hat.
                  </p>
                  <p className="pt-2">
                    Im Jahr 2011 wurde zudem die CyberGhost S.A. in Bukarest
                    (Rumänien) gegründet und das Produkt CyberGhost in eine
                    eigene Firma, die CyberGhost S.A., ausgelagert.
                  </p>
                </Translation>
                <Translation lang="en">
                  <p>
                    With CyberGhost 4, our beloved Ghostie returned after many
                    years - the mascot that still ensures CyberGhost has its own
                    personality even after more than 20 years.
                  </p>
                  <p className="pt-2">
                    In 2011, CyberGhost S.A. was also founded in Bucharest,
                    Romania, and the CyberGhost product was spun off into its
                    own company, CyberGhost S.A.
                  </p>
                </Translation>
              </TranslateSwitch>
            </div>
            <div>
              <Image
                src={CyberGhost4}
                width={400}
                height={400}
                alt="CyberGhost 4"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem title="CyberGhost 5" time={"2012"} icon="rocket">
            <div className="pb-3 text-sm text-neutral-600 dark:text-neutral-400">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  <p>
                    CyberGhost 5 wurde von Grund auf neu entwickelt und war die
                    erste Version, die neben Windows auch für MacOS, Android &
                    iOS verfügbar war.
                  </p>
                  <p className="pt-2">
                    Die Oberfläche war damals komplett HTML & JavaScript
                    basiert, da wir so ein einheitliches Erscheinungsbild für
                    MacOS und Windows erreichen konnten.
                  </p>
                  <p className="pt-2">
                    Dazu entwickelten wir ein eigenes Framework, welches
                    Informationen aus der Anwendung selbst an das Interface
                    senden konnte und umgekehrt. Frameworks wie Electrum etc.
                    gab es zu diesem Zeitpunkt noch nicht, diese basieren heute
                    aber auf einem ähnlichen Prinzip.
                  </p>
                </Translation>
                <Translation lang="en">
                  <p>
                    CyberGhost 5 was completely redeveloped and was the first
                    version available not only for Windows but also for MacOS,
                    Android & iOS.
                  </p>
                  <p className="pt-2">
                    The interface was entirely based on HTML & JavaScript at the
                    time, as this allowed us to achieve a consistent look and
                    feel for both MacOS and Windows.
                  </p>
                  <p className="pt-2">
                    To do this, we developed our own framework that could send
                    information from the application itself to the interface and
                    vice versa. Frameworks like Electrum, etc., didn&apos;t
                    exist at that time, but today are based on a similar
                    principle.
                  </p>
                </Translation>
              </TranslateSwitch>
            </div>
            <div>
              <Image
                src={CyberGhost5}
                width={400}
                height={400}
                alt="CyberGhost 5"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem title="CyberGhost 5.5" time={"2014"} icon="rocket">
            <div className="pb-3 text-sm text-neutral-600 dark:text-neutral-400">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  <p>
                    Die nächste Version von CyberGhost, Version 5.5, wurde
                    entwickelt, um erstmals mehr Funktionen zum Schutz der
                    Privatsphäre zu bieten.
                  </p>
                  <p className="pt-2">
                    Ein serverbasierter Ad-Blocker und ein Malware-Schutz
                    hielten neben einer vereinfachten Bedienung Einzug in
                    CyberGhost.
                  </p>
                </Translation>
                <Translation lang="en">
                  <p>
                    The next version of CyberGhost, Version 5.5, was developed
                    to offer more privacy protection features for the first
                    time.
                  </p>
                  <p className="pt-2">
                    A server-based ad blocker and malware protection were
                    introduced alongside a simplified user interface in
                    CyberGhost.
                  </p>
                </Translation>
              </TranslateSwitch>
            </div>
            <div>
              <Image
                src={CyberGhost55}
                width={400}
                height={400}
                alt="CyberGhost 5.5"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem title="CyberGhost 6" time={"2016"} icon="rocket">
            <div className="pb-3 text-sm text-neutral-600 dark:text-neutral-400">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  <p>
                    Mit CyberGhost 6 haben wir uns von der HTML-basierten
                    Oberfläche verabschiedet und sind zu einem neuen,
                    profilbasierten Ansatz übergegangen.
                  </p>
                  <p className="pt-2">
                    Die Idee dahinter war, unseren Benutzern eine Auswahl an
                    Nutzungsmöglichkeiten zu bieten und so die Wahl des Servers
                    an das entsprechende Szenario zu koppeln.
                  </p>
                </Translation>
                <Translation lang="en">
                  <p>
                    With CyberGhost 6, we moved away from the HTML-based
                    interface and adopted a new, profile-based approach.
                  </p>
                  <p className="pt-2">
                    The idea was to offer our users a selection of usage
                    options, allowing them to choose a server based on the
                    corresponding scenario.
                  </p>
                </Translation>
              </TranslateSwitch>
            </div>
            <div>
              <Image
                src={CyberGhost6}
                width={400}
                height={400}
                alt="CyberGhost 6"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem title="CyberGhost 7" time={"2018"} icon="rocket">
            <div className="pb-3 text-sm text-neutral-600 dark:text-neutral-400">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  <p>
                    CyberGhost 7 war der Beginn des heute bekannten Konzepts.
                    Mit dieser Version haben wir unser eigenes UI-Framework
                    entwickelt, das auch heute noch verwendet wird.
                  </p>
                  <p className="pt-2">
                    Der Grund dafür war, dass wir mittlerweile zu viele
                    Windows-Versionen unterstützen mussten und ein einheitliches
                    Design für alle Windows-Versionen erreichen wollten.
                    Schließlich lief CyberGhost 7 auf Windows Vista - Windows
                    10!
                  </p>
                  <p className="pt-2">
                    Dieses eigene Framework ermöglichte uns auch die
                    Vereinfachung der Software nach dem heutigen Prinzip
                    &quot;vom Einfachen zum Komplexen&quot;, bei dem es möglich
                    ist, die VPN-Verbindung mit nur einem Klick zu aktivieren.
                  </p>
                </Translation>
                <Translation lang="en">
                  <p>
                    CyberGhost 7 marked the beginning of the concept known
                    today. With this version, we developed our own UI framework,
                    which is still used today.
                  </p>
                  <p className="pt-2">
                    The reason was that we had to support too many Windows
                    versions and wanted to achieve a consistent design across
                    all of them. After all, CyberGhost 7 ran on Windows Vista
                    through Windows 10!
                  </p>
                  <p className="pt-2">
                    This framework also allowed us to simplify the software
                    according to the principle of &quot;from simple to
                    complex&quot;, making it possible to activate the VPN
                    connection with just one click.
                  </p>
                </Translation>
              </TranslateSwitch>
            </div>
            <div>
              <Image
                src={CyberGhost7}
                width={400}
                height={400}
                alt="CyberGhost 7"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>

          <TimeLineItem
            title="CyberGhost 8"
            time={"2020"}
            icon="flag"
            isActive={true}
          >
            <div className="pb-3 text-sm text-neutral-600 dark:text-neutral-400">
              <TranslateSwitch locale={params.lng}>
                <Translation lang="de">
                  <p>
                    CyberGhost 8 läutete die Ära &quot;more than a VPN&quot; für
                    CyberGhost ein. Wir haben den VPN-Client zu einem Framework
                    erweitert, das verschiedene Module als Plugins laden kann.
                  </p>
                  <p className="pt-2">
                    So erweiterten wir das CyberGhost-Portfolio um einen
                    Virenscanner, ein Tool zum Ändern der
                    Windows-Datenschutzeinstellungen und ein Tool, das das
                    System nach Software mit bekannten Sicherheitslücken scannt
                    und anzeigt, wenn installierte Programme nicht mehr aktuell
                    sind.
                  </p>
                  <p className="pt-2">
                    Darüber hinaus wurde der ikonische Connect-Button zum
                    zentralen Element von CyberGhost.
                  </p>
                </Translation>
                <Translation lang="en">
                  <p>
                    CyberGhost 8 marked the start of the &quot;more than a
                    VPN&quot; era for CyberGhost. We expanded the VPN client
                    into a framework that can load various modules as plugins.
                  </p>
                  <p className="pt-2">
                    We expanded the CyberGhost portfolio to include an
                    antivirus, a tool for changing Windows privacy settings, and
                    a tool that scans the system for software with known
                    security vulnerabilities and shows if installed programs are
                    outdated.
                  </p>
                  <p className="pt-2">
                    Additionally, the iconic Connect button became the central
                    element of CyberGhost.
                  </p>
                </Translation>
              </TranslateSwitch>
            </div>
            <div>
              <Image
                src={CyberGhost8}
                width={400}
                height={400}
                alt="CyberGhost 8"
                className="mx-auto"
              />
            </div>
          </TimeLineItem>
        </TimeLine>
      </div>
    </WindowDefaultContainer>
  );
}
