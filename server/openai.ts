import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface PoemRequest {
  theme: string;
}

const themePrompts = {
  birthday: "un poema de cumpleaños lleno de amor y celebración, destacando lo especial que es Dallana en este día",
  friendship: "un poema sobre la amistad profunda y el cariño especial, celebrando el vínculo único con Dallana",
  stitch: "un poema inspirado en Stitch y el concepto de Ohana (familia), relacionándolo con Dallana y el amor familiar",
  memories: "un poema sobre los recuerdos hermosos y momentos especiales compartidos con Dallana",
  dreams: "un poema sobre sueños, esperanzas y el futuro brillante que le espera a Dallana",
  adventure: "un poema sobre aventuras, descubrimientos y la emoción de vivir nuevas experiencias con Dallana"
};

// Fallback poems when API is not available
const fallbackPoems = {
  birthday: `Querida Dallana, en tu día especial,
las estrellas brillan con luz celestial,
tu sonrisa ilumina cada rincón,
llenando de alegría nuestro corazón.

Como Stitch encontró su familia,
tú llegaste a mi vida con maravilla,
trayendo colores donde antes había gris,
siendo mi tesoro, mi mayor feliz.

Cada año que cumples es una celebración,
de tu bondad, tu gracia y tu compasión,
que este nuevo año te traiga mil aventuras,
y que tus sueños se vuelvan más seguros.

¡Feliz cumpleaños, mi querida Dallana!`,

  friendship: `En el jardín de la vida, Dallana,
tú eres la flor más temprana,
con pétalos de risa y hojas de ternura,
eres mi amistad más pura.

Como dos almas que se encontraron,
nuestros caminos se entrelazaron,
creando memorias doradas,
en aventuras compartidas.

Tu corazón noble y sincero,
es mi refugio verdadero,
donde encuentro paz y calma,
en la música de tu alma.

Gracias por ser mi compañía,
mi luz en cada día.`,

  stitch: `"Ohana significa familia", dice Stitch,
y tú, Dallana, eres mi match,
una familia del corazón elegida,
que nunca se abandona ni se olvida.

Como Lilo y su azul amigo,
tenemos un lazo de abrigo,
donde el amor trasciende la distancia,
y florece en cada circunstancia.

Eres mi pequeño milagro azul,
mi Stitch en forma de ángel, es veraz,
con tu travesura y tu dulzura,
haces mi vida una aventura.

Ohana para siempre seremos,
y juntos creceremos.`,

  memories: `En las páginas del tiempo, Dallana,
están escritas memorias de porcelana,
cada momento contigo es un tesoro,
que guardo en mi corazón como oro.

Recuerdo tu primera sonrisa,
como una suave brisa,
que llegó a cambiar mi mundo,
con amor tan profundo.

Las risas compartidas en tardes de sol,
los secretos susurrados en un rincón,
cada abrazo, cada conversación,
son diamantes en mi colección.

Estos recuerdos son mi fortuna,
mi luz bajo cualquier luna.`,

  dreams: `Dallana, pequeña soñadora,
el futuro te espera cada hora,
con brazos abiertos y esperanza,
para cumplir cada añoranza.

Tus sueños son mariposas de colores,
volando entre risas y amores,
cada uno más hermoso que el anterior,
pintando tu destino con primor.

No hay meta que no puedas alcanzar,
ni estrella que no puedas tocar,
porque tienes un corazón valiente,
y un alma verdaderamente ardiente.

Vuela alto, mi dulce niña,
que el mundo es tu montaña.`,

  adventure: `Dallana, compañera de aventuras,
juntos exploramos alturas,
desde montañas de almohadas,
hasta islas imaginadas.

Cada día contigo es un viaje,
lleno de magia y coraje,
donde descubrimos nuevos mundos,
en momentos tan profundos.

Eres mi co-piloto valiente,
en esta vida emocionante,
donde cada risa es un mapa,
y cada abrazo, una etapa.

Sigamos explorando juntos,
creando recuerdos únicos.`
};

export async function generatePoem(request: PoemRequest): Promise<{ poem: string }> {
  try {
    const themePrompt = themePrompts[request.theme as keyof typeof themePrompts] || themePrompts.birthday;
    
    const prompt = `Crea ${themePrompt}. 

Características del poema:
- Debe ser en español
- Entre 4-6 estrofas
- Tono cálido, cariñoso y emotivo
- Incluye el nombre "Dallana" de manera natural
- Debe sentirse personal y sincero
- Usa un lenguaje poético pero accesible
- Evita clichés excesivos
- Que transmita amor genuino y aprecio

El poema debe ser original, hermoso y emotivo.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Eres un poeta experto que crea poemas emotivos y personales en español. Tus poemas son sinceros, cálidos y llenos de sentimiento genuino."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.8,
    });

    const poem = response.choices[0].message.content;
    
    if (!poem) {
      throw new Error("No se pudo generar el poema");
    }

    return { poem };
  } catch (error) {
    console.error("Error generating poem with AI, using fallback:", error);
    
    // Use fallback poem when API fails
    const fallbackPoem = fallbackPoems[request.theme as keyof typeof fallbackPoems] || fallbackPoems.birthday;
    return { poem: fallbackPoem };
  }
}