import React, { useState, useEffect } from "react";

const Typewriter = ({ text, delay }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prevText) => {
        const nextIndex = (prevText.length + 1) % text.length;
        return prevText + text[nextIndex];
      });
      setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, delay);

    return () => clearInterval(interval);
  }, [currentIndex, text, delay]);

  return <span>{currentText}</span>;
};

export default Typewriter;
