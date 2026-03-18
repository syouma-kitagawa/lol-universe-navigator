import { Champion } from "@/data/champions";
import Image from "next/image";

interface ChampionCardProps {
  champ: Champion;
  onClick: (id: string) => void;
}

export default function ChampionCard({ champ, onClick }: ChampionCardProps) {
  return (
    <div 
      className="champion-card" 
      title={`${champ.name} の相関図を表示`}
      onClick={() => onClick(champ.id)}
    >
      <span className="external-icon">🔗</span>
      <div className="champion-icon-wrapper">
        <Image
          className="champion-icon"
          src={champ.iconUrl}
          alt={champ.name}
          width={120}
          height={120}
          unoptimized // 外部画像CDNの最適化を省略
        />
      </div>
      <span className="champion-name">{champ.name}</span>
    </div>
  );
}
