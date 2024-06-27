"use client";

import * as Switch from "@radix-ui/react-switch";
import { motion } from "framer-motion";

export default function AnimatedSwitchPage() {
  return (
    <main className="flex h-screen items-center justify-center bg-black text-white">
      {/* <p>Hello BuildUI!</p> */}
      <Switch.Root className="flex h-5 w-11 rounded-full bg-gray-500 data-[state=unchecked]:flex-row data-[state=checked]:flex-row-reverse data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500">
        <Switch.Thumb asChild>
          <motion.span
            layout
            className="block size-5 rounded-[calc(1.25rem/2)] bg-white"
          ></motion.span>
        </Switch.Thumb>
      </Switch.Root>
    </main>
  );
}

/* Notes
Using calc in Tailwind: rounded-[calc(1.25rem/2)] (no spaces)
*/
