import "./App.css";
import "normalize.css";
import { useState, useEffect } from "react";
import SideMenu from "./components/SideMenu";
import ChatBox from "./components/ChatBox";
import { v4 as uuidv4 } from "uuid";

const heroList = [
  {
    name: "Iron Man",
    universe: "Marvel",
    theme: "IronMan",
    persona:
      "Iron Man, aka Tony Stark, is a genius, billionaire, and philanthropist. He is known for his sarcastic wit, advanced technology, and being the founding member of the Avengers.",
  },
  {
    name: "Captain America",
    universe: "Marvel",
    theme: "CaptainAmerica",
    persona:
      "Captain America, aka Steve Rogers, is a super-soldier who fought in World War II. He is known for his strong sense of duty, leadership, and his iconic shield made of vibranium.",
  },
  {
    name: "Spiderman",
    universe: "Marvel",
    theme: "Spiderman",
    persona:
      "Spiderman, aka Peter Parker, is a high school student turned superhero after being bitten by a radioactive spider. He is known for his quick wit, agility, and web-slinging abilities.",
  },
  {
    name: "Hulk",
    universe: "Marvel",
    theme: "Hulk",
    persona:
      "Hulk, aka Bruce Banner, is a scientist who transforms into a green-skinned, super-strong monster when he gets angry. He is known for his immense strength and indestructibility.",
  },
  {
    name: "Batman",
    universe: "DC",
    theme: "Batman",
    persona:
      "Batman, aka Bruce Wayne, is a billionaire philanthropist who fights crime in Gotham City. He is known for his detective skills, martial arts expertise, and an array of high-tech gadgets.",
  },
  {
    name: "Superman",
    universe: "DC",
    theme: "Superman",
    persona:
      "Superman, aka Clark Kent, is an alien from the planet Krypton who was raised on Earth. He is known for his super-strength, flight, heat vision, and invulnerability.",
  },
  {
    name: "Wonder Woman",
    universe: "DC",
    theme: "WonderWoman",
    persona:
      "Wonder Woman, aka Diana Prince, is an Amazonian princess from the island of Themyscira. She is known for her exceptional combat skills, magical Lasso of Truth, and her ability to deflect bullets with her bracelets.",
  },
  {
    name: "Flash",
    universe: "DC",
    theme: "Flash",
    persona:
      "Flash, aka Barry Allen, is a forensic scientist who gained super-speed abilities after being struck by lightning. He is known for his incredible speed, quick thinking, and the ability to travel through time.",
  },
];


function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      id: uuidv4(),
      user: "gpt",
      message: "How can I help you today?",
    },
  ]);
  const [selectedHero, setSelectedHero] = useState(heroList[0].name);

  useEffect(() => {
    setChatLog([
      {
        id: uuidv4(),
        user: "gpt",
        message: `You are now talking with ${selectedHero}`,
      },
    ]);
  }, [selectedHero]);

  const handleHeroChange = (event) => {
    setSelectedHero(event.target.value);
  };

  const clearChat = () => {
    setChatLog([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input;
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { id: uuidv4(), user: "me", message: userMessage },
    ]);
    setInput("");

    const messageHistory = chatLog
      .map((message) => `${message.message}`)
      .join("\n");
      const context = `You are ${selectedHero}, a superhero from ${
        heroList.find((hero) => hero.name === selectedHero).universe
      } comics. ${
        heroList.find((hero) => hero.name === selectedHero).persona
      } `;

    const prompt = `${context}${messageHistory}\nme: ${userMessage}\n`;

    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
      }),
    });

    const data = await response.json();
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { id: uuidv4(), user: "gpt", message: data.message.trim() },
    ]);
  };

  const selectedHeroData = heroList.find((hero) => hero.name === selectedHero);
const theme = selectedHeroData && selectedHeroData.theme;


  return (
    <div className="App">
      <div className="header">
      <h1>SidekickSMS</h1>
      </div>
      <SideMenu
        clearChat={clearChat}
        handleHeroChange={handleHeroChange}
        selectedHero={selectedHero}
        heroList={heroList}
      />
      <ChatBox
      chatLog={chatLog}
      handleSubmit={handleSubmit}
      input={input}
      setInput={setInput}
      theme={theme}
    />
    </div>
  );
}

export default App;
