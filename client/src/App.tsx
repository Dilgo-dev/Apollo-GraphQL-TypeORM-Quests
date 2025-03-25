import { useState } from 'react';
import { useQuery } from "@apollo/client";
import { GET_CARTOONS } from "./schemas/cartoon.schema";
import { getAllCartoonType } from "./types/cartoon.type";

function App() {
  const { data, loading, error } = useQuery(GET_CARTOONS);
  const [filterGenre, setFilterGenre] = useState("");
  
  const genres = ["Aventure", "Action", "Science-fiction", "Comédie", "Fantastique"];
  
  const getGenreEmoji = (genre: string | undefined) => {
    if (!genre) return "📺";

    const emojiMap = {
      "Aventure": "🌍",
      "Action": "💥",
      "Science-fiction": "🚀",
      "Comédie": "😂",
      "Fantastique": "✨",
      "Sport": "⚽",
      "Mecha": "🤖",
      "Policier": "🕵️",
      "Historique": "📜",
      "Mythologie": "🏛️"
    };

    return emojiMap[genre as keyof typeof emojiMap];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec logo et titre */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-4xl mr-3">📺</span>
            <h1 className="text-3xl font-bold text-indigo-600">CartoonFlix</h1>
          </div>
          <div className="flex space-x-3">
            <button className="p-2 text-gray-500 hover:text-indigo-600 text-xl" title="Favoris">❤️</button>
            <button className="p-2 text-gray-500 hover:text-indigo-600 text-xl" title="Paramètres">⚙️</button>
            <button className="p-2 text-gray-500 hover:text-indigo-600 text-xl" title="Profil">👤</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Bannière héro */}
        <div className="bg-indigo-100 rounded-xl p-8 mb-8 shadow-sm">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">Découvrez les classiques de l'animation ! 🌟</h2>
          <p className="text-indigo-700 mb-4">Explorez notre collection de dessins animés cultes qui ont marqué des générations.</p>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500">🔍</span>
            </span>
            <input
              className="pl-10 pr-4 py-2 w-full md:w-1/2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="Rechercher un dessin animé..."
            />
          </div>
        </div>

        {/* Filtres par genre */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Filtrer par genre 🏷️</h3>
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-4 py-2 rounded-full ${filterGenre === "" ? "bg-indigo-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"} shadow-sm`}
              onClick={() => setFilterGenre("")}
            >
              Tous 🎭
            </button>
            {genres.map((genre) => (
              <button
                key={genre}
                className={`px-4 py-2 rounded-full ${filterGenre === genre ? "bg-indigo-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"} shadow-sm`}
                onClick={() => setFilterGenre(genre)}
              >
                {getGenreEmoji(genre)} {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Contenu principal */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Catalogue Cartoons 🎬</h2>
          
          {/* État de chargement */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin text-4xl">🔄</div>
              <p className="ml-3 text-lg text-gray-600">Chargement...</p>
            </div>
          )}
          
          {/* Affichage des erreurs */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="flex items-center"><span className="text-2xl mr-2">⚠️</span> Oups ! Une erreur est survenue lors du chargement des données.</p>
            </div>
          )}
          
          {/* Grille de cartes */}
          {data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.getCartoons.map((cartoon: getAllCartoonType) => (
                <div key={cartoon.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  {/* Image placeholder */}
                  <div className="h-40 bg-gradient-to-r from-indigo-300 to-purple-300 flex items-center justify-center">
                    <span className="text-5xl">{cartoon.name.charAt(0) === "D" ? "🐉" : 
                                           cartoon.name.charAt(0) === "I" ? "🕵️" : 
                                           cartoon.name.charAt(0) === "G" ? "🤖" : 
                                           cartoon.name.charAt(0) === "L" ? "✨" : 
                                           cartoon.name.charAt(0) === "J" ? "🌟" : 
                                           cartoon.name.charAt(0) === "A" ? "🚀" : 
                                           cartoon.name.charAt(0) === "O" ? "⚽" : 
                                           cartoon.name.charAt(0) === "N" ? "🔫" : 
                                           cartoon.name.charAt(0) === "U" ? "🛸" : "📺"}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{cartoon.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{cartoon.description}</p>
                    <div className="flex justify-between items-center">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Voir plus →
                      </button>
                      <button className="text-gray-400 hover:text-red-500 text-lg">
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-2xl">🏠</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-2xl">ℹ️</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 text-2xl">💌</a>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center md:text-right text-sm text-gray-500">
                &copy; 2025 CartoonFlix. Tous droits réservés. Made with 💜
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;