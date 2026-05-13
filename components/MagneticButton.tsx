"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  strength?: number;
  onClick?: (e: React.MouseEvent) => void;
}

export default function MagneticButton({ children, className = "", style, href = "#", strength = 0.35, onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      className={className}
      style={style}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  );
}
