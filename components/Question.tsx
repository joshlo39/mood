'use client'


import { askQuestion } from '@/utils/api';
import { useState } from 'react';

const Question = () => {
    const [value, setValue] = useState("")
    const [loading,setLoading] = useState(false)
    const [response, setResponse] = useState("")
    
    const onChange = (e) => {
        //e.preventDefault() // stop the form reloading the whole page when POSTing to survber
        setValue(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const answer = await askQuestion(value)
        setResponse(answer)
        setValue('')
        setLoading(false)
    }
    return (
        <div >
            <form className="mt-6" onSubmit = {handleSubmit}>
                <input
                    disabled={loading}
                    onChange={onChange}
                    value={value}
                    type="text"
                    placeholder="Ask Modo a question"
                    className="w-full h-12 p-4 text-xl outline-none bg-white bg-opacity-25 rounded-lg">
                </input>
                <button
                    disabled={loading}
                    type="submit"
                    className="bg-gray-800 px-10 py-4 mt-4 rounded-lg text-xl block mx-auto">
                    Ask
                </button>
            </form>
            {loading && <div> ...loading</div>}
            {response && <div>{response}</div>}
        </div>
    )
}

export default Question