import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// Function to calculate the time difference
export const timeSpentSince = (date: Date): string => {
  const now = new Date();
  let diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
  diffInSeconds -= years * (60 * 60 * 24 * 365);

  const months = Math.floor(diffInSeconds / (60 * 60 * 24 * 30));
  diffInSeconds -= months * (60 * 60 * 24 * 30);

  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  diffInSeconds -= days * (60 * 60 * 24);

  const hours = Math.floor(diffInSeconds / (60 * 60));
  diffInSeconds -= hours * (60 * 60);

  const minutes = Math.floor(diffInSeconds / 60);
  diffInSeconds -= minutes * 60;

  const seconds = diffInSeconds;

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  return "just now";
};

export const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};