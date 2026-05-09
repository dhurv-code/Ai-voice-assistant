import { useCallback, useEffect, useRef, useState } from 'react'
import { sendVoice } from '../services/voiceService'

const TIMEOUT_MS = 4200

export function useVoiceInteraction() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const mediaRecorderRef = useRef(null)
  const streamRef = useRef(null)
  const audioRef = useRef(null)
  const timeoutRef = useRef(null)

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
      mediaRecorderRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  const startVoiceSession = useCallback(async () => {
    if (status === 'listening' || status === 'thinking' || status === 'speaking') {
      return
    }

    try {
      setError('')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const recorder = new MediaRecorder(stream)
      const chunks = []

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      recorder.onstop = async () => {
        setStatus('thinking')
        const audioBlob = new Blob(chunks, { type: 'audio/webm' })

        try {
          const audioUrl = await sendVoice(audioBlob)
          audioRef.current = new Audio(audioUrl)
          audioRef.current.onended = () => {
            setStatus('idle')
          }
          setStatus('speaking')
          await audioRef.current.play()
        } catch (err) {
          setError(err?.message || 'Unable to process voice response')
          setStatus('idle')
        }
      }

      recorder.start()
      mediaRecorderRef.current = recorder
      setStatus('listening')

      timeoutRef.current = window.setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop()
        }
      }, TIMEOUT_MS)
    } catch (err) {
      setError('Microphone access denied or unavailable')
      setStatus('idle')
      cleanup()
    }
  }, [cleanup, status])

  useEffect(() => {
    return () => {
      cleanup()
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [cleanup])

  return {
    status,
    error,
    isActive: status !== 'idle',
    startVoiceSession,
  }
}
