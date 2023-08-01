"use client";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children }: { children: any }) => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 100 }}
          transition={{ duration: 1 }}
          exit={{ y: 100, opacity: 0 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Layout;
