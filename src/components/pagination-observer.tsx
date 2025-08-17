import { useEffect, useRef } from "react";

type Props = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

export function PaginationObserver({ hasNextPage, fetchNextPage }: Props) {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  return <div ref={observerRef} />;
}
