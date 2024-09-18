async function encrypt(data: string, key: CryptoKey) {
    const iv = window.crypto.getRandomValues(new Uint8Array(255));
    const result = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        Buffer.from(data)
    );
    const stringResult = btoa(String.fromCharCode(...new Uint8Array(result)));
    const stringIV = btoa(String.fromCharCode(...new Uint8Array(iv)));
    return { encryptedData: stringResult, iv: stringIV };
}

export default encrypt;
