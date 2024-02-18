import { OpenAI,OpenAIEmbeddings } from '@langchain/openai'
import {StructuredOutputParser} from 'langchain/output_parsers'
import z from 'zod'
import {PromptTemplate} from '@langchain/core/prompts'
import {MemoryVectorStore} from 'langchain/vectorstores/memory'
import {Document } from 'langchain/document'
import {loadQARefineChain} from 'langchain/chains'
  
const recipeParser = StructuredOutputParser.fromZodSchema(
    z.object({
        title: z.string().describe('The title of the recipe.'),
        instructions: z.array(z.string()).describe('The instructions of the recipe.'),
        proportions: z.array(z.string()).describe('The proportions of the recipe for each ingredient'),
    })
)
const getPromptForRecipe = async (ingredients) => {
    const format_instructions = recipeParser.getFormatInstructions()

    const prompt = new PromptTemplate({
        template:
          'Create a recipe from the following ingredients. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
        inputVariables: ['entry'],
        partialVariables: { format_instructions },
      
    })

    const input = await prompt.format({
        entry: ingredients,
    })
    return input
}
const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        sentimentScore: z.number().describe('Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}'),
        mood: z.string().describe('The mood of the peson who wrote the journal entry.'),
        subject: z.string().describe('The subject of the journal entry.'),
        summary: z.string().describe('Quick summary of the entire journal entry.'),
        negative: z.boolean().describe('Whether the journal entry is negative or positive (i.e does it contain negative emotions).'),
        color: z.string().describe('A hexadecimal color code that represents the mood of the journal entry. Example #0101fe for blue representing happinss'),
    })
)
export const analyzeInstructions = async (ingredients) => {
    const input = await getPromptForRecipe(ingredients)
    console.log(input)
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
    const result = await model.call(input)
    try {
        return recipeParser.parse(result)
    } catch(e) {
        console.log("inide of analyze instructions" + e)
    }
}



const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the intrusctions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({
    entry: content,
  })
  return input
} 

export const analyze = async (content) => {
    const input = await getPrompt(content)
    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
    const result = await model.call(input)
    try {
        return parser.parse(result)
    } catch(e) {
        console.log(e)
    }
}


export const qa = async (question, entries) => {
    const docs = entries.map(entry => {
        return new Document({
            pageContent: entry.content,
            metadata: {
                id:entry.id,createdAt: entry.createdAt
            }
        })
    })

    const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
    //chain is meant to chain multiple llm calls together
    const chain = loadQARefineChain(model)
    const embeddings = new OpenAIEmbeddings()
    const store = await MemoryVectorStore.fromDocuments(docs, embeddings) //create vector store from documents
    const releventDocs = await store.similaritySearch(question)// at this points this returns the only entries needed to answer the question
    const res = await chain.call({
        input_documents: releventDocs,
        question,
    })
    console.log(res.output_text)
    return res.output_text
     
}