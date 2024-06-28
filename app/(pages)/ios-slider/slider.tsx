"use client";

import * as Slider from "@radix-ui/react-slider";
import * as Icons from "./icons";

export default function SliderComponent({ name }: { name?: string }) {
  return (
    <div className="group flex items-center gap-x-3 transition-[margin] duration-[350ms] *:duration-[350ms] hover:-mx-3 hover:cursor-grab active:cursor-grabbing">
      <Icons.SpeakerXMark className="size-5 text-gray-300 transition group-hover:scale-125 group-hover:text-white" />
      <Slider.Root
        name={name}
        defaultValue={[50]}
        className="relative flex h-1.5 grow items-center transition-[height] group-hover:h-4"
      >
        <Slider.Track className="relative h-full grow overflow-hidden rounded-full bg-gray-700 transition-colors">
          <Slider.Range className="absolute h-full bg-gray-300 transition-colors group-hover:bg-white" />
        </Slider.Track>
        <Slider.Thumb className="opacity-0" />
      </Slider.Root>
      <Icons.SpeakerWave className="size-5 text-gray-300 transition group-hover:scale-125 group-hover:text-white" />
    </div>
  );
}

/* Notes
Old Slider.Thumb classes className="block size-5 rounded-[50%] bg-blue-400".
active:border-4 active:border-red-500 *:active:border-4 *:active:border-red-500 
Bug: active works only await from the slider.
The bug goes a lot deeper: https://buildui.com/recipes/elastic-slider. This is something Sam himself would have to address.
*/
