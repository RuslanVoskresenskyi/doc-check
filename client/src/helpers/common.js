export const splitTextByTitleWords = (text, words) => {
  const regex = new RegExp(`(${words.join('|')})`, 'g')

  const result = text.split(regex)

  const groupedResult = result.reduce((acc, part) => {
    if (words.includes(part.trim())) {
      acc.push(part.trim())
    } else if (acc.length > 0) {
      acc[acc.length - 1] += ` ${part.trim()}`
    } else {
      acc.push(part.trim())
    }
    return acc
  }, [])

  console.log(groupedResult)

  return groupedResult
}

export const getTablesFromHtml = (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const tables = doc.getElementsByTagName('table')

  return Array.from(tables).map((el) => el.outerHTML)
}

