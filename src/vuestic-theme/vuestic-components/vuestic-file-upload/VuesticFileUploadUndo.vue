<template>
  <div class="vuestic-file-upload-undo">
    刪除檔案
    <button type="button"
            class="btn-text btn-text--primary"
            @click="$emit('recover')">
      Undo?
    </button>
  </div>
</template>

<script>
export default {
  name: 'vuestic-file-upload-undo',
}
</script>
