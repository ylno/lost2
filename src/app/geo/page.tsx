"use client";
import { useEffect, useState } from "react";

export default function GeoLocation() {
  const [position, setPosition] = useState<GeolocationPosition>();
  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Geolocation ist verfügbar");
      // Hier können Sie den Code zur Anforderung der Position einfügen
      navigator.geolocation.watchPosition(
        (position) => {
          console.log("position", position);
          setPosition(() => {
            return position;
          });
        },
        (error) => {
          console.log("error", error);
        },
      );
      setInterval(() => {}, 1000);
    } else {
      console.log("Geolocation is not available");
    }
  }, []);

  return (
    <>
      Geo:{" "}
      {position && (
        <>
          <div>
            {`${position.coords.latitude} ${position.coords.longitude}`}
          </div>
          <div>alt: {position.coords.altitude}</div>
        </>
      )}
    </>
  );
}
