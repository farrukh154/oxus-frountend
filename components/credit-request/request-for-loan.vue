<template>
  <v-dialog v-model="dialog" persistent width="auto">
    <v-card>
      <v-card-actions>
        <v-spacer />
        <div v-if="formData.isReady" class="pa-4 text-red-lighten-1">
          Статус {{ getUIDFromId(formData.fields.status.value) }}
        </div>
        <v-btn variant="text" @click="dialog = false"> Закрыть </v-btn>
      </v-card-actions>
      <v-form v-if="formData.isReady && clientFormData?.isReady" ref="form" class="pa-4">
        <h1 class="text-h6 mb-4" style="text-align: center">
          <strong>
            Дархост барои гирифтани қарз №
            {{ formData.primaryKeyValue }}
          </strong>
        </h1>
        <h2 class="py-4">1. Маълумот дар бораи дархосткунанда</h2>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet rounded color="#d9d9d9" class="pt-4 pb-3 text-center text-black" elevation="2">
              Ному насаби Аризадиҳанда
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="clientFormData.fields.name.value"
              label="Номи пурра"
              variant="outlined"
              :rules="[inputRules.required]"
            >
              <template #append-inner>
                <v-btn
                  icon
                  variant="text"
                  :disabled="!clientFormData.fields.name.value"
                  @click="
                    searchClientAbacusAsk({
                      name: clientFormData.fields.name.value,
                    })
                  "
                >
                  <v-icon :icon="mdiMagnify" />
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Санаи таваллуд
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <date-picker v-model="clientFormData.fields.birthday.value" :rules="[inputRules.required]" />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Суроғаи бақайдгири-Шаҳр/Ноҳия
            </v-sheet>
          </v-col>
          <client-address
            :key="clientFormData.fields.registration_address.value"
            v-model="clientFormData.fields.registration_address.value"
            :rules="[inputRules.required]"
          />
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-5">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              <span style="font-size: 16px">Суроғаи бақайдгири Ҷамоат/Деҳа/Куча</span>
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="clientFormData.fields.registration_address_street.value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Рақами Шиноснома
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="clientFormData.fields.passport.value"
              variant="outlined"
              :rules="[inputRules.required]"
            >
              <template #append-inner>
                <v-btn
                  icon
                  variant="text"
                  :disabled="!clientFormData.fields.passport.value"
                  @click="
                    searchClientAbacusAsk({
                      passport: clientFormData.fields.passport.value,
                    })
                  "
                >
                  <v-icon :icon="mdiMagnify" />
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              РМА
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="clientFormData.fields.INN.value"
              variant="outlined"
              :rules="[inputRules.required, inputRules.inn_number]"
              type="number"
            >
              <template #append-inner>
                <v-btn
                  icon
                  variant="text"
                  :disabled="!clientFormData.fields.INN.value"
                  @click="searchClientAbacusAsk({INN: clientFormData.fields.INN.value})"
                >
                  <v-icon :icon="mdiMagnify" />
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="1">
            <v-sheet
              class="pt-4 pb-3 text-center text-black"
              style="background-color: #d9d9d9"
              elevation="2"
              :rules="[inputRules.required]"
            >
              Ҷинс
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-select
              v-model="clientFormData.fields.gender.value"
              :items="clientFormData.fields.gender.choices"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Аз тарафи ки ва кай дода шудааст
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="clientFormData.fields.passport_details.value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Санаи додани шиноснома
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2">
            <date-picker v-model="clientFormData.fields.passport_date.value" :rules="[inputRules.required]" />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Суроғаи ҷойи зист-Шаҳр/Ноҳия
            </v-sheet>
          </v-col>
          <client-address
            :key="clientFormData.fields.address.value"
            v-model="clientFormData.fields.address.value"
            :rules="[inputRules.required]"
          />
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Суроғаи ҷойи зист-Ҷамоат/Деҳа/Куча
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="clientFormData.fields.address_street.value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Рақами телефони мизоҷ (1)
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="clientFormData.fields.phone1.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required, inputRules.tel_number]"
            />
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Рақами телефони мизоҷ (2)
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="clientFormData.fields.phone2.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.tel_number]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Вазъи оилавӣ
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-select
              v-model="clientFormData.fields.family_status.value"
              :items="clientFormData.fields.family_status.choices"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Шумораи аъзоёни оила
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-text-field
              v-model="formData.fields.family_number.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="3">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Аз онҳо даромади Худро доранд
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-text-field
              v-model="formData.fields.family_number_has_income.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Ҳамсар/Аъзои оила (Ному насаб)
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
              v-model="clientFormData.fields.spouse.value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Рақами телефон
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="clientFormData.fields.spouse_phone.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.tel_number]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Оё шумо қарзи ҷорӣ доред?
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-select
              v-model="formData.fields.current_debt.value"
              :items="formData.fields.current_debt.choices"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Аз кадом Ташкилоти қарзӣ ?
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="5">
            <v-text-field
              v-model="formData.fields.current_debt_name.value"
              variant="outlined"
              :rules="
                formData.fields.current_debt.value === 'yes'
                  ? [(value) => !!value || 'Поле обязательно для заполнения']
                  : []
              "
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-7 pb-6 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Оё Шумо бо ACTED ҳамкори доштед? (Ҳа/Не)
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-select
              v-model="formData.fields.acted.value"
              :items="formData.fields.acted.choices"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Шумораи кормандоне, ки вақти кории пурра доранд?
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-text-field
              v-model="formData.fields.full_time_employees.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>

          <v-col cols="12" sm="3">
            <v-sheet class="pt-7 pb-6 text-center text-black" style="background-color: #d9d9d9" elevation=" 2">
              Ташкили ҷойҳои кори нав
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-text-field
              v-model="formData.fields.new_job.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-7 pb-6 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Дар бораи қарз аз кучо хабар ёфтед? Сарчашмаи маълумот дар
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <v-select
              v-model="formData.fields.information_source.value"
              :items="formData.fields.information_source.choices"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <h2 class="py-4">2. Маълумот дар бораи фаъолият</h2>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Категорияи фаъолият
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <autocomplete-field
              v-model="formData.fields.economic_activity.value"
              :api-model="formData.fields.economic_activity.related_to"
              load-all
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Намуди фаъолият
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="5">
            <autocomplete-field
              v-model="formData.fields.economic_activity_type.value"
              :api-model="formData.fields.economic_activity_type.related_to"
              load-all
              :parent-filter-id="formData.fields.economic_activity.value"
              parent-filter-name="economic_activity"
              :rules="[inputRules.required]"
            />
          </v-col>

          <v-col cols="12" sm="2" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Таҷрибаи корӣ (моҳ)
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-text-field
              v-model="formData.fields.work_experience.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="6" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Дар кадом филиал/МХМХ мехоҳед хизматрасони карда шавед
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="6">
            <autocomplete-field
              v-model="formData.fields.branch.value"
              :api-model="formData.fields.branch.related_to"
              item-title="description"
              load-all
              :parent-filter-id="true"
              parent-filter-name="active"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <h2 class="py-4">3. Шартхои қарзи дархостшаванда</h2>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Маблағи дархостшуда
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="formData.fields.request_amount.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>

          <v-col cols="12" sm="2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Асъор
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <autocomplete-field
              v-model="formData.fields.currency_new.value"
              :api-model="formData.fields.currency_new.related_to"
              item-title="description"
              load-all
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Муҳлати қарз (моҳ)
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-text-field
              v-model="formData.fields.request_installment.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Мақсади қарз
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="5">
            <autocomplete-field
              v-model="formData.fields.credit_purpose.value"
              :api-model="formData.fields.credit_purpose.related_to"
              load-all
              :rules="[inputRules.required]"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Муҳлати имтиёзнок (моҳ)
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="1">
            <v-text-field
              v-model="formData.fields.request_grace_period.value"
              type="number"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-4 pb-3 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Соҳаи маблағгузорӣ
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <v-select
              v-model="formData.fields.investment_sector.value"
              :items="formData.fields.investment_sector.choices"
              item-title="display_name"
              item-value="value"
              variant="outlined"
              :rules="[inputRules.required]"
            />
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" sm="12" class="pb-5">
            <v-sheet class="pt-4 pb-4 pl-4 pr-4 text-center" elevation="2">
              Ман, шахси дар поён имзогузошта тасдиқ мекунам, ки тамоми иттилооти дар боло зикршуда дуруст ва комил
              мебошад. Ман бо шартҳои қарздиҳӣ розӣ ҳастам ва омодаам, ки ба маъмури қарз барои дарёфт кардани маълумоти
              пурра дар бораи бизнес ва иқтисоди хонаводагии ман мусоидат намоям. Ман хуб мефаҳмам ва розӣ ҳастам, ки
              дар сурати ошкор кардани қарздорӣ, минбаъд тартиботи дархост ва додани қарз мумкин аст дар ҳама марҳилаи
              он бекор карда шавад. Ман мефаҳмам, ки пур кардани дархости мазкур ҳанӯз дарёфт кардани қарзро замонат
              намедиҳад. Бинобар ин, ман зид нестам, ки агар ОКСУС барои дарёфти иттилооти дигар дар бораи бизнес ва
              иқтисоди хонаводагии ман ба созмонҳо, бонкҳо ё шахсони дигар муроҷиат намояд.
            </v-sheet>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-5 pb-5 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Аризадиҳанда
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="4" class="pb-11">
            <v-sheet class="pt-10 pb-2 text-center">
              <v-divider :thickness="1" class="border-opacity-100" color="black"></v-divider>
              Ному насаб
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2" class="pb-11">
            <v-sheet class="pt-10 pb-2 text-center">
              <v-divider :thickness="1" class="border-opacity-100" color="black"></v-divider>
              имзо
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2" class="pb-11">
            <v-sheet class="pt-10 pb-2 text-center">
              <v-divider :thickness="1" class="border-opacity-100" color="black"></v-divider>
              Таърих
            </v-sheet>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4" class="pb-2">
            <v-sheet class="pt-5 pb-5 text-center text-black" style="background-color: #d9d9d9" elevation="2">
              Мутахассис оид ба хизматрасонӣ
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="4" class="pb-11">
            <v-sheet class="pt-10 pb-2 text-center">
              <v-divider :thickness="1" class="border-opacity-100" color="black"></v-divider>
              Ному насаб
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2" class="pb-11">
            <v-sheet class="pt-10 pb-2 text-center">
              <v-divider :thickness="1" class="border-opacity-100" color="black"></v-divider>
              имзо
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2" class="pb-11">
            <v-sheet class="pt-10 pb-2 text-center">
              <v-divider :thickness="1" class="border-opacity-100" color="black"></v-divider>
              Таърих
            </v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-spacer />
          <v-btn :disabled="!allowSave" color="success" size="x-large" class="mr-2" @click="save">Сохранить</v-btn>
          <v-btn
            color="success"
            size="x-large"
            :disabled="!formData.primaryKeyValue"
            class="mr-2"
            @click="openDecloration"
          >
            Самодеклорация
          </v-btn>
          <v-btn color="success" size="x-large" :disabled="!formData.primaryKeyValue" @click="print">Печать</v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
  <decloration-loan ref="declaration" />
