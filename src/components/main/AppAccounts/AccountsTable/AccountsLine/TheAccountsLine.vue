<template>
  <div
    :class="[
      'accounts-line app__accounts-lines app-table__line',
      account.password != null
        ? 'app-table_grid-resolutions'
        : 'app-table_grid-resolutions-slice',
      { 'app-table__line_selected': !account.hasSaved },
    ]"
  >
    <div class="app-table__line-item app__accounts_label">
      <AppField :is-error="false">
        <input
          @blur="handleSave"
          type="text"
          :placeholder="Consts.defaultPlaceholder"
          :maxlength="Consts.maxLabelLength"
          v-model="labels"
        />
      </AppField>
    </div>
    <div class="app-table__line-item app__accounts_type">
      <AppField :is-error="false">
        <select
          @change="handleChangeType"
          name="account_type"
          :id="'accounts_sel_' + account.id"
          v-model="account.type"
        >
          <option :value="AppAccountTypeEnum.LOCAL">
            {{ AppAccountTypeEnum.LOCAL }}
          </option>
          <option :value="AppAccountTypeEnum.LDAP">
            {{ AppAccountTypeEnum.LDAP }}
          </option>
        </select>
      </AppField>
    </div>
    <div class="app-table__line-item app__accounts_login">
      <AppField :is-error="fieldErrors.login"
        ><input
          @blur="handleSave"
          :placeholder="Consts.defaultPlaceholder"
          type="text"
          :maxlength="Consts.maxLoginLength"
          v-model="account.login"
        />
      </AppField>
    </div>
    <div
      class="app-table__line-item app__accounts_password"
      v-if="account.password != null"
    >
      <AppField :is-error="fieldErrors.password">
        <input
          @blur="handleSave"
          :type="showPassword ? 'text' : 'password'"
          :maxlength="Consts.maxPasswordLength"
          v-model="account.password"
        />
        <span
          @mouseenter="showPassword = true"
          @mouseleave="showPassword = false"
          :class="[
            'material-icons app__icons_primary',
            { app__icons_error: fieldErrors.password },
          ]"
          >{{ showPassword ? "visibility" : "visibility_off" }}</span
        >
      </AppField>
    </div>
    <div class="app-table__line-item app__accounts_remove">
      <p @click="handleRemove" :class="'material-icons app__icons_primary'">
        highlight_off
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, ref, watch } from "vue";
import AppField from "@/components/ui/Field/AppField.vue";
import { useAccountsStore } from "@/store/accounts/accounts";
import { AppAccountTypeEnum } from "@/types/enums";
import type { IAccount } from "@/types/interfaces";
import type { AppLabelType } from "@/types/types";
import Consts from "@/utils/const";
import { initMSelect } from "@/utils/hooks";
import { ErrorToastClName, showNotification } from "@/utils/notifications";

const props = defineProps<{
  account: IAccount;
}>();
const { updateAccount, removeAccount } = useAccountsStore();

const account = ref({ ...props.account });
const labels = ref(parseLabel(account.value.labels));
const fieldErrors = ref({
  login: false,
  password: false,
});
const showPassword = ref(false);

function parseLabel(labels: Array<AppLabelType>) {
  return labels.map((it) => it.text).join("; ");
}

function doValidateFields() {
  const errors = {
    login:
      !account.value.login.trim() ||
      account.value.login.length > Consts.maxLoginLength,
    password:
      account.value.type === AppAccountTypeEnum.LOCAL
        ? !account.value.password ||
          account.value.password.length > Consts.maxPasswordLength
        : false,
  };

  fieldErrors.value = errors;
  return !Object.values(errors).some(Boolean);
}

const handleChangeType = function () {
  account.value.type === AppAccountTypeEnum.LDAP
    ? (account.value.password = null)
    : (account.value.password = "");
  handleSave();
};

const handleRemove = () => removeAccount(account.value.id);

function handleSave() {
  let parsedLabels = labels.value.split(";").map((text) => ({ text }));

  account.value.labels = parsedLabels;

  const isValid = doValidateFields();
  account.value.hasSaved = isValid;

  isValid ? updateAccount(account.value) : showNotification(ErrorToastClName);
}

onMounted(async () => {
  await initMSelect();
});

onUpdated(async () => {
  await initMSelect();
});

watch(
  () => props.account,
  (newVal: IAccount) => {
    account.value = { ...newVal };
    labels.value = parseLabel(newVal.labels);
  },
);
</script>

<style lang="scss" src="./TheAccountsLine.scss"></style>
