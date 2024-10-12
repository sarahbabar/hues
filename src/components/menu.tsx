import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Menu({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-[10rem] md:top-[12rem] w-[290px] h-[340px] md:w-[500px] md:h-[640px] 
                    z-50 bg-white flex flex-col rounded-sm border-[3px] border-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          <div>
            <button className="uppercase">How to Play</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
