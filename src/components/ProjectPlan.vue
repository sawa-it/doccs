<template>
  <v-layout column>
    <v-container pb-0>
      <v-flex xs12 mb-0 pb-0>
        <v-dialog ref="dialog" full-width lazy>
          <template v-slot:activator="{ on }">
            <v-btn block color="info" @click="modal = true" v-on="on">計画を追加する</v-btn>
          </template>
          <v-card>
            <v-form>
              <v-select
                v-model="plan.type"
                :items="project_plan_type"
                item-text="type"
                item-value="id"
                label="計画区分"
                single-line
              ></v-select>
              <v-flex xs12 ma-auto>
                <v-text-field v-model="plan.text" label="計画" clearable full-width></v-text-field>
              </v-flex>
              <v-btn color="success" @click="add()">追加</v-btn>
            </v-form>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-container>
    <v-container py-0>
      <v-card v-for="plan in project_plans" :key="plan.id" mb-3>
        <v-layout row pa-2 mb-2>
          <v-layout column>
            <v-card-title v-if="plan.type === 1" pa-2>プロジェクトの概要（目的・ゴール）</v-card-title>
            <v-card-title v-model="plan.type" v-else-if="plan.type === 2">スコープ</v-card-title>
            <v-card-title v-model="plan.type" v-else-if="plan.type === 3">コスト</v-card-title>
            <v-card-title v-model="plan.type" v-else-if="plan.type === 4">スケジュール</v-card-title>
            <v-card-title v-model="plan.type" v-else-if="plan.type === 5">プロジェクト体制</v-card-title>
            <v-card-title v-model="plan.type" v-else-if="plan.type === 6">品質マネジメント</v-card-title>
            <v-card-title v-model="plan.type" v-else-if="plan.type === 7">コミュニケーション</v-card-title>
            <v-card-title v-model="plan.type" v-else-if="plan.type === 8">リスクと対策</v-card-title>
            <v-layout row>
              <v-flex xs1 py-0 mr-2>
                <v-text-field v-model="plan.date" label="追加日" py-0></v-text-field>
              </v-flex>
              <v-flex xs11 py-0 pr-3>
                <v-text-field v-model="plan.text" label="計画" pr-2></v-text-field>
              </v-flex>
            </v-layout>
          </v-layout>
          <v-flex xs1>
            <v-layout align-end justify-end row fill-height pb-4>
              <v-btn color="success" @click="save(plan)">更新</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      project_plan_type: [
        { id: 1, type: "プロジェクトの概要（目的・ゴール）" },
        { id: 2, type: "スコープ" },
        { id: 3, type: "コスト" },
        { id: 4, type: "スケジュール" },
        { id: 5, type: "プロジェクト体制" },
        { id: 6, type: "品質マネジメント" },
        { id: 7, type: "コミュニケーション" },
        { id: 8, type: "リスクと対策" }
      ],
      plan: {}
    };
  },
  created() {
    if (!this.project_plans.length) this.fetchProjectPlans();
  },
  computed: mapGetters(["project_plans"]),
  methods: {
    add() {
      if (this.plan.text === "") return;
      this.date = new Date();
      this.plan.date = this.formatDate(this.date, "yyyy/M/d");

      this.addProjectPlan(this.plan);
      this.plan = {};
    },
    formatDate(date, format) {
      format = format.replace(/yyyy/g, date.getFullYear());
      format = format.replace(/M/g, date.getMonth() + 1);
      format = format.replace(/d/g, date.getDate());
      return format;
    },
    save(plan) {
      this.updateProjectPlan({
        id: plan.id,
        project_plan: plan
      });
      this.plan = {};
    },
    ...mapActions(["addProjectPlan", "updateProjectPlan", "fetchProjectPlans"])
  }
};
</script>
