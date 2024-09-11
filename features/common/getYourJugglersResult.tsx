type DataRank = 1 | 2 | 3 // 1: 小, 2: 中, 3: 大
type Setting = 1 | 2 | 3 | 4 | 5 | 6

interface JaguarEstimation {
  estimatedSetting: Setting
  dataRank: DataRank
  nextBonusAt: number
}

const settingProbabilities: number[][] = [
  [0.25, 0.25, 0.3, 0.2, 0.05, 0.05],
  [0.3, 0.26, 0.26, 0.17, 0.04, 0.04],
  [0.35, 0.27, 0.22, 0.14, 0.03, 0.03],
  [0.4, 0.28, 0.18, 0.11, 0.03, 0.02],
  [0.45, 0.29, 0.14, 0.08, 0.03, 0.01],
  [0.5, 0.3, 0.1, 0.06, 0.03, 0.01],
]

export const getYourJugglersResult = (
  totalSpins: number,
  bigBonusCount: number,
  regularBonusCount: number
): JaguarEstimation => {
  const totalBonusCount = bigBonusCount + regularBonusCount
  const bonusRate = (totalBonusCount / totalSpins) * 1000

  let estimatedSetting: Setting = 1
  switch (true) {
    case bonusRate >= 33:
      estimatedSetting = 6
      break
    case bonusRate >= 31:
      estimatedSetting = 5
      break
    case bonusRate >= 29:
      estimatedSetting = 4
      break
    case bonusRate >= 27:
      estimatedSetting = 3
      break
    case bonusRate >= 25:
      estimatedSetting = 2
      break
  }

  const dataRank: DataRank = totalSpins > 2000 ? 3 : totalSpins > 1000 ? 2 : 1

  const adjustSetting = (setting: Setting, amount: number): Setting =>
    Math.max(1, Math.min(6, setting + amount)) as Setting

  const randomAdjustment = Math.random()
  switch (dataRank) {
    case 2:
      if (randomAdjustment < 0.33)
        estimatedSetting = adjustSetting(estimatedSetting, -1)
      else if (randomAdjustment < 0.66)
        estimatedSetting = adjustSetting(estimatedSetting, 1)
      break
    case 1:
      switch (true) {
        case randomAdjustment < 0.2:
          estimatedSetting = adjustSetting(estimatedSetting, 2)
          break
        case randomAdjustment < 0.4:
          estimatedSetting = adjustSetting(estimatedSetting, 1)
          break
        case randomAdjustment < 0.6:
          estimatedSetting = adjustSetting(estimatedSetting, -1)
          break
        case randomAdjustment < 0.8:
          estimatedSetting = adjustSetting(estimatedSetting, -2)
          break
      }
      break
  }

  const currentSpinRange = Math.min(Math.floor(totalSpins / 200), 5)
  let nextBonusAt = totalSpins
  let cumulativeProbability = 0
  const randomValue = Math.random()

  for (let i = currentSpinRange; i < 6; i++) {
    cumulativeProbability += settingProbabilities[estimatedSetting - 1][i]
    if (randomValue <= cumulativeProbability) {
      const rangeStart = i * 200 + 1
      const rangeEnd = (i + 1) * 200
      nextBonusAt =
        Math.floor(Math.random() * (rangeEnd - rangeStart + 1)) + rangeStart
      break
    }
  }

  if (nextBonusAt === totalSpins) {
    nextBonusAt = Math.floor(Math.random() * 400) + 1201
  }

  return { estimatedSetting, dataRank, nextBonusAt }
}
