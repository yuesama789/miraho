import React from "react";
import styles from "./Storybox.module.scss";

type Color = "orange" | "pink" | "purple";

interface StoryboxProps {
    color?: Color;
    title: string;
    text?: string;
    bulletPoints?: string[];
    className?: string;
}

const colorMap: Record<Color, { bg: string; fg: string }> = {
    orange: { bg: "#fff1e7", fg: "#ffe2cd" },
    pink: { bg: "#ffe7f5", fg: "#ffceea" },
    purple: { bg: "#f2e8ff", fg: "#e4cfff" },
};

const Storybox: React.FC<StoryboxProps> = ({ color = "purple", title, text, bulletPoints, className = "", }) => {
    const { bg, fg } = colorMap[color];

    return (
        <div
            className={styles.storybox + " " +  className}
            style={{
                border: "1px solid" + fg,
                background: `linear-gradient(135deg, ${bg} 0%, ${fg} 100%)`,
            }}
            aria-label={title}
        >
            <h3>
                {title}
            </h3>
            {text && !bulletPoints && <p className={styles.storyboxText}>{text}</p>}
            {bulletPoints && (
                <ul className={styles.storyboxList}>
                    {bulletPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Storybox;