import { universityEmployees } from '../mockDatas/UniversityEmployees'

import { extractDataFromText, isEmployeeInUniversity } from './titlePageHelper'

export const titlePageValidate = (titlePage) => {
  const employeeObj = extractDataFromText(titlePage)
  const employeeValidate = isEmployeeInUniversity(employeeObj, universityEmployees) || 'Даного працівника не знайдено в базі'
  return employeeValidate
}

export const documentValidate = (splitText) => {
  console.log('Валідація Титульної Сторінки: ' + titlePageValidate(splitText[0]))
}