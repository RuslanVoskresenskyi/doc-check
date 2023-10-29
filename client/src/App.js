import { useEffect } from 'react'

function App() {

  useEffect(() => {
    fetch('http://localhost:4000')
      .then(response => response.json())
      .then(data => {
        console.log(data) // Це ваш отриманий об'єкт
        // Тут ви можете зробити що завгодно з цим об'єктом в React
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default App
