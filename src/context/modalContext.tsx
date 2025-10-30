import React, {

createContext,
useCallback,
useContext,
useEffect,
useMemo,
useRef,
useState,
ReactNode,
} from "react";

type ModalContent = ReactNode | (() => ReactNode);

type ModalInstance = {
id: string;
content: ModalContent;
props?: Record<string, any>;
};

type ModalContextValue = {
modals: ModalInstance[];
openModal: (content: ModalContent, props?: Record<string, any>) => string;
closeModal: (id?: string) => void;
closeAll: () => void;
replaceTop: (content: ModalContent, props?: Record<string, any>) => string | null;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

function makeId() {
return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export const ModalProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
const [modals, setModals] = useState<ModalInstance[]>([]);
const modalsRef = useRef(modals);
modalsRef.current = modals;

const openModal = useCallback((content: ModalContent, props?: Record<string, any>) => {
    const id = makeId();
    const instance: ModalInstance = { id, content, props };
    setModals((prev) => [...prev, instance]);
    return id;
}, []);

const closeModal = useCallback((id?: string) => {
    setModals((prev) => {
        if (!id) {
            // close top
            return prev.slice(0, -1);
        }
        return prev.filter((m) => m.id !== id);
    });
}, []);

const closeAll = useCallback(() => setModals(() => []), []);

const replaceTop = useCallback((content: ModalContent, props?: Record<string, any>) => {
    const top = modalsRef.current[modalsRef.current.length - 1];
    if (!top) return null;
    const id = makeId();
    setModals((prev) => [...prev.slice(0, -1), { id, content, props }]);
    return id;
}, []);

// prevent background scroll when any modal is open
useEffect(() => {
    if (modals.length > 0) {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev || "";
        };
    }
    return;
}, [modals.length]);

// close top modal on Escape
useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape" && modalsRef.current.length > 0) {
            // close top
            const top = modalsRef.current[modalsRef.current.length - 1];
            if (top) {
                setModals((prev) => prev.slice(0, -1));
            }
        }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
}, []);

const value = useMemo(
    () => ({ modals, openModal, closeModal, closeAll, replaceTop }),
    [modals, openModal, closeModal, closeAll, replaceTop]
);

return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export function useModal() {
const ctx = useContext(ModalContext);
if (!ctx) {
    throw new Error("useModal must be used within a ModalProvider");
}
return ctx;
}

/*
Example rendering helper (optional):
Consume modals and render them wherever you keep your modal root.
A simple pattern: put <ModalHost /> inside ModalProvider near the app root,
and render each modal instance's content inside it.

export const ModalHost: React.FC = () => {
const { modals, closeModal } = useModal();
return (
    <>
        {modals.map((m) => (
            <YourModalShell key={m.id} onClose={() => closeModal(m.id)} {...m.props}>
                {typeof m.content === "function" ? m.content() : m.content}
            </YourModalShell>
        ))}
    </>
);
};
*/