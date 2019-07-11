<template>
  <v-tabs fixed-tabs>
    <v-tab
      v-for="title in documents"
      :key="title.id"
      @click="setActiveTab(title.id)"
    >{{ title.name }}</v-tab>
  </v-tabs>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    setActiveTab(int) {
      this.setActiveTab(int);
    },
    ...mapActions(["setActiveTab"])
  },
  data() {
    return {
      documents: [
        { id: 1, name: "プロジェクト計画" },
        { id: 2, name: "課題管理" },
        { id: 3, name: "要求整理" },
        { id: 4, name: "要件定義" },
        { id: 5, name: "設計" }
      ]
    };
  }
};
</script>