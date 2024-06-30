"use client";

import { useState } from "react";

import Slider from "./slider";

export default function iOSSliderPage() {
  let [volume, setVolume] = useState(60);
  console.log({ volume });

  return (
    <main className="flex h-screen items-center justify-center bg-black text-white">
      <div className="mx-auto w-full max-w-xs">
        <form
          action={(formData: FormData) => {
            alert(`volume: ${formData.get("volume")}`);
          }}
          className="space-y-8 rounded"
        >
          <p className="text-sm font-medium text-white/80">Settings</p>
          <Slider
            name="volume"
            definedValue={volume}
            definedOnValueChange={setVolume}
            max={1000}
          />
          <div className="mt-5 flex items-center justify-between">
            <button
              type="submit"
              className="rounded bg-white/[.15] px-3 py-1 text-sm font-semibold text-white text-white/90 transition-colors hover:text-white focus-visible:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
