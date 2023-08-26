"use client";
import React, { useState, useEffect } from "react"; // Added useEffect
import styles from "./page.module.css";

export default function Home() {
  const [runway, setRunway] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [windDirection, setWindDirection] = useState<string>("0");
  const [kve, setKve] = useState<number>(0);

  // Using useEffect to compute KVE whenever windSpeed changes
  useEffect(() => {
    const runwayAngle = runway * 10;
    const alpha = -(runwayAngle - Number(windDirection));
    console.log(alpha);
    setKve(Math.cos(alpha * (Math.PI / 180)) * windSpeed);
  }, [runway, windSpeed, windDirection]);

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="runway">
            Runway Number:
          </label>
          <input
            className={styles.formInput}
            type="text"
            value={runway}
            onChange={(e) => setRunway(Number(e.target.value))}
            id="runway"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="windSpeed">
            Wind Speed (kts):
          </label>
          <input
            className={styles.formInput}
            type="number"
            value={windSpeed}
            onChange={(e) => setWindSpeed(Number(e.target.value))}
            id="windSpeed"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="windDirection">
            Wind origin (in &deg;):
          </label>
          <input
            className={styles.formInput}
            type="text"
            value={windDirection}
            onChange={(e) => {
              if (
                e.target.value === "-" ||
                e.target.value.match(/^[-]?[0-9]*(\.[0-9]*)?$/) ||
                e.target.value === ""
              ) {
                setWindDirection(e.target.value);
              }
            }}
            id="windDirection"
          />
        </div>

        <div className={styles.kveResult}>
          <p>KVE for landing: {kve.toFixed(1)} kts</p>
        </div>
      </div>
    </main>
  );
}
