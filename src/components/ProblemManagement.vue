<template>
  <v-container>
    <v-flex xs12>
      <v-dialog ref="dialog" full-width lazy>
        <template v-slot:activator="{ on }">
          <v-btn block color="info" @click="modal = true" v-on="on">課題を追加する</v-btn>
        </template>
        <v-card>
          <v-form>
            <v-flex xs12 ma-auto>
              <v-text-field v-model="problem.question" label="質問" clearable full-width></v-text-field>
            </v-flex>
            <v-btn color="info" @click="add()">追加</v-btn>
          </v-form>
        </v-card>
      </v-dialog>
    </v-flex>
    <v-layout wrap>
      <v-flex xs12>
        <v-card v-for="target in problems" :key="target.id">
          <v-form>
            <v-container mb-3 grid-list-md wrap>
              <v-layout row>
                <v-flex xs11>
                  <v-layout column wrap>
                    <v-layout row ma-0>
                      <v-flex xs1 py-0>
                        <v-text-field v-model="target.question_date" label="質問日" mt-1 md-0 py-0></v-text-field>
                      </v-flex>
                      <v-flex xs1 py-0>
                        <v-text-field v-model="target.questioner" label="質問者" mt-1 md-0 py-0></v-text-field>
                      </v-flex>
                      <v-flex xs10 py-0>
                        <v-text-field v-model="target.question" label="質問" my-0 py-0></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row ma-0>
                      <v-flex xs1 py-0>
                        <v-text-field v-model="target.answer_date" label="回答日" mt-1 md-0 py-0></v-text-field>
                      </v-flex>
                      <v-flex xs1 py-0>
                        <v-text-field v-model="target.respondent" label="回答者" mt-1 md-0 py-0></v-text-field>
                      </v-flex>
                      <v-flex xs10 py-0>
                        <v-text-field v-model="target.answer" label="回答" my-0 py-0></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-layout>
                </v-flex>
                <v-flex xs1>
                  <v-container wrap pa-0>
                    <v-layout column wrap>
                      <v-flex xs6 pl-3>
                        <v-checkbox v-model="target.isClose" label="完了"></v-checkbox>
                      </v-flex>
                      <v-flex xs6>
                        <v-btn color="success" @click="save(target)">更新</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  created() {
    if (!this.problems.length) this.fetchProblems();
  },
  computed: mapGetters(["problems", "userName"]),
  data() {
    return {
      problem: {}
    };
  },
  methods: {
    add() {
      if (this.problem.question === "") return;
      this.problem.questioner = this.userName;
      this.date = new Date();
      this.problem.question_date = this.formatDate(this.date, "yyyy/M/d");
      this.addProblem(this.problem);
      this.problem = {};
    },
    formatDate(date, format) {
      format = format.replace(/yyyy/g, date.getFullYear());
      format = format.replace(/M/g, date.getMonth() + 1);
      format = format.replace(/d/g, date.getDate());
      return format;
    },
    save(target) {
      this.updateProblem({
        id: target.id,
        problem: target
      });
      this.problem = {};
    },
    ...mapActions(["addProblem", "updateProblem", "fetchProblems"])
  }
};
</script>

