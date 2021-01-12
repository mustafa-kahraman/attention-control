<template>
  <Page actionBarHidden="true">
    <FlexboxLayout alignItems="center" justifyContent="space-between">
      <StackLayout
        backgroundColor="red"
        width="100%"
        height="100%"
        verticalAlignment="middle"
      >
        <StackLayout
          backgroundColor="white"
          width="100%"
          height="50%"
          horizontalAlignment="center"
          verticalAlignment="middle"
        >
          <Button
            text="Sol-1"
            @tap="btnTap(1)"
            width="80%"
            height="80%"
            class="btn btn-primary"
          />
        </StackLayout>
        <StackLayout
          backgroundColor="purple"
          width="100%"
          height="50%"
          horizontalAlignment="center"
          verticalAlignment="middle"
        >
          <Button
            text="Sol-2"
            @tap="btnTap(2)"
            width="80%"
            height="80%"
            class="btn btn-primary"
          />
        </StackLayout>
      </StackLayout>

      <StackLayout
        backgroundColor="green"
        width="100%"
        height="100%"
        verticalAlignment="middle"
      >
        <StackLayout
          backgroundColor="yellow"
          height="30%"
          verticalAlignment="middle"
        >
          <Label
            text="Mustafa K."
            textWrap="true"
            horizontalAlignment="center"
          />
          <Label
            text="Kalan test: 3"
            textWrap="true"
            horizontalAlignment="center"
          />
          <Button text="Çıkış" @tap="logout" />
        </StackLayout>

        <StackLayout
          backgroundColor="green"
          height="40%"
          verticalAlignment="middle"
        >
          <Label
            :backgroundColor="bgColor"
            height="40%"
            width="40%"
            horizontalAlignment="center"
          />
          <Button text="Login" @tap="login" />
        </StackLayout>

        <StackLayout
          backgroundColor="white"
          height="30%"
          verticalAlignment="middle"
        >
          <Button
            text="Bitir"
            @tap="stopGame"
            width="80%"
            class="btn btn-danger"
          />
        </StackLayout>
      </StackLayout>

      <StackLayout width="100%" height="100%" verticalAlignment="middle">
        <StackLayout
          backgroundColor="white"
          width="100%"
          height="50%"
          horizontalAlignment="center"
          verticalAlignment="middle"
        >
          <Button
            text="Sağ-1"
            @tap="btnTap(3)"
            width="80%"
            height="80%"
            class="btn btn-primary"
          />
        </StackLayout>
        <StackLayout
          backgroundColor="purple"
          width="100%"
          height="50%"
          horizontalAlignment="center"
          verticalAlignment="middle"
        >
          <Button
            text="Sağ-2"
            @tap="btnTap(4)"
            width="80%"
            height="80%"
            class="btn btn-primary"
          />
        </StackLayout>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import orientation from 'nativescript-screen-orientation';
import firebase from 'nativescript-plugin-firebase';
import moment from 'moment';

import Login from '@/components/Login.vue';

import nums from '~/nums';

export default {
  data() {
    return {
      bgColor: '#fff',
      idx: 0,
      nums,
      int: null,
      gameStart: null,
      taps: [],
      isCorrect: true,
    };
  },

  mounted() {
    orientation.setCurrentOrientation('landscape', function() {
      console.log('landscape orientation set');
    });
  },

  methods: {
    startBlink() {
      this.int = setInterval(() => {
        (this.bgColor = 'purple'),
          setTimeout(() => {
            this.bgColor = '#fff';
          }, 100);
      }, 900);
    },

    stopBlink() {
      clearInterval(this.int);
    },

    logout() {
      firebase
        .logout()
        .then((status) => {
          console.log('Logout: ', status);
          orientation.setCurrentOrientation('portrait', function() {
            console.log('landscape orientation set');
          });

          this.$navigateTo(Login, {
            clearHistory: true,
            backstackVisible: false,
          });
        })
        .catch((err) => {
          console.log('Logout Err: ', err);
        });
    },

    login() {
      firebase
        .login({
          type: firebase.LoginType.GOOGLE,
        })
        .then(
          (result) => {
            console.dir(result);

            return { result: 'success', data: this.userData };
          },
          (error) => {
            return { result: 'error', data: error };
          },
        );
    },

    startGame(now) {
      if (this.gameStart) {
        return;
      }

      this.startBlink();

      console.log('Game Started...');
      this.gameStart = now;
    },

    btnTap(id) {
      let now = moment();
      this.startGame(now);

      // current execution id
      let curr = this.nums[this.idx];
      this.idx = this.idx == 39 ? 0 : this.idx + 1;

      if (this.isCorrect) {
        this.isCorrect = id == curr;
      }

      // create tap details
      let tap = {
        time: now,
        btn: id,
        isCorrect: this.isCorrect,
      };

      // add to taps list
      this.taps.push(tap);

      console.log(
        'len: ',
        this.taps.length,
        'btn: ',
        id,
        'idx: ',
        this.idx,
        'curr: ',
        curr,
        'isCorrect: ',
        this.isCorrect,
      );
    },

    stopGame() {
      this.stopBlink();

      //@todo store the result data to the database
      console.log(JSON.stringify(this.taps));

      // reset the universe
      this.bgColor = '#fff';
      this.idx = 0;
      this.int = null;
      this.gameStart = null;
      this.taps = [];
      this.isCorrect = true;
    },
  },
};
</script>

<style scoped>
ActionBar {
  background-color: #077988;
  color: #02272e;
}
</style>
