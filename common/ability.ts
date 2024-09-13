import { user } from "~/utils/auth-data";

export function can(model: string, ability: string): boolean {
  const permission = user?.value?.permissions?.[model] || []
  return permission.includes(ability)
}