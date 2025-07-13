import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Lista de canciones (puedes agregar más URLs aquí)
  const songs = [
    {
      name: "Luz en mi Tormenta",
      url: "/attached_assets/luz-en-mi-tormenta_1752379601856.mp3"
    },
    {
      name: "Música de Cumpleaños",
      url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
    }
  ];

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => {
        console.log('Audio play failed:', e);
        // Si falla, intenta con la siguiente canción
        nextSong();
      });
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', nextSong);
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', nextSong);
        }
      };
    }
  }, []);

  return (
    <>
      <div 
        className="hidden md:flex items-center gap-3 bg-white bg-opacity-20 px-4 py-2 rounded-full cursor-pointer hover:bg-opacity-30 transition-all"
        onClick={toggleMusic}
      >
        <img 
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80" 
          alt="Stitch" 
          className={`w-10 h-10 rounded-full object-cover transition-transform ${isPlaying ? 'rotating' : ''}`}
        />
        <div className="flex flex-col">
          <span className="text-white font-bold text-sm">♪ Música</span>
          <span className="text-white text-xs opacity-80">{songs[currentSong].name}</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            nextSong();
          }}
          className="text-white hover:text-stitch-pink transition-colors text-sm"
        >
          ⏭
        </button>
      </div>
      
      <audio ref={audioRef} src={songs[currentSong].url} />
      
      {/* Reproductor móvil simplificado */}
      <div 
        className="md:hidden flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-full cursor-pointer hover:bg-opacity-30 transition-all"
        onClick={toggleMusic}
      >
        <span className="text-white text-sm">♪</span>
      </div>
    </>
  );
}
