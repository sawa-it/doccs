<template>
  <v-layout column>
    <v-container grid-list-xs mb-0 pb-0>
      <v-layout row wrap>
        <v-flex xs4>
          <v-dialog ref="dialog" full-width lazy>
            <template v-slot:activator="{ on }">
              <v-btn block color="info" @click="modal = true" v-on="on">大項目を追加する</v-btn>
            </template>
            <v-card>
              <v-form>
                <v-flex xs12 ma-auto>
                  <v-text-field v-model="major_item.name" label="項目" clearable full-width></v-text-field>
                </v-flex>
                <v-btn color="info" @click="addRmi()">追加</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
        </v-flex>
        <v-flex xs4>
          <v-dialog ref="dialog" full-width lazy>
            <template v-slot:activator="{ on }">
              <v-btn block color="info" @click="modal = true" v-on="on">内容を追加する</v-btn>
            </template>
            <v-card>
              <v-form>
                <v-select
                  v-model="request.major_item_id"
                  :items="request_major_items"
                  item-text="name"
                  item-value="id"
                  label="大項目"
                  single-line
                ></v-select>
                <v-select
                  v-model="request.type"
                  :items="request_types"
                  item-text="type"
                  item-value="id"
                  label="分類"
                  single-line
                ></v-select>
                <v-flex xs12 ma-auto>
                  <v-text-field v-model="request.contents " label="要求内容" clearable full-width></v-text-field>
                </v-flex>
                <v-btn color="info" @click="addReq()">追加</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
        </v-flex>
        <v-flex xs4>
          <v-dialog ref="dialog" full-width lazy>
            <template v-slot:activator="{ on }">
              <v-btn block color="info" @click="modal = true" v-on="on">想定される機能を追加する</v-btn>
            </template>
            <v-card>
              <v-form>
                <v-select
                  v-model="expected_development.request_id"
                  :items="requests"
                  item-text="contents"
                  item-value="id"
                  label="要求内容"
                  single-line
                ></v-select>
                <v-select
                  v-model="expected_development.request_type"
                  :items="expected_development_types"
                  item-text="type"
                  item-value="id"
                  label="分類"
                  single-line
                ></v-select>
                <v-flex xs12 ma-auto>
                  <v-text-field
                    v-model="expected_development.contents "
                    label="想定される開発"
                    clearable
                    full-width
                  ></v-text-field>
                </v-flex>
                <v-btn color="info" @click="addExpectedDev(expected_development.request_id)">追加</v-btn>
              </v-form>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-xs pt-1>
      <v-card v-for="rmi in request_major_items" :key="rmi.id">
        <v-layout row mb-3 pa-3>
          <v-flex xs3 ma-0 pa-0>
            <v-layout wrap>
              <v-layout column my-0 mr-4>
                <v-flex xs6 ma-0 pa-0>
                  <v-text-field v-model="rmi.request_date" label="要求日" my-0 md-0 pa-0></v-text-field>
                </v-flex>
                <v-text-field v-model="rmi.name" label="項目名" my-1 md-0 py-0></v-text-field>
              </v-layout>
            </v-layout>
          </v-flex>
          <v-flex xs9 mr-3>
            <v-layout column pt-0>
              <v-layout v-for="req in requests" :key="req.id" row>
                <v-flex xs5 my-0 mr-4>
                  <v-layout v-if="req.major_item_id && req.major_item_id === rmi.id" column wrap>
                    <v-layout row>
                      <v-flex xs4>
                        <v-text-field v-model="req.request_date" label="要求日" my-0 md-0 pa-0></v-text-field>
                      </v-flex>
                      <v-flex xs4>
                        <v-select
                          v-model="req.type"
                          :items="request_types"
                          item-text="type"
                          item-value="id"
                          label="分類"
                          single-line
                        ></v-select>
                      </v-flex>
                    </v-layout>
                    <v-text-field v-model="req.contents" label="要求" pa-0 my-0></v-text-field>
                  </v-layout>
                </v-flex>
                <v-flex xs7>
                  <v-layout column>
                    <v-layout v-for="expected_dev in expected_developments" :key="expected_dev.id">
                      <v-layout
                        v-if="expected_dev.request_id && expected_dev.request_id === req.id && req.major_item_id === rmi.id"
                        column
                      >
                        <v-layout row>
                          <v-flex xs3>
                            <v-text-field
                              v-model="expected_dev.request_date"
                              label="要求日"
                              my-0
                              md-0
                              pa-0
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs3>
                            <v-select
                              v-model="expected_dev.request_type"
                              :items="expected_development_types"
                              item-text="type"
                              item-value="id"
                              label="分類"
                              mb-0
                            ></v-select>
                          </v-flex>
                          <v-flex xs3>
                            <v-text-field
                              v-model="expected_dev.estimate"
                              label="人日"
                              @change="calculate(expected_dev.major_item_id,rmi) ,addFixedEstimate(expected_dev)"
                              type="number"
                              my-0
                              md-0
                              pa-0
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-text-field
                          v-model="expected_dev.contents"
                          label="想定される機能"
                          my-0
                          md-0
                          pa-0
                        ></v-text-field>
                      </v-layout>
                    </v-layout>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-flex>
          <v-flex xs1>
            <v-layout justify-end column fill-height wrap>
              <v-text-field
                v-model="rmi.estimate_sum"
                type="number"
                label="合計"
                @click="calculate(expected_dev.major_item_id,rmi)"
                box
                disabled
                my-0
                md-0
                pa-0
              ></v-text-field>
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
    if (!this.request_major_items.length) this.fetchRequestMajorItems();
    if (!this.requests.length) this.fetchRequests();
    if (!this.expected_developments.length) this.fetchExpectedDevelopments();
  },
  computed: mapGetters([
    "request_major_items",
    "requests",
    "expected_developments"
  ]),
  data() {
    return {
      major_item: {},
      request: {},
      expected_development: {},
      request_types: [
        { id: 1, type: "画面" },
        { id: 2, type: "機能" },
        { id: 3, type: "非機能" },
        { id: 4, type: "業務" }
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
    addRmi() {
      if (this.major_item.name === "") return;
      this.major_item.estimate_sum = 0;
      this.date = new Date();
      this.major_item.request_date = this.formatDate(this.date, "yyyy/M/d");
      this.addRequestMajorItem(this.major_item);
      this.major_item = {};
    },
    addReq() {
      if (this.request.contents === "") return;
      this.date = new Date();
      this.request.request_date = this.formatDate(this.date, "yyyy/M/d");
      this.addRequest(this.request);
      this.request = {};
    },
    addExpectedDev(id) {
      if (this.expected_development.contents === "") return;
      this.requests.forEach(target => {
        if (id === target.id) {
          this.expected_development.major_item_id = target.major_item_id;
        }
      });
      this.expected_development.estimate = 0;
      this.date = new Date();
      this.expected_development.request_date = this.formatDate(
        this.date,
        "yyyy/M/d"
      );
      this.addExpectedDevelopment(this.expected_development);
      this.expected_development = {};
    },
    addFixedEstimate(expected_dev) {
      expected_dev.fixed_estimate = expected_dev.estimate;
    },
    formatDate(date, format) {
      format = format.replace(/yyyy/g, date.getFullYear());
      format = format.replace(/M/g, date.getMonth() + 1);
      format = format.replace(/d/g, date.getDate());
      return format;
    },
    calculate(id, rmi) {
      var sum = 0;
      rmi.estimate_sum = null;

      this.expected_developments.forEach(target => {
        if (id === target.major_item_id) {
          sum += parseInt(target.estimate);
        }
        rmi.estimate_sum = sum;
      });
    },
    updateAll() {
      this.request_major_items.forEach(target_rmi => {
        this.updateRequestMajorItem({
          id: target_rmi.id,
          request_major_item: target_rmi
        });
      });
      this.requests.forEach(target_req => {
        this.updateRequest({
          id: target_req.id,
          request: target_req
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
      "addRequestMajorItem",
      "addRequest",
      "addExpectedDevelopment",
      "fetchRequests",
      "fetchRequestMajorItems",
      "fetchExpectedDevelopments",
      "updateRequestMajorItem",
      "updateRequest",
      "updateExpectedDevelopment"
    ])
  }
};
</script>


