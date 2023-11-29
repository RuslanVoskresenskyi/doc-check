import compromise from 'compromise'

import { universityEmployees } from '../mockDatas/universityEmployees'

import { extractDataFromText, isEmployeeInUniversity } from './titlePageHelper'
import { getTablesFromHtml } from './common'
import {
  validateScheduledEducationalWorkTableByLoad,
  validateScheduledEducationalWorkTableByTotalValue,
  validateWorkloadTableByLoad
} from './educationalWorkHelper'

export const titlePageValidate = (titlePage) => {
  const employeeObj = extractDataFromText(titlePage)
  const employeeValidate = isEmployeeInUniversity(employeeObj, universityEmployees) || 'Даного працівника не знайдено в базі'
  return employeeValidate
}

export const educationalWorkValidate = (html) => {
  const [scheduledEducationalWorkTable, workloadTable] = getTablesFromHtml(html)
  const errors = [
    ...validateScheduledEducationalWorkTableByLoad(scheduledEducationalWorkTable),
    ...validateScheduledEducationalWorkTableByTotalValue(scheduledEducationalWorkTable),
    ...validateWorkloadTableByLoad(workloadTable)
  ]

  console.log(errors)
}

export const documentValidate = (splitText) => {
  console.log('Валідація Титульної Сторінки: ' + titlePageValidate(splitText[0]))
  educationalWorkValidate(splitText[1])

  const keywords = ['підготовка', 'лекції', 'практика', 'розробка', 'аналіз вимог']

  // Рядки для перевірки
  const strings = [
    'Підготовка до проведення лекційних занять',
    'Підготовка до проведення лабораторних занять',
    'Підготовка мультимедійних презентацій до лекцій з дисципліни «Аналіз вимог до програмного забезпечення»',
    'Підготовка модульних контрольних завдань з дисципліни «Аналіз вимог до програмного забезпечення»',
    'Розробка програми навчальної дисципліни «Переддипломна практика» ОС «Магістр»',
    'Перевірка модульних контрольних робіт з дисципліни «Аналіз вимог до програмного забезпечення»',
    'Перевірка РГР з дисципліни «Аналіз вимог до програмного забезпечення»',
    'Проведення заліку з навчальної дисципліни «Аналіз вимог до програмного забезпечення»',
    'Проведення заліку з навчальної дисципліни «Технологічна практика»',
  ]

  // Функція для перевірки наявності ключових слів у рядку
  function checkKeywords(string) {
    const doc = compromise(string)
    return keywords.some(keyword => doc.has(keyword))
  }

  const doc = compromise('Підготовка до проведення лекційних занять')
  doc.verbs().toNegative()
  console.log(doc)

  // Перевірка кожного рядка
  strings.forEach((str, index) => {
    const containsKeywords = checkKeywords(str)
    console.log(containsKeywords)
  })
}