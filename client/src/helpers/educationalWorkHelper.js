import * as cheerio from 'cheerio'

import { load } from '../mockDatas/load'

export const parseScheduledEducationalWorkTableToObjects = (html) => {
  const $ = cheerio.load(html)
  const tableRows = $('table tbody tr')

  const data = []

  tableRows.each((index, row) => {
    const columns = $(row).find('td, th')

    const isEmptyRow = columns.toArray().every(column => $(column).text().trim() === '')

    if (!isEmptyRow) {
      const rowData = $(columns[0]).text().trim() === 'Разом' ? {
        name: $(columns[0]).text().trim(),
        firstGroup: $(columns[1]).text().trim(),
        firstStudents: $(columns[2]).text().trim(),
        secondGroup: $(columns[3]).text().trim(),
        secondStudents: $(columns[4]).text().trim(),
      } : {
        id: $(columns[0]).text().trim(),
        name: $(columns[1]).text().trim(),
        firstGroup: $(columns[2]).text().trim(),
        firstStudents: $(columns[3]).text().trim(),
        secondGroup: $(columns[4]).text().trim(),
        secondStudents: $(columns[5]).text().trim(),
      }

      data.push(rowData)
    }
  })

  return data.slice(2)
}

export const parseWorkloadTableToObjects = (html) => {
  const $ = cheerio.load(html)
  const tableRows = $('table tbody tr')

  const data = []

  tableRows.each((index, row) => {
    const columns = $(row).find('td, th')

    const isEmptyRow = columns.toArray().every(column => $(column).text().trim() === '')

    if (!isEmptyRow) {
      if ($(columns).length === 16) {
        const rowData1 = {
          id: $(columns[0]).text().trim(),
          name: $(columns[1]).text().trim(),
          sem1Planned: $(columns[2]).text().trim(),
          sem1Completed: $(columns[3]).text().trim(),
          sem2Planned: $(columns[4]).text().trim(),
          sem2Completed: $(columns[5]).text().trim(),
          totalPlanned: $(columns[6]).text().trim(),
          totalCompleted: $(columns[7]).text().trim(),
        }

        const rowData2 = {
          id: $(columns[8]).text().trim(),
          name: $(columns[9]).text().trim(),
          sem1Planned: $(columns[10]).text().trim(),
          sem1Completed: $(columns[11]).text().trim(),
          sem2Planned: $(columns[12]).text().trim(),
          sem2Completed: $(columns[13]).text().trim(),
          totalPlanned: $(columns[14]).text().trim(),
          totalCompleted: $(columns[15]).text().trim(),
        }

        data.push(rowData1)
        data.push(rowData2)
      } else if ($(columns).length === 7) {
        const rowData = {
          name: $(columns[0]).text().trim(),
          sem1Planned: $(columns[1]).text().trim(),
          sem1Completed: $(columns[2]).text().trim(),
          sem2Planned: $(columns[3]).text().trim(),
          sem2Completed: $(columns[4]).text().trim(),
          totalPlanned: $(columns[5]).text().trim(),
          totalCompleted: $(columns[6]).text().trim(),
        }

        data.push(rowData)
      } else {
        const rowData = {
          id: $(columns[0]).text().trim(),
          name: $(columns[1]).text().trim(),
          sem1Planned: $(columns[2]).text().trim(),
          sem1Completed: $(columns[3]).text().trim(),
          sem2Planned: $(columns[4]).text().trim(),
          sem2Completed: $(columns[5]).text().trim(),
          totalPlanned: $(columns[6]).text().trim(),
          totalCompleted: $(columns[7]).text().trim(),
        }

        data.push(rowData)
      }

    }
  })

  const tasks = {
    lecture: 'Читання лекцій',
    sessions: 'Проведення практичних, семінарських занять',
    lab: 'Проведення лабораторних занять',
    consultations: 'Проведення консультацій з навч. дисциплін та перед екзаменами',
    projectAssessment: 'Проведення підсумкової семестрової КР ЗФН',
    homework: 'Керівництво та приймання (захист) ДЗ, РГР',
    coursework: 'Керівництво та приймання (захист) курсових робіт',
    guidance: 'Керівництво та приймання (захист) курсових проєктів',
    exams: 'Проведення семестр. екзаменів',
    practiceGuidance: 'Керівництво навчальною практикою',
    industrialSupervision: 'Керівництво виробничою практикою',
    reportDefense: 'Проведення захисту звітів з практики',
    qualProjectSupervision: 'Керівництво кваліфікаційними (дипломними) роботами (проєктами)',
    qualWorkConsultation: 'Консультування, рецензування кваліфікаційних робіт',
    finalAssessment: 'Проведення підсумкової атестації (ЕК)',
    postgradExams: 'Проведення вступних екзаменів до аспірантури',
    postgradSupervision: 'Керівництво аспірантами',
    doctoralMentoring: 'Наукове консультування докторантів',
    otherTasks: 'Інші види роботи'
  }

  const addKeyToObjects = (data) => {
    return data.map((item) => {
      const normalizedItemName = item.name.replace(/\s/g, '').toLowerCase()
      const key = Object.keys(tasks).find((taskKey) =>
        normalizedItemName.includes(tasks[taskKey].replace(/\s/g, '').toLowerCase())
      )
      return { ...item, key }
    })
  }

  return addKeyToObjects(data.slice(2))
}

