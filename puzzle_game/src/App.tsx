import React, { useEffect, useState } from 'react'
import Header from './COMPONENTS/title_animation'
import './App.css'
import io from 'socket.io-client'



function App() {

  const [socket, setSocket] = useState<any>(null)
  const [puzzleData, setPuzzleData] = useState<any>(null)

  useEffect(() => {
    setSocket(io('https://bchacks.herokuapp.com'))  // connect to server
  }, []);

  useEffect(() => {
    if (!socket) return

    socket.on('connect', () => {
      console.log('connected')  // get initial data
    })

    socket.on('initialData', (data: any) => {
      console.log(data);
      setPuzzleData(data);
    })

    socket.on('receiveData', (data: any) => {
      console.log('received data', data)  // get initial data
    })

  }, [socket])

  useEffect(() => {
    if (!puzzleData) return
    const pieces = puzzleData.pieces //render pieces
  }, [puzzleData])

  return (
    <div className='App'>
      <div className='header-container'>
        <Header />
      </div>
    </div>
  )
}

export default App
