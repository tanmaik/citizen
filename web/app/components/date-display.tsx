"use client";

import { useState, useEffect } from "react";

export default function DateDisplay() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p>
      {date
        .toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })
        .toLowerCase()}
    </p>
  );
}
