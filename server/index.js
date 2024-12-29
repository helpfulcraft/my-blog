import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
app.use(cors())
app.use(express.json())

const config = {
  clientId: 'Ov23lidgLe1RzdUISJ2R',
  clientSecret: '57f7add2e7d91efd06eef9ee99bea8ef35ff05cf'
}

app.post('/oauth/token', async (req, res) => {
  const { code } = req.body
  
  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' })
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code: code
      })
    })

    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error('Token exchange error:', error)
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`)
})
