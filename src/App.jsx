import { useState, useRef, useEffect, useCallback } from 'react'
import { useConversation } from '@11labs/react'
import logoSvg from '../logo.svg'

const AGENT_ID = 'agent_5001kehdf6nmeqyr7nf4ga7k3d91'

// ── Infinity mark SVG path (exact brand path from Seed_Cycle_Logo__2_.svg)
const INFINITY_PATH = "M 339.113281 80.910156 C 342.082031 90.113281 342.875 100.007812 341.699219 109.667969 C 340.53125 119.347656 337.125 128.753906 331.964844 137.101562 C 329.378906 141.273438 326.351562 145.191406 322.902344 148.726562 C 322.015625 149.582031 321.15625 150.480469 320.242188 151.308594 L 317.453125 153.734375 C 317 154.152344 316.503906 154.527344 316.007812 154.894531 L 314.519531 156.011719 L 313.035156 157.132812 C 312.527344 157.492188 311.996094 157.820312 311.480469 158.164062 C 307.378906 160.996094 302.894531 163.308594 298.292969 165.378906 C 293.699219 167.480469 288.867188 169.101562 283.984375 170.566406 L 280.292969 171.601562 L 276.5625 172.503906 C 275.320312 172.824219 274.066406 173.074219 272.808594 173.328125 C 271.546875 173.570312 270.300781 173.867188 269.027344 174.070312 C 263.972656 174.992188 258.867188 175.683594 253.730469 176.242188 C 243.457031 177.285156 233.078125 177.625 222.699219 177.378906 C 214.640625 177.210938 206.574219 176.738281 198.542969 175.855469 L 198.457031 174.375 L 196.65625 170.128906 C 197.605469 171.074219 198.335938 172.640625 198.433594 174.003906 C 198.480469 174.667969 198.441406 174.121094 198.457031 174.242188 L 198.449219 174.128906 L 198.433594 173.675781 L 198.40625 172.746094 L 198.355469 170.867188 L 198.316406 167.074219 C 198.304688 164.542969 198.332031 161.996094 198.390625 159.457031 C 198.511719 154.371094 198.757812 149.28125 199.125 144.207031 C 199.886719 134.058594 201.132812 123.957031 203.027344 114.039062 C 203.9375 109.070312 205.097656 104.175781 206.359375 99.324219 C 207.679688 94.492188 209.171875 89.726562 210.902344 85.085938 C 214.410156 75.839844 218.851562 67.011719 224.683594 59.496094 C 225.046875 59.027344 225.386719 58.53125 225.769531 58.082031 L 226.929688 56.746094 L 228.09375 55.414062 L 228.671875 54.742188 L 229.292969 54.125 L 231.785156 51.65625 C 232.648438 50.859375 233.5625 50.105469 234.445312 49.324219 C 238.085938 46.308594 242.0625 43.71875 246.273438 41.582031 C 250.480469 39.441406 254.9375 37.78125 259.515625 36.589844 C 264.097656 35.386719 268.824219 34.710938 273.574219 34.5625 C 283.070312 34.253906 292.671875 35.960938 301.460938 39.695312 C 310.265625 43.378906 318.269531 49.003906 324.761719 56.101562 C 331.242188 63.210938 336.191406 71.703125 339.113281 80.910156 Z M 184.085938 174.714844 L 184.089844 174.84375 L 184.121094 175.328125 C 184.125 175.378906 184.136719 175.429688 184.136719 175.484375 L 184.121094 175.441406 L 184.226562 177.226562 L 184.316406 179.09375 C 184.363281 180.347656 184.410156 181.605469 184.433594 182.867188 C 184.496094 185.390625 184.511719 187.921875 184.496094 190.457031 C 184.464844 195.53125 184.292969 200.605469 183.992188 205.667969 C 183.367188 215.789062 182.203125 225.867188 180.359375 235.753906 C 179.476562 240.710938 178.316406 245.585938 177.046875 250.417969 C 175.75 255.238281 174.191406 259.957031 172.464844 264.582031 C 168.878906 273.757812 164.359375 282.507812 158.429688 289.96875 L 157.335938 291.378906 L 156.152344 292.703125 C 155.351562 293.566406 154.605469 294.496094 153.769531 295.320312 L 151.230469 297.773438 C 151.019531 297.976562 150.816406 298.1875 150.59375 298.382812 L 149.917969 298.957031 L 148.566406 300.109375 C 144.921875 303.117188 140.960938 305.75 136.746094 307.894531 C 128.324219 312.1875 118.980469 314.71875 109.480469 315.144531 C 99.992188 315.546875 90.398438 313.917969 81.570312 310.320312 C 72.746094 306.722656 64.710938 301.167969 58.171875 294.128906 C 51.617188 287.101562 46.597656 278.648438 43.585938 269.476562 C 42.082031 264.890625 41.058594 260.132812 40.558594 255.308594 C 40.085938 250.488281 40.097656 245.605469 40.644531 240.773438 C 41.191406 235.9375 42.238281 231.148438 43.820312 226.53125 C 45.414062 221.921875 47.511719 217.476562 50.058594 213.292969 C 52.605469 209.109375 55.621094 205.199219 59.039062 201.648438 C 62.445312 198.066406 66.300781 195.027344 70.421875 192.246094 C 74.535156 189.460938 79.023438 187.171875 83.648438 185.15625 C 85.945312 184.113281 88.335938 183.261719 90.707031 182.367188 C 93.121094 181.578125 95.523438 180.730469 97.992188 180.074219 C 100.429688 179.335938 102.921875 178.761719 105.410156 178.144531 C 107.914062 177.613281 110.414062 177.035156 112.945312 176.609375 C 115.464844 176.121094 118.015625 175.769531 120.554688 175.359375 C 123.109375 175.019531 125.660156 174.648438 128.230469 174.394531 C 133.355469 173.828125 138.515625 173.445312 143.683594 173.222656 C 148.855469 172.988281 154.035156 172.902344 159.226562 172.9375 C 167.507812 172.984375 175.796875 173.351562 184.0625 174.097656 L 184.066406 174.191406 Z M 306.265625 28.621094 C 295.957031 23.980469 284.597656 21.738281 273.269531 21.882812 C 261.933594 22.003906 250.605469 24.738281 240.375 29.757812 C 235.261719 32.265625 230.410156 35.335938 225.972656 38.90625 C 224.886719 39.832031 223.78125 40.722656 222.71875 41.679688 L 219.613281 44.664062 L 218.84375 45.414062 L 218.128906 46.210938 L 216.699219 47.800781 L 215.277344 49.398438 C 214.8125 49.9375 214.398438 50.507812 213.957031 51.0625 C 206.859375 59.9375 201.84375 69.953125 197.867188 80.121094 C 195.914062 85.226562 194.25 90.402344 192.78125 95.613281 C 191.375 100.832031 190.089844 106.070312 189.078125 111.34375 C 187.015625 121.890625 185.699219 132.507812 184.867188 143.136719 C 184.464844 148.453125 184.191406 153.773438 184.054688 159.105469 C 183.984375 161.773438 183.949219 164.441406 183.949219 167.113281 C 183.949219 168.453125 183.964844 169.792969 183.984375 171.136719 L 184.046875 173.636719 C 165.570312 170.632812 146.746094 169.550781 127.914062 170.449219 C 125.289062 170.554688 122.671875 170.785156 120.046875 170.976562 C 117.429688 171.234375 114.808594 171.492188 112.199219 171.867188 C 109.582031 172.179688 106.976562 172.652344 104.371094 173.078125 C 101.777344 173.589844 99.167969 174.066406 96.59375 174.710938 C 94 175.273438 91.445312 176.039062 88.878906 176.746094 C 86.339844 177.566406 83.785156 178.347656 81.292969 179.335938 C 76.285156 181.242188 71.34375 183.46875 66.691406 186.304688 C 66.109375 186.65625 65.5 186.964844 64.941406 187.351562 L 63.242188 188.496094 C 62.109375 189.265625 60.957031 190 59.898438 190.882812 C 58.828125 191.738281 57.71875 192.5625 56.679688 193.449219 C 55.667969 194.371094 54.613281 195.25 53.636719 196.210938 C 49.675781 200.003906 46.121094 204.242188 43.070312 208.828125 C 40.011719 213.410156 37.46875 218.347656 35.488281 223.507812 C 33.515625 228.675781 32.128906 234.066406 31.320312 239.546875 C 27.90625 261.484375 34.835938 284.941406 49.820312 301.6875 C 57.242188 310.085938 66.550781 316.886719 76.898438 321.398438 C 87.25 325.90625 98.613281 328.035156 109.917969 327.773438 C 121.230469 327.476562 132.5 324.710938 142.675781 319.664062 C 147.773438 317.152344 152.574219 314.058594 157.003906 310.507812 L 158.644531 309.152344 L 159.460938 308.46875 C 159.730469 308.238281 159.988281 307.988281 160.246094 307.746094 L 163.363281 304.816406 C 164.390625 303.824219 165.304688 302.742188 166.273438 301.707031 L 167.710938 300.132812 L 169.035156 298.484375 C 172.660156 294.140625 175.667969 289.40625 178.410156 284.578125 L 180.375 280.917969 C 181 279.6875 181.570312 278.433594 182.167969 277.191406 L 183.050781 275.324219 L 183.851562 273.425781 C 184.378906 272.164062 184.925781 270.902344 185.4375 269.632812 C 187.398438 264.53125 189.140625 259.367188 190.59375 254.148438 C 192.011719 248.929688 193.300781 243.683594 194.285156 238.398438 C 195.308594 233.121094 196.144531 227.820312 196.773438 222.507812 C 197.414062 217.195312 197.925781 211.875 198.253906 206.550781 C 198.585938 201.226562 198.78125 195.898438 198.828125 190.5625 C 198.851562 187.894531 198.839844 185.222656 198.78125 182.546875 C 198.757812 181.207031 198.71875 179.867188 198.667969 178.519531 L 198.578125 176.488281 L 198.574219 176.402344 C 201.371094 176.910156 204.1875 177.359375 207 177.765625 C 212.171875 178.503906 217.371094 179.101562 222.582031 179.550781 C 233.015625 180.425781 243.515625 180.675781 254.027344 180.222656 C 259.28125 179.953125 264.542969 179.558594 269.78125 178.84375 C 271.09375 178.695312 272.394531 178.453125 273.703125 178.265625 C 275.011719 178.066406 276.320312 177.863281 277.617188 177.597656 L 281.527344 176.847656 L 285.414062 175.957031 C 290.574219 174.671875 295.722656 173.214844 300.714844 171.214844 C 305.707031 169.25 310.640625 166.996094 315.273438 164.125 C 315.851562 163.773438 316.449219 163.441406 317.023438 163.074219 L 318.710938 161.914062 L 320.398438 160.75 C 320.964844 160.367188 321.523438 159.976562 322.046875 159.53125 L 325.261719 156.953125 C 326.3125 156.078125 327.296875 155.125 328.320312 154.210938 C 332.308594 150.441406 335.867188 146.207031 338.957031 141.644531 C 345.121094 132.511719 349.324219 121.988281 351.058594 111.019531 C 352.8125 100.0625 352.21875 88.667969 349.117188 77.917969 C 346.054688 67.164062 340.59375 57.046875 333.210938 48.585938 C 325.84375 40.113281 316.574219 33.230469 306.265625 28.621094 Z"

