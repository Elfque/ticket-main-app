"use client";
import { motion, AnimatePresence } from "framer-motion";

const Layout = ({ children }: { children: any }) => {
  return <div className="overflow-x-hidden">{children}</div>;
};

export default Layout;
