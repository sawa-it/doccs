<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Doccs</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-btn flat @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>
<script>
import firebase from "firebase";
import { mapActions } from "vuex";

export default {
  name: "App",
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user);
        if (this.$router.currentRoute.name === "home") {
          this.$router.push({ name: "documents" });
        }
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: "home" });
      }
    });
  },
  methods: {
    ...mapActions(["setLoginUser", "logout", "deleteLoginUser"])
  }
};
</script>
