import Image from "next/image";
import initTranslations from "@/components/translate/i18n";
import { Metadata } from "next";

import PageBaseConfiguration from "@/configuration";

import {
  fetchCoasterStats,
  fetchParkVisits,
} from "@/data-provider/coastercloud/provider/ride-statistics-provider";

import BackgroundPlayer from "next-video/background-player";

import TranslateSwitch, {
  Translation,
} from "@/components/translate/translate-switch";
import {
  getAttractionStats,
  getCount,
  getRideFact,
} from "@/components/coaster/coaster-stats";
import ScoreCard from "@/components/coaster/coaster-stats/score-card";
import ScoreStat from "@/components/coaster/coaster-stats/score-stat";
import {
  GetTopCoasters,
  GetTopParks,
} from "@/data-provider/contentful/provider/coaster-provider";
import TopParkEntry from "@/components/coaster/top-park";
import AppLink from "@/components/os/app-link";
import TopCoasterEntry from "@/components/coaster/top-coaster";

import FkFLogo from "@/public/images/fkf.png";
import PoweredByCoasterCloud from "@/components/coaster/coaster-stats/powered-by";

import Backpack from "@/public/images/divoom-backpack.png";
import WindowDefaultContainer from "@/components/os/window/default-container";

export async function generateMetadata(props: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const config = PageBaseConfiguration();

  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["coaster"],
  });

  return {
    metadataBase: config.baseUrl,
    title: t("title"),
    description: t("subTitle"),
    openGraph: {
      type: "website",
      url: `${config.baseUrl}${params.lng}/coaster`,
      description: t("subTitle"),
      locale: params.lng,
      images: "/jumbotron/coaster.jpg",
    },
  };
}

