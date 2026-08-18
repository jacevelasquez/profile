import { Pokemon } from '../../types/pokemon'
import { TYPE_COLORS, STAT_NAMES } from '../../constants/pokemon'
import { formatName, formatPokemonId } from '../../utils/pokemon'

interface PokemonModalProps {
  pokemon: Pokemon | null
  onClose: () => void
}

const MAX_STAT = 255

function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  if (!pokemon) return null

  const primaryType = pokemon.types[0]?.type.name || 'normal'
  const bgColor = TYPE_COLORS[primaryType] || TYPE_COLORS.normal

  console.log(pokemon.sprites)

  const imageUrl =
    pokemon.sprites.other?.['official-artwork']?.front_default ||
    pokemon.sprites.front_default ||
    ''

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl transform transition-all"
        style={{ backgroundColor: bgColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded bg-black/20 text-white flex items-center justify-center hover:bg-black/40 transition-colors"
        >
          ✕
        </button>

        <div className="relative p-6 pb-24">
          <div className="absolute right-0 top-0 w-48 h-48 opacity-10">
          </div>

          <p className="text-white/60 font-bold text-lg">
            {formatPokemonId(pokemon.id)}
          </p>
          <h2 className="text-3xl font-bold text-white capitalize mb-3">
            {formatName(pokemon.name)}
          </h2>

          <div className="flex gap-2">
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="border border-slate-900/20 px-4 py-1.5 rounded text-sm font-semibold text-white capitalize"
                style={{ backgroundColor: TYPE_COLORS[t.type.name] || TYPE_COLORS.normal }}
              >
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <img
              src={imageUrl}
              alt={pokemon.name}
              className="w-48 h-48 object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="bg-slate-900 rounded-t-3xl pt-20 pb-6 px-6">
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">Height</p>
              <p className="text-white font-semibold">{(pokemon.height / 10).toFixed(1)} m</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm">Weight</p>
              <p className="text-white font-semibold">{(pokemon.weight / 10).toFixed(1)} kg</p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-white mb-4">Base Stats</h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex items-center gap-3">
                <span className="text-gray-400 text-sm w-16 text-right">
                  {STAT_NAMES[stat.stat.name] || stat.stat.name}
                </span>
                <span className="text-white font-semibold w-10 text-right">
                  {stat.base_stat}
                </span>
                <div className="flex-1 h-2 bg-slate-700 rounded overflow-hidden">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{
                      width: `${(stat.base_stat / MAX_STAT) * 100}%`,
                      backgroundColor: bgColor,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-700">
            <span className="text-gray-400 text-sm w-16 text-right font-bold">TOTAL</span>
            <span className="text-white font-bold w-10 text-right">
              {pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonModal
