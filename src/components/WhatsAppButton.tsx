"use client";

const NUM = "351920000000"; // Número português sem + e sem espaços
const MSG = "Olá, quero solicitar um serviço de limpeza da Limpszone.";
const URL = `https://wa.me/${NUM}?text=${encodeURIComponent(MSG)}`;

type Props = { className?: string; children?: React.ReactNode };

export default function WhatsAppButton({ className = "", children = "WhatsApp" }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // impede overlays/handlers de bloquearem o clique
    window.open(URL, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Falar no WhatsApp"
      className={className || "bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"}
      // garante que nada por cima bloqueie o clique
      style={{ pointerEvents: "auto", cursor: "pointer", position: "relative", zIndex: 100 }}
    >
      {children}
    </button>
  );
}