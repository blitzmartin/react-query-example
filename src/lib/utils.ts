import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const randomId = () => {
  return Math.floor(Math.random() * 100000)
}

export const capitalizeFirstLetter = (sentence: string) => {
  if (sentence.length === 0) {
    return sentence
  }
  return sentence.charAt(0).toUpperCase() + sentence.slice(1)
}
