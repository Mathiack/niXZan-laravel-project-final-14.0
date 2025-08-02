<template>
  <div class="max-w-xl mx-auto p-4">
    <Post v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import Post from '@/views/Main/components/Post.vue'
import axios from 'axios'

export default {
  components: { Post },
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    axios.get('/api/posts').then(response => {
      this.posts = response.data
    })
  }
}
</script>
