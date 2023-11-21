import React, { useState } from 'react'

import { splitTextByTitleWords } from './helpers/common'
import { titleWords } from './enums/common'
import { uploadDocxFile } from './api/user'
import { extractDataFromText, isEmployeeInUniversity } from './helpers/titlePageHelper'
import { universityEmployees } from './mockDatas/UniversityEmployees'
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
    } else {
      console.error('Файл не обраний')
    }
  }

  return (
    <div>
      <input type='file' onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Відправити файл</button>
      <div dangerouslySetInnerHTML={{ __html: html }}/>
    </div>
  )
}

export default FileUpload
