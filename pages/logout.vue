<script setup lang="ts">
import AuthService from '../services/auth-service'
import {useRouter} from 'nuxt/app'

const authService = AuthService
authService.deleteAuthentication()
const router = useRouter()
const localePath = useLocalePath()
router.push({path: localePath('/login')})
</script>
