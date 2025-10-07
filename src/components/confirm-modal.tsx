import React from "react";
import { GlobalLoader } from "./global-context";
import { Button } from "./ui/button";

interface ConfirmModalProps {
    isOpen: boolean;
    onConfirm: () => Promise<void>;
    isPending: boolean;
    onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onConfirm,
    isPending,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Loader global visível enquanto isPending for true */}
            <GlobalLoader isLoading={isPending} />

            <div style={styles.backdrop}>
                <div style={styles.modal}>
                    <h2>Deseja confirmar a ação?</h2>

                    <div style={styles.buttons}>
                        <Button onClick={onClose} disabled={isPending}>
                            Cancelar
                        </Button>
                        <Button onClick={onConfirm} disabled={isPending}>
                            {isPending ? "Enviando..." : "Confirmar"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    backdrop: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        background: "#fff",
        borderRadius: 8,
        padding: 24,
        minWidth: 300,
        textAlign: "center",
    },
    buttons: {
        marginTop: 16,
        display: "flex",
        justifyContent: "space-around",
    },
};