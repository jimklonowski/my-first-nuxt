<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-col cols="auto">
      {{ $t('common.welcome_to_emkay') }}
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'Home',
  middleware: ['auth']
}
</script>
