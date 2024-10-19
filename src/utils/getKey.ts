export async function getCryptoKey() {
    const key = localStorage.getItem("key");
    if (!key) return null;

    const cryptoKey = crypto.subtle.importKey(
        "raw",
        Uint8Array.from(atob(key), (c) => c.charCodeAt(0)),
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    return cryptoKey;
}