</template>

<script setup>
import {mdiMagnify} from '@mdi/js'
import {DataSource} from '~/dataSource/dataSource'
import ApiFactory from '~/factories/api-factory'
import {toastInfo, toastWarning} from '../utils/toast'
import {confirmDialog} from '../utils/confirm-dialog'
import DeclorationLoan from '~/components/credit-request/decloration-loan.vue'
import {getUIDFromId, getIdFromUID, SwiftLoanStatuses, SwiftLoanUserRole} from '~/common/swift-loan'
import {inputRules, TEL_LENGTH, INN_LENGTH} from '~/common/input-rules'
import {user} from '~/utils/auth-data'
import {clientSync} from './client-sync'

const apiClient = ApiFactory.build()
const dialog = shallowRef(false)
const formData = ref()
const clientFormData = ref()
const declaration = ref()
const tempSearchData = ref()
const form = ref()

defineExpose({
  openDialog,
})

async function openDialog(id, abacusClientId, decision_client) {
  dialog.value = true
  formData.value = new DataSource('request_credits', id)
  await formData.value.init()
  if (decision_client) {
    formData.value.fields.decision_client.value = decision_client
  }
  if (abacusClientId) {
    searchClientAbacus({client_ID: abacusClientId})
  } else {
    clientFormData.value = new DataSource('customers', formData.value.fields.customer.value)
    await clientFormData.value.init()
  }
}

