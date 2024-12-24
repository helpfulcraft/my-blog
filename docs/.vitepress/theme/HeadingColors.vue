<template>
  <div class="heading-colors">
    <div v-for="item in colors" :key="item.level" class="color-item">
      <div class="color-box" :style="{ backgroundColor: item.color }"></div>
      <span class="color-label">{{ item.level }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeadingColors',
  props: {
    colors: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>