export default async function Coaster(props: {
  params: Promise<{ lng: string }>;
}) {
  const params = await props.params;
  const { t } = await initTranslations({
    locale: params.lng,
    namespaces: ["coaster"],
  });

  const topParks = await GetTopParks({ locale: params.lng });
  const topCoasters = await GetTopCoasters({ locale: params.lng });
  const coasterStats = await fetchCoasterStats();
  const parkVisits = await fetchParkVisits();
  const parkTrips = coasterStats?.parkTrips?.items.slice(0, 5);
  const dateLocale = params.lng == "de" ? "de-DE" : "en-US";

  const coasterWithHighestCount = coasterStats?.attractionRides.items[0];
  const mausAuChocolat = getAttractionStats(
    coasterStats,
    "d466eaf7-4e89-4112-b4b2-1ad4584a62ce",
  );

  return (
    <WindowDefaultContainer>
      <header className="@container/header overflow-hidden rounded-lg">
        <BackgroundPlayer
          src={"https://assets.arns.dev/header-coaster-loop.mp4"}
          poster={"https://assets.arns.dev/header-coaster-loop.jpg"}
          blurDataURL="|DO;DHogIANM-4kDaKbcn#}jWB?^Rk.8WCo~xYSi9~-j_2E6D%NI9GobR5tRR.NGt7I8j[RiRltS%NR+n#s.RPRl.7xYx^?bRjIUR*jue-tmoJjEx]j]ITs:t8flt7ofMx%gR,IUj@%LoLWBfkRPxvWBV?WBx]jYRjR*ae"
        >
          <div className="rounded-xl border-neutral-500 bg-white/30 p-5 text-center text-white backdrop-blur-md dark:border-neutral-600 dark:bg-neutral-800/50">
            <h1 className="mb-2 text-4xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @md/header:text-5xl @lg/header:text-6xl">
              {t("title")}
            </h1>
            <h2 className="text-2xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] @md/header:text-3xl @lg/header:text-4xl">
              {t("subTitle")}
            </h2>
          </div>
        </BackgroundPlayer>
      </header>

      <section
        className="mt-2 w-full rounded-md bg-white p-4 dark:bg-neutral-800"
        aria-label="Introduction"
      >
        <h3 className="mb-1 text-3xl leading-tight font-extrabold text-neutral-900 lg:text-4xl dark:text-white">
          {t("title")}
        </h3>

        <TranslateSwitch locale={params.lng}>
          <Translation lang="de">
            <span className="mb-4">
              Irgendwie weigere ich mich, erwachsen zu werden - zumindest sagen
              das viele, die mich kennen.
            </span>

            <span className="mb-4">
              Wer verbringt schon seine Wochenenden und einen Großteil seiner
              Ferien in Freizeitparks? Wird das nicht irgendwann langweilig?
            </span>

            <div className="mb-4">
              Nein, &uuml;berhaupt nicht! Ganz im Gegenteil ...
            </div>

            <span className="mb-4">
              Freizeitparks sind aus meinem Leben nicht mehr wegzudenken. Seit
              meinem ersten Besuch in einem Freizeitpark, als ich ungef&auml;hr
              sechs Jahre alt war, schl&auml;gt mein Herz f&uuml;r diese
              magischen Orte! Ein Besuch in einem Freizeitpark ist f&uuml;r mich
              wie das Eintauchen in eine andere Welt. Es geht nicht um das
              &uuml;bliche &quot;h&ouml;her, schneller, weiter&quot;, sondern um
              das Eintauchen in fantastische Welten - sei es Steampunk, eine
              versunkene Stadt oder ein Bergdorf, durch das eine Achterbahn
              rast.
            </span>

            <div className="mb-4">
              Freizeitparks begleiten mich seit vielen Jahren als nicht ganz
              billiges Hobby. Seit Sommer 2022 z&auml;hle ich mich auch zu den
              Achterbahnjunkeys, die m&ouml;glichst viele verschiedene
              Achterbahnen fahren und entsprechend &quot;z&auml;hlen&quot;
              wollen.
            </div>

            <Image
              src={Backpack}
              alt="Pixelrucksack"
              width={150}
              className="float-end pt-4 pl-4"
            />

            <div className="mb-4">
              Auf dieser Seite findet ihr eine Zusammenfassung meines
              &quot;Freizeitparklebens&quot; in Fakten und Zahlen, seit Sommer
              2022. Schaut auch in{" "}
              <AppLink href="/de/blog" id="blog" className="external">
                meinen Blog
              </AppLink>
              , wo ich ausf&uuml;hrlicher &uuml;ber meine Besuche in den
              verschiedenen Parks schreibe.
            </div>

            <div className="mb-4">
              Übrigens: Alle Statistiken auf dieser Seite sind leider erst ab
              dem 26. Juli 2022 aktuell und werden mit der iOS & Android App{" "}
              <a
                href="https://coaster.cloud"
                className="external"
                target="_blank"
              >
                Coaster.Cloud
              </a>{" "}
              getrackt. Seit August 2024 bin ich zudem Mitglied des{" "}
              <a href="https://fkfev.de/" className="external" target="_blank">
                Freundeskreis Kirmes und Freizeitparks e.V.
              </a>
            </div>

            <div>
              Solltet ihr mich mit meinem Pixelrucksack in einem Park sehen,
              sprecht mich einfach an. Ich freue mich &uuml;ber jeden neuen
              Suchti, mit dem ich meine Leidenschaft f&uuml;r Freizeitparks
              teilen kann!
            </div>
          </Translation>
          <Translation lang="en">
            <div className="mb-4">
              Somehow, I refuse to grow up - at least that&apos;s what many
              people who know me say.
            </div>

            <div className="mb-4">
              Who spends their weekends and most of their holidays at amusement
              parks? Doesn&apos;t that get boring eventually?
            </div>

            <div className="mb-4">No, not at all! Absolutely not...</div>

            <div className="mb-4">
              Amusement parks have become an irreplaceable part of my life.
              Since my first visit to an amusement park when I was about six
              years old, my heart has beaten for these magical places! A visit
              to an amusement park is like diving into another world for me.
              It&apos;s not about the usual &quot;higher, faster, further,&quot;
              but about immersing myself in fantastic worlds - whether it&apos;s
              steampunk, a sunken city, or a mountain village with a roller
              coaster racing through it.
            </div>

            <div className="mb-4">
              Amusement parks have been my not-so-cheap hobby for many years.
              Since summer 2022, I also count myself among the roller coaster
              enthusiasts who aim to ride and &quot;count&quot; as many
              different roller coasters as possible.
            </div>

            <Image
              src={Backpack}
              alt="Pixel Backpack"
              width={150}
              className="float-end pt-4 pl-4"
            />

            <div className="mb-4">
              On this page, you&apos;ll find a summary of my &quot;amusement
              park life.&quot; Also, check out{" "}
              <AppLink href="/en/blog" id="blog" className="external">
                my blog
              </AppLink>{" "}
              where I write more extensively about my visits to various parks.
            </div>

            <div className="mb-4">
              By the way: All statistics on this page are only current as of
              July 26th 2022, and are tracked using the iOS & Android app{" "}
              <a
                href="https://coaster.cloud"
                className="external"
                target="_blank"
              >
                Coaster.Cloud
              </a>
              . Since August 2024, I&apos;m also a member of the{" "}
              <a href="https://fkfev.de/" className="external" target="_blank">
                Freundeskreis Kirmes und Freizeitparks e.V.
              </a>
            </div>

            <div>
              If you see me with my pixel backpack at a park, just come up and
              say hi. I look forward to meeting every new enthusiast with whom I
              can share my passion for amusement parks!
            </div>
          </Translation>
        </TranslateSwitch>
      </section>

      <section aria-label="Top Parks and Coasters">
        <div className="mt-2 w-full rounded-md bg-white p-4 dark:bg-neutral-800">
          <h3 className="mb-1 text-2xl leading-tight font-extrabold text-neutral-900 lg:text-3xl dark:text-white">
            {t("sectionTopParks")}
          </h3>

          <TranslateSwitch locale={params.lng}>
            <Translation lang="de">
              <div className="mb-4">
                Zwar bin ich mit meinen immerhin{" "}
                {getCount(coasterStats, "totalVisits").toString()} Parkbesuchen
                in {getCount(coasterStats, "totalParks").toString()} besuchten
                verschiedenen Parks weltweit und insg. immer noch relativ weit
                unten in der Liste der Coaster Junkies, dennoch möchte ich euch{" "}
                <b>meine persönliche Top 3</b> der Freizeitparks auflisten, die
                ich bis jetzt besucht habe.
              </div>
              <div className="mb-4">
                Diese Liste spiegelt nur meine eigene Meinung dar und beruht nur
                auf Parks, die ich auch selbst bereits besucht habe! Die Liste
                kann und wird sich also zwangsläufig über die Zeit immer einmal
                wieder ändern ;)
              </div>
            </Translation>
            <Translation lang="en">
              <div className="mb-4">
                Although I have{" "}
                {getCount(coasterStats, "totalVisits").toString()} park visits
                within {getCount(coasterStats, "totalParks").toString()}{" "}
                different parks worldwide and have a total of, I am still
                relatively low on the list of coaster junkies. Nevertheless, I
                would like to share with you <b>my personal top 3</b> theme
                parks that I have visited so far.
              </div>
              <div className="mb-4">
                This list reflects only my own opinion and is based only on
                parks that I have personally visited! The list can and will
                inevitably change over time ;)
              </div>
            </Translation>
          </TranslateSwitch>
        </div>

        <div className="mt-6 mb-4 flex flex-col gap-6 @2xl:mt-0 @2xl:mb-6">
          {topParks &&
            parkVisits &&
            topParks.parks.map((park) => (
              <TopParkEntry
                park={park}
                locale={params.lng}
                parkVisits={parkVisits}
                key={park.name}
              />
            ))}
        </div>

        <div className="mt-2 w-full rounded-md bg-white p-4 dark:bg-neutral-800">
          <h3 className="mb-1 text-2xl leading-tight font-extrabold text-neutral-900 lg:text-3xl dark:text-white">
            {t("sectionTopCoaster")}
          </h3>

          <TranslateSwitch locale={params.lng}>
            <Translation lang="de">
              <div className="mb-4">
                Mit bis jetzt insgesamt{" "}
                {getCount(coasterStats, "totalRides").toString()} Fahrten auf
                immerhin {getCount(coasterStats, "totalAttractions").toString()}{" "}
                verschiedenen Attraktionen habe ich doch schon{" "}
                {getRideFact(coasterStats, "totalDuration").toString()} Stunden
                verbracht. Mehr noch in Warteschlangen, von unzähligen Stunden
                im Auto und Flugzeug einmal gar nicht zu reden, und dennoch war
                es jede Sekunde wert! Damit nicht nur meine Lieblingsparks ein
                Dasein haben, findet ihr hier auch{" "}
                <b>meine persönlichen Top 3</b> meiner für mich besten
                Achterbahnen.
              </div>
              <div className="mb-4">
                Hier gilt ebenfalls: Ihr findet in dieser Liste nur
                Achterbahnen, die ich selbstverständlich selbst gefahren bin.
              </div>
            </Translation>
            <Translation lang="en">
              <div className="mb-4">
                So far, I have logged{" "}
                {getCount(coasterStats, "totalRides").toString()} rides on{" "}
                {getCount(coasterStats, "totalAttractions").toString()}{" "}
                different attractions, spending a total of{" "}
                {getRideFact(coasterStats, "totalDuration").toString()} hours.
                Not to mention countless hours in queues, in the car, and on
                planes, but it was worth every second! Not just my favorite
                parks have a place here; you will also find{" "}
                <b>my personal Top 3</b> of the best roller coasters for me.
              </div>
              <div className="mb-4">
                Here, too, only roller coasters that I have personally ridden
                are listed.
              </div>
            </Translation>
          </TranslateSwitch>
        </div>

        <div className="mt-6 mb-4 flex flex-col gap-6 @2xl:mt-0 @2xl:mb-6">
          {topCoasters &&
            parkVisits &&
            topCoasters.coaster.map((coaster) => (
              <TopCoasterEntry
                coaster={coaster}
                locale={params.lng}
                key={coaster.name}
              />
            ))}
        </div>
      </section>

      <section aria-label="Park Visits and Statistics">
        <div className="mt-2 w-full rounded-md bg-white p-4 dark:bg-neutral-800">
          <h3 className="mb-1 text-2xl leading-tight font-extrabold text-neutral-900 lg:text-3xl dark:text-white">
            {t("sectionVisits")}
          </h3>

          <TranslateSwitch locale={params.lng}>
            <Translation lang="de">
              <div className="mb-4">
                In den Sommermonaten, aber auch im Winter, ist mein Ziel am
                Wochenende meistens ein Freizeitpark! Immerhin komme ich derzeit
                auf {getCount(coasterStats, "totalVisits").toString()} Besuche
                mit insgesamt {getCount(coasterStats, "totalRides").toString()}{" "}
                Fahrten.
              </div>

              <div>
                Hier findet ihr die Liste meiner aktuell letzten 5 Besuche.
                Sollte mal ein Wochenende fehlen, dann haben die Parks sicher
                geschlossen oder ich liege zur Abwechslung mal am Strand.
              </div>
            </Translation>

            <Translation lang="en">
              <div className="mb-4">
                During the summer months, but also in winter, my weekend
                destination is usually an amusement park! After all, I currently
                have {getCount(coasterStats, "totalVisits").toString()} visits
                with a total of{" "}
                {getCount(coasterStats, "totalRides").toString()} rides.
              </div>

              <div>
                Here you can find the list of my most recent 5 visits. If a
                weekend is missing, the parks are surely closed or I&apos;m just
                relaxing at the beach for a change.
              </div>
            </Translation>
          </TranslateSwitch>
        </div>

        <div className="flex flex-row flex-wrap place-content-center gap-6 py-6">
          {parkTrips &&
            parkTrips.map((trip) => (
              <ScoreCard
                title={trip.park.name}
                attraction={trip}
                score={new Date(trip.date.value).toLocaleDateString(dateLocale)}
                big={true}
                key={trip.date.value}
              />
            ))}
        </div>

        <div className="mt-2 w-full rounded-md bg-white p-4 dark:bg-neutral-800">
          <h3 className="mb-1 text-2xl leading-tight font-extrabold text-neutral-900 lg:text-3xl dark:text-white">
            {t("sectionStatistics")}
          </h3>

          <TranslateSwitch locale={params.lng}>
            <Translation lang="de">
              <div className="mb-4">
                So ein Freizeitpark-Nerd ist natürlich nur ein richtiger Nerd,
                wenn er auch seine &quot;Counts&quot; zählt. Ein Count ist nach
                offiziellem Coaster-Standard jede einzelne Achterbahn, die man
                gefahren ist. Gezählt werden dürfen nur Achterbahnen, die eine
                vollständige Schienenstrecke haben und einen vollständigen
                Kreislauf oder eine definierte Strecke zurücklegen.
              </div>
              <div className="mb-4">
                Deshalb findet ihr hier alle meine aktuellen Park-Statistiken –
                stets aktuell, seit dem 26. Juni 2022. Leider fehlen alle Counts
                vor diesem Datum, da ich am 26. Juni 2022 erst, über eine der
                besten Freizeitpark-Apps:{" "}
                <a
                  href="https://coaster.cloud"
                  target="_blank"
                  className="external"
                >
                  Coaster.Cloud
                </a>
                , überhaupt angefangen habe, meine Parkbesuche zu zählen.
              </div>
            </Translation>

            <Translation lang="en">
              <div className="mb-4">
                A theme park nerd is, of course, only a true nerd if they also
                count their &quot;counts&quot;. A &quot;count&quot; is,
                according to the official coaster standard, every single roller
                coaster that one has ridden. Only roller coasters that have a
                complete track and make a full circuit or follow a defined route
                are allowed to be counted.
              </div>
              <div className="mb-4">
                Therefore, here you will find all my current park statistics –
                always up-to-date, since June 26, 2022. Unfortunately, all
                counts before this date are missing because I only started
                counting my counts with one of the best theme park apps ever on
                June 26, 2022:{" "}
                <a
                  href="https://coaster.cloud"
                  target="_blank"
                  className="external"
                >
                  Coaster.Cloud
                </a>
                .
              </div>
            </Translation>
          </TranslateSwitch>
        </div>

        <div className="flex-rows flex flex-wrap place-content-center gap-6 py-4">
          <ScoreStat
            title={t("counts")}
            count={getCount(coasterStats, "totalCoasterAttractions").toString()}
          />
          <ScoreStat
            title={t("attractions")}
            count={getCount(coasterStats, "totalAttractions").toString()}
          />
          <ScoreStat
            title={t("rides")}
            count={getCount(coasterStats, "totalRides").toString()}
          />
        </div>

        <div className="flex-rows mb-6 flex flex-wrap place-content-center gap-6">
          <ScoreStat
            title={t("visits")}
            count={getCount(coasterStats, "totalVisits").toString()}
          />

          <ScoreStat
            title={t("countries")}
            count={getCount(coasterStats, "totalCountries").toString()}
          />

          <ScoreStat
            title={t("parks")}
            count={getCount(coasterStats, "totalParks").toString()}
          />

          <ScoreStat
            title={t("inversions")}
            count={getRideFact(coasterStats, "totalRideInversions")}
          />

          <ScoreStat
            title={t("length")}
            count={getRideFact(coasterStats, "totalRideLength")}
          />

          <ScoreStat
            title={t("time")}
            count={getRideFact(coasterStats, "totalDuration")}
          />
        </div>

        <div className="flex-rows flex flex-wrap place-content-center gap-6">
          <ScoreCard
            title={t("pos1")}
            attraction={coasterStats?.parkVisits.items[0]}
            big={true}
            lng={params.lng}
          />

          <ScoreCard
            title={t("pos2")}
            attraction={coasterStats?.parkVisits.items[1]}
            big={true}
            lng={params.lng}
          />

          <ScoreCard
            title={t("pos3")}
            attraction={coasterStats?.parkVisits.items[2]}
            big={true}
            lng={params.lng}
          />

          <ScoreCard
            title={t("mausAuChocolatScore")}
            attraction={mausAuChocolat?.attraction}
            score={mausAuChocolat?.highScore?.toLocaleString("en-US")}
            big={true}
          />

          <ScoreCard
            title={t("mostCounts")}
            attraction={coasterWithHighestCount?.attraction}
            score={coasterWithHighestCount?.totalRides.toLocaleString("en-US")}
            big={true}
          />

          <ScoreCard
            title={t("fastestAttraction")}
            attraction={coasterStats?.fastestRide.items[0].attraction}
            score={
              coasterStats?.fastestRide.items[0].attraction.attribute
                .valueAsString
            }
            big={true}
          />

          <ScoreCard
            title={t("longestRide")}
            attraction={coasterStats?.longestRide.items[0].attraction}
            score={
              coasterStats?.longestRide.items[0].attraction.attribute
                .valueAsString
            }
            big={true}
          />

          <ScoreCard
            title={t("highestRide")}
            attraction={coasterStats?.highestRide.items[0].attraction}
            score={
              coasterStats?.highestRide.items[0].attraction.attribute
                .valueAsString
            }
            big={true}
          />

          <ScoreCard
            title={t("strongestRide")}
            attraction={coasterStats?.strongestRide.items[0].attraction}
            score={
              coasterStats?.strongestRide.items[0].attraction.attribute
                .valueAsString
            }
            big={true}
          />
        </div>
      </section>

      <aside className="relative mt-2 flex flex-col pl-1">
        <a
          href="https://fkfev.de"
          target="_blank"
          className="flex w-max flex-row grayscale hover:grayscale-0"
        >
          <div>
            <Image
              src={FkFLogo}
              alt={"Logo des Freundeskreis Kirmes und Freizeitparks e.V."}
              width={32}
              height={50}
            />
          </div>
          <div className="my-auto ml-1 text-sm text-neutral-900 dark:text-neutral-300">
            Mitglied des FKF e.V.
          </div>
        </a>
        <div className="absolute top-[-7px] right-0 w-32 pr-4">
          <PoweredByCoasterCloud />
        </div>
      </aside>
    </WindowDefaultContainer>
  );
}
