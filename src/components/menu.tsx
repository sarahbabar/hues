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
            className="fixed top-[10rem] md:top-[12rem] w-[350px] h-[400px] md:w-[500px] md:h-[540px] 
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
            <div className="uppercase mb-6">
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

            <div className="text-sm md:text-xl font-bold flex flex-col items-center justify-center uppercase space-x-2">
              <div className="flex mb-2 items-center justify-center space-x-3">
                <div>Made By -</div>
                <div className="transition transform hover:scale-105 ease-in-out duration-200 underline underline-offset-4">
                  <a href="https://sarahbabar.com/" target="_blank">
                    Sarah Babar
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <a href="https://github.com/sarahbabar/hues" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 md:w-8 md:h-8 md:hover:scale-110 transition ease-in-out duration-200"
                  >
                    <path
                      fill="currentColor"
                      d="M5 2h4v2H7v2H5V2Zm0 10H3V6h2v6Zm2 2H5v-2h2v2Zm2 2v-2H7v2H3v-2H1v2h2v2h4v4h2v-4h2v-2H9Zm0 0v2H7v-2h2Zm6-12v2H9V4h6Zm4 2h-2V4h-2V2h4v4Zm0 6V6h2v6h-2Zm-2 2v-2h2v2h-2Zm-2 2v-2h2v2h-2Zm0 2h-2v-2h2v2Zm0 0h2v4h-2v-4Z"
                    />
                  </svg>
                </a>

                <a href="mailto:sarah.babar19@gmail.com" target="_blank">
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 md:w-8 md:h-8 md:hover:scale-110 transition ease-in-out duration-200"
                  >
                    <path
                      d="M22 4H2v16h20V4zM4 18V6h16v12H4zM8 8H6v2h2v2h2v2h4v-2h2v-2h2V8h-2v2h-2v2h-4v-2H8V8z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a href="https://buymeacoffee.com/sarahbabar" target="_blank">
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 md:w-8 md:h-8 md:hover:scale-110 transition ease-in-out duration-200"
                  >
                    <path
                      d="M4 4h18v7h-4v5H4V4zm14 5h2V6h-2v3zm-2-3H6v8h10V6zm3 14H3v-2h16v2z"
                      fill="currentColor"
                    />
                  </svg>
                  <path
                    fill="currentColor"
                    d="M5 2h4v2H7v2H5V2Zm0 10H3V6h2v6Zm2 2H5v-2h2v2Zm2 2v-2H7v2H3v-2H1v2h2v2h4v4h2v-4h2v-2H9Zm0 0v2H7v-2h2Zm6-12v2H9V4h6Zm4 2h-2V4h-2V2h4v4Zm0 6V6h2v6h-2Zm-2 2v-2h2v2h-2Zm-2 2v-2h2v2h-2Zm0 2h-2v-2h2v2Zm0 0h2v4h-2v-4Z"
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
