export const toBase64String = (buf: ArrayBuffer): string => {
  return window.btoa(String.fromCharCode(...new Uint8Array(buf)));
};

export const fromBase64String = (str: string): ArrayBuffer => {
  const bs = window.atob(str);
  const b = bs.split("").map((v) => v.charCodeAt(0));
  return new Uint8Array(b).buffer;
};
