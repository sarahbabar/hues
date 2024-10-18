import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Menu({
  visible,
  setIsVisible,
}: {
  visible: boolean;
  setIsVisible: any;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-50 bg-black/50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          <div
            className="fixed top-[10rem] md:top-[12rem] w-[350px] h-[340px] md:w-[500px] md:h-[450px] 
                    z-50 bg-white flex flex-col rounded-sm border-[3px] border-foreground 
                    p-7 md:px-10 md:py-5 justify-center"
          >
            <div className="flex justify-end">
              <button
                className="absolute top-3 right-3 text-3xl flex items-center md:hover:scale-110 transition ease-in-out duration-200"
                onClick={() => setIsVisible(false)}
              >
                <img src="/imgs/cross_cursor.png"></img>
              </button>
            </div>
            <div className="uppercase text-lg md:text-2xl font-bold mb-2">
              How to Play
            </div>
            <div className="uppercase text-sm md:text-xl mb-6">
              You have 6 tries to correctly guess the hex code of the target
              colour. Valid characters include numbers
              <span className="font-bold "> 0-9 </span> and letters
              <span className="font-bold "> A-F</span>.
            </div>
            <div className="uppercase">
              <div className="text-lg md:text-2xl font-bold mb-2">Symbols</div>

              <div className="text-sm md:text-xl "> ♥ character is correct</div>

              <div className="text-sm md:text-xl">
                <span className="inline-block rotate-90 font-bold">›</span> off
                by 1-2 values lower
              </div>

              <div className="text-sm md:text-xl ">
                <span className="inline-block rotate-90 font-bold">»</span> off
                by 3 or more values lower
              </div>

              <div className="text-sm md:text-xl ">
                <span className="inline-block rotate-90 font-bold">‹</span> off
                by 1-2 values higher
              </div>

              <div className="text-sm md:text-xl ">
                <span className="inline-block rotate-90 font-bold">«</span> off
                by 3 or more values higher
              </div>
            </div>

            <div className="text-xl my-4 flex items-center justify-center">
              Made By - Sarah Babar
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
