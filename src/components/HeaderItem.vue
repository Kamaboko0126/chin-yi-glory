<script setup lang="ts">
// import Button from "primevue/button";
import { ref, onMounted, watch } from "vue";
import Menubar from "primevue/menubar";
import { useI18n } from "vue-i18n";
import i18n from "../i18n";

const { locale, t } = useI18n();

const logo = new URL("../assets/ncut_blue.png", import.meta.url).href;

function switchLanguage() {
  locale.value = locale.value === "zh" ? "en" : "zh"; // 切換語言
}

async function loadLocaleMessages(locale: string) {
  try {
    const messages = await import(`../locales/${locale}/menu.json`);
    i18n.global.setLocaleMessage(locale, {
      ...i18n.global.getLocaleMessage(locale),
      ...messages.default,
    });
    console.log(`Locale messages for ${locale} loaded successfully.`);
  } catch (error) {
    console.error(`Failed to load locale messages for ${locale}:`, error);
  }
}

onMounted(() => {
  loadLocaleMessages(locale.value).then(() => {
    updateItems();
  });
});

// 監聽 locale 的變化，當語言切換時重新載入資料
watch(locale, (newLocale) => {
  console.log(`Locale changed to: ${newLocale}`);
  loadLocaleMessages(newLocale).then(() => {
    updateItems();
  });
});

interface MenuItem {
  label: string;
  url?: string;
  items?: MenuItem[]; // 子選單
  badge?: string; // 如果有徽章
}

const items = ref<MenuItem[]>([]); // 定義為 MenuItem 型別的陣列

function updateItems() {
  items.value = [
    {
      label: t("item1"),
      url: "/",
    },
    {
      label: t("item2"),
      url: "/curationintro",
    },
    {
      label: t("item3"),
      items: [
        {
          label: t("item4"),
          url: "/schoolintro",
        },
        {
          label: t("item5"),
          url: "/",
        },
        {
          label: t("item6"),
          url: "/",
        },
      ],
    },
    {
      label: t("item7"),
      url: "/",
    },
  ];
}
</script>

<template>
  <header>
    <Menubar :model="items" class="nav-bar">
      <template #start>
        <router-link to="/">
          <img :src="logo" alt="logo" />
        </router-link>
      </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <router-link
          :to="item.url || '#'"
          v-ripple
          class="flex items-center item"
          v-bind="props.action"
        >
          <span class="itemss">{{ item.label }}</span>
          <Badge
            v-if="item.badge"
            :class="{ 'ml-auto': !root, 'ml-2': root }"
            :value="item.badge"
          />
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
        </router-link>
      </template>
      <template #end>
        <div @click="switchLanguage" style="cursor: pointer">
          {{ locale === "zh" ? "English" : "中文" }}
        </div>
      </template>
    </Menubar>
  </header>
  <div class="block"></div>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
  left: 0;
  background: #ffffffca;
  backdrop-filter: blur(8px); /* 模糊背景效果 */
  -webkit-backdrop-filter: blur(8px); /* 兼容 Safari */
  .nav-bar {
    width: 100%;
    border: none;
    border-radius: 0;
    max-width: 1728px;
    margin: 0 auto;
    border-bottom: 1px solid #e2e8f0;
  }
  img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
  // .item {
  //   padding: 15px 20px;
  //   color: #283149;
  //   text-decoration: none;
  //   font-weight: 500;
  //   font-size: 18px;
  //   font-family: "LXGW WenKai Mono TC", serif;
  // }
}
.p-menubar {
  background: none;
}
.item {
  border: #e2e8f0 0px solid;
}

.block {
  height: 60px;
  width: 100%;
}
</style>
