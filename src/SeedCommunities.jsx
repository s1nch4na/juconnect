

import { db } from "./firebase"; 
import { doc, setDoc } from "firebase/firestore";

export default function SeedCommunities() {
  const seedCommunities = async () => {
    const communities = [
      {
        id: "hackathonupdates",
        name: "hackathonupdates",
        title: "Hackathon Updates",
        description: "For hackathon alerts, deadlines, and team-ups",
      },
      {
        id: "jayanagararounds",
        name: "jayanagararounds",
        title: "Jayanagar Arounds",
        description: "Events and updates in and around Jayanagar",
      },
      {
        id: "letsconnect",
        name: "letsconnect",
        title: "Let's Connect",
        description: "Ask questions, get help, connect with peers",
      },
      {
        id: "alumni",
        name: "alumni",
        title: "Alumni",
        description: "Talk to seniors and alumni of JU",
      },
      {
        id: "whatsupju",
        name: "whatsupju",
        title: "WhatsUp JU",
        description: "Meme drops, campus news, random fun",
      },
      {
        id: "notesarchive",
        name: "notesarchive",
        title: "Notes Archive",
        description: "Old notes, resources, and study material",
      },
    ];

    for (const comm of communities) {
      await setDoc(doc(db, "communities", comm.id), {
        ...comm,
        createdBy: "system",
        createdAt: new Date(),
        isOfficial: true,
      });
    }

    alert("Seeding done!");
  };

  return (
    <div className="p-10">
      <button
        onClick={seedCommunities}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Seed Pre-Made Communities
      </button>
    </div>
  );
}
