<template>
  <v-layout column>
    <v-container grid-list-xs mb-0 pb-0>
      <v-flex xs12>
        <v-dialog ref="dialog" full-width lazy>
          <template v-slot:activator="{ on }">
            <v-btn block color="info" @click="modal = true" v-on="on">要件を追加する</v-btn>
          </template>
          <v-card>
            <v-form>
              <v-select
                v-model="definition.expected_development_id"
                :items="expected_developments"
                item-text="contents"
                item-value="id"
                label="想定される機能"
              ></v-select>
              <v-select
                v-model="definition.type"
                :items="expected_development_types"
                item-text="type"
                item-value="id"
                label="詳細"
              ></v-select>
              <v-select
                v-show="definition.type === 7"
                v-model="definition.non_functional_requirement_type"
                :items="non_functional_requirements"
                item-text="name"
                item-value="id"
                label="非機能要件分類"
              ></v-select>
              <v-select
                v-show="definition.non_functional_requirement_type === 1"
                v-model="definition.non_functional_requirement_detail_type"
                :items="availabilityies"
                item-text="name"
                item-value="id"
                label="可用性分類"
              ></v-select>
              <v-select
                v-show="definition.non_functional_requirement_type === 2"
                v-model="definition.non_functional_requirement_detail_type"
                :items="scalabilities"
                item-text="name"
                item-value="id"
                label="性能・拡張性分類"
              ></v-select>
              <v-select
                v-show="definition.non_functional_requirement_type === 3"
                v-model="definition.non_functional_requirement_detail_type"
                :items="maintainabilities"
                item-text="name"
                item-value="id"
                label="運用・保守性分類分類"
              ></v-select>
              <v-select
                v-show="definition.non_functional_requirement_type === 4"
                v-model="definition.non_functional_requirement_detail_type"
                :items="migrations"
                item-text="name"
                item-value="id"
                label="移行性分類"
              ></v-select>
              <v-select
                v-show="definition.non_functional_requirement_type === 5"
                v-model="definition.non_functional_requirement_detail_type"
                :items="securities"
                item-text="name"
                item-value="id"
                label="セキュリティ分類"
              ></v-select>
              <v-select
                v-show="definition.non_functional_requirement_type === 6"
                v-model="definition.non_functional_requirement_detail_type"
                :items="environments"
                item-text="name"
                item-value="id"
                label="環境・エコロジー分類"
              ></v-select>
              <v-flex xs12 ma-auto>
                <v-text-field v-model="definition.contents " label="要件内容" clearable full-width></v-text-field>
              </v-flex>
              <v-btn color="info" @click="add()">追加</v-btn>
            </v-form>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-container>

    <v-container pt-1>
      <v-card v-for="expected_dev in expected_developments" :key="expected_dev.id">
        <v-layout row mb-3 pa-3>
          <v-flex xs4>
            <v-layout column mr-4>
              <v-layout row>
                <v-flex xs4 mr-1>
                  <v-text-field v-model="expected_dev.request_date" label="要求日" readonly my-0 pa-0></v-text-field>
                </v-flex>
                <v-flex xs5 mr-1>
                  <v-select
                    v-model="expected_dev.request_type"
                    :items="expected_development_types"
                    item-text="type"
                    item-value="id"
                    label="分類"
                    readonly
                  ></v-select>
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    v-model="expected_dev.estimate"
                    label="初期見積もり"
                    suffix="人日"
                    type="number"
                    readonly
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-text-field v-model="expected_dev.contents" label="想定される機能" readonly my-0 pa-0></v-text-field>
            </v-layout>
          </v-flex>
          <v-flex xs7 mr-2>
            <v-layout column>
              <v-layout v-for="req in definitions" :key="req.id" row>
                <v-flex mr-2>
                  <v-layout
                    v-if="req.expected_development_id && req.expected_development_id === expected_dev.id"
                    column
                    wrap
                  >
                    <v-layout row>
                      <v-flex xs2 mr-1>
                        <v-text-field v-model="req.request_date" label="追加日"></v-text-field>
                      </v-flex>
                      <v-flex xs4 mr-1>
                        <v-select
                          v-model="req.type"
                          :items="expected_development_types"
                          item-text="type"
                          item-value="id"
                          label="詳細"
                        ></v-select>
                      </v-flex>
                      <v-flex xs4 mr-1>
                        <v-select
                          v-if="req.type === 8"
                          v-model="req.non_functional_requirement_type"
                          :items="non_functional_requirements"
                          item-text="name"
                          item-value="id"
                          label="非機能要件分類"
                        ></v-select>
                        <v-text-field v-if="req.type != 8" v-model="req.name" label="画面・機能名"></v-text-field>
                      </v-flex>
                      <v-flex xs5 mr-1>
                        <v-select
                          v-if="req.type === 8"
                          v-model="req.non_functional_requirement_detail_type"
                          :items="itemSelect(req.non_functional_requirement_type)"
                          item-text="name"
                          item-value="id"
                          :label="labelSelect(req.non_functional_requirement_type)"
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-text-field v-model="req.contents" label="要件"></v-text-field>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-flex>
          <v-flex xs1>
            <v-layout justify-end column fill-height wrap>
              <v-layout column mb-0 pb-0>
                <v-text-field
                  v-model="expected_dev.fixed_estimate"
                  type="number"
                  label="合計"
                  suffix="人日"
                  @click="calculate(definition.expected_development_id,expected_dev)"
                  box
                  disabled
                ></v-text-field>
                <v-layout row>
                  <v-btn fab flat small @click="plus(expected_dev)">
                    <v-icon dark>add</v-icon>
                  </v-btn>
                  <v-btn fab flat small @click="minus(expected_dev)">
                    <v-icon dark>remove</v-icon>
                  </v-btn>
                </v-layout>
              </v-layout>
              <v-btn @click="updateAll()" color="success">更新</v-btn>
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
  created() {
    if (!this.expected_developments.length) this.fetchExpectedDevelopments();
    if (!this.definitions.length) this.fetchDefinitions();
  },
  computed: mapGetters(["expected_developments", "definitions"]),
  data() {
    return {
      definition: {},
      non_functional_requirements: [
        { id: 1, name: "可用性" },
        { id: 2, name: "性能/拡張性" },
        { id: 3, name: "運用/保守性" },
        { id: 4, name: "移行性" },
        { id: 5, name: "セキュリティ" },
        { id: 6, name: "環境/エコロジー" }
      ],
      availabilityies: [
        { id: 1, name: "可用性" },
        { id: 2, name: "回復性" },
        { id: 3, name: "成熟性" },
        { id: 4, name: "災害対策" },
        { id: 5, name: "確認済み" },
        { id: 6, name: "耐障害性" }
      ],
      scalabilities: [
        { id: 1, name: "リソース拡張性" },
        { id: 2, name: "性能品質保証" },
        { id: 3, name: "性能目標値" },
        { id: 4, name: "業務処理量" }
      ],
      maintainabilities: [
        { id: 1, name: "保守運用" },
        { id: 2, name: "通常運用" },
        { id: 3, name: "運用・保守体制" },
        { id: 4, name: "運用環境" },
        { id: 5, name: "運用管理方針" },
        { id: 6, name: "障害時運用" }
      ],
      migrations: [
        { id: 1, name: "移行データ" },
        { id: 2, name: "移行機器" },
        { id: 3, name: "移行方式" },
        { id: 4, name: "移行時期" },
        { id: 5, name: "移行計画" }
      ],
      securities: [
        { id: 1, name: "Web対策" },
        { id: 2, name: "アクセス・利用制限" },
        { id: 3, name: "リスク対応" },
        { id: 4, name: "リスク管理" },
        { id: 5, name: "セキュリティ診断" },
        { id: 6, name: "データの秘匿" },
        { id: 7, name: "ネットワーク対策" },
        { id: 8, name: "マルウェア対策" },
        { id: 9, name: "不正追跡・監視" },
        { id: 10, name: "前提条件・制約条件" }
      ],
      environments: [
        { id: 1, name: "制約/前提条件" },
        { id: 2, name: "システム特性" },
        { id: 3, name: "機材設置環境条件" },
        { id: 4, name: "環境マネージメント" },
        { id: 5, name: "適合規格" }
      ],
      expected_development_types: [
        { id: 1, type: "業務" },
        { id: 2, type: "デザイン" },
        { id: 3, type: "挙動" },
        { id: 4, type: "処理" },
        { id: 5, type: "API" },
        { id: 6, type: "バッチ" },
        { id: 7, type: "データ" },
        { id: 8, type: "非機能" }
      ]
    };
  },
  methods: {
    add() {
      if (this.definition.contents === "") return;
      this.date = new Date();
      this.definition.request_date = this.formatDate(this.date, "yyyy/M/d");
      this.addDefinition(this.definition);
      this.definition = {};
    },
    plus(expected_dev) {
      expected_dev.fixed_estimate++;
    },
    minus(expected_dev) {
      expected_dev.fixed_estimate--;
    },
    formatDate(date, format) {
      format = format.replace(/yyyy/g, date.getFullYear());
      format = format.replace(/M/g, date.getMonth() + 1);
      format = format.replace(/d/g, date.getDate());
      return format;
    },
    itemSelect(type) {
      switch (type) {
        case 1:
          return this.availabilityies;

        case 2:
          return this.scalabilities;

        case 3:
          return this.maintainabilities;

        case 4:
          return this.migrations;

        case 5:
          return this.securities;

        case 6:
          return this.environments;
      }
    },
    labelSelect(type) {
      switch (type) {
        case 1:
          return "可用性";
          break;

        case 2:
          return "性能・拡張性";
          break;

        case 3:
          return "運用・保守性";
          break;
        case 4:
          return "移行性";
          break;

        case 5:
          return "セキュリティ";
          break;

        case 6:
          return "環境・エコロジー";
      }
    },
    calculate(id, definition) {
      var sum = 0;
      definition.estimate_sum = null;
      this.expected_developments.forEach(target => {
        if (id === target.expected_development_id) {
          sum += parseInt(target.estimate);
        }
        definition.estimate_sum = sum;
      });
    },
    updateAll() {
      this.definitions.forEach(target => {
        this.updateDefinition({
          id: target.id,
          definition: target
        });
      });
      this.expected_developments.forEach(target_dev => {
        this.updateExpectedDevelopment({
          id: target_dev.id,
          expected_development: target_dev
        });
      });
    },
    ...mapActions([
      "fetchExpectedDevelopments",
      "updateExpectedDevelopment",
      "fetchDefinitions",
      "addDefinition",
      "updateDefinition"
    ])
  }
};
</script>