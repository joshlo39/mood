import { qa } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const { question } = await req.json()

    const user = await getUserByClerkId()
    
    const entries = await prisma.jorunalEntry.findMany({
        where: {
            userId: user.id
        },
        select: {//select only the fields we need
            id: true,
            content: true,
            createdAt: true,
        }
    })

    const answer = await qa(question, entries)
    console.log(answer)
    return NextResponse.json({ data: answer })
}