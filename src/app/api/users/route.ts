import apiResponse from "@/types/apiResponse";
import registerData from "@/types/registerData";
import prisma from "@/utils/prisma";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest
): Promise<NextResponse<apiResponse>> {
    const body = await request.text();
    if (!body)
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 400,
            }
        );
    try {
        const userCount = await prisma.users.count();
        // if that's the first account (admin account)
        if (userCount == 0) {
            const { verificationPassword, password, username }: registerData =
                JSON.parse(body);
            // if any value isn't present or in a incorrect type
            if (
                [verificationPassword, password, username].some(
                    (value) => typeof value != "string"
                )
            ) {
                return NextResponse.json(
                    {
                        success: false,
                    },
                    {
                        status: 403,
                    }
                );
            }
            const passwordHash = hashSync(password, 10);
            await prisma.settings.deleteMany({
                where: {
                    password: verificationPassword,
                },
            });
            const { id, privileges } = await prisma.users.create({
                data: {
                    accessKey: passwordHash,
                    username,
                    privileges: "admin",
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
            return NextResponse.json(
                {
                    success: true,
                    data: {
                        id,
                        privileges,
                        username,
                        token,
                    },
                },
                {
                    status: 201,
                }
            );
        }
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 501,
            }
        );
    } catch (e) {
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 400,
            }
        );
    }
}
