import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import FloatingHearts from '@/components/FloatingHearts';
import CountdownTimer from '@/components/CountdownTimer';
import ComplimentsGenerator from '@/components/ComplimentsGenerator';
import ImageModal from '@/components/ImageModal';
import PoemGenerator from '@/components/PoemGenerator';
import { useConfetti } from '@/hooks/useConfetti';

export default function BirthdayPage() {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@300;400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Load Font Awesome
    const faLink = document.createElement('link');
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    faLink.rel = 'stylesheet';
    document.head.appendChild(faLink);

    // Initial confetti after page load
    const timer = setTimeout(() => triggerConfetti(), 2000);

    return () => {
      clearTimeout(timer);
      document.head.removeChild(link);
      document.head.removeChild(faLink);
    };
  }, [triggerConfetti]);

  const createStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 4 + 's'
          }}
        />
      );
    }
    return stars;
  };

  const handleCelebration = () => {
    triggerConfetti();
    setTimeout(triggerConfetti, 500);
    setTimeout(triggerConfetti, 1000);
  };

  return (
    <div className="font-quicksand bg-blue-50 text-gray-800 overflow-x-hidden">
      <FloatingHearts />
      <Navigation />

      {/* Cover Section */}
      <section id="cover" className="gradient-stitch-cover text-white min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-5">
        {/* Stars Background */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {createStars()}
        </div>
        
        <div className="text-center z-10">
          <h1 className="font-pacifico text-6xl md:text-8xl mb-8 drop-shadow-lg">
            ¡Feliz Cumpleaños!
          </h1>
          
          {/* Stitch Character */}
          <div className="relative w-72 h-72 mx-auto mb-12 bounce-animation">
            <img 
              src="/attached_assets/descarga (1)_1752415404552.jpeg" 
              alt="Stitch celebrando" 
              className="w-full h-full object-contain rounded-full shadow-2xl border-4 border-stitch-pink bg-white" 
            />
          </div>

          <h2 className="font-pacifico text-4xl md:text-5xl mb-8 text-stitch-pink drop-shadow-md">
            Mi niña hermosa ❤
          </h2>

          <CountdownTimer />
        </div>
      </section>

      {/* Message Section */}
      <section id="message" className="py-20 px-5 bg-blue-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-pacifico text-5xl text-stitch-purple text-center mb-12 drop-shadow-sm">
            Un Mensaje Especial
          </h2>
          
          <div className="bg-white p-10 rounded-2xl shadow-xl text-left leading-relaxed text-lg">
            <p className="mb-6">
              <strong>Mi querida Hermanita,</strong>
            </p>
            
            <p className="mb-6">
              En este día tan especial, quiero que sepas lo importante que eres para mí. Desde que llegaste a mi vida, todo ha tenido más color, más sentido y más alegría. Tu sonrisa, esa que aparece incluso en los días grises, tiene el poder de iluminar mi mundo entero. Es como si con solo verte, todo lo demás pasara a segundo plano. Tu energía contagiosa hace que todo sea mejor, más ligero, más bonito.
            </p>

            <p className="mb-6">
              Me haces pensar en Stitch, ese pequeño ser que parecía perdido, diferente, fuera de lugar… hasta que encontró a Lilo, y con ella descubrió el valor de la familia, del amor incondicional y del hogar. Así te siento yo: como alguien que llegó a mi vida para quedarse, para enseñarme cosas nuevas, para compartir lo bueno y también lo difícil. Como Stitch encontró su familia perfecta con Lilo, tú has encontrado un lugar único y especial en mi corazón, uno que nadie más podría ocupar.
            </p>

            <p className="mb-6">
              Cada momento contigo es un regalo que guardo con cariño. Desde las risas más pequeñas hasta las conversaciones profundas, desde los abrazos inesperados hasta esas miradas que lo dicen todo. Tu risa, tu forma de ver el mundo, tu nobleza, tu creatividad, tu ternura… todo en ti es extraordinario. Eres una persona de esas que no se encuentran todos los días, alguien que deja huella sin siquiera proponérselo. Por eso, en este nuevo año de vida, deseo para ti aventuras increíbles, momentos mágicos, sueños alcanzados y una felicidad que te abrace todos los días.
            </p>

            <p className="mb-6">
              Y si alguna vez lo olvidas, aquí estoy para recordártelo: eres fuerte, eres valiente, eres inteligente y tienes un corazón precioso. Tienes el poder de transformar lo simple en algo inolvidable y de hacer sentir bien a quienes te rodean solo con tu presencia. Como dice Stitch: <strong>"Ohana significa familia, y la familia nunca se abandona ni se olvida"</strong>. Tú eres mi ohana, no porque lo diga una frase bonita, sino porque te siento así en lo más profundo de mí. No importa la distancia, el tiempo o las circunstancias… siempre estaré aquí para ti.
            </p>

            <p className="mb-6">
              Feliz cumpleaños, mi persona especial. Gracias por existir, por ser tú, por dejarme compartir este viaje de la vida a tu lado. Ojalá este día esté a tu altura, y que sepas —hoy más que nunca— lo mucho que vales y lo muchísimo que te quiero.
            </p>
            
            <p className="text-stitch-purple font-bold text-xl text-center mt-8">
              ¡Que tengas el cumpleaños más mágico del universo! 🌟✨
            </p>
            
            <p className="text-right mt-6 italic">
              Con todo mi amor,<br />
              <span className="font-pacifico text-stitch-pink text-xl">Tu persona especial 💕</span>
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-20 px-5 gradient-stitch-gallery text-white">
        <div className="container mx-auto">
          <h2 className="font-pacifico text-5xl text-center mb-12 drop-shadow-sm">
            Galería de Momentos
          </h2>
          
          <ImageModal images={[
            {
              src: "/attached_assets/8e96e2d8-840f-4282-ae10-6118fdfb9cd8_1752378561915.jpeg",
              alt: "Momento especial 1",
              caption: "Momentos especiales 💕"
            },
            {
              src: "/attached_assets/fb09903d-7228-4755-95fb-250ebc1d8548_1752378561916.jpeg",
              alt: "Momento especial 2", 
              caption: "Recuerdos hermosos 😊"
            },
            {
              src: "/attached_assets/2d8167b8-4176-4410-ab1c-99dc516070a5_1752378561916.jpeg",
              alt: "Momento especial 3",
              caption: "Aventuras juntos 🌅"
            },
            {
              src: "/attached_assets/c54910e3-7eb3-4955-b397-25c92dbdd0d9_1752378561917.jpeg",
              alt: "Momento especial 4",
              caption: "Momentos únicos 🌸"
            },
            {
              src: "/attached_assets/4c5548dc-599f-48ce-9782-65eaffef4381_1752378561917.jpeg",
              alt: "Momento especial 5",
              caption: "Diversión sin límites 🎉"
            },
            {
              src: "/attached_assets/a2409861-ff22-4267-8c55-40796089bc88_1752378561917.jpeg",
              alt: "Momento especial 6",
              caption: "Magia en cada momento ✨"
            },
            {
              src: "/attached_assets/d08ad380-43ba-4cea-9c90-372124e6197b_1752378561917.jpeg",
              alt: "Momento especial 7",
              caption: "Tesoros del corazón 💎"
            }
          ]} />
        </div>
      </section>

      {/* Compliments Generator */}
      <section id="compliments" className="py-20 px-5 bg-blue-50">
        <div className="container mx-auto max-w-2xl">
          <h2 className="font-pacifico text-5xl text-stitch-purple text-center mb-12 drop-shadow-sm">
            Generador de Cumplidos
          </h2>
          
          <ComplimentsGenerator />
        </div>
      </section>

      {/* Poem Generator */}
      <section id="poems" className="py-20 px-5 bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="container mx-auto max-w-4xl">
          <PoemGenerator />
        </div>
      </section>

      {/* Special Memories */}
      <section id="memories" className="py-20 px-5 gradient-stitch-memories text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-pacifico text-5xl text-center mb-12 drop-shadow-sm">
            Recuerdos Especiales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h3 className="font-pacifico text-2xl mb-4 text-stitch-pink">Primera vez que nos conocimos</h3>
              <p className="leading-relaxed">
                Recuerdo perfectamente el día que llegaste a mi vida. Tu sonrisa iluminó todo y supe inmediatamente que eras alguien especial. Desde ese momento, cada día ha sido una nueva aventura contigo.
              </p>
            </div>
            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h3 className="font-pacifico text-2xl mb-4 text-stitch-pink">Nuestra aventura favorita</h3>
              <p className="leading-relaxed">
                Esa vez que decidimos ser espontáneos y salir sin plan alguno. Terminamos riéndonos por horas, creando recuerdos que atesoraré para siempre. Esos momentos simples son los más mágicos.
              </p>
            </div>
            

            
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h3 className="font-pacifico text-2xl mb-4 text-stitch-pink">Momento de apoyo</h3>
              <p className="leading-relaxed">
                Cuando las cosas se pusieron difíciles, tu fortaleza me inspiró. Ver cómo superas los obstáculos con una sonrisa me recuerda lo afortunado que soy de tenerte en mi vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Celebration */}
      <section className="py-20 px-5 gradient-stitch-final text-white text-center">
        <div className="container mx-auto">
          <h2 className="font-pacifico text-6xl mb-8 drop-shadow-lg">
            ¡Que vivas muchos años más!
          </h2>
          
          <p className="text-2xl mb-12 font-quicksand">
            Hoy celebramos tu vida, tu alegría y todo lo maravilloso que eres ✨
          </p>
          
          <button 
            onClick={handleCelebration}
            className="bg-white text-stitch-purple font-bold py-4 px-12 rounded-full text-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
          >
            <i className="fas fa-birthday-cake mr-3"></i>
            ¡Celebremos! 🎉
          </button>
          
          <div className="mt-16 font-pacifico text-3xl">
            <p>Con amor infinito,</p>
            <p className="text-stitch-pink text-4xl mt-4">Tu persona especial 💕</p>
          </div>
        </div>
      </section>
    </div>
  );
}