async function searchClientAbacusAsk(data) {
  tempSearchData.value = data
  confirmDialog({
    onConfirm: searchClientAbacus,
  })
}

async function searchClientAbacus(data) {
  data = data ?? tempSearchData.value
  const res = await apiClient.post('/request_credit/search_client', {
    ...data,
  })
  if (res.length > 1) {
    toastWarning('Найдено более одного клиента')
  } else if (!res.length) {
    toastWarning('Не найдено')
  } else {
    loadInfoFromData(res[0])
  }
}

async function loadInfoFromData(clientData) {
  if (clientData.branch) {
    const res = await apiClient.get(`/division/branches?filter{abacus_id}=${clientData.branch}`)
    formData.value.fields.branch.value = res.branches?.[0]?.id
  }
  clientFormData.value = await clientSync(clientData)
  formData.value.fields.customer.value = clientFormData.value.primaryKeyValue
  toastInfo('Данные обновлены')
}

async function save() {
  const valid = await form.value.validate()
  if (!valid.valid) {
    toastWarning('Заполните все поля')
    return
  }
  try {
    await clientFormData.value.save()
  } catch (e) {
    const res = await apiClient.get(`/customer/customers?filter{INN}=${clientFormData.value.fields.INN.value}`)
    clientFormData.value.primaryKeyValue = res.customers[0].id
    await clientFormData.value.save()
  }
  formData.value.fields.customer.value = clientFormData.value.primaryKeyValue
  await formData.value.save()
}

