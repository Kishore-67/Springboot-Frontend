import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const styles = {
  wrapper: {
    display: "inline-block",
    whiteSpace: "pre-wrap",
    fontSize: "32px",
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    border: 0,
  },
};

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const containerRef = useRef(null);

  // Automatically trigger animation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTriggerAnimation((prev) => !prev); // Toggle state to restart animation
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");

    const shuffleText = (originalText, currentRevealed) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    };

    setIsScrambling(true);
    interval = setInterval(() => {
      setRevealedIndices((prevRevealed) => {
        setDisplayText(shuffleText(text, prevRevealed));
        currentIteration++;
        if (currentIteration >= maxIterations) {
          clearInterval(interval);
          setIsScrambling(false);
          setDisplayText(text);
        }
        return prevRevealed;
      });
    }, speed);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [triggerAnimation, text, speed, maxIterations, characters, useOriginalCharsOnly]);

  return (
    <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...props}>
      <span style={styles.srOnly}>{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => (
          <span key={index} className={revealedIndices.has(index) || !isScrambling ? className : encryptedClassName}>
            {char}
          </span>
        ))}
      </span>
    </motion.span>
  );
}
