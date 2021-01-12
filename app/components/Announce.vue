<template>
  <Page actionBarHidden="true">
    <GridLayout columns="*" rows="*">
      <Label class="message" :text="msg" col="0" row="0" />
    </GridLayout>
  </Page>
</template>

<script>
import orientation from 'nativescript-screen-orientation';

import Game from '@/components/Game.vue';

export default {
  data() {
    return {
      msg: 'Reklam sayfası',
    };
  },
  mounted() {
    orientation.setCurrentOrientation('landscape', function() {
      console.log('landscape orientation set');
    });

    setTimeout(() => {
      this.$navigateTo(Game);
      console.log('Go to the Game...');
    }, 3000); // 3 sec to show ads
  },
};
</script>

<style scoped>
ActionBar {
  background-color: #077988;
  color: #02272e;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 48;
  color: #333333;
}
</style>
