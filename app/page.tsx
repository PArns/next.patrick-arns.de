import Desktop from "@/components/os/desktop";
import Window from "@/components/os/window";

import { createElement } from "react";

export default function Home() {
  return (
    <Desktop>
      <Window
        sortIndex={0}
        width="50%"
        height="50%"
        
        title="UNDER CONSTRUCTION!"
        icon="/favicons/favicon-32x32.png"
        isInitiallyOpen={true}
      >
        <div className="m-10">
          Da GatsbyJS leider beschlossen hat, das Hosting einzustellen und
          meine Webseite aufgrund von Bildern etc. zu groß ist, um regulär
          kompiliert zu werden, gibt es aktuell leider nur diesen Platzhalter
          hier.
          <br />
          <br />
          Aber bald gibt&apos;s hier wieder etwas zu sehen! Derweil könnt ihr dann
          diesen neuen und noch sehr rudimentären Fenstermanager bestaunen ;)
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
        </div>
      </Window>

      <Window sortIndex={1} title="Window 2" icon="/favicons/favicon-32x32.png">
        Hello World!
      </Window>

      {createElement(
        Window,
        {
          title: "Das dritte Fenster!",
          icon: "/favicons/favicon-32x32.png",
          sortIndex: 3,
        },
        <div>
          <b>Manually created!</b>
        </div>
      )}
    </Desktop>
  );
}
