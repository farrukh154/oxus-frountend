<template>
  <workSpace>
    <template v-slot:rootContext>
      <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
          <v-list-item class="d-flex justify-center">
            <img src="/assets/images/brand/logo_tj.png" alt="Oxus" width="135" />
          </v-list-item>
          <v-divider />
          <v-list-item
            v-if="user.is_swift_loan_user || user.is_superuser"
            link
            title=""
            :to="localePath('/request-credit')"
          >
            <v-icon :icon="mdiAccountCreditCardOutline" class="mr-2" size="small" />
            {{ $t('swift.loan') }}
          </v-list-item>
          <v-list-item v-if="can('users', 'view-helpdesk-menu-item')" link title="" :to="localePath('/support')">
            <v-icon :icon="mdiAccountWrenchOutline" class="mr-2" size="small" />
            {{ $t('nav.Supportservice') }}
          </v-list-item>
          <v-list-item v-if="can('users', 'view-report-menu-item')" link title="" :to="localePath('/reports')">
            <v-icon :icon="mdiFinance" class="mr-2" size="small" />
            {{ $t('bar2.btn') }}
          </v-list-item>
          <v-list-item v-if="can('users', 'view-blacklist-menu-item')" link title="" :to="localePath('/blacklist')">
            <v-icon :icon="mdiTextBoxSearchOutline" class="mr-2" size="small" />
            {{ $t('blacklist.search') }}
          </v-list-item>
          <v-list-item v-if="can('users', 'view-terminal-menu-item')" link :to="localePath('/repayment-terminal')">
            <v-icon :icon="mdiCreditCardSearchOutline" class="mr-2" size="small" />
            {{ $t('terminal.repayments') }}
          </v-list-item>
          <v-list-item v-if="can('users', 'view-crif-menu-item')" link title="" :to="localePath('/crif')">
            <v-icon :icon="mdiAccountSearchOutline" class="mr-2" size="small" />
            {{ $t('crif.name_crif') }}
          </v-list-item>

          <v-list-item v-if="can('users', 'view-documnet-menu-item')" link title="" :to="localePath('/document')">
            <v-icon :icon="mdiFileDocumentOutline" class="mr-2" size="small" />
            {{ $t('document.name') }}
          </v-list-item>

          <v-list-item v-if="can('users', 'view-settings-menu-item')" link title="" :to="localePath('/settings')">
            <v-icon :icon="mdiCogOutline" class="mr-2" size="small" />
            {{ $t('settings.name') }}
          </v-list-item>

          <v-list-item v-if="can('users', 'view-loan-application-menu-item')" link title="" :to="localePath('/request-credit-list')">
            <v-icon :icon="mdiListBoxOutline" class="mr-2" size="small" />
            {{ $t('requestCreditList.name') }}
          </v-list-item>

          <v-list-item v-if="can('users', 'view-customer-menu-item')" link title="" :to="localePath('/customers')">
            <v-icon :icon="mdiAccountGroupOutline" class="mr-2" size="small" />
              {{ $t('customers.name') }} 
          </v-list-item>

          <v-list-item v-if="can('users', 'view-call-menu-item')" link title="" :to="localePath('/calls')">
            <v-icon :icon="mdiPhoneOutline" class="mr-2" size="small" />
              {{ $t('cardTabName.forms_call') }}
          </v-list-item>
        </v-navigation-drawer>

        <v-app-bar class="hidden-xs-only">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-app-bar-title class="name_App"
            ><img src="/assets/images/brand/logo_tj.png" alt="Oxus" width="120"
          /></v-app-bar-title>
          <v-toolbar-items>
            <v-btn :to="localePath('/')" class="side-menu">
              <v-icon :icon="mdiHomeOutline" class="mr-2" size="x-large" />
              {{ $t('bar.btn') }}
            </v-btn>
          </v-toolbar-items>
          <v-spacer />

          <v-toolbar-items>
            <v-menu offset-y>
              <template #activator="{props}">
                <v-btn id="menu" :append-icon="mdiMenuDown" :prepend-icon="mdiAccount" v-bind="props">
                  {{ `${user.last_name} ${user.first_name}` }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="openForm">
                  <v-icon start>{{ mdiKeyVariant }}</v-icon>
                  Смена пароля
                </v-list-item>
                <v-list-item :to="localePath('/logout')">
                  <v-icon start>{{ mdiLogoutVariant }}</v-icon>
                  Выход
                </v-list-item>
              </v-list>
            </v-menu>
            <LangSwitch />
            <v-btn @click="toggleTheme" :icon="mdiThemeLightDark" class="mr-3" size="x-large"></v-btn>
          </v-toolbar-items>
        </v-app-bar>
        <v-main>
          <slot />
        </v-main>
      </v-app>

      <change-password ref="changePasswordRef" />
      <confirm-dialog />
    </template>
  </workSpace>
</template>

<script setup>
import {mdiAccount, mdiMenuDown, mdiKeyVariant, mdiLogoutVariant, mdiThemeLightDark, mdiAccountCreditCardOutline, mdiAccountWrenchOutline, mdiHomeOutline, mdiFinance, mdiTextBoxSearchOutline, mdiCreditCardSearchOutline, mdiAccountSearchOutline, mdiCogOutline, mdiFileDocumentOutline, mdiListBoxOutline, mdiAccountGroupOutline, mdiPhoneOutline } from '@mdi/js'
import AuthService from '../services/auth-service'
import {user} from '~/utils/auth-data'
import {can} from '~/common/ability'
import changePassword from '~/components/change-password.vue'
import confirmDialog from '~/components/confirm-dialog.vue'
import {initializeModelLinks} from '~/common/domain-model'
import workSpace from '~/components/work-space/work-space.vue'
import {useThemeSwitcher} from '~/utils/theme'

const drawer = ref(null)
const isLoggedIn = ref(false)
const changePasswordRef = ref()

const { toggleTheme } = useThemeSwitcher()

const openForm = () => {
  changePasswordRef.value.openDialog()
}

const authService = new AuthService()
isLoggedIn.value = authService.isAuthenticated()

onMounted(async () => {
  await initializeModelLinks()
})
</script>

<style scoped>
.name_App {
  max-width: 120px;
  margin-right: 10px;
}

@media screen and (max-width: 768px) {
  .side-menu {
    display: none;
  }
}
</style>
