import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const data = await req.json();
    const res = await fetch("http://localhost:4000/changeUrl", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await res.json();
    const domain = req.headers.get("host");
    return NextResponse.json({ newUrl:  `${domain}/api?l=${resData.hash}`});
}