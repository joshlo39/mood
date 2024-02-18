import Editor from "@/components/Editor"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"

//CAN RENDER client components inside of server components

const getEntry = async (id) => {
    const user = await getUserByClerkId()
    const entry = await prisma.jorunalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id: id,
            },
        },
        include: {
            analysis: true,
        }
    })

    return entry
}
const EntryPage= async ({params}) => {
    const entry = await getEntry(params.id)

    return (
        <div className="h-full w-full ">
                <Editor entry={entry} />
            </div>
            
    )
}

export default EntryPage