"use client";
import { useRouter } from 'next/navigation';
import backIcon from '../../images/Back.svg';

export default function BackButton({ label = "Back", className = "adventure-detail-back-nav dark" }) {
  const router = useRouter();
  
  return (
    <button className={className} onClick={() => router.back()}>
        <img className="Backbutton-icon" src={backIcon.src || backIcon} alt="Return"/> {label}
    </button>
  );
}
