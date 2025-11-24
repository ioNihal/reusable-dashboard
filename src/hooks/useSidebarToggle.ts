import { useState, useEffect } from "react";

export default function useSidebarToggle() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(true);
      else setIsOpen(false);
    };

    handleResize();
  }, []);

  return { isOpen, toggle };
}
