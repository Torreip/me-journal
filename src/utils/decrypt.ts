/**
 *
 * @param data the data you want to decrypt
 * @param iv the iv to use for decrypt
 * @param key
 * @returns
 */
async function decrypt(data: string, iv: string, key: CryptoKey) {
    const convertedIv = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
    const convertedData = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
    const result = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: convertedIv,
        },
        key,
        convertedData
    );
    const decoder = new TextDecoder();
    const decodedData = decoder.decode(result);

    return decodedData;
}

export default decrypt;
