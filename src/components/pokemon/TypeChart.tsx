import { TYPE_COLORS, ALL_TYPES } from '../../constants/pokemon'
import { getTypeEffectiveness } from '../../utils/pokemon'

function TypeChart() {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <h2 className="text-2xl font-bold text-white mb-2">Type Effectiveness Chart</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Shows how effective attacking types (rows) are against defending types (columns)
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center text-xs font-bold text-white">2×</div>
              <span className="text-gray-300 text-sm">Super Effective</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-500 flex items-center justify-center text-xs font-bold text-yellow-500">½</div>
              <span className="text-gray-300 text-sm">Not Very Effective</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-xs font-bold text-yellow-500">0</div>
              <span className="text-gray-300 text-sm">No Effect</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="w-20 h-10 text-[11px] text-gray-500 text-left align-middle">
                  ATK↓ DEF→
                </th>
                {ALL_TYPES.map((type) => (
                  <th key={type} className="w-10 h-10 p-0.5">
                    <div
                      className="w-full h-full rounded flex items-center justify-center text-[10px] font-bold text-white uppercase"
                      style={{ backgroundColor: TYPE_COLORS[type] }}
                      title={type}
                    >
                      {type.slice(0, 3)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_TYPES.map((attackType) => (
                <tr key={attackType}>
                  <td className="w-20 h-10 p-0.5">
                    <div
                      className="w-full h-full rounded text-[10px] font-bold text-white capitalize flex items-center justify-center"
                      style={{ backgroundColor: TYPE_COLORS[attackType] }}
                    >
                      {attackType}
                    </div>
                  </td>
                  {ALL_TYPES.map((defenseType) => {
                    const effectiveness = getTypeEffectiveness(attackType, defenseType)
                    let bgColor = 'bg-slate-700'
                    let textColor = 'text-slate-600'
                    let displayText = ''

                    if (effectiveness === 2) {
                      bgColor = 'bg-green-500'
                      textColor = 'text-white'
                      displayText = '2×'
                    } else if (effectiveness === 0.5) {
                      bgColor = 'bg-red-500'
                      textColor = 'text-yellow-500'
                      displayText = '½'
                    } else if (effectiveness === 0) {
                      bgColor = 'bg-slate-800'
                      textColor = 'text-yellow-500'
                      displayText = '0'
                    }

                    return (
                      <td key={defenseType} className="w-10 h-10 p-0.5">
                        <div
                          className={`w-full h-full rounded flex items-center justify-center text-xs font-bold ${bgColor} ${textColor}`}
                        >
                          {displayText}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TypeChart
