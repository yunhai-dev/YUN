"use client";

import dynamic from "next/dynamic";

// ponytail: thin client wrapper — dynamic import must live in a Client Component
const ParticleField = dynamic(() => import("./particle-field"), { ssr: false });

export default function ParticleFieldLoader() {
  return <ParticleField />;
}
