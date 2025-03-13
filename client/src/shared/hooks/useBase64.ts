import { useEffect, useState } from 'react';

export const useBase64 = (file: File) => {
  const [base64, setBase64] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64(reader.result as string);
      };
    }
  }, [file]);

  return base64;
};
