import { sign, verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest): NextResponse {
    const token = request.headers.get("Authentication");
    if (!token)
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 403,
            }
        );
    try {
        verify(token, "Test123*");
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
    try {
        const tokenData = verify(token, "Test123*");
        const newToken = sign(tokenData, "Test123*");
        return NextResponse.json({
            success: true,
            data: {
                token: newToken,
            },
        });
    } catch (e) {
        // this should never be called as the only method which should throw an error is verify and is handled above, added to be sure to avoid internals error
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
