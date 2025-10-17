import React from "react";
import styles from "./Storybox.module.scss";

type Color = "orange" | "pink" | "purple";

interface StoryboxProps {
    icon: string; // an emoji or short text used as an icon
    color?: Color;
    title: string;
    text: string;
    className?: string;
}

const colorMap: Record<Color, { bg: string; fg: string }> = {
    orange: { bg: "#fff1e7", fg: "#ffe2cd" },
    pink: { bg: "#ffe7f5", fg: "#ffceea" },
    purple: { bg: "#f2e8ff", fg: "#e4cfff" },
};

const Storybox: React.FC<StoryboxProps> = ({ icon, color = "purple", title, text, className = "" }) => {
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
            <div className={styles.storyboxHeader}>
                <div className={styles.storyboxIcon}
                role="img" aria-hidden="true">
                    {icon}
                </div>
                <h3>
                    {title}
                </h3>
            </div>

            <p 
                className={styles.storyboxText}
            >{text}</p>
        </div>
    );
};

export default Storybox;