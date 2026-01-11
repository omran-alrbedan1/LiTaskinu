import { useEffect, useMemo, useState } from "react";

export function useImageAttachments() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles = Array.from(incoming);
    setFiles((p) => [...p, ...newFiles]);
    setPreviews((p) => [...p, ...newFiles.map((f) => URL.createObjectURL(f))]);
  };

  const removeAt = (index: number) => {
    setFiles((p) => p.filter((_, i) => i !== index));
    setPreviews((p) => {
      URL.revokeObjectURL(p[index]);
      return p.filter((_, i) => i !== index);
    });
  };

  const clear = () => {
    setFiles([]);
    setPreviews((p) => {
      p.forEach((u) => URL.revokeObjectURL(u));
      return [];
    });
  };

  useEffect(() => {
    return () => {
      // cleanup when unmount
      previews.forEach((u) => URL.revokeObjectURL(u));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({ files, previews, addFiles, removeAt, clear }),
    [files, previews]
  );
}
