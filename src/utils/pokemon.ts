import { TYPE_EFFECTIVENESS } from '../constants/pokemon'

export function getTypeEffectiveness(attackType: string, defenseType: string): number {
  return TYPE_EFFECTIVENESS[attackType]?.[defenseType] ?? 1
}

export function getMoveCategoryColor(category: string | null): string {
  switch (category) {
    case 'physical':
      return 'bg-orange-500'
    case 'special':
      return 'bg-blue-500'
    case 'status':
      return 'bg-gray-500'
    default:
      return 'bg-slate-600'
  }
}

export function formatPrice(cost: number): string {
  if (cost === 0) return 'Not sold'
  return `₽${cost.toLocaleString()}`
}

export function formatName(name: string): string {
  return name.replace(/-/g, ' ')
}

export function formatPokemonId(id: number): string {
  return String(id).padStart(3, '0')
}
