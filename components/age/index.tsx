"use client";

import { useEffect, useState } from "react";

export default function Age({
  birthday,
  single,
  plural,
}: {
  birthday: string;
  single: string;
  plural: string;
}) {
  const [yearsOld, setYearsOld] = useState<number>();
  const [pluralize, setPluralize] = useState("");

  useEffect(() => {
    const today = new Date();
    const birthDate = new Date(birthday);
    const m = today.getMonth() - birthDate.getMonth();
    var age = today.getFullYear() - birthDate.getFullYear();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    setYearsOld(age);

    if (single && plural) {
      if (age == 1) setPluralize(single);
      else setPluralize(plural);
    }
  }, [yearsOld, setYearsOld, pluralize, setPluralize, birthday, single, plural]);

  return (
    <>
      {yearsOld} {pluralize}
    </>
  );
}
