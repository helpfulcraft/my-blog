<template>
  <article class="vp-doc">
    <InlineEditor :content="content" :path="path">
      <div v-html="renderedContent"></div>
    </InlineEditor>
  </article>
</template>

<script>
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})

export default {
  props: {
    content: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const renderedContent = computed(() => {
      return md.render(props.content)
    })

    return {
      renderedContent
    }
  }
}
</script>
