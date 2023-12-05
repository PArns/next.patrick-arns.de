import Window from "@/components/os/window";

export default function UnderConstruction() {
  return (
    <Window
      sortIndex={0}
      width="50%"
      height="50%"
      route="/underconstruction"
      title="UNDER CONSTRUCTION!"
      icon="/appicons/sketch.png"
      isInitiallyOpen={true}
    >
      <div className="m-10">
        Da GatsbyJS leider beschlossen hat, das Hosting einzustellen und meine
        Webseite aufgrund von Bildern etc. zu groß ist, um regulär kompiliert zu
        werden, gibt es aktuell leider nur diesen Platzhalter hier.
        <br />
        <br />
        Aber bald gibt&apos;s hier wieder etwas zu sehen! Derweil könnt ihr dann
        diesen neuen und noch sehr rudimentären Fenstermanager bestaunen ;)
        <br />
        <br />
        Ich habe, nicht zuletzt aufgrund dessen, das alle Seiten in einem iFrame
        dargestellt werden, beschlossen, die Seite komplett neu zu schreiben!
        <br />
        <br />
        <br />
        Geduldet euch also noch ein bisschen, bald ist diese wieder, auch mit
        DE/EN als Sprache, sowie vielen neuen Funktionen, wieder online ...
      </div>
    </Window>
  );
}