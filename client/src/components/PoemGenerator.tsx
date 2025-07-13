import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const poemThemes = [
  { id: 'birthday', label: 'Cumpleaños', emoji: '🎂' },
  { id: 'friendship', label: 'Amistad', emoji: '💖' },
  { id: 'stitch', label: 'Stitch & Ohana', emoji: '💙' },
  { id: 'memories', label: 'Recuerdos', emoji: '✨' },
  { id: 'dreams', label: 'Sueños', emoji: '🌟' },
  { id: 'adventure', label: 'Aventuras', emoji: '🌈' }
];

export default function PoemGenerator() {
  const [selectedTheme, setSelectedTheme] = useState<string>('birthday');
  const [currentPoem, setCurrentPoem] = useState<string>('');

  const generatePoemMutation = useMutation({
    mutationFn: async (theme: string) => {
      try {
        const response = await apiRequest('POST', `/api/generate-poem`, { theme });
        const data = await response.json();
        return data.poem;
      } catch (error) {
        console.error('Error in poem generation:', error);
        throw error;
      }
    },
    onSuccess: (poem) => {
      setCurrentPoem(poem);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    }
  });

  const handleGeneratePoem = () => {
    generatePoemMutation.mutate(selectedTheme);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-pacifico text-5xl text-stitch-purple mb-4 drop-shadow-sm">
          Generador de Poemas
        </h2>
        <p className="text-lg text-gray-600">
          Elige un tema y crea un poema especial para Dallana
        </p>
      </div>

      {/* Theme Selection */}
      <Card className="mb-8 shadow-lg border-2 border-stitch-pink/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-stitch-purple">
            <Sparkles className="w-5 h-5" />
            Elige un Tema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {poemThemes.map((theme) => (
              <Badge
                key={theme.id}
                variant={selectedTheme === theme.id ? "default" : "outline"}
                className={`p-3 cursor-pointer transition-all hover:scale-105 text-center ${
                  selectedTheme === theme.id 
                    ? 'bg-stitch-purple text-white shadow-lg' 
                    : 'hover:bg-stitch-pink/10 border-stitch-pink'
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <span className="text-lg mr-2">{theme.emoji}</span>
                {theme.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <div className="text-center mb-8">
        <Button
          onClick={handleGeneratePoem}
          disabled={generatePoemMutation.isPending}
          className="bg-gradient-to-r from-stitch-blue to-stitch-purple hover:from-stitch-purple hover:to-stitch-pink text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
        >
          {generatePoemMutation.isPending ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              Creando Magia...
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 mr-2" />
              Generar Poema
            </>
          )}
        </Button>
      </div>

      {/* Generated Poem Display */}
      {currentPoem && (
        <Card className="shadow-xl border-2 border-stitch-pink/30 bg-gradient-to-br from-white to-pink-50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-stitch-purple">
              <Sparkles className="w-6 h-6" />
              Tu Poema Especial
              <Sparkles className="w-6 h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-8 rounded-lg shadow-inner border border-stitch-pink/20">
              <div className="text-center text-gray-800 text-lg leading-relaxed whitespace-pre-line font-serif">
                {currentPoem}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {generatePoemMutation.error && (
        <Card className="mt-4 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600 text-center">
              Oops, hubo un problema generando el poema. ¡Inténtalo de nuevo!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}