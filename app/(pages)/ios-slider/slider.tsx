"use client";

import * as Slider from "@radix-ui/react-slider";
import * as Icons from "./icons";
import { useState } from "react";

export default function SliderComponent({ name }: { name?: string }) {
  let [value, setValue] = useState([50]);
  let [isGrabbing, setIsGrabbing] = useState(false);
  let [isUsingPointer, setisUsingPointer] = useState(false);

  return (
    <>
      <div className="flex h-5 flex-col justify-center">
        <div className="group flex items-center gap-x-3 duration-200">
          <button
            type="button"
            onClick={() => setValue([0])}
            className="group/speakerx *:text-gray-400 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 group-hover:*:text-gray-200"
          >
            <Icons.SpeakerXMark
              className="size-[25px] hover:!text-white group-focus-visible/speakerx:text-white"
              style={{
                color:
                  value.length === 1 && value[0] === 0 ? "white" : undefined,
              }}
            />
          </button>
          <Slider.Root
            name={name}
            // defaultValue={[50]}
            value={value}
            onValueChange={(value) => setValue(value)}
            className="group/slider relative flex h-2 grow touch-none select-none items-center transition-[height] duration-200 hover:h-5"
          >
            <Slider.Track
              className={`relative h-full grow overflow-hidden rounded-full bg-gray-700 *:bg-gray-400 *:transition-colors *:duration-200 *:hover:!bg-white *:group-hover:bg-gray-200 ${isUsingPointer ? "" : "group-has-[:focus-visible]/slider:outline group-has-[:focus-visible]/slider:outline-2 group-has-[:focus-visible]/slider:outline-offset-2 group-has-[:focus-visible]/slider:outline-sky-500 group-has-[:focus-visible]/slider:*:bg-white"}`}
              style={{
                cursor: isGrabbing ? "grabbing" : "grab",
              }}
              onPointerDown={() => {
                setIsGrabbing(true);
                setisUsingPointer(true);
              }}
              onPointerUp={() => setIsGrabbing(false)}
            >
              <Slider.Range className="absolute h-full">
                <div className="absolute inset-0 group-has-[:focus-visible]/slider:bg-white"></div>
              </Slider.Range>
            </Slider.Track>
            <Slider.Thumb
              className="opacity-0"
              onBlur={() => setisUsingPointer(false)}
            />
          </Slider.Root>
          <button
            type="button"
            onClick={() => setValue([100])}
            className="group/speakerwave *:text-gray-400 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 group-hover:*:text-gray-200"
          >
            <Icons.SpeakerWave
              className="size-[25px] hover:!text-white group-focus-visible/speakerwave:text-white"
              style={{
                color:
                  value.length === 1 && value[0] === 100 ? "white" : undefined,
              }}
            />
          </button>
        </div>
      </div>
    </>
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
I'll add the buttons on the icons at the end, since they require controlling the input.
So it's not a height issue.
Even scale doesn't fix this.
I'll have to believe it's a Radix issue, I could talk about it in the chat. Or I'll just keep it also for the lesson's end.
...
I'll have to deploy to try this on mobile.
The focus is on the thumb because there can be multiple thumbs, and each should be able to receive its own focus.
Transition durations and other transition properties as unconditional.
Other than that, honestly, my focus-visible issue is rather negligeable and I should move on in the lesson.
So glad to know that this focus-visible issue is a problem due to the browser's user agent, and to be fair to Radix itself.
*/
