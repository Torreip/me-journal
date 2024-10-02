import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const userID = 1; // TODO need to be retrieved from the token
    if (request.body) {
        try {
            const body = JSON.parse(await request.text());
            const { content, noteIV, contentChecksum, creationTimestamp } =
                body;
            const { id } = await prisma.notes.create({
                data: {
                    ownerId: userID,
                    content,
                    noteIV,
                    atachedFiles: [],
                    contentChecksum,
                    creationTimestamp,
                    editTimestamp: null,
                },
            });
            return NextResponse.json({ success: true, data: { id } });
        } catch (e) {
            console.error(e);
            return NextResponse.json({ success: false }, { status: 500 });
        }
    } else {
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
