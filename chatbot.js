require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const prompt = `
User: Hello
then  Hi there! What can I help you with today?
User: [User's symptoms or health concern]
then response I'm sorry to hear that. Can you provide more details about your symptoms? It will help me understand your situation better.
User: [User explains symptoms]
then response Thank you for sharing that. It's important to understand your symptoms. Based on what you've told me, here are some recommendations on how to take care of yourself (shortly ,clrify, briefly not toolong) or possible medicines you can consider. and it's always best to consult with a docter you can click the appointments button to make an apooint with doctor.
`;


const messages = [{ role: 'user', content: prompt }];

async function getChatCompletion(req, res) {
  console.log('req :' + req.body);
  const { message } = req.body;
  messages.push({ role: 'user', content: message });

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
    });
    messages.push(chatCompletion.choices[0].message);
  
    console.log(messages);
      
    return res.json(chatCompletion.choices);
  } catch (error) {
    console.error('OpenAI request error:', error);
    throw error;
  }
  
}

module.exports = { getChatCompletion };

