"use client";

import * as Slider from "@radix-ui/react-slider";
import * as Icons from "./icons";
import { useState } from "react";

export default function SliderComponent({ name }: { name?: string }) {
  let [isGrabbing, setIsGrabbing] = useState(false);

  return (
    <div className="flex h-5 flex-col justify-center">
      <div className="group flex items-center gap-x-3 duration-[350ms] *:duration-[350ms]">
        <Icons.SpeakerXMark className="size-[25px] text-gray-400 hover:!text-white group-hover:text-gray-200 group-hover:transition" />
        <Slider.Root
          name={name}
          defaultValue={[50]}
          className="relative flex h-2 grow items-center transition-[height] hover:h-5"
        >
          <Slider.Track
            className="relative h-full grow overflow-hidden rounded-full bg-gray-700 *:bg-gray-400 *:transition-colors *:hover:!bg-white *:group-hover:bg-gray-200"
            style={{ cursor: isGrabbing ? "grabbing" : "grab" }}
            onPointerDown={() => setIsGrabbing(true)}
            onPointerUp={() => setIsGrabbing(false)}
          >
            <Slider.Range className="absolute h-full" />
          </Slider.Track>
          <Slider.Thumb className="opacity-0" />
        </Slider.Root>
        <Icons.SpeakerWave className="size-[25px] text-gray-400 hover:!text-white group-hover:text-gray-200 group-hover:transition" />
      </div>
    </div>
  );
}

/* Notes
Old Slider.Thumb classes className="block size-5 rounded-[50%] bg-blue-400".
active:border-4 active:border-red-500 *:active:border-4 *:active:border-red-500 
Bug: active works only await from the slider.
The bug goes a lot deeper: https://buildui.com/recipes/elastic-slider. This is something Sam himself would have to address.
Removed hover:cursor-grab active:cursor-grabbing because active:cursor-grabbing not working.
OK. Scale is not height, only visual. So the container was still the h-5 of size-5 from the icons. 
Problems. Solved. Except for this ONE pixel at the bottom of the slider.
*/
