'use client';

import { useState, useEffect } from 'react';

// Define the types
interface Person {
  name: string;
  extension: string;
  image: string;
}

interface WebPhoneNext {
  callList?: {
    state: {
      value: string;
    };
  }[];
  makeCall: (extension: string, options: { audio: HTMLAudioElement; video: undefined }) => Promise<void>;
}

interface OnCallProps {
  phone: WebPhoneNext | null;
  person: Person;
}

// OnCall component (simplified version - you should expand this)
function OnCall({ phone, person }: OnCallProps) {
  return (
    <div className="on-call-container">
      <h2>Currently in call with {person.name}</h2>
      {/* Add your call controls and UI here */}
    </div>
  );
}

// Main Phone component
export default function Phone({
  phone,
  person,
  audioElement,
  phoneState,
  onClose,
}: {
  phone: WebPhoneNext | null;
  person: Person;
  audioElement: HTMLAudioElement;
  phoneState: string;
  onClose: () => void;
}) {
  const [call, setCall] = useState(phone?.callList);

  useEffect(() => {
    setCall(phone?.callList);
  }, [phone]);

  const goBack = () => {
    console.log('go back');
    onClose();
  };

  if (!phone) return null;

  return (
    <div>
      {phoneState === 'idle' ? (
        <div className="phone-outer-layer">
          <div className="phone-inner-layer">
            <div className="phone-container">
              <div className="notch">
                <div className="notch-body">
                  <div className="inner-notch"></div>
                </div>
              </div>
              <button className="back-button" onClick={goBack} aria-label="Go back">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="#ffffff"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,144a64.07,64.07,0,0,1-64,64H80a8,8,0,0,1,0-16h88a48,48,0,0,0,0-96H51.31l34.35,34.34a8,8,0,0,1-11.32,11.32l-48-48a8,8,0,0,1,0-11.32l48-48A8,8,0,0,1,85.66,45.66L51.31,80H168A64.07,64.07,0,0,1,232,144Z"></path>
                </svg>
              </button>
              <div className="content">
                <div className="caller-info">
                  <p className="caller-name">
                    {person.name.charAt(0).toUpperCase() + person.name.slice(1)}
                  </p>
                  <div className="caller-image">
                    <img src={person.image} alt="callee" />
                  </div>
                </div>
              </div>
              <div className="footer">
                <button
                  className="call-button"
                  onClick={async () => {
                    await phone.makeCall(person.extension, {
                      audio: audioElement,
                      video: undefined,
                    });
                  }}
                >
                  <i className="fa fa-phone"></i> Call
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : phoneState === 'answered' && call?.[0]?.state.value === 'call' ? (
        <OnCall phone={phone} person={person} />
      ) : null}

      <style jsx>{`
        .phone-outer-layer {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 290px;
          height: 526px;
          border: 2px solid #bacade;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f1f7fe;
          border-radius: 30px;
        }

        .phone-inner-layer {
          height: 99%;
          width: 98%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid #bacade;
          border-radius: 24px;
        }

        .phone-container {
          height: 96%;
          width: 97%;
          background-color: #473f4b;
          position: relative;
          border-radius: 14px;
          margin: 12px;
        }

        .notch {
          display: flex;
          justify-content: center;
        }

        .notch-body {
          width: 150px;
          height: 22px;
          background-color: #f1f7fe;
          border-bottom-right-radius: 35px;
          border-bottom-left-radius: 35px;
          display: flex;
          justify-content: center;
          align-items: top;
        }

        .inner-notch {
          width: 60px;
          height: 8px;
          border: 2px solid #bacade;
          border-radius: 10px;
        }

        .content {
          height: 96%;
          display: flex;
          justify-content: center;
          top: 30px;
        }

        .caller-info {
          margin-top: 64px;
          text-align: center;
        }

        .caller-name {
          color: white;
          font-weight: 600;
          font-size: 1.25rem;
          line-height: 1.75rem;
        }

        .caller-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 12px;
          margin-left: auto;
          margin-right: auto;
        }

        .caller-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .footer {
          position: absolute;
          bottom: 0;
          height: 130px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .back-button {
          margin-left: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .call-button {
          display: flex;
          width: 96px;
          align-items: center;
          justify-content: space-evenly;
          border-radius: 6px;
          background-color: rgb(126 34 206);
          padding: 8px;
          color: white;
          border: none;
          cursor: pointer;
        }

        .call-button i {
          font-size: 1.5rem;
          line-height: 2rem;
        }
      `}</style>
    </div>
  );
}