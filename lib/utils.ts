import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// shadcn's class-name helper, used by components added from shadcn registries
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
