import { useState } from "react";

export const useModalState = () => {
  const [open, setOpenChange] = useState(false);
  const changeOpen = (state: boolean) => setOpenChange(state);

  return { open, changeOpen };
};
