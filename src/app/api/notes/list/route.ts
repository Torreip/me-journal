import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;
    const noteID = Number(params.get("noteid"));
    const userID = 1; // TODO need to be retrieved from the token
    let note;
    if (noteID && !Number.isNaN(noteID)) {
        note = await prisma.notes.findMany({
            where: { ownerId: userID },
            cursor: { id: noteID },
            take: 10,
            skip: 1,
        });
    } else {
        note = await prisma.notes.findMany({
            where: { ownerId: userID },
            take: 10,
        });
    }
    return NextResponse.json(note);
}
