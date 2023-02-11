const ALGO = "AES-GCM";
const KEY_USAGES: KeyUsage[] = ["encrypt", "decrypt"];

const generateKey = async (): Promise<CryptoKey> => {
  return await crypto.subtle.generateKey(
    { name: ALGO, length: 256 },
    true,
    KEY_USAGES
  );
};

const importFrom = async (jwk: JsonWebKey) => {
  return await crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: ALGO },
    true,
    KEY_USAGES
  );
};

export const cryptoAESGCM = (jwk?: JsonWebKey) => {
  const WEAK_IV = new Uint8Array(
    window.crypto
      .randomUUID()
      .split("")
      .map((v) => v.charCodeAt(0))
  );

  const promise = jwk ? importFrom(jwk) : generateKey();
  let secretKey: CryptoKey;
  promise.then((key) => {
    secretKey = key;
  });

  const exportJWK = async () => {
    return await crypto.subtle.exportKey("jwk", secretKey);
  };

  const encrypt = async (data: BufferSource) => {
    const iv = WEAK_IV;
    const buffer = await crypto.subtle.encrypt(
      { name: ALGO, iv },
      secretKey,
      data
    );
    return {
      buffer,
      iv,
    };
  };

  const decrypt = async (
    data: BufferSource,
    iv: BufferSource
  ): Promise<ArrayBuffer> => {
    return await crypto.subtle.decrypt({ name: ALGO, iv }, secretKey, data);
  };

  return {
    decrypt,
    encrypt,
    exportJWK,
  };
};