async function print() {
  const config = useRuntimeConfig()
  const anchor = document.createElement('a')
  anchor.href = `${config.public.apiBase}/print-request-credits/${formData.value.primaryKeyValue}/`
  anchor.target = '_blank'
  anchor.download = `request_credit_${formData.value.primaryKeyValue}.pdf`
  anchor.click()
}

function openDecloration() {
  declaration.value.openDialog(formData.value.primaryKeyValue)
}

const allowSave = computed(() => {
  return (
    ([
      getIdFromUID(SwiftLoanStatuses.CREATED_UID),
      getIdFromUID(SwiftLoanStatuses.POSTPONED_UID),
      getIdFromUID(SwiftLoanStatuses.TO_UNDERWRITER_UID),
    ].includes(formData.value.fields.status.value) ||
      !formData.value.fields.status.value) &&
    [SwiftLoanUserRole.callOfficer, SwiftLoanUserRole.customerServiceSpecialist].includes(user.value.swift_loan_role)
  )
})

watch(
  () => formData.value?.fields?.economic_activity?.value,
  (curr, prev) => {
    if (
      formData.value?.fields?.economic_activity?.value &&
      formData.value.fields?.economic_activity?.value != formData.value.fields?.economic_activity?.oldValue
    ) {
      formData.value.fields.economic_activity_type.value = undefined
    }
  },
)

watch(
  () => clientFormData.value?.fields?.INN?.value,
  (curr, prev) => {
    if (!clientFormData.value.isReady) {
      return
    }
    clientFormData.value.fields.INN.value = validateLength(clientFormData.value.fields.INN.value, INN_LENGTH)
  },
)

watch(
  () => clientFormData.value?.fields?.phone1?.value,
  (curr, prev) => {
    if (!clientFormData.value.isReady) {
      return
    }
    clientFormData.value.fields.phone1.value = validateLength(clientFormData.value.fields.phone1.value, TEL_LENGTH)
  },
)

watch(
  () => clientFormData.value?.fields?.phone2?.value,
  (curr, prev) => {
    if (!clientFormData.value.isReady) {
      return
    }
    clientFormData.value.fields.phone2.value = validateLength(clientFormData.value.fields.phone2.value, TEL_LENGTH)
  },
)

watch(
  () => clientFormData.value?.fields?.spouse_phone?.value,
  (curr, prev) => {
    if (!clientFormData.value.isReady) {
      return
    }
    clientFormData.value.fields.spouse_phone.value = validateLength(
      clientFormData.value.fields.spouse_phone.value,
      TEL_LENGTH,
    )
  },
)

function validateLength(value, length) {
  if (value && String(value).length > length) {
    return String(value).substring(0, length)
  }
  return value
}
</script>
