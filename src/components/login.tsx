"use client";
import getPBKDF2DerivedKey from "@/utils/getPBKDF2DerivedKey";
import crypto from "crypto";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function Login() {
    const [isLogged, setLogged] = useState(false);
    const [isWrong, setWrong] = useState(false);
    const [derivedKey, setderivedKey] = useState<undefined | CryptoKey>();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get("username")?.toString();
        const password = formData.get("password")?.toString();

        if (username && password) {
            const salt = "salt";
            const hash = crypto
                .createHash("sha256")
                .update(salt + username + password)
                .digest("hex");

            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, hash }),
            });

            const cryptoKey = await getPBKDF2DerivedKey(password);

            if (response.ok && cryptoKey instanceof CryptoKey) {
                setderivedKey(cryptoKey); // TODO may need to be stored somewhere else
                setLogged(true);
                // TODO handle JWT reception, storage and update
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
                            Login
                        </button>
                        <Link href={"/register"}>
                            <button className="mt-8 w-full rounded-sm bg-[#353535] placeholder:opacity-40 px-4 py-2 focus:outline-none focus:bg-[#474747] hover:bg-[#474747]">
                                Create an account
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
