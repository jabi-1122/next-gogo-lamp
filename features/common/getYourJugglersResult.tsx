export type DataRank = 1 | 2 | 3
export type Setting = 1 | 2 | 3 | 4 | 5 | 6

export interface JugglerResult {
  estimatedSetting: Setting
  dataRank: DataRank
  nextBonusAt: number
}

export const settingProbabilities: number[][] = [
  [0.25, 0.25, 0.3, 0.2, 0.05, 0.05],
  [0.3, 0.26, 0.26, 0.17, 0.04, 0.04],
  [0.35, 0.27, 0.22, 0.14, 0.03, 0.03],
  [0.4, 0.28, 0.18, 0.11, 0.03, 0.02],
  [0.45, 0.29, 0.14, 0.08, 0.03, 0.01],
  [0.5, 0.3, 0.1, 0.06, 0.03, 0.01],
]

const getDataRank = (totalSpins: number): DataRank =>
  totalSpins > 2000 ? 3 : totalSpins > 1000 ? 2 : 1

const estimateSetting = (
  totalSpins: number,
  bigBonusCount: number,
  regularBonusCount: number
): Setting => {
  const totalBonusCount = bigBonusCount + regularBonusCount
  const totalBonusRate = totalSpins / totalBonusCount
  const bigBonusRate = totalSpins / bigBonusCount
  const regBonusRate = totalSpins / regularBonusCount

  const thresholds = [
    { setting: 6, total: 127.5, big: 255.0, reg: 255.0 },
    { setting: 5, total: 128.5, big: 259.0, reg: 255.0 },
    { setting: 4, total: 142.2, big: 259.0, reg: 315.1 },
    { setting: 3, total: 148.6, big: 269.7, reg: 331.0 },
    { setting: 2, total: 161.0, big: 269.7, reg: 399.6 },
    { setting: 1, total: 168.5, big: 273.1, reg: 439.8 },
  ]

  const margin = 1.05 // 5%のマージン

  for (const threshold of thresholds) {
    if (
      totalBonusRate <= threshold.total * margin &&
      bigBonusRate <= threshold.big * margin &&
      regBonusRate <= threshold.reg * margin
    ) {
      return threshold.setting as Setting
    }
  }

  return 1
}

const adjustSetting = (setting: Setting, dataRank: DataRank): Setting => {
  const adjust = (amount: number) =>
    Math.max(1, Math.min(6, setting + amount)) as Setting
  const random = Math.random()

  if (dataRank === 2) {
    if (random < 0.33) return adjust(-1)
    if (random < 0.66) return adjust(1)
  } else if (dataRank === 1) {
    if (random < 0.2) return adjust(1)
    if (random < 0.4) return adjust(2)
    if (random < 0.6) return adjust(-1)
    if (random < 0.8) return adjust(-2)
  }
  return setting
}

const estimateNextBonus = (setting: Setting): number => {
  const random = Math.random()
  let cumulativeProbability = 0

  for (let i = 0; i < 6; i++) {
    cumulativeProbability += settingProbabilities[setting - 1][i]
    if (random <= cumulativeProbability) {
      const rangeStart = i * 200 + 1
      const rangeEnd = (i + 1) * 200
      return (
        Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart
      )
    }
  }

  return 1200
}

export const getYourJugglersResult = (
  totalSpins: number,
  bigBonusCount: number,
  regularBonusCount: number
): JugglerResult => {
  const dataRank = getDataRank(totalSpins)
  const estimatedSetting = estimateSetting(
    totalSpins,
    bigBonusCount,
    regularBonusCount
  )

  const adjustedSetting =
    dataRank === 3
      ? estimatedSetting
      : adjustSetting(estimatedSetting, dataRank)

  const nextBonusAt = estimateNextBonus(adjustedSetting)

  return { estimatedSetting: adjustedSetting, dataRank, nextBonusAt }
}