const CHIPS = [
  { label: 'What is seed cycling?',   question: 'What is seed cycling and how does it work?' },
  { label: 'Phase 1 & 2 explained',   question: "What's in Phase 1 and Phase 2 of the blends?" },
  { label: 'When do I start?',        question: 'When should I start seed cycling and which phase do I begin with?' },
]

function formatLunaText(text) {
  text = text.replace(/\*+/g, '').replace(/^#{1,3}\s+/gm, '').replace(/^[ \t]+|[ \t]+$/gm, '')
  const paras = text.split(/\n{2,}|\n/).filter(p => p.trim())
  return paras.map(p => {
    p = p.replace(/(https?:\/\/(?:www\.)?seedcycle\.com[^\s,)]*)/gi,
      '<a href="$1" target="_blank" rel="noopener" style="color:var(--rose);text-decoration:underline;text-underline-offset:2px;">$1</a>')
    p = p.replace(/(?<!href=["'])(?<!\/\/)((?:www\.)?seedcycle\.com(?:\/[^\s,)]*)?)/gi,
      '<a href="https://$1" target="_blank" rel="noopener" style="color:var(--rose);text-decoration:underline;text-underline-offset:2px;">$1</a>')
    return `<p style="margin:0 0 0.9em;line-height:1.72;">${p.trim()}</p>`
  }).join('')
}

export default function App() {
  const [mode, setMode]           = useState('chat')
  const [messages, setMessages]   = useState([])
  const [history, setHistory]     = useState([])
  const [input, setInput]         = useState('')
  const [typing, setTyping]       = useState(false)
  const [status, setStatus]       = useState({ state: 'ready', text: 'Ready' })
  const [chipsHidden, setChipsHidden] = useState(false)
  const [voiceStatus, setVoiceStatus] = useState('Tap to speak')
  const [haloContext, setHaloContext] = useState(null)
  const chatEndRef = useRef(null)
  const inputRef   = useRef(null)

  useEffect(() => {
    const handleMessage = (event) => {
      // Accept messages from Halo app origins
      const allowedOrigins = [
        'https://halo-of-health.vercel.app',
        'http://localhost:3000',
        'http://localhost:5173'
      ]
      if (!allowedOrigins.includes(event.origin)) return
      if (event.data && event.data.type === 'HALO_CONTEXT') {
        setHaloContext(event.data.payload)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  // ── ElevenLabs voice hook — handles ALL audio natively
  const conversation = useConversation({
    onConnect: () => {
      setVoiceStatus('Listening…')
      setStatus({ state: 'ready', text: 'Listening' })
    },
    onDisconnect: () => {
      setVoiceStatus('')
      setStatus({ state: 'ready', text: 'Ready' })
    },
    onError: (err) => {
      console.error('Voice error:', err)
      setVoiceStatus('Connection error — try again')
      setStatus({ state: '', text: 'Connection error' })
    },
    onMessage: ({ message, source }) => {
      if (message) {
        resetInactivityTimer()
        if (source === 'ai') setVoiceStatus(message)
      }
    },
  })

  const voiceActive  = conversation.status === 'connected'
  const lunaSpeaking = conversation.isSpeaking
  const inactivityTimer = useRef(null)

  // Reset the 2-minute inactivity timer whenever activity is detected
  const resetInactivityTimer = useCallback(async () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current)
    inactivityTimer.current = setTimeout(async () => {
      await conversation.endSession()
      setVoiceStatus('Call ended after 2 minutes of silence')
      setStatus({ state: 'ready', text: 'Ready' })
    }, 2 * 60 * 1000)
  }, [conversation])

  // Start timer when call connects, clear it when call ends
  useEffect(() => {
    if (voiceActive) {
      resetInactivityTimer()
    } else {
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current)
        inactivityTimer.current = null
      }
    }
  }, [voiceActive])

  useEffect(() => {
    if (lunaSpeaking) {
      setStatus({ state: 'speaking', text: 'Luna is speaking' })
    } else if (voiceActive) {
      setStatus({ state: 'ready', text: 'Listening' })
    }
  }, [lunaSpeaking, voiceActive])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [messages])

  const addMsg = useCallback((role, content) => {
    setMessages(prev => [...prev, { role, content, id: Date.now() }])
    setChipsHidden(true)
  }, [])

  const sendText = useCallback(async (text) => {
    if (!text.trim()) return
    addMsg('user', text)
    const newHistory = [...history, { role: 'user', content: text }]
    setHistory(newHistory)
    setTyping(true)
    setStatus({ state: 'thinking', text: 'Luna is thinking…' })

    try {
      const res  = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          haloContext: haloContext || null
        }),
      })
      const data = await res.json()
      const reply = data.reply || "I'm sorry, something went wrong. Please try again."
      setTyping(false)
      setStatus({ state: 'ready', text: 'Ready' })
      addMsg('luna', reply)
      setHistory(prev => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setTyping(false)
      setStatus({ state: '', text: 'Connection error' })
      addMsg('luna', 'Sorry, something went wrong. Please check your connection and try again.')
    }
  }, [history, addMsg, haloContext])

  const handleSend = () => {
    const val = input.trim()
    if (!val) return
    setInput('')
    sendText(val)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const startVoice = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      await conversation.startSession({
        agentId: AGENT_ID,
        dynamicVariables: haloContext ? {
          user_phase: haloContext.phase || 'Unknown',
          cycle_day: String(haloContext.cycleDay || 'Unknown'),
          symptoms: (haloContext.symptoms || []).join(', ') || 'None',
          mood: String(haloContext.mood || 'Not logged'),
          energy: String(haloContext.energy || 'Not logged'),
          streak: String(haloContext.streak || 0)
        } : {}
      })
    } catch (err) {
      setVoiceStatus(err.name === 'NotAllowedError'
        ? 'Microphone denied — check browser settings'
        : 'Microphone unavailable — please try again')
    }
  }

  const stopVoice = async () => {
    await conversation.endSession()
    setVoiceStatus('Tap to speak')
    setStatus({ state: 'ready', text: 'Ready' })
  }

  const handleVoiceBtn = () => {
    if (voiceActive) stopVoice()
    else startVoice()
  }

  const switchMode = (m) => {
    setMode(m)
    if (m === 'chat' && voiceActive) stopVoice()
    setStatus({ state: 'ready', text: m === 'chat' ? 'Ready' : 'Tap the mic to start' })
  }

  return (
    <>
      {/* Background */}
      <div style={styles.bgLayer}>
        <div style={styles.orb1} /><div style={styles.orb2} /><div style={styles.orb3} />
        <div style={styles.orb4} /><div style={styles.orb5} /><div style={styles.orb6} />
      </div>

      <div style={styles.page}>

        {/* Header */}
        <header style={styles.header}>
          <a href="https://www.seedcycle.com" target="_blank" rel="noopener" style={styles.logoLink}>
            <span style={styles.poweredBy}>Powered by</span>
            <img src={logoSvg} alt="Seed Cycle®" style={styles.logoImg} />
          </a>
          <a href="https://www.seedcycle.com" target="_blank" rel="noopener" style={styles.shopLink}>
            Shop Seed Cycle<sup style={{fontSize:'0.55em',verticalAlign:'super'}}>®</sup> →
          </a>
        </header>

        {/* Intro */}
        <div style={styles.intro}>
          <div style={{ ...styles.avatarWrap, ...(lunaSpeaking || typing ? styles.avatarSpeaking : {}) }}>
            <div style={styles.lunaRing} />
            <div style={styles.lunaRingMid} />
            <div style={styles.lunaCircle}>
              <svg viewBox="30 21 323 307" style={{ width: 51, height: 51 }}>
                <path fill="#ffffff" fillOpacity="0.92" d={INFINITY_PATH} />
              </svg>
            </div>
          </div>
          <p style={styles.eyebrow}>Your Seed Cycle<sup style={{fontSize:'0.6em',verticalAlign:'super'}}>®</sup> Guide</p>
          <h1 style={styles.title}>Meet <em style={styles.titleEm}>Luna</em></h1>
          <p style={styles.sub}>Luna can answer your questions about seed cycling.</p>
        </div>

        {/* Interaction zone */}
        <div style={styles.zone}>

          {/* Mode toggle */}
          <div style={styles.toggleWrap}>
            <div style={styles.toggle}>
              <button style={{ ...styles.modeBtn, ...(mode === 'chat' ? styles.modeBtnActive : {}) }}
                onClick={() => switchMode('chat')}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{width:11,height:11,marginRight:5}}>
                  <path d="M2 4h12M2 8h8M2 12h10"/>
                </svg>
                Chat
              </button>
              <button style={{ ...styles.modeBtn, ...(mode === 'voice' ? styles.modeBtnActive : {}) }}
                onClick={() => switchMode('voice')}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11,marginRight:5}}>
                  <path d="M8 1a2.5 2.5 0 0 0-2.5 2.5v5a2.5 2.5 0 0 0 5 0v-5A2.5 2.5 0 0 0 8 1z"/>
                  <path d="M13 8.5a5 5 0 0 1-10 0"/>
                  <line x1="8" y1="13.5" x2="8" y2="15.5"/>
                </svg>
                Voice
              </button>
            </div>
          </div>

          {/* Chat mode */}
          {mode === 'chat' && (
            <>
              <div style={styles.chatMessages}>
                {messages.map((msg, i) => (
                  <div key={msg.id} ref={i === messages.length - 1 ? chatEndRef : null}
                    style={{ ...styles.msg, ...(msg.role === 'user' ? styles.msgUser : styles.msgLuna) }}>
                    <div style={{ ...styles.msgLabel, ...(msg.role === 'user' ? styles.msgLabelUser : styles.msgLabelLuna) }}>
                      {msg.role === 'luna' ? 'Luna' : 'You'}
                    </div>
                    {msg.role === 'luna'
                      ? <div style={styles.bubbleLuna} dangerouslySetInnerHTML={{ __html: formatLunaText(msg.content) }} />
                      : <div style={styles.bubbleUser}>{msg.content}</div>
                    }
                  </div>
                ))}
                {typing && (
                  <div style={{ ...styles.msg, ...styles.msgLuna }}>
                    <div style={{ ...styles.msgLabel, ...styles.msgLabelLuna }}>Luna</div>
                    <div style={styles.typingIndicator}>
                      {[0,1,2].map(i => <div key={i} style={{ ...styles.typingDot, animationDelay: `${i*0.15}s` }} />)}
                    </div>
                  </div>
                )}
              </div>

              <div style={styles.inputRow}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Luna about seed cycling…"
                  rows={1}
                  style={styles.textInput}
                />
                <button onClick={handleSend} style={styles.sendBtn} aria-label="Send">
                  <svg viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:18,height:18}}>
                    <line x1="10" y1="18" x2="10" y2="2"/>
                    <polyline points="4 8 10 2 16 8"/>
                  </svg>
                </button>
              </div>
            </>
          )}

          {/* Voice mode */}
          {mode === 'voice' && (
            <div style={styles.voicePanel}>
              <div style={styles.waveform}>
                {[...Array(10)].map((_, i) => (
                  <div key={i} style={{
                    ...styles.waveBar,
                    animation: voiceActive ? `wavebar 0.9s ${i * 0.07}s ease-in-out infinite alternate` : 'none'
                  }} />
                ))}
              </div>

              <button onClick={handleVoiceBtn}
                style={{ ...styles.voiceBtn, ...(voiceActive ? styles.voiceBtnActive : {}) }}
                aria-label={voiceActive ? 'End call' : 'Start call'}>
                {voiceActive ? (
                  <svg viewBox="0 0 24 24" fill="white" style={{width:30,height:30}}>
                    <rect x="6" y="6" width="12" height="12" rx="2"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:30,height:30}}>
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                    <line x1="8" y1="23" x2="16" y2="23"/>
                  </svg>
                )}
              </button>

              <span style={styles.voiceStatusText}>
                {voiceActive
                  ? (lunaSpeaking ? 'Luna is speaking…' : 'Listening…')
                  : 'Tap to speak'}
              </span>

              {voiceStatus && voiceActive && (
                <div style={styles.transcriptBox}>
                  <p style={styles.transcriptLabel}>
                    {lunaSpeaking ? 'Luna' : 'You'}
                  </p>
                  <p style={styles.transcriptText}>{voiceStatus}</p>
                </div>
              )}
            </div>
          )}

          {/* Status pill */}
          <div style={{ ...styles.statusPill, ...styles[`status_${status.state}`] }}>
            <span style={{ ...styles.statusDot, ...styles[`dot_${status.state}`] }} />
            <span style={{fontSize:'0.68rem',fontWeight:500,color:'var(--mid)',letterSpacing:'0.05em'}}>{status.text}</span>
          </div>

        </div>

        {/* Question chips */}
        {!chipsHidden && (
          <div style={styles.chipsSection}>
            <p style={styles.chipsLabel}>Or ask about seed cycling</p>
            <div style={styles.chipsRow}>
              {CHIPS.map(chip => (
                <button key={chip.label} style={styles.chip}
                  onClick={() => { if (mode === 'voice') switchMode('chat'); sendText(chip.question) }}
                  onMouseEnter={e => Object.assign(e.target.style, styles.chipHover)}
                  onMouseLeave={e => Object.assign(e.target.style, styles.chip)}>
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerNote}>
            Luna is the AI guide for Seed Cycle<sup style={{fontSize:'0.7em',verticalAlign:'super'}}>®</sup> — here to help you understand seed cycling and our products. General information only, not medical advice. Always consult a healthcare professional for personal health concerns.
          </p>
        </footer>

      </div>

      <style>{`
        @keyframes wavebar { from { height: 4px; } to { height: 22px; } }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes pulse-out { 0% { transform:scale(1); opacity:1; } 100% { transform:scale(1.42); opacity:0; } }
        @keyframes rout { 0% { transform:scale(1); opacity:0.7; } 100% { transform:scale(2.5); opacity:0; } }
        @keyframes tbounce { 0%,80%,100% { transform:translateY(0); opacity:0.5; } 40% { transform:translateY(-5px); opacity:1; } }
        @keyframes sblink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        textarea:focus { outline: none; border-color: rgba(212,150,42,0.40) !important; box-shadow: 0 0 0 3px rgba(212,150,42,0.07) !important; }
        textarea::placeholder { color: var(--light); }
        * { box-sizing: border-box; }
        .luna-ring-spin { animation: spin-slow 24s linear infinite; }
        .luna-ring-spin::before { content:''; position:absolute; top:-4px; left:50%; transform:translateX(-50%); width:7px; height:7px; border-radius:50%; background:var(--gold); opacity:0.85; }
      `}</style>
    </>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  bgLayer: {
    position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden',
    background: 'radial-gradient(ellipse 65% 50% at 0% 0%, rgba(196,144,154,0.14) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 100% 100%, rgba(212,150,42,0.10) 0%, transparent 58%), radial-gradient(ellipse 80% 60% at 50% 50%, rgba(253,250,246,0.85) 0%, transparent 90%)',
  },
  orb1: { position:'absolute', width:460, height:460, top:-260, left:'50%', transform:'translateX(-50%)', borderRadius:'50%', border:'1px solid rgba(212,150,42,0.12)' },
  orb2: { position:'absolute', width:320, height:320, top:-190, left:'50%', transform:'translateX(-42%)', borderRadius:'50%', border:'1.5px solid rgba(155,94,106,0.10)' },
  orb3: { position:'absolute', width:210, height:210, top:-130, left:'50%', transform:'translateX(-35%)', borderRadius:'50%', border:'1px solid rgba(212,150,42,0.14)' },
  orb4: { position:'absolute', width:640, height:240, bottom:-140, left:'50%', transform:'translateX(-50%)', borderRadius:'50%', background:'radial-gradient(ellipse at 50% 100%, rgba(212,150,42,0.09) 0%, rgba(196,158,120,0.05) 50%, transparent 70%)' },
  orb5: { position:'absolute', width:300, height:300, top:'30%', left:-120, borderRadius:'50%', background:'radial-gradient(circle at 65% 50%, rgba(196,144,154,0.10) 0%, transparent 65%)' },
  orb6: { position:'absolute', width:220, height:220, top:'22%', right:-90, borderRadius:'50%', background:'radial-gradient(circle at 35% 50%, rgba(212,150,42,0.07) 0%, transparent 60%)', border:'1px solid rgba(212,150,42,0.07)' },
  page: { position:'relative', zIndex:1, display:'flex', flexDirection:'column', minHeight:'100dvh', maxWidth:580, margin:'0 auto', padding:'0 22px' },
  header: { padding:'26px 0 12px', display:'flex', alignItems:'center', justifyContent:'space-between', animation:'fadeUp 0.6s ease both' },
  logoLink: { display:'flex', alignItems:'center', gap:7, textDecoration:'none' },
  poweredBy: { fontSize:'0.6rem', fontWeight:600, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--light)', whiteSpace:'nowrap' },
  logoImg: { height:36, width:'auto', display:'block' },
  shopLink: { fontSize:'0.7rem', fontWeight:600, letterSpacing:'0.13em', textTransform:'uppercase', color:'var(--rose)', textDecoration:'none', borderBottom:'1px solid var(--rose-pale)', paddingBottom:1 },
  intro: { display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', padding:'8px 0 18px', animation:'fadeUp 0.6s 0.08s ease both' },
  avatarWrap: { position:'relative', width:100, height:100, marginBottom:16 },
  avatarSpeaking: {},
  lunaRing: { position:'absolute', inset:-12, borderRadius:'50%', border:'1.5px solid rgba(212,150,42,0.32)', animation:'spin-slow 24s linear infinite' },
  lunaRingMid: { position:'absolute', inset:-3, borderRadius:'50%', border:'1px solid rgba(155,94,106,0.14)' },
  lunaCircle: { width:100, height:100, borderRadius:'50%', background:'linear-gradient(145deg, var(--rose-pale) 0%, var(--rose-light) 52%, var(--rose) 100%)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 12px 40px rgba(155,94,106,0.22), 0 2px 8px rgba(0,0,0,0.05)', overflow:'hidden' },
  eyebrow: { fontSize:'0.66rem', fontWeight:600, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom:7 },
  title: { fontFamily:"'Cormorant Garamond', serif", fontWeight:400, fontSize:'clamp(2rem, 7vw, 2.9rem)', lineHeight:1.08, color:'var(--charcoal)', marginBottom:8 },
  titleEm: { fontStyle:'italic', color:'var(--rose)' },
  sub: { fontSize:'0.86rem', fontWeight:400, lineHeight:1.7, color:'var(--mid)', maxWidth:380 },
  zone: { display:'flex', flexDirection:'column', gap:10, animation:'fadeUp 0.6s 0.22s ease both' },
  toggleWrap: { display:'flex', justifyContent:'center' },
  toggle: { display:'flex', alignItems:'center', background:'rgba(255,255,255,0.70)', border:'1px solid var(--border)', borderRadius:100, padding:'2px 3px' },
  modeBtn: { padding:'5px 14px', borderRadius:100, border:'none', background:'transparent', fontFamily:"'Raleway', sans-serif", fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.10em', textTransform:'uppercase', color:'var(--light)', cursor:'pointer', transition:'all 0.2s ease', display:'flex', alignItems:'center' },
  modeBtnActive: { background:'white', color:'var(--rose)', boxShadow:'0 1px 6px rgba(155,94,106,0.10)' },
  chatMessages: { display:'flex', flexDirection:'column', gap:10, maxHeight:420, overflowY:'auto', paddingRight:6, marginBottom:2 },
  msg: { display:'flex', flexDirection:'column', maxWidth:'98%', animation:'msgPop 0.25s ease both' },
  msgUser: { alignSelf:'flex-end', alignItems:'flex-end', maxWidth:'88%' },
  msgLuna: { alignSelf:'flex-start', alignItems:'flex-start', maxWidth:'100%' },
  msgLabel: { fontSize:'0.62rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:4 },
  msgLabelLuna: { color:'var(--rose)' },
  msgLabelUser: { color:'var(--gold)' },
  bubbleLuna: { padding:'11px 15px', borderRadius:12, fontSize:'0.87rem', lineHeight:1.65, fontWeight:400, background:'var(--warm-white)', border:'1px solid var(--border)', color:'var(--charcoal)', borderBottomLeftRadius:4, boxShadow:'0 2px 8px rgba(155,94,106,0.06)' },
  bubbleUser: { padding:'11px 15px', borderRadius:12, fontSize:'0.87rem', lineHeight:1.65, fontWeight:400, background:'linear-gradient(135deg, var(--rose-pale), rgba(237,217,220,0.45))', border:'1px solid rgba(155,94,106,0.16)', color:'var(--charcoal)', borderBottomRightRadius:4 },
  typingIndicator: { display:'flex', gap:5, padding:'10px 15px', background:'var(--warm-white)', border:'1px solid var(--border)', borderRadius:12, borderBottomLeftRadius:4, alignItems:'center' },
  typingDot: { width:6, height:6, borderRadius:'50%', background:'var(--rose-light)', animation:'tbounce 1.2s ease-in-out infinite' },
  inputRow: { display:'flex', gap:9, alignItems:'flex-end' },
  textInput: { flex:1, background:'var(--warm-white)', border:'1px solid var(--border)', borderRadius:20, padding:'13px 18px', fontFamily:"'Raleway', sans-serif", fontSize:'0.87rem', color:'var(--charcoal)', resize:'none', minHeight:50, maxHeight:120, lineHeight:1.5, transition:'border-color 0.2s, box-shadow 0.2s', overflowY:'auto' },
  sendBtn: { width:50, height:50, borderRadius:'50%', background:'linear-gradient(135deg, var(--gold-light), var(--gold))', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 16px rgba(212,150,42,0.32)', transition:'transform 0.15s' },
  voicePanel: { display:'flex', flexDirection:'column', alignItems:'center', gap:12, padding:'8px 0 16px' },
  waveform: { display:'flex', alignItems:'center', gap:3, height:26 },
  waveBar: { width:3, height:4, borderRadius:2, background:'var(--rose-light)', transition:'height 0.1s' },
  voiceBtn: { position:'relative', width:80, height:80, borderRadius:'50%', background:'linear-gradient(145deg, var(--gold-light), var(--gold))', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 10px 36px rgba(212,150,42,0.36)', transition:'transform 0.2s, box-shadow 0.2s' },
  voiceBtnActive: { background:'linear-gradient(145deg, #e8c97a, var(--gold))' },
  voiceStatusText: { fontSize:'0.7rem', fontWeight:500, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--light)', maxWidth:280, textAlign:'center' },
  transcriptBox: { width:'100%', maxWidth:420, minHeight:80, maxHeight:160, overflowY:'auto', background:'var(--warm-white)', border:'1px solid var(--border)', borderRadius:16, padding:'14px 18px', boxShadow:'0 2px 8px rgba(155,94,106,0.06)' },
  transcriptLabel: { fontSize:'0.62rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--rose)', marginBottom:6 },
  transcriptText: { fontSize:'0.9rem', lineHeight:1.7, color:'var(--charcoal)', fontWeight:400 },
  statusPill: { display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'6px 14px', borderRadius:100, background:'rgba(255,255,255,0.65)', border:'1px solid var(--border)', width:'fit-content', margin:'4px auto 0', transition:'all 0.3s' },
  statusDot: { width:6, height:6, borderRadius:'50%', background:'var(--light)', flexShrink:0, transition:'background 0.3s' },
  status_ready: {}, status_thinking: {}, status_speaking: {}, status_: {},
  dot_ready: { background:'#7EC97E' },
  dot_thinking: { background:'var(--gold)', animation:'sblink 0.8s ease-in-out infinite' },
  dot_speaking: { background:'var(--rose)', animation:'sblink 0.6s ease-in-out infinite' },
  dot_: {},
  chipsSection: { marginTop:'auto', padding:'16px 0 0', animation:'fadeUp 0.6s 0.35s ease both' },
  chipsLabel: { fontSize:'0.64rem', fontWeight:600, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--light)', textAlign:'center', marginBottom:10 },
  chipsRow: { display:'flex', flexWrap:'wrap', gap:7, justifyContent:'center' },
  chip: { padding:'7px 14px', background:'rgba(255,255,255,0.65)', backdropFilter:'blur(6px)', border:'1px solid var(--border)', borderRadius:100, cursor:'pointer', fontSize:'0.76rem', fontWeight:500, color:'var(--mid)', transition:'all 0.2s ease', whiteSpace:'nowrap', fontFamily:"'Raleway', sans-serif" },
  chipHover: { padding:'7px 14px', background:'var(--rose-pale)', border:'1px solid var(--rose-light)', borderRadius:100, cursor:'pointer', fontSize:'0.76rem', fontWeight:500, color:'var(--rose)', transition:'all 0.2s ease', whiteSpace:'nowrap', fontFamily:"'Raleway', sans-serif", transform:'translateY(-1px)' },
  footer: { padding:'12px 0 24px', textAlign:'center', animation:'fadeUp 0.6s 0.40s ease both' },
  footerNote: { fontSize:'0.64rem', color:'var(--light)', fontWeight:400, lineHeight:1.5 },
}
