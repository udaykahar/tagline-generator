import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.animal),
    temperature: 1,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `write taglines about

Animal: a tagline for an icecream shop
Names:  The best ice cream in town!
Animal: write tagline for an web development website
Names: Small business? Start-up? We can help get your website up and running.
Animal: Fashion Company
Names: Dresses, jeans, tops, and more. We have the latest fashion for
Animal: write tagline for an escort company
Names: Looking for a good time? Look no further, our escorts are the best in town!
Animal: write tagline for an web development website
Animal: ${capitalizedAnimal}
Names:`;
}
