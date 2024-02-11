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
    <div className="m-10">
      <TranslateSwitch locale={params.lng}>
        <Translation lang="de">
          Da GatsbyJS leider beschlossen hat, das Hosting einzustellen und meine
          Webseite aufgrund von Bildern etc. zu groß ist, um regulär kompiliert
          zu werden, gibt es aktuell leider nur diesen Platzhalter hier.
          <br />
          <br />
          Aber bald gibt es hier wieder etwas zu sehen! Derweil könnt ihr dann
          diesen neuen und noch sehr rudimentären Fenstermanager bestaunen.
          <br />
          <br />
          Ich habe, nicht zuletzt aufgrund dessen, das alle Seiten in einem
          iFrame dargestellt werden, beschlossen, die Seite komplett neu zu
          schreiben!
          <br />
          <br />
          <br />
          Geduldet euch also noch ein bisschen, bald ist diese wieder, auch mit
          DE/EN als Sprache, sowie vielen neuen Funktionen, wieder online ...
        </Translation>
        <Translation lang="en">
          Since GatsbyJS has unfortunately decided to discontinue hosting and my
          website is too large to be compiled regularly due to images, etc.,
          there is currently only this placeholder here.
          <br />
          <br />
          But soon there will be something to see here again! In the meantime,
          you can admire this new and still very rudimentary window manager.
          <br />
          <br />
          Due, not least, to the fact that all pages are displayed in an iFrame,
          I have decided to completely rewrite the site!
          <br />
          <br />
          <br />
          So please be patient for a little longer, soon it will be back online
          again, also with DE/EN as language, as well as many new features...
        </Translation>
      </TranslateSwitch>
    </div>
  );
}
