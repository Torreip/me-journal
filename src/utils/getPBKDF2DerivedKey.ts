async function getPBKDF2DerivedKey(password: string) {
    const salt = "salt";
    const iterations = 100000;
    const textEncoder = new TextEncoder();
    const passwordBuffer = textEncoder.encode(password);
    const importedKey = await window.crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
    );

    const saltBuffer = textEncoder.encode(salt);
    const derivedKey = await window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: saltBuffer,
            iterations: iterations,
            hash: "SHA-512",
        },
        importedKey,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );
    return derivedKey;
}

export default getPBKDF2DerivedKey;
