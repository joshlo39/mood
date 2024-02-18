import HistoryChart from "@/components/HistoryChart";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
    const user = await getUserByClerkId()
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'asc'
        }
    })

    const sum = analyses.reduce((acc, curr) => acc + curr.sentimentScore, 0)
    const avg = Math.round( sum / analyses.length)

    return {analyses,avg}
}

const History = async () => {
    const {avg, analyses} = await getData()
    console.log(analyses)
    return (
        <div className="h-full max-w-full">
            <h2>{`Avg Sentiment ${avg}`}</h2>
            <div className="h-80 w-500">
                <HistoryChart data={analyses} />
            </div>
        </div>
    );
}

export default History;