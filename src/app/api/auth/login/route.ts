import loginData from "@/types/loginData";
import prisma from "@/utils/prisma";
import { compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const loginData = await request.text();
    if (!loginData)
        return NextResponse.json({ success: false }, { status: 400 });
    try {
        const { username, hash }: loginData = JSON.parse(loginData);
        if ([username, hash].some((value) => typeof value != "string"))
            return NextResponse.json(
                {
                    success: false,
                },
                {
                    status: 400,
                }
            );
        const user = await prisma.users.findFirst({
            where: {
                username,
            },
        });
        if (!user || !compareSync(hash, user.accessKey))
            return NextResponse.json(
                {
                    success: false,
                },
                {
                    status: 403,
                }
            );
        const token = sign(
            {
                id: user.id,
            },
            "Test123*",
            {
                expiresIn: 43_200,
            }
        );
        return NextResponse.json({
            success: true,
            data: {
                username,
                privilege: user.privileges,
                token,
            },
        });
    } catch (e) {
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}
