import React from "react";
import { createPortal } from "react-dom";

interface GlobalLoaderProps {
    isLoading: boolean;
}

export const GlobalLoader: React.FC<GlobalLoaderProps> = ({ isLoading }) => {
    if (!isLoading) return null;

    return createPortal(
        <div style={styles.backdrop}>
            <div style={styles.spinner} />
            <span style={styles.text}>Carregando...</span>
        </div>,
        document.body
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    backdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
    },
    spinner: {
        width: 50,
        height: 50,
        borderRadius: "50%",
        border: "5px solid rgba(255,255,255,0.3)",
        borderTop: "5px solid #fff",
        animation: "spin 1s linear infinite",
    },
    text: {
        marginTop: 12,
        color: "#fff",
        fontSize: 16,
        fontWeight: 500,
    },
};
