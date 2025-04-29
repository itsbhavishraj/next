// src/app/page.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";
import Persona from "@/components/persona";
import { WebPhoneSvelte } from "@/lib/webphone/phone_svelte";
import type { Person, Server } from "@/lib/t";

export default function HomePage() {
  const outputAudioElement = useRef<HTMLAudioElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [phone, setPhone] = useState<WebPhoneSvelte | null>(null);
  const [phoneState, setPhoneState] = useState<string>("idle");
  const [person, setPerson] = useState<Person | undefined>(undefined);

  const env = "demo";
  const envs = new Map<string, Server>([
    [
      "demo",
      {
        server_host: "telebotstream.epicode.in",
        server_port: 7443,
        username: "1002",
        password: "3p!c0d3",
      },
    ],
  ]);

  const people = new Map<string, Person>([
    [
      "Sam",
      {
        name: "Sam",
        role: "Banking Assistance Agent",
        extension: "6007",
        thumbnail: "images/kapil.jpg",
        thumbnailPosX: "50px",
        thumbnailPosY: "30px",
        image: "images/kapil.jpg",
        botDesc:
          "A banking bot manages finances by checking balances, transferring funds, and paying bills.",
      },
    ],
    [
      "Mary",
      {
        name: "Mary",
        role: "Lead Qualification Assistance Agent",
        extension: "6006",
        thumbnail: "images/mary.jpg",
        thumbnailPosX: "48px",
        thumbnailPosY: "180px",
        image: "images/mary.jpg",
        botDesc:
          "A lead qualification bot engages prospects, gathers data, and assesses sales potential.",
      },
    ],
    // Add all other people...
  ]);

  useEffect(() => {
    const newPhone = new WebPhoneSvelte({
      mediaConfig: {
        remoteAudioElement: outputAudioElement.current!,
      },
      eventSubscription: {
        onConnectionEvent: (e) => {
          console.log("connection event", e);
        },
        onCallEvent: (e) => {
          console.log("call event", e);
          switch (e.event_name) {
            case "answered":
              setPhoneState("answered");
              break;
            case "hangup":
              setPhoneState("idle");
              setPerson(undefined);
              break;
          }
        },
      },
    });
    setPhone(newPhone);
    registerEnv(newPhone);
    setIsMounted(true);
  }, []);

  function registerEnv(newPhone: WebPhoneSvelte) {
    newPhone.register({
      server: {
        host: envs.get(env)?.server_host!,
        port: envs.get(env)?.server_port,
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "turn:3.218.56.58:3478", username: "sluser", credential: "W2Du221KgE0y" },
        ],
      },
      user: {
        name: envs.get(env)?.username!,
        password: envs.get(env)?.password!,
      },
    });
  }

  function showCard(e: any) {
    if (phoneState === "idle") {
      const elem = e.target as HTMLElement;
      const elem2 = elem.closest(".card-container") as HTMLElement;
      if (elem2) {
        const name = elem2.dataset.name;
        if (name) {
          const selected = people.get(name);
          setPerson(selected);
          console.log("person:", selected);
        }
      } else if (elem.closest("#phone-screen")) {
        // do nothing
      } else {
        setPerson(undefined);
      }
    }
  }

  return (
    <div className={`h-screen flex flex-col bg-[#E2EEFE] ${person ? "blur-bg" : ""}`}>
      <audio ref={outputAudioElement}></audio>

      {/* Header */}
      <header
        className="text-white flex items-center justify-center fixed top-0 w-full z-10 h-20 p-2 md:px-16 lg:px-22"
        style={{ opacity: person ? 0.05 : 1 }}
      >
        <div className="text-[#473F4B]">
          <p className="font-semibold text-xl">Need Help?</p>
          <p className="font-bold text-xl md:text-2xl">
            Our AI Assistants Have the Answers!
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main
        className="flex-grow mt-[5rem] mb-[4rem] overflow-y-scroll bg-s-100 px-2 md:px-16 lg:px-22 scrollbar-hide w-full"
        onClick={(e) => showCard(e)}
      >
        <div className={`h-[100vh] bg-[#E2EEFE] p-1 mx-auto flex flex-col ${person ? "blur-bg" : ""}`}>
          <div className="flex-grow pb-5">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...people.values()].map((p) => (
                <Persona
                  key={p.name}
                  selectedPerson={person}
                  person={p}
                  setSelectedPerson={() => {}}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-white fixed bottom-0 w-full h-16 flex items-center justify-center z-10 px-8 md:px-24 gap-4"
        style={{ opacity: person ? 0.05 : 1 }}
      >
        <p className="text-[#8D8194]">Brought to you by</p>
        <div>
          <img src="/images/sandlogicLogo.png" alt="" width="100px" />
        </div>
      </footer>

      {/* Phone Screen */}
      {person && (
        <div
          id="phone-screen"
          className="z-50 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 person-bg"
        >
          <Card
            phone={phone}
            person={person}
            phoneState={phoneState}
            audioElement={outputAudioElement.current}
            onClose={() => setPerson(undefined)}
          />
        </div>
      )}
    </div>
  );
}
