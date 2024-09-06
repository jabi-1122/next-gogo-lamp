'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  useRandomCrazeMessage,
  useRandomDescription,
} from '@/hooks/random-message'
import { GOGOLamp, GOGOLamp2 } from '@/lib/svg'

const formSchema = z
  .object({
    totalSpins: z.coerce
      .number()
      .int()
      .min(0, '0以上の数字を入力してください。')
      .max(100000, '100,000以下の数字を入力してください'),
    bigBonusCount: z.coerce
      .number()
      .int()
      .min(0, '0以上の数字を入力してください。')
      .max(100, '100以下の値を入力してください'),
    regularBonusCount: z.coerce
      .number()
      .int()
      .min(0, '0以上の数字を入力してください。')
      .max(100, '100以下の値を入力してください'),
    currentSpins: z.coerce
      .number()
      .int()
      .min(0, '0以上の数字を入力してください。')
      .max(100000, '100,000以下の値を入力してください'),
  })
  .refine(
    (data) => {
      return (
        data.totalSpins >=
        data.bigBonusCount + data.regularBonusCount + data.currentSpins
      )
    },
    {
      message:
        '総回転数は、ビッグボーナス回数、レギュラーボーナス回数、現在の回転数の合計以上である必要があります',
      path: ['totalSpins'],
    }
  )

type FormValues = z.infer<typeof formSchema>

export default function JackpotPredictor() {
  const [prediction, setPrediction] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)
  const [isCrazy, setIsCrazy] = useState(false)
  const [isLit, setIsLit] = useState<boolean>(false)

  const { descriptionMessage, getRandomDescription } = useRandomDescription()
  const { crazyMessage, getRandomCrazeMessage } = useRandomCrazeMessage()

  useEffect(() => {
    const checkAndUpdateSubmitCount = () => {
      const lastAccessDate = localStorage.getItem('lastAccessDate')
      const currentDate = new Date().toDateString()
      let count = 0

      if (lastAccessDate !== currentDate) {
        // 日付が変わっていた場合、submitCountをリセット
        localStorage.setItem('submitCount', '0')
      } else {
        // 同じ日の場合、保存されているsubmitCountを読み込む
        const storedCount = localStorage.getItem('submitCount')
        if (storedCount) {
          count = parseInt(storedCount, 10)
        }
      }

      // submitCountを設定
      setSubmitCount(count)

      // 最後のアクセス日時を更新
      localStorage.setItem('lastAccessDate', currentDate)
    }

    // 初回実行
    checkAndUpdateSubmitCount()

    // 10分ごとにチェック
    const intervalId = setInterval(checkAndUpdateSubmitCount, 600000)

    // クリーンアップ関数
    return () => clearInterval(intervalId)
  }, [])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalSpins: 0,
      bigBonusCount: 0,
      regularBonusCount: 0,
      currentSpins: 0,
    },
  })

  const items = [
    {
      name: 'totalSpins' as const,
      label: '総回転数',
      placeholder: '例: 1000',
    },
    {
      name: 'bigBonusCount' as const,
      label: 'ビッグボーナス回数',
      placeholder: '例: 5',
    },
    {
      name: 'regularBonusCount' as const,
      label: 'レギュラーボーナス回数',
      placeholder: '例: 10',
    },
    {
      name: 'currentSpins' as const,
      label: '現在の回転数',
      placeholder: '例: 50',
    },
  ]

  const incrementSubmitCount = useCallback(() => {
    setSubmitCount((prevCount) => {
      const newCount = prevCount + 1
      localStorage.setItem('submitCount', newCount.toString())
      return newCount
    })
  }, [])

  const checkIsCrazy = useCallback(() => {
    if (submitCount >= 3 && Math.random() < 0.15) {
      setIsCrazy(true)
      return true
    }
    setIsCrazy(false)
    return false
  }, [submitCount])

  const onSubmit = useCallback(
    (values: FormValues) => {
      // TODO ここに予測ロジックを実装
      const dummyPrediction = Math.floor(Math.random() * 100) + 1
      incrementSubmitCount()
      checkIsCrazy()
      setPrediction(dummyPrediction)
      getRandomDescription()
      getRandomCrazeMessage()
      setIsDialogOpen(true)

      setTimeout(() => {
        setIsLit(true)
      }, 1000)

      // isCrazeじゃない時だけフォームをリセット
      if (!isCrazy) {
        form.reset({
          totalSpins: 0,
          bigBonusCount: 0,
          regularBonusCount: 0,
          currentSpins: 0,
        })
      }
    },
    [incrementSubmitCount, checkIsCrazy, form]
  )

  useEffect(() => {
    if (!isDialogOpen) {
      setIsLit(false)
    }
  }, [isDialogOpen])

  return (
    <div className="flex content-center items-center h-dvh">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl text-black w-full sm:w-[400px]">
        <h1 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
          <GOGOLamp />
          <span>次、いつペカる？</span>
          <GOGOLamp />
        </h1>
        <h2 className="font-bold mb-4 text-center">
          - そのGOGOランプに愛を込めて -
        </h2>
        <div className="flex content-center">
          <h3 className="text-xs mb-4">
            これは今打とうとしているジャグラーが次いつ当たるのか、神やピエロに祈るくらいならアプリに聞こうの精神で作者が自分のためだけに
            <span className="text-red-600 font-bold">超適当に</span>
            作成したものです。
            <br />
            <span className="text-red-600 font-bold">
              絶対に信用しないでください。
              <br />
              算出した結果は何一つ保証するものではありません。
            </span>
          </h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {items.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={field.placeholder}
                        {...formField}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              type="submit"
              className="w-full mt-12 font-bold text-xl p-6"
            >
              予測する
            </Button>
          </form>
        </Form>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-[95%] max-w-[95%] sm:w-[90%] sm:max-w-[90%] md:w-[80%] md:max-w-[80%] lg:w-[70%] lg:max-w-[70%] bg-white text-black rounded-lg">
            <DialogTitle>{isCrazy ? '' : '結果'}</DialogTitle>
            <DialogDescription>
              {isCrazy ? '' : descriptionMessage}
            </DialogDescription>
            {isCrazy ? (
              <div className="flex content-center items-center">
                <div>
                  <p className="text-4xl text-red-600 font-bold">
                    お前、正気か？
                  </p>
                  <p className="mt-4">{crazyMessage}</p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-lg font-semibold">
                  次のペカ！は
                  <span className="text-2xl text-blue-600">{prediction}</span>
                  回転以内だ！……といいね
                </p>
                <div className="flex justify-center">
                  <GOGOLamp2 isLit={isLit} />
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
