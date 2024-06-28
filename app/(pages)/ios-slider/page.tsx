"use client";

import Slider from "./slider";

export default function iOSSliderPage() {
  return (
    <main className="flex h-screen items-center justify-center bg-black text-white">
      <div className="mx-auto w-full max-w-xs">
        <form
          action={(formData: FormData) => {
            alert(formData.get("slidervalue"));
          }}
          className="space-y-8 rounded"
        >
          <p className="text-sm font-medium text-white/60">Settings</p>
          <Slider name="slidervalue" />
          <input type="range" name="myslider" className="w-full" />
          <div className="mt-5 flex items-center justify-between">
            <button
              type="submit"
              className="bg-white/[.15] px-3 py-1 text-sm font-semibold text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
