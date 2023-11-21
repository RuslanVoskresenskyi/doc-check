export const extractDataFromText = (text) => {
  const matchFaculty = text.match(/Факультет\s+([А-ЯЁҐІЇЄа-яёґіїє\s’.,]+)_/)
  const matchDepartment = text.match(/Кафедра\s+([А-ЯЁҐІЇЄа-яёґіїє\s’.,]+)/)
  const matchPosition = text.match(/Посада\s+([А-ЯЁҐІЇЄа-яёґіїє\s’.,]+)/)
  const matchFullName = text.match(/Прізвище,\sім’я,\sпо\sбатькові\s+([А-ЯЁҐІЇЄа-яёґіїє\s’.,]+)/)

  if (!matchFaculty || !matchDepartment || !matchPosition || !matchFullName) {
    // Якщо не вдалося знайти всі дані, повертаємо null або можна обробити помилку
    return null
  }

  const faculty = matchFaculty[1].trim()
  const department = matchDepartment[1].trim()
  const position = matchPosition[1].trim()
  const fullName = matchFullName[1].trim()

  return {
    faculty,
    department,
    position,
    fullName,
  }
}

export const isEmployeeInUniversity = (obj, array) => {
  const normalizeString = (str) => str.replace(/\s+/g, ' ').toLowerCase().trim()

  const normalizedObj = {
    faculty: normalizeString(obj.faculty),
    department: normalizeString(obj.department),
    position: normalizeString(obj.position),
    fullName: normalizeString(obj.fullName),
  }

  return array.some((item) =>
    Object.entries(normalizedObj).every(([key, value]) =>
      item[key].toLowerCase().includes(value)
    )
  )
}