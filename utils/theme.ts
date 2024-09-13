import { useTheme } from 'vuetify'
import { computed } from 'vue'

export function useThemeSwitcher() {
  const theme = useTheme()

  const isDarkMode = computed(() => theme.global.current.value.dark)

  const toggleTheme = () => {
    theme.global.name.value = isDarkMode.value ? 'light' : 'dark'
  }

  return {
    isDarkMode,
    toggleTheme
  }
}
