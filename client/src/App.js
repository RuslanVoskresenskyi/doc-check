import { useEffect } from 'react'

function App() {

  useEffect( async () => {

    const fighterData = {
      'name': 'lou',
      'health': 100,
      'power': 1,
      'defense': 1, // 1 to 10
    }

    const response = await fetch('http://localhost:3050/api/users/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fighterData),
    })
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default App
