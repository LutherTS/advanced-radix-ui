"use client";

import { useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { AnimatePresence, motion } from "framer-motion";

import * as Icons from "../ios-slider/icons";

const getRandomMessage = () => {
  const notifications = [
    "New message received!",
    "Update successful!",
    "Download complete.",
    "Profile updated.",
    "Payment processed.",
    "New friend request.",
    "Meeting rescheduled.",
    "Password changed.",
    "Item added to cart.",
    "Subscription expired.",
    "File uploaded successfully.",
    "Error processing request.",
    "Reminder: Appointment today.",
    "System maintenance soon.",
    "New comment on post.",
    "Weather alert: Heavy rain.",
    "Task deadline approaching.",
    "Discount code applied!",
    "Travel itinerary confirmed.",
    "Battery low: 10% remaining.",
  ];

  const randomIndex = Math.floor(Math.random() * notifications.length);

  return notifications[randomIndex];
};

export default function animatedToastPage() {
  let [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  return (
    <main className="flex h-screen items-center justify-center bg-black text-white">
      <button
        onClick={() =>
          setToasts([
            ...toasts,
            { id: window.crypto.randomUUID(), message: getRandomMessage() },
          ])
        }
        className="w-28 rounded border-t border-white/20 bg-sky-500 py-2 text-sm font-semibold text-white transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-sky-600"
      >
        Notify
      </button>

      <Toast.Provider>
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <Toast.Root
              key={toast.id}
              duration={Infinity}
              asChild
              forceMount
              onOpenChange={() => {
                setToasts(toasts.filter((e) => e.id !== toast.id));
              }}
              onEscapeKeyDown={(event) => {
                event.preventDefault();
                setToasts(toasts.filter((_, i, a) => i !== a.length - 1));
              }}
            >
              <motion.li
                initial={{ x: 300 }} // "calc(100% + 16px)" messes up, and to be fair 300 currently is just fine
                animate={{ x: 0 }}
                exit={{
                  x: 200,
                  opacity: 0,
                  zIndex: -1,
                  transition: { duration: 0.3 },
                }} // the problem comes from when the exit animation is "too fast", but I don't know yet what too fast is.
                // A middle ground solution could be to delay the timing of the creation of toasts, with some kind of timer and disabled.
                // This is where escape is fine, since it waits before remove, while duration dismissal does not. That's the issue.
                // ...Or in the meantime I can just keep duration={Infinity}
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 px-6 py-4 text-sm font-medium focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                layout
              >
                {/* <Toast.Title /> */}
                <Toast.Description>{toast.message}</Toast.Description>
                {/* <Toast.Action /> */}
                <Toast.Close className="text-gray-600 hover:text-gray-200 focus-visible:rounded focus-visible:text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                  <Icons.XMark className="size-5" />
                </Toast.Close>
              </motion.li>
            </Toast.Root>
          ))}
        </AnimatePresence>

        <Toast.Viewport
          className={`fixed right-4 top-4 flex w-80 flex-col-reverse gap-y-3 ${toasts.length > 0 ? "focus-visible:rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500" : "focus-visible:outline-none"}`}
        />
      </Toast.Provider>
    </main>
  );
}

/* Notes
right-4 top-4 instead of mr-4 mt-4. 
The Toast is preventing Fast Refresh.
...
asChild and layout are doing some AB-SO-LUTE magic.
...
There's an issue with the speed.
Previous code
"calc(100% + 16px)"
...
For now I'll consider the speed issue, and the calc issue to be due to the compatibility between Radix and React 19 RC.
I honestly don't mind forcing the toasts to be clicked to be dismissed since that's exactly how I do 'em in my app.
*/
