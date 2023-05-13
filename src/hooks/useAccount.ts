import { useEffect } from "react";
import { Address } from "../types";
import { useInvoke } from "./tauri";
import { listen } from "@tauri-apps/api/event";

export function useAccount() {
  const { data: address, mutate } = useInvoke<Address>("get_current_address");

  useEffect(() => {
    const unlisten = listen("refresh-account", () => {
      console.log("here");
      mutate();
      console.log("here2");
      console.log(address);
    });

    return () => {
      unlisten.then((cb) => cb());
    };
  }, [mutate, address]);

  return address;
}
