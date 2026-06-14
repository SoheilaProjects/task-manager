<template>
  <router-view v-slot="{ Component }">
    <Transition name="page" mode="out-in" appear>
      <component :is="Component"></component>
    </Transition>
  </router-view>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.35s ease;
}
.page-enter-from,
.page-leave-to{
  opacity: 0;
}
</style>