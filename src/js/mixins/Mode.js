export default {
  computed: {
    isEditing () {
      return this.$route.query.mode === 'edit'
    }
  }
}
