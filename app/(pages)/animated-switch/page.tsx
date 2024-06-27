"use client";

import * as Switch from "@radix-ui/react-switch";
import { motion } from "framer-motion";
/* with state */
// import { useState } from "react";

export default function AnimatedSwitchPage() {
  /* with state */
  // let [airplaneMode, setAirplaneMode] = useState(false);
  // console.log(airplaneMode);

  return (
    <main className="flex h-screen items-center justify-center bg-black text-white">
      <form
        className="flex items-center space-x-4"
        action={(formData: FormData) => {
          console.log(formData);
          console.log({ airplaneMode: !!formData.get("airplanemode") });
        }}
      >
        <label className="flex items-center space-x-4">
          <span className="select-none text-base leading-none text-white">
            Airplane mode
          </span>
          <Switch.Root
            /* with state */
            // checked={airplaneMode}
            // onCheckedChange={setAirplaneMode}
            id="airplane-mode"
            name="airplanemode"
            className="flex w-11 rounded-full bg-red-500 p-px shadow-inner shadow-black/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 active:bg-red-400 data-[state=unchecked]:flex-row data-[state=checked]:flex-row-reverse data-[state=checked]:bg-green-500 data-[state=checked]:focus-visible:outline-green-400 data-[state=checked]:active:bg-green-400"
          >
            <Switch.Thumb asChild>
              <motion.span
                layout
                transition={{ duration: 0.15 }}
                className="block size-6 rounded-[calc(1.5rem/2)] bg-gray-100 shadow-sm transition-colors data-[state=checked]:bg-white"
              ></motion.span>
            </Switch.Thumb>
          </Switch.Root>
        </label>
        <button className="" type="submit">
          Save
        </button>
      </form>
    </main>
  );
}

/* Notes
Using calc in Tailwind: rounded-[calc(1.25rem/2)] (no spaces)
No need to modify a translate by hand thanks to Framer Motion layout.
*/
