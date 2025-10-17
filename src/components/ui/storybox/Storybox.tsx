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
    orange: { bg: "#FFF4E6", fg: "#D35400" },
    pink: { bg: "#FFF0F6", fg: "#C2185B" },
    purple: { bg: "#F5F3FF", fg: "#6D28D9" },
};

const Storybox: React.FC<StoryboxProps> = ({ icon, color = "purple", title, text, className = "" }) => {
    const { bg, fg } = colorMap[color];

    return (
        <div
            className={styles.storybox + " " +  className}
            style={{
                border: "1px solid" + fg,
                background: bg
            }}
            aria-label={title}
        >
            <div className={styles.storyboxHeader}>
                <div className={styles.storyboxIcon} role="img" aria-hidden="true">
                    {icon}
                </div>
                <h3>
                    {title}
                </h3>
            </div>

            <p className={styles.storyboxText}>{text}</p>
        </div>
    );
};

export default Storybox;