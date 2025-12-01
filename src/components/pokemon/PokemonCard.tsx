import { Pokemon } from '../../types/pokemon'
import { TYPE_COLORS } from '../../constants/pokemon'
import { formatName, formatPokemonId } from '../../utils/pokemon'

interface PokemonCardProps {
  pokemon: Pokemon
  onClick: (pokemon: Pokemon) => void
}

function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const imageUrl =
    pokemon.sprites.other?.['home']?.front_default ||
    pokemon.sprites.front_default ||
    ''

  return (
    <div
      onClick={() => onClick(pokemon)}
      className="bg-slate-700 relative rounded-2xl p-4 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden group"
    >
      <div className="absolute top-2 right-3 text-white/40 font-bold text-lg">
        {formatPokemonId(pokemon.id)}
      </div>

      <div className="relative z-10 flex justify-center mb-2">
        <img
          src={imageUrl}
          alt={pokemon.name}
          className="w-28 h-28 object-contain drop-shadow-lg group-hover:drop-shadow-2xl transition-all"
          loading="lazy"
        />
      </div>

      <div className="relative z-10">
        <h3 className="text-white font-bold text-lg capitalize text-center mb-2">
          {formatName(pokemon.name)}
        </h3>

        <div className="flex justify-center gap-2">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-3 py-1 rounded-full text-xs font-semibold text-white capitalize"
              style={{ backgroundColor: TYPE_COLORS[t.type.name] || TYPE_COLORS.normal }}
            >
              {t.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
