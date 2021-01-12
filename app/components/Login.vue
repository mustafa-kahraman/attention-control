<template>
  <Page actionBarHidden="true">
    <StackLayout
      backgroundColor="#e3e3e3"
      width="100%"
      height="100%"
      verticalAlignment="middle"
    >
      <ActivityIndicator :busy="busy"></ActivityIndicator>
      <StackLayout
        class="img-holder"
        orientation="horizontal"
        horizontalAlignment="center"
        verticalAlignment="top"
      >
        <Label text="X" />
      </StackLayout>
      <Button
        text="Giriş"
        @tap="login"
        class="btn btn-primary"
        :class="{ disabled: busy }"
      />
    </StackLayout>
  </Page>
</template>

<script>
import _ from 'lodash';
import firebase from 'nativescript-plugin-firebase';

import Announce from '@/components/Announce.vue';

export default {
  data() {
    return {
      busy: false,
    };
  },

  mounted() {},

  methods: {
    // register() {
    //   this.busy = true;
    //   firebase
    //     .createUser({
    //       email: 'yourmail@gmail.com',
    //       password: '123456',
    //     })
    //     .then((result) => {
    //       this.busy = false;
    //       console.log('createUser');
    //       console.dir(result);
    //     })
    //     .catch((err) => {
    //       this.busy = false;
    //       console.log('createUser error: ' + err);
    //       dialogs.alert(err);
    //     });
    // },
    logout() {
      firebase.logout();
    },

    login() {
      this.busy = true;
      firebase
        .login({
          type: firebase.LoginType.GOOGLE,
        })
        .then(
          (result) => {
            this.busy = false;

            console.dir(result);

            this.$navigateTo(Announce, {
              clearHistory: true,
              backstackVisible: false,
            });
            console.log('Go to the Announce page');

            return { result: 'success', data: this.userData };
          },
          (error) => {
            this.busy = false;
            return { result: 'error', data: error };
          },
        );
    },
  },
};
</script>

<style scoped>
ActionBar {
  background-color: #077988;
  color: #02272e;
}

.disabled {
  opacity: 0.3;
}

.img-holder {
  border-color: #3e3e3e;
  border-width: 1 1 1 1;
  height: 200;
  width: 200;
  margin-bottom: 100;
}

.img-holder label {
  font-size: 100%;
}
</style>
