import { DatabaseSync } from 'node:sqlite';
import { createInterface } from 'node:readline/promises';

import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key');
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const query = await rl.question('Your question: ');

rl.close();

const db = new DatabaseSync('demo.db');

const allEmployees = db.prepare(`SELECT * FROM employees`).all();

const employeeData = allEmployees.map((employee) => ({
  id: employee.id,
  name: employee.name,
  department: employee.department,
}));


const aiResponse = await openai.responses.create({
  model: 'gpt-4o-mini',
  input: `The user's query / question was:\n${query}\n\nHere's all the employee data for the entire company:\n${JSON.stringify(
    employeeData
  )}\n\nPlease provide a detailed response to the user's query based on the retrieved data.`,
});

console.log(aiResponse.output_text);