export const loadParser = (load) => {
  return load.reduce((acc, item) => {
    const semKey = `sem${item.sem}`
    if (!acc[semKey]) {
      acc[semKey] = {}
    }

    for (const key in item) {
      if (key !== 'id' && key !== 'sem') {
        if (!acc[semKey][key]) {
          acc[semKey][key] = 0
        }
        acc[semKey][key] += parseInt(item[key]) || 0
      }
    }

    return acc
  }, {})
}

export const validateScheduledEducationalWorkTableByLoad = (html) => {
  const validationErrors = []

  parseScheduledEducationalWorkTableToObjects(html).forEach((item1) => {
    if (item1.name === 'Разом') {
      return
    }
    
    const matchingItem = load.find((item2) => {
      return (
        item1.firstGroup === item2.firstGroup &&
        item1.firstStudents === item2.firstStudents &&
        item1.name === item2.name &&
        item1.secondGroup === item2.secondGroup &&
        item1.secondStudents === item2.secondStudents
      )
    })

    if (!matchingItem) {
      validationErrors.push({
        error: 'Помилка в таблиці Запланована навчальна робота з дисциплін',
        message: `Дані для дисципліни ${item1.name} не співпадають з даними в навантаженні або дана дисципліна відсутня в навантаженні`,
      })
    }
  })

  return validationErrors
}

export const validateScheduledEducationalWorkTableByTotalValue = (html) => {
  const sums = {
    firstGroup: 0,
    firstStudents: 0,
    secondGroup: 0,
    secondStudents: 0
  }

  const tableObject = parseScheduledEducationalWorkTableToObjects(html)
  const totalItem = tableObject.find(item => item.name === 'Разом')

  tableObject.forEach((item) => {
    if (item.name !== 'Разом') {
      sums.firstGroup += parseInt(item.firstGroup) || 0
      sums.firstStudents += parseInt(item.firstStudents) || 0
      sums.secondGroup += parseInt(item.secondGroup) || 0
      sums.secondStudents += parseInt(item.secondStudents) || 0
    }
  })

  const validationErrors = []

  if (sums.firstGroup !== parseInt(totalItem.firstGroup)) {
    validationErrors.push({
      error: 'Помилка в таблиці Запланована навчальна робота з дисциплін',
      message: `Результуюче значення для академічних груп першого семестру пораховано не вірно. Значення має бути ${sums.firstGroup}`,
    })
  }
  if (sums.firstStudents !== parseInt(totalItem.firstStudents)) {
    validationErrors.push({
      error: 'Помилка в таблиці Запланована навчальна робота з дисциплін',
      message: `Результуюче значення для кількості студентів першого семестру пораховано не вірно. Значення має бути ${sums.firstStudents}`,
    })
  }
  if (sums.secondGroup !== parseInt(totalItem.secondGroup)) {
    validationErrors.push({
      error: 'Помилка в таблиці Запланована навчальна робота з дисциплін',
      message: `Результуюче значення для академічних груп другого семестру пораховано не вірно. Значення має бути ${sums.secondGroup}`,
    })
  }
  if (sums.secondStudents !== parseInt(totalItem.secondStudents)) {
    validationErrors.push({
      error: 'Помилка в таблиці Запланована навчальна робота з дисциплін',
      message: `Результуюче значення для кількості студентів другого семестру пораховано не вірно. Значення має бути ${sums.secondStudents}`,
    })
  }

  return validationErrors
}

export const validateWorkloadTableByLoad = (html) => {
  const tableObjs = parseWorkloadTableToObjects(html)
  const loadObjs = loadParser(load)

  const validationErrors = []

  tableObjs.forEach((item) => {
    if (item.name !== 'Разом') {
      if (+item.sem1Planned !== loadObjs.sem1[item.key]) {
        validationErrors.push({
          error: 'Помилка в таблиці Обсяг навчальної роботи на навчальний рік за видами',
          message: `Кількість годни для навчальної роботи ${item.name.replace(/\s/g, ' ').toLowerCase()} за плано за перший семестр вказано не вірно. Значення має бути ${loadObjs.sem1[item.key]}`,
        })
      }
      if (+item.sem2Planned !== loadObjs.sem2[item.key]) {
        validationErrors.push({
          error: 'Помилка в таблиці Обсяг навчальної роботи на навчальний рік за видами',
          message: `Кількість годни для навчальної роботи ${item.name.replace(/\s/g, ' ').toLowerCase()} за планом за другий семестр вказано не вірно. Значення має бути ${loadObjs.sem2[item.key]}`,
        })
      }
    }
  })

  return validationErrors
}