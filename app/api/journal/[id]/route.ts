import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from 'next/server';
import { analyze } from '../../../../utils/ai';
import { revalidatePath } from "next/cache";
import { update } from "@/utils/actions";


//delete a journal entry 
export const DELETE = async (request: Request, { params }) => {
    const user = await getUserByClerkId()
    await prisma.jorunalEntry.delete({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            }
        }
    })

    update(['/journal'])
    return NextResponse.json({ data: { id: params.id } })    
}
export const PATCH = async (request : Request, {params}) => {
    const { content } = await request.json()
    const user = await getUserByClerkId() 
    const updatedEntry = await prisma.jorunalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            }
        },
        data: {
            content, 
        }
    })
    const analysis = await analyze(updatedEntry.content)
    await prisma.analysis.upsert({
        where: {
            entryId : updatedEntry.id
        },
        create: {
            userId : user.id,
            entryId: updatedEntry.id,
            ...analysis,
        },
        update : analysis

    })
    return NextResponse.json({data: {...updatedEntry, analysis: analysis}})
}

