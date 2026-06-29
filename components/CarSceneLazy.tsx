"use client";

import dynamic from "next/dynamic";

const CarScene = dynamic(() => import("./CarScene"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100vh" }} />,
});

export default function CarSceneLazy() {
  return <CarScene />;
}
