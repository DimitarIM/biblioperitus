import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollShadowing() {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <>
      <motion.div
        style={{ opacity }}
        className="fixed bottom-0 z-20 left-0 w-full h-30 pointer-events-none
                   bg-gradient-to-t from-black/60 to-transparent"
      />
    </>
  );
}