"use client";
import getPBKDF2DerivedKey from "@/utils/getPBKDF2DerivedKey";
import crypto from "crypto";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Register() {
    const [isLogged, setLogged] = useState(false);
    const [isWrong, setWrong] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username")?.toString();
        const password = formData.get("password")?.toString();
        const verificationPassword = formData
            .get("verificationPassword")
            ?.toString();

        if (username && password && verificationPassword) {
            const salt = "salt";
            const hash = crypto
                .createHash("sha256")
                .update(salt + username + password)
                .digest("hex");

            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, hash, verificationPassword }),
            });

            const cryptoKey = await getPBKDF2DerivedKey(password);

            if (response.ok && cryptoKey instanceof CryptoKey) {
                setLogged(true);
                const token: string = JSON.parse(await response.text()).data
                    .token;
                localStorage.setItem(
                    "key",
                    btoa(
                        String.fromCharCode(
                            ...new Uint8Array(
                                await crypto.subtle.exportKey("raw", cryptoKey)
                            )
                        )
                    )
                );
                // FIXME
                // TODO CHANGE IT (only for development purposes)
                localStorage.setItem("token", token);
            } else {
                setWrong(true);
            }
        } else {
            setWrong(true);
        }
    }

    if (!isLogged) {
        return (
            <>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <dialog
                    open
                    className="bg-[#292929] absolute inset-0 p-6 rounded-sm text-white w-72 before:bg-black"
                >
                    <form onSubmit={handleSubmit} className="">
                        <h2 className="text-3xl font-bold">Login</h2>
                        <input
                            className="w-full rounded-sm bg-[#353535] placeholder:opacity-40 px-4 py-2 focus:outline-none focus:bg-[#474747]"
                            type="text"
                            name="username"
                            placeholder="name"
                            required
                        />
                        <input
                            className="mt-4 w-full rounded-sm bg-[#353535] placeholder:opacity-40 px-4 py-2 focus:outline-none focus:bg-[#474747]"
                            type="password"
                            name="password"
                            placeholder="password"
                            required
                        />
                        <input
                            className="mt-4 w-full rounded-sm bg-[#353535] placeholder:opacity-40 px-4 py-2 focus:outline-none focus:bg-[#474747]"
                            type="password"
                            name="verificationPassword"
                            placeholder="verification password"
                            required
                        />
                        {isWrong ? (
                            <p className="mt-2 text-[#EA3C3C]">
                                Wrong password or login
                            </p>
                        ) : (
                            ""
                        )}
                        <button
                            className="mt-8 w-full rounded-sm bg-[#353535] placeholder:opacity-40 px-4 py-2 focus:outline-none focus:bg-[#474747] hover:bg-[#474747]"
                            type="submit"
                        >
                            Register
                        </button>
                        <Link href={"/"}>
                            <button className="mt-8 w-full rounded-sm bg-[#353535] placeholder:opacity-40 px-4 py-2 focus:outline-none focus:bg-[#474747] hover:bg-[#474747]">
                                Already have an account
                            </button>
                        </Link>
                    </form>
                </dialog>
            </>
        );
    } else {
        return <></>;
    }
}
