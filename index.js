const express = require('express')
const cors = require('cors')
const { OpenAI } = require('openai')

const app = express()
app.use(cors())
app.use(express.json())

const openai = new OpenAI({ apiKey: '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' })

app.post('/api/hint', async (req, res) => {
  const { problem } = req.body
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Give one hint to help solve the problem without giving the full solution.' },
      { role: 'user', content: problem }
    ]
  })
  res.json({ hint: completion.choices[0].message.content })
})

app.post('/api/chat', async (req, res) => {
  const { message, problem, code } = req.body
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Act as a coding guide. Never give full solutions.' },
      { role: 'user', content: `Problem: ${problem}
Code:
${code}
Question:
${message}` }
    ]
  })
  res.json({ reply: completion.choices[0].message.content })
})

app.listen(5000, () => console.log('Backend running on http://localhost:5000'))
