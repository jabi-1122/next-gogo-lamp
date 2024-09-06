import { useState, useCallback } from 'react'

export const useRandomDescription = () => {
  const messages = [
    '…信じるか信じないなら、信じないことをお勧めするよ',
    'お前の脳みそは飾り物か？',
    'あ、これは無理くさい',
    'こんなものに頼らないといけないなんてな…',
    'この結果を真に受けるお前が心配だ',
    'さぁ頑張っていこう',
    'きっと良いことあるよ',
    '明日は晴れるかな',
    'ねじりが足らんよねじりが！',
    'ん？今無音スタートじゃなかった？',
  ]

  const [descriptionMessage, setDescriptionMessage] = useState('')

  const getRandomDescription = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * messages.length)
    const newMessage = messages[randomIndex]
    setDescriptionMessage(newMessage)
    return newMessage
  }, [])

  return { descriptionMessage, getRandomDescription }
}

export const useRandomCrazeMessage = () => {
  const messages = [
    'まだやるの？',
    'もう帰ったほうがいい',
    'もう当たらないよ、当たらない',
    '帰ってシコって寝ろ（女性だったらごめんなさい）',
    'とりあえず一服して頭を冷やせ',
    '自分の生活を見直した方がいいぞ',
    '財布の中身は大丈夫か？',
    'お前の同級生は今この時間も頑張ってるぞ',
  ]

  const [crazyMessage, setMessage] = useState('')

  const getRandomCrazeMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * messages.length)
    const newMessage = messages[randomIndex]
    setMessage(newMessage)
    return newMessage
  }, [])

  return { crazyMessage, getRandomCrazeMessage }
}
