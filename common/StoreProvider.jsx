import { createContext, useContext } from "react";
import { VehicleStore } from "@/stores/VehicleStore";

let store;
export const StoreContext = createContext();

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}

function initializeStore(initialData = null) {
  const _store = store ?? new VehicleStore();

  if (initialData) {
    _store.hydrate(initialData);
  }

  if (typeof window === "undefined") return _store;

  if (!store) store = _store;

  return _store;
}

export function StoreProvider({ children, initialState: initialData }) {
  const store = initializeStore(initialData);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
