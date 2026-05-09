import api from './api'

export async function sendVoice(audioBlob) {

  const formData = new FormData()

  formData.append(
    'file',
    audioBlob,
    'voice.wav'
  )

  const token = window.localStorage.getItem('token')

  console.log("TOKEN:", token)

  const response = await api.post(
    '/voice',
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: 'blob',
    }
  )

  const responseAudio = new Blob(
    [response.data],
    {
      type:
        response.headers['content-type']
        || 'audio/webm',
    }
  )

  return URL.createObjectURL(responseAudio)
}