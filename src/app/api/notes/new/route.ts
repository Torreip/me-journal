import noteAdding from "@/types/noteAdding";
import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const userID = 1; // TODO need to be retrieved from the token
    const data = await request.text();
    if (data) {
        try {
            const body: noteAdding = JSON.parse(data);
            const { content, noteIV, contentChecksum, creationTimestamp } =
                body;
            if (
                [content, noteIV, contentChecksum, creationTimestamp].every(
                    (value) => typeof value == "string"
                )
            ) {
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
            } else {
                return NextResponse.json({ success: false }, { status: 400 });
            }
        } catch (e) {
            console.error(e);
        }
        return NextResponse.json({ success: false }, { status: 500 });
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
