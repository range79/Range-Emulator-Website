import { type CSSProperties, useEffect, useState, useRef } from "react";

type Props = {
  children: string;
  className?: string;
  style?: CSSProperties;
  as?: "span" | "p" | "h2" | "h3" | "h1";
  delay?: number;
};

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

export function DecryptText({
  children,
  className = "",
  style,
  as: Tag = "span",
  delay = 0
}: Props) {
  const [displayText, setDisplayText] = useState("");
  const iterations = useRef(0);

  useEffect(() => {
    let interval: any;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          children
            .split("")
            .map((char, index) => {
              if (index < iterations.current) {
                return char;
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("")
        );

        if (iterations.current >= children.length) {
          clearInterval(interval);
        }

        iterations.current += 1 / 3;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [children, delay]);

  return (
    <Tag className={className} style={{ cursor: "default", ...style }}>
      {displayText || children.replace(/./g, " ")}
    </Tag>
  );
}
