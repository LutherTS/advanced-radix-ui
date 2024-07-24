"use client";

import {
  Dispatch,
  SetStateAction,
  // useEffect,
  useState,
} from "react";

import * as Slider from "@radix-ui/react-slider";
import * as Icons from "./icons";

const clamp = (newValue: number, min: number, max: number) =>
  Math.min(Math.max(newValue, min), max);

// need to understand
const roundToStep = (clampedValue: number, step: number) => {
  const inverseStep = 1 / step;
  return Math.round(clampedValue * inverseStep) / inverseStep;
};

export default function SliderComponent({
  name,
  min = 0,
  max = 100,
  step = 1,
  definedValue = 50,
  definedOnValueChange = () => {},
}: {
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  definedValue?: number;
  definedOnValueChange?: Dispatch<SetStateAction<number>>;
}) {
  let [value, setValue] = useState(definedValue);

  let [isGrabbing, setIsGrabbing] = useState(false);
  let [isUsingPointer, setIsUsingPointer] = useState(false);
  let [startingClientX, setStartingClientX] = useState(0);
  let [startingValue, setStartingValue] = useState(value);

  let [myStash, setMyStash] = useState({
    previousDiffPerUnit: 0,
    currentDiffPerUnit: 0,
    previousRealDiffPerUnit: 0,
    currentRealDiffPerUnit: 0,
  });

  let [myDiffies, setMyDiffies] = useState({
    previousDiffyPerUnit: 0,
    currentDiffyPerUnit: 0,
    previousRealDiffyPerUnit: 0,
    currentRealDiffyPerUnit: 0,
  });

  const updateValue = (providedValue: number) => {
    setValue(providedValue);
    definedOnValueChange(providedValue);
  };

  /* beforeunload testing
  useEffect(() => {
    // shortened without space for additional code //
    // const beforeUnload = (event: BeforeUnloadEvent) => event.preventDefault();
    // window.addEventListener("beforeunload", beforeUnload);
    // window.removeEventListener("beforeunload", beforeUnload);

    const beforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);
  // https://vercel.com/guides/leave-page-confirmation-dialog-before-unload-nextjs-react
  */

  return (
    <>
      <div className="flex h-5 flex-col justify-center">
        <div className="group flex items-center gap-x-3 duration-200">
          <button
            type="button"
            onClick={() => updateValue(min)}
            className="group/speakerx *:text-gray-400 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 group-hover:*:text-gray-200"
          >
            <Icons.SpeakerXMark
              className="size-[25px] hover:!text-white group-focus-visible/speakerx:text-white"
              style={{
                color: value === min ? "white" : undefined,
              }}
            />
          </button>
          <Slider.Root
            name={name}
            value={[value]}
            onValueCommit={([value]) => {
              if (!isUsingPointer) updateValue(value);
            }}
            className="group/slider relative flex h-2 grow touch-none select-none items-center transition-[height] duration-200 group-hover:h-5"
            min={min}
            max={max}
            step={step}
          >
            <Slider.Track
              className={`relative h-full grow overflow-hidden rounded-full bg-gray-700 *:bg-gray-400 *:transition-colors *:duration-200 *:hover:!bg-white *:group-hover:bg-gray-200 ${isUsingPointer ? "" : "group-has-[:focus-visible]/slider:outline group-has-[:focus-visible]/slider:outline-2 group-has-[:focus-visible]/slider:outline-offset-2 group-has-[:focus-visible]/slider:outline-sky-500 group-has-[:focus-visible]/slider:*:bg-white"}`}
              style={{
                cursor: isGrabbing ? "grabbing" : "grab",
              }}
              onPointerDown={(event) => {
                setIsGrabbing(true);
                setIsUsingPointer(true);
                setStartingClientX(event.clientX);
                setStartingValue(value);
              }}
              onPointerMove={(event) => {
                if (event.buttons > 0) {
                  let diffInPixels = event.clientX - startingClientX;
                  let sliderWidth = event.currentTarget.clientWidth;
                  let pixelsPerUnit = (max - min) / sliderWidth;
                  let diffPerUnit = diffInPixels * pixelsPerUnit;

                  let realDiffPerUnit = clamp(
                    diffPerUnit,
                    min - startingValue,
                    max - startingValue,
                  );
                  // console.log({ diffPerUnit, realDiffPerUnit });

                  setMyStash({
                    ...myStash,
                    previousDiffPerUnit: myStash.currentDiffPerUnit,
                    currentDiffPerUnit: diffPerUnit,
                  });
                  // console.log({
                  //   previousDiffPerUnit: myStash.previousDiffPerUnit,
                  //   currentDiffPerUnit: myStash.currentDiffPerUnit,
                  // });
                  setMyDiffies({
                    ...myDiffies,
                    previousDiffyPerUnit:
                      myDiffies.currentDiffyPerUnit === 0
                        ? myDiffies.previousDiffyPerUnit
                        : Math.sign(myDiffies.currentDiffyPerUnit),
                    currentDiffyPerUnit:
                      myStash.currentDiffPerUnit -
                        myStash.previousDiffPerUnit ===
                      0
                        ? myDiffies.currentDiffyPerUnit
                        : Math.sign(
                            myStash.currentDiffPerUnit -
                              myStash.previousDiffPerUnit,
                          ),
                  });
                  // console.log({
                  //   previousDiffyPerUnit: myDiffies.previousDiffyPerUnit,
                  //   currentDiffyPerUnit: myDiffies.currentDiffyPerUnit,
                  // });

                  /* original pseudo code */
                  // I want the previous diffPerUnit, and the current diffPerUnit
                  // then I want the diff between them
                  // then if we're outside the bounds and their diff changes direction, we're redefining the startValue

                  let newValue = startingValue + realDiffPerUnit;
                  let clampedValue = clamp(newValue, min, max);
                  let steppedValue = roundToStep(clampedValue, step);
                  updateValue(steppedValue);

                  if (
                    (steppedValue === min &&
                      myDiffies.previousDiffyPerUnit !==
                        myDiffies.currentDiffyPerUnit &&
                      myDiffies.currentDiffyPerUnit === 1) ||
                    (steppedValue === max &&
                      myDiffies.previousDiffyPerUnit !==
                        myDiffies.currentDiffyPerUnit &&
                      myDiffies.currentDiffyPerUnit === -1)
                  ) {
                    // console.log("Yes.");
                    setStartingClientX(event.clientX);
                    setStartingValue(steppedValue);
                  }
                  // YES.
                }
              }}
              onPointerUp={() => setIsGrabbing(false)}
            >
              <Slider.Range className="absolute h-full">
                <div
                  className={`absolute inset-0 ${isUsingPointer ? "" : "group-has-[:focus-visible]/slider:bg-white"}`}
                ></div>
              </Slider.Range>
            </Slider.Track>
            <Slider.Thumb
              className="opacity-0"
              /* debugging the focus/refocus issue */
              // onFocus={() => console.log("Now focused.")}
              onBlur={(event) => {
                /* In effect, when focus-visible is active on an element, though leaving the page removes the focus, the focus returns when entering back the page, which consequently did not trigger back setIsUsingPointer(true). Consequently the focus had to explicitly be removed if we're blurring from the element in any situation while using pointer. */
                if (isUsingPointer) event.currentTarget.blur();
                setIsUsingPointer(false);
              }}
            />
          </Slider.Root>
          <button
            type="button"
            onClick={() => updateValue(max)}
            className="group/speakerwave *:text-gray-400 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 group-hover:*:text-gray-200"
          >
            <Icons.SpeakerWave
              className="size-[25px] hover:!text-white group-focus-visible/speakerwave:text-white"
              style={{
                color: value === max ? "white" : undefined,
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
Previous code: value.length === 1 && value[0] === 100 ? "white" : undefined
...
Let. Him. Cook.
*/
