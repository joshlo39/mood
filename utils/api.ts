const createURL = (path) => {
    return window.location.origin + path
}
export const updateEntry = async (id, content) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({ content }),
    })
    )
    if (res.ok) {
        const data = await res.json()
        return data.data
    }
}

export const deleteEntry = async (id) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: 'DELETE',
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    console.log('error', res)
    throw new Error('Something went wrong on API server!')
  }
}
export const createNewEntry = async () => {
    const res = await fetch(
        new Request(createURL('/api/journal'), {
            method: 'POST',

        })
    )

    if (res.ok) {
        const data = await res.json()
        return data.data
    }
}

export const askQuestion = async (question) => {
     const res = await fetch(
        new Request(createURL('/api/question'), {
            method: 'POST',
            body: JSON.stringify({ question }),
        })
    )

    if (res.ok) {
        const data = await res.json()
        console.log(data.data)
        return data.data
    }
    else {
        console.log('error', res)
    }
}
// get the analysis for a journal entry

export const createIngredients = async (ingredients) => {
    console.log(ingredients)
    const res = await fetch(
        new Request(createURL('/api/recipes'), {
            method: 'POST',
            body: JSON.stringify({ ingredients }),
        })
    )
    if (res.ok) {
        const data = await res.json()
        console.log("create Ingredients data: " + data)
        return data
    }
    else {
        console.log('error', res)
    }
}