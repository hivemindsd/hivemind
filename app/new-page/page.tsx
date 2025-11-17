"use client";

import { useEffect } from "react";


export default function FunnyPageOfDoom() { 
    
    useEffect(() => {
    const audio = new Audio("/evil-cat-laugh.mp3");
    audio.play().catch((err) => {
      console.warn("Autoplay prevented:", err);
    });
  }, []);


  useEffect(() => {
  const handleMove = (e: MouseEvent) => {
    const emoji = document.createElement("div");
    emoji.textContent = "😹";
    emoji.style.position = "fixed";
    emoji.style.left = `${e.pageX}px`;
    emoji.style.top = `${e.pageY}px`;
    emoji.style.pointerEvents = "none";
    emoji.style.fontSize = "24px";
    emoji.style.transition = "all 1s ease";
    document.body.appendChild(emoji);
    emoji.style.opacity = "1";
    setTimeout(() => {
      emoji.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(emoji);
      }, 500);
    }, 500);
  };

  window.addEventListener("mousemove", handleMove);
  return () => window.removeEventListener("mousemove", handleMove);
}, []);
    
    
    return(
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Funny Page of Doom!</h1>
            <p className="text-lg mb-8">Yo wsg gang :D</p>
            <img src="/funny-cat.gif" alt="Funny Cat" className="w-64 h-64 object-cover rounded-lg shadow-lg animate-bounce"/>
        </div>
    )
}