'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';


interface Person {
  name: string;
  role: string;
  botDesc: string;
  image: string;
}

interface PersonCardProps {
  person: Person;
  selectedPerson: Person | undefined;
  setSelectedPerson: (person: Person | undefined) => void;
}

export default function PersonCard({
  person,
  selectedPerson,
  setSelectedPerson,
}: PersonCardProps) {
  const colors: string[] = [
    "#C2D1EF",
    "#DFC0D3",
    "#ECCBB5",
    "#D6DEBF",
    "#EBCDB5",
    "#F2EDCE",
    "#E4D470",
    "#E4C8B3",
    "#E6D588",
    "#C9F1B3",
  ];

  const [gradientStyle, setGradientStyle] = useState<string>('');

  useEffect(() => {
    const getRandomGradient = (): string => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      return `linear-gradient(135deg, ${shuffled[0]}, ${shuffled[1]}, ${shuffled[2]})`;
    };
    setGradientStyle(getRandomGradient());
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".card-container")) {
      setSelectedPerson(undefined); // Reset on outside click
    }
  };

  useEffect(() => {
    if (selectedPerson) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside); // Cleanup on unmount
    };
  }, [selectedPerson]);

  return (
    <div
      className="card-container cursor-pointer"
      data-name={person.name}
      style={{
        background: gradientStyle,
        opacity: selectedPerson ? 0.05 : 1,
        pointerEvents: selectedPerson ? "none" : "auto",
        overflowY: selectedPerson ? "hidden" : "auto",
      }}
      onClick={() => {
        if (selectedPerson === person) {
          setSelectedPerson(undefined); // Toggle selection
        } else {
          setSelectedPerson(person);
        }
      }}
    >
      {/* Header */}
      <div className="header">
        <div className="profile-img">
          <div className="tooltip">
            <img src={person.image} alt="profile" />
            <div className="tooltiptext">{person.name}</div>
          </div>
        </div>
        <div className="profile-details">
          <p className="name">
            {person.name.charAt(0).toUpperCase() + person.name.slice(1)}
          </p>
          <p className="description pe-2">{person.role}</p>
        </div>
      </div>

      {/* Content */}
      <div className="content">{person.botDesc}</div>

      {/* Footer */}
      <div className="footer">
        <button><ArrowRight className="icon" /></button>
      </div>

      <style jsx>{`
        .card-container {
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          padding: 16px;
          max-width: 300px;
          word-wrap: break-word;
          overflow: hidden;
          margin-top: 25px;
        }

        .card-container:hover {
          transform: scale(1.05);
          box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
        }

        .card-container[style*="pointer-events: none;"]:hover {
          transform: none;
          box-shadow: none;
        }

        .header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 12px;
        }

        .profile-img {
          width: 72px;
          height: 72px;
          border-radius: 10px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .profile-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }

        .profile-details .name {
          font-size: 18px;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-details .description {
          font-size: 11px;
          color: #6b6171;
        }

        .content {
          flex-grow: 1;
          font-size: 12px;
          color: #6b6171;
          padding: 10px 0;
        }

        .footer {
          display: flex;
          justify-content: flex-end;
        }

        .footer button {
          background: none;
          border: none;
          cursor: pointer;
        }

        .footer .icon {
          width: 24px;
          height: 24px;
          color: #444;
        }

        .tooltip {
          position: relative;
          display: inline-block;
        }

        .tooltip .tooltiptext {
          visibility: hidden;
          width: 90px;
          background-color: black;
          color: #fff;
          text-align: center;
          border-radius: 6px;
          padding: 5px;
          position: absolute;
          z-index: 1;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 12px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .tooltip:hover .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
