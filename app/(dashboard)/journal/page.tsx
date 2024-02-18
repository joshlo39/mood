import {prisma} from "@/utils/db"
import {getUserByClerkId} from "@/utils/auth"
import NewEntryCard from "@/components/NewEntryCard"
import EntryCard from "@/components/EntryCard"
import Link from "next/link"
import { analyze } from "@/utils/ai"
import Question from "@/components/Question"

const getEntries = async () => {
    const user = await getUserByClerkId()

    const entries = await prisma.jorunalEntry.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            analysis: true
        }
    })

    return entries
}

const JournalPage = async () => { 
    const entries = await getEntries()
    return (
        <div className="p-10">

            <h2 className="text-3xl mb-8">Journal</h2>
            <div className="p-4 grid grid-cols-3 gap-4">
                <NewEntryCard />
                {entries.map((entry) => (
                    <EntryCard entry={entry} key={ entry.id} />
                ))}
            </div>
            <Question />
        </div>
    )
}
    
export default JournalPage