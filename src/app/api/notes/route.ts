import apiResponse from "@/types/apiResponse";
import prisma from "@/utils/prisma";
import { sign, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest
): Promise<NextResponse<apiResponse>> {
    const jwt = request.headers.get("Authorization")?.split(" ").reverse()[0];
    if (!jwt)
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 403,
            }
        );
    try {
        const data = verify(jwt, "Test123*");
    } catch (e) {
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 403,
            }
        );
    }
    const data = verify(jwt, "Test123*");
    if (typeof data == "string")
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 500,
            }
        );
    const notes = prisma.notes.findMany({
        where: {
            ownerId: data.id,
        },
    });
    return NextResponse.json({
        success: true,
        data: notes,
    });
}

export async function POST() {
    const { id } = await prisma.users.create({
        data: {
            username: "test2",
            accessKey: "test123*",
        },
    });
    const token = sign(
        {
            id,
        },
        "Test123*",
        {
            expiresIn: 43_200,
        }
    );
    return NextResponse.json({
        success: true,
        data: token,
    });
}
