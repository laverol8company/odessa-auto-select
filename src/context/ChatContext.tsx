import { createContext, useContext, useState, ReactNode } from "react";

interface ChatCtx {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const Ctx = createContext<ChatCtx | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ isOpen, open: () => setOpen(true), close: () => setOpen(false), toggle: () => setOpen(o => !o) }}>
      {children}
    </Ctx.Provider>
  );
}

export function useChat() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useChat must be inside ChatProvider");
  return ctx;
}
