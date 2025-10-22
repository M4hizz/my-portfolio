import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  trigger?: any;
  className?: string;
  duration?: number; // total duration in ms
};

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";

function randChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

export default function ScrambleText({
  text,
  trigger,
  className = "",
  duration = 800,
}: Props) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const prevTriggerRef = useRef<any>(null);

  useEffect(() => {
    // start animation if trigger changed
    if (prevTriggerRef.current === trigger) return;
    prevTriggerRef.current = trigger;

    const len = text.length;
    const now = () => performance.now();
    startRef.current = now();

    const step = () => {
      const t = now() - (startRef.current as number);
      const progress = Math.min(1, t / duration);

      // we will reveal characters progressively from left to right
      const revealCount = Math.floor(progress * len);

      let out = "";
      for (let i = 0; i < len; i++) {
        if (i < revealCount) {
          out += text[i];
        } else {
          // occasionally show correct char to make it feel dynamic
          out += Math.random() < 0.28 ? text[i] : randChar();
        }
      }

      setDisplay(out);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(text);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [trigger, text, duration]);

  return <span className={className}>{display}</span>;
}
