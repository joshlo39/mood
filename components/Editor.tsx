'use client'
import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"
import { analyze } from '../utils/ai';

 

const Editor = ({entry}) => {
    const [value, setValue] = useState(entry.content) 
    const [isLoading, setisLoading] = useState(false)
    const [analysis, setAnalysis] = useState(entry.analysis)

    const {mood,summary,color,subject,negative} = analysis
    const analysisData = [
        {name : "Summary", value :summary},
        {name : "Subject", value : subject},
        {name : "Mood", value : mood},
        {name : "Negative", value : negative ? "True" : "False"},
        
    ]
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setisLoading(true)
            const data = await updateEntry(entry.id, _value)
            setAnalysis(data.analysis)
            setisLoading(false)
        }
    }) 
    return (
        <div className="w-full h-full relative grid grid-cols-3">
            {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">...loading</div>}
            <div className="col-span-2">
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full h-full p-8 text-xl outline-none bg-white bg-opacity-25">
                </textarea>
            </div>
            {/* AI Sidebar*/}
            <div className="border-l border-black/10">
                <div className="px-6 py-10" style={{backgroundColor: color}}>
                    <h2 className="text-2xl">Analysis</h2>
                    
                </div>
                <div>
                    <ul>
                        {analysisData.map((item) => (
                            <li key={item.name}
                            className="flex items-center justify-between border-t border-b border-black/10 p-5 pr-10">
                                <span className="text-lg font-semibold">{item.name}</span>
                                <span>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Editor