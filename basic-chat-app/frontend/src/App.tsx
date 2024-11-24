import { useEffect, useState } from "react"
import './App.css'

const App = () => {
    const [input, setInput] = useState("")
    const [chatmsg, setChatmsg] = useState([])
    const [ws, setWs] = useState()

    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:8000')
        setWs(ws)
        ws.onmessage = async (message)=>{
            const newMessage = await message.data.text()
            setChatmsg(prev => [...prev, newMessage])
        }
        ws.onerror = (err)=>{
            console.log(err)
        }
        ws.onclose =()=>{
            console.log("User Dissconnected")
        }
        return ()=>{
            ws.close()
        }
    },[])

    const sendMessage = ()=>{
        if(!ws || !input.trim()) return
        ws.send(input.trim());
        setInput("")
    }


  return (
    <div>
        <div>
            <input
            value={input}
            type="text"
            placeholder="Message..."
            onChange={(e)=> setInput(e.target.value)}
            />
            <button
            onClick={sendMessage}
            >Send</button>
        </div>
        {
            chatmsg.map((msg, id)=>(
                <p key={id}>{msg}</p>
            ))
        }
    </div>
  )
}

export default App
