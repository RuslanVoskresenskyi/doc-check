import React, { useEffect, useState } from 'react'

import { splitTextByTitleWords } from './helpers/common'
import { titleWords } from './enums/common'
import { uploadDocxFile } from './api/user'
import { extractDataFromText, isEmployeeInUniversity } from './helpers/titlePageHelper'
import { universityEmployees } from './mockDatas/universityEmployees'
import { documentValidate } from './helpers/validate'

const FileUpload = () => {
  const [file, setFile] = useState(null)
  const [html, setHtml] = useState('')

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleFileUpload = () => {
    if (file) {
      uploadDocxFile(file)
        .then(data => {
          setHtml(data.html)
          documentValidate(splitTextByTitleWords(data.html, titleWords))
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      console.error('Файл не обраний')
    }
  }

  useEffect(() => {
    const url = 'http://localhost:3050/api/auth'
    const data = {
      // firstName: 'Тетяна',
      // lastName: 'Конрад',
      email: 'konrad@gmail.com',
      // phoneNumber: '+380988098222',
      password: '111111'
    }


    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => window.localStorage.token = data.token)
      .catch(error => console.error('Помилка:', error))
  }, [])

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Відправити файл</button>
      <div dangerouslySetInnerHTML={{ __html: html }}/>
    </div>
  )
}

export default FileUpload
