'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import Wave from './Wave';
// Make sure the path is correct based on your project structure
import Wave from './Wave';  // If in same directory
import Wave from '@/components/Wave'; // If using path alias

interface OnCallProps {
  phone: WebPhoneNext;
  person: Person;
}

export default function OnCall({ phone, person }: OnCallProps) {
  const [time, setTime] = useState(0);
  const [call, setCall] = useState(phone.callList?.[0]);
  const officeAmbienceRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  const computeTimeString = (time: number) => {
    const minutes = Math.trunc(time / 60);
    const seconds = time % 60;
    const minutes_str = minutes > 9 ? minutes.toString() : `0${minutes}`;
    const seconds_str = seconds > 9 ? seconds.toString() : `0${seconds}`;
    return `${minutes_str}:${seconds_str}`;
  };

  useEffect(() => {
    setCall(phone.callList?.[0]);
    
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    if (officeAmbienceRef.current) {
      officeAmbienceRef.current.volume = 0.3;
      officeAmbienceRef.current.play().catch(e => console.error("Audio play failed:", e));
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (officeAmbienceRef.current) officeAmbienceRef.current.pause();
    };
  }, [phone]);

  const toggleMute = () => {
    if (call) {
      phone.toggleMute(call, "audio");
      setCall({...call}); // Force re-render
    }
  };

  const hangupCall = () => {
    if (call) {
      phone.hangupCall(call);
    }
  };

  const isMuted = call ? phone.isMuted(call, "audio") : false;

  return (
    <div className="circle-background">
      <div className="phone-outer-layer border rounded-3xl">
        <div className="phone-inner-layer border rounded-2xl">
          <div className="phone-container m-3 rounded-xl">
            <div className="notch flex justify-center">
              <div className="notch-body">
                <div className="inner-notch"></div>
              </div>
            </div>
            <div className="content bg-whiteq">
              <audio
                src="/sounds/office-ambience.mp3"
                ref={officeAmbienceRef}
                loop
              />
              <div className="mt-16">
                <p className="text-center text-white font-semibold text-xl">
                  {person.name.charAt(0).toUpperCase() + person.name.slice(1)}
                </p>
                <div className="image mt-3">
                  <img src={person.image} alt="callee" />
                </div>
                <p className="mt-3 text-center text-white font-semibold text-xl">
                  {computeTimeString(time)}
                </p>
                <div className="flex h-12 w-full items-center justify-between gap-2 rounded-md px-4 opacity-80">
                  {call && (
                    <>
                      <Wave
                        id="wave_local"
                        mediaStream={phone.getLocalMediaStream(call)}
                        waveColor="hsl(229, 100%, 50%)"
                      />
                      <Wave
                        id="wave_remote"
                        mediaStream={phone.getRemoteMediaStream(call)}
                        waveColor="hsl(15, 100%, 50%)"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="footer flex items-center">
              <div className="flex flex-row items-center justify-center gap-2">
                <button
                  className={`rounded-full p-4 w-12 h-12 flex items-center justify-center
                    ${isMuted ? 'bg-red-400' : 'bg-blue-500'} 
                    text-white transition-transform duration-200 hover:scale-110`}
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <button
                  className="rounded-full p-4 w-12 h-12 flex items-center justify-center
                    bg-red-400 text-white transition-transform duration-200 hover:scale-110"
                  onClick={hangupCall}
                  aria-label="Hang up"
                >
                  <PhoneOff size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .circle-background {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 270px;
          height: 270px;
          background-color: #ff5a6e;
          border-radius: 50%;
          box-shadow: 0 0 40px 30px rgba(255, 90, 110, 0.6);
        }

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
        
        .footer {
          position: absolute;
          bottom: 0;
          height: 130px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: auto;
          margin-right: auto;
        }

        .image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}