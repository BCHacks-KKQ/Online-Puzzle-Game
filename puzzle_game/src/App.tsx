import React, { useEffect, useRef, useState } from 'react'
import Header from './COMPONENTS/title_animation'
import './App.css'
import io from 'socket.io-client'
import * as image1 from './images/1.jpg'
import { deflateRawSync } from 'zlib'

const App = () => {

  const [socket, setSocket] = useState<any>(null)
  const [puzzleData, setPuzzleData] = useState<any>(null)
  const [canvasContext, setCanvasContext] = useState<any>(null)
  const [image, setImage] = useState<any>(null)
  const [pieces, setPieces] = useState<any>([])
  const canvasRef = useRef(null)

  const images = ["https://images5.alphacoders.com/112/1123013.jpg", "https://images.alphacoders.com/116/1169181.jpg"]

  useEffect(() => {
    setSocket(io('http://localhost:3001'))  // connect to server
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    const context = canvas.getContext('2d')
    setCanvasContext(context)
    setImage(new Image())
  }, []);

  useEffect(() => {
    if (!image || !canvasContext || !puzzleData) return
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as unknown as CanvasRenderingContext2D
    image.src = images[0]
    ctx.canvas.height = 600
    ctx.canvas.width = 960
    image.onload = () => {
      for (let i = 0; i < puzzleData.pieces.length; i++) {
        for (let j = 0; j < puzzleData.pieces[i].length; j++) {
          ctx.drawImage(image, i * image.width / puzzleData.pieces.length, j * image.height / puzzleData.pieces[0].length, (i + 1) * image.width / puzzleData.pieces.length, (j + 1) * image.height / puzzleData.pieces[0].length,      i * ctx.canvas.width / puzzleData.pieces.length, j * ctx.canvas.height / puzzleData.pieces[0].length, (i + 1) * ctx.canvas.width / puzzleData.pieces.length, (j + 1) * ctx.canvas.height / puzzleData.pieces[0].length)
          ctx.rect(j * ctx.canvas.width / puzzleData.pieces.length, i * ctx.canvas.height / puzzleData.pieces[0].length, (j + 1) * ctx.canvas.width / puzzleData.pieces.length, (i + 1) * ctx.canvas.height / puzzleData.pieces[0].length)
          ctx.stroke()
        }
      }
    }
  }, [image, canvasRef, puzzleData])

  useEffect(() => {
    if (!canvasContext) return


  }, [canvasContext])

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
      setPuzzleData(data);
    })

  }, [socket])

  useEffect(() => {
    if (!puzzleData) return
    const pieces = puzzleData.pieces //render pieces
  }, [puzzleData])

  // const randomize = () => {
  //   for( let i = 0; i < pieces.length; i++){
  //     for (let j = 0; j < pieces[i].length; j++) {
  //       pieces[i][j] = pieces[i][j].posX
  //     }
  //   }
  // }

  return (
    <div className='App'>
      <div className='header-container'>
        <Header />
      </div>
      <div className="canvas-container">
        <canvas id="canvas" ref={canvasRef}></canvas>
      </div>
      {/* <button onClick={() => randomize()}></button> */}
    </div>
  )
}

export default App
