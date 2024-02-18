import { analyze } from "@/utils/ai"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export const POST = async () => {

    const user = await getUserByClerkId()

    const entry = await prisma.jorunalEntry.create({
        data: {
            userId: user.id,
            content: "Write about your day here.",
        },
    })
    const analysis = await analyze(entry.content) // sends the content to the AI for analysis 
    await prisma.analysis.create({
        data: {
            userId : user.id,
            entryId: entry.id,
            ...analysis,
        }
    })
    revalidatePath('/journal') // tells nextjs to rerender the journal page 
    return NextResponse.json({data : entry})

}

