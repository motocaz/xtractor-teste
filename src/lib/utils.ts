import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatFileName = (fileName: string, maxLength: number = 20): string => {
    if (fileName.length <= maxLength) return fileName
    const extension = fileName.split('.').pop()
    if (!extension) return fileName.substring(0, maxLength - 3) + '...'
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'))
    const truncatedName = nameWithoutExt.substring(0, maxLength - extension.length - 4)
    return `${truncatedName}...${extension}`
}
