import DeleteComponent from "./DeleteComponent";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link";
const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
      <div className="overflow-hidden shadow-md border border-black/10 rounded-lg bg-white/5 backdrop-blur-md relative hover:scale-105 transition-transform duration-200">
      <div className="flex justify-end">
            <Link href={`/journal/${entry.id}`} key = {entry.id}>
               <EditIcon className="h-6 w-6 text-gray-500" />
            </Link>
        </div>
        <div className="px-4 py-5 ">Date: {date}</div>
        <div className="px-4 py-5 "> Summary: {entry.analysis?.summary? entry.analysis.summary: "No summary available."}</div>
        <div className="px-4 py-5">Mood: {entry.analysis?.mood? entry.analysis.mood: "No mood available."}</div>
      </div>

  );
}

export default EntryCard
