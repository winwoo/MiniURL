import { NextRequest } from 'next/server'
import { redirect } from 'next/navigation'


export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const link: string = url.searchParams.get("l") || "";
    if(!link)
        return;

    const res = await fetch("http://localhost:4000/getUrl", {
        method: "POST",
        body: JSON.stringify({hash: link}),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const resData = await res.json();
    redirect(resData.url);
}