<template>
  <v-container>
    <v-card>
      <v-layout column mb-3>
        <v-layout row>
          <v-subheader>画面遷移図</v-subheader>
          <v-layout justify-end>
            <v-dialog ref="dialog" full-width lazy>
              <template v-slot:activator="{ on }">
                <v-btn flat fab @click="modal = true" v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-form>
                  <v-select
                    v-model="design.definition_id"
                    :items="definitions.filter(req => req.type === (2||3))"
                    item-text="name"
                    item-value="id"
                    label="機能・画面名"
                    single-line
                  ></v-select>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.name" label="設計書名" clearable full-width></v-text-field>
                  </v-flex>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.url" label="URL" clearable full-width></v-text-field>
                  </v-flex>
                  <v-btn color="info" @click="add(1)">追加</v-btn>
                </v-form>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex
              xs4
              v-for="btn in designs.filter(design => design.type === 1)"
              :key="btn.id"
              ma-0
            >
              <v-layout row ma-0>
                <v-btn :href="btn.url" target="_newtab" flat>{{btn.name}}</v-btn>
                <v-dialog ref="dialog" full-width lazy>
                  <template v-slot:activator="{ on }">
                    <v-btn flat color="blue-grey lighten-3" @click="modal = true" v-on="on">
                      <v-icon small>edit</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-form>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.name" label="設計書名" clearable full-width></v-text-field>
                      </v-flex>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.url" label="URL" clearable full-width></v-text-field>
                      </v-flex>
                      <v-btn color="info" @click="update(btn)">更新</v-btn>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-card>
    <v-card>
      <v-layout column mb-3>
        <v-layout row>
          <v-subheader>画面設計</v-subheader>
          <v-layout justify-end>
            <v-dialog ref="dialog" full-width lazy>
              <template v-slot:activator="{ on }">
                <v-btn flat fab @click="modal = true" v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-form>
                  <v-select
                    v-model="design.definition_id"
                    :items="definitions.filter(req => req.type === (2||3))"
                    item-text="name"
                    item-value="id"
                    label="機能・画面名"
                    single-line
                  ></v-select>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.name" label="設計書名" clearable full-width></v-text-field>
                  </v-flex>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.url" label="URL" clearable full-width></v-text-field>
                  </v-flex>
                  <v-btn color="info" @click="add(2)">追加</v-btn>
                </v-form>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex xs4 v-for="btn in designs.filter(design => design.type === 2)" :key="btn.id">
              <v-layout row>
                <v-btn :href="btn.url" target="_newtab" flat>{{btn.name}}</v-btn>
                <v-dialog ref="dialog" full-width lazy>
                  <template v-slot:activator="{ on }">
                    <v-btn flat color="blue-grey lighten-3" @click="modal = true" v-on="on">
                      <v-icon small>edit</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-form>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.name" label="設計書名" clearable full-width></v-text-field>
                      </v-flex>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.url" label="URL" clearable full-width></v-text-field>
                      </v-flex>
                      <v-btn color="info" @click="update(btn)">更新</v-btn>
                    </v-form>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-card>
    <v-card>
      <v-layout column mb-3>
        <v-layout row>
          <v-subheader>API設計</v-subheader>
          <v-layout justify-end>
            <v-dialog ref="dialog" full-width lazy>
              <template v-slot:activator="{ on }">
                <v-btn flat fab @click="modal = true" v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-form>
                  <v-select
                    v-model="design.definition_id"
                    :items="definitions.filter(req => req.type === (4||5))"
                    item-text="name"
                    item-value="id"
                    label="機能・画面名"
                    single-line
                  ></v-select>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.name" label="設計書名" clearable full-width></v-text-field>
                  </v-flex>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.url" label="URL" clearable full-width></v-text-field>
                  </v-flex>
                  <v-btn color="info" @click="add(3)">追加</v-btn>
                </v-form>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex xs4 v-for="btn in designs.filter(design => design.type === 3)" :key="btn.id">
              <v-layout row>
                <v-btn :href="btn.url" target="_newtab" flat>{{btn.name}}</v-btn>
                <v-dialog ref="dialog" full-width lazy>
                  <template v-slot:activator="{ on }">
                    <v-btn flat color="blue-grey lighten-3" @click="modal = true" v-on="on">
                      <v-icon small>edit</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-form>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.name" label="設計書名" clearable full-width></v-text-field>
                      </v-flex>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.url" label="URL" clearable full-width></v-text-field>
                      </v-flex>
                      <v-btn color="info" @click="update(btn)">更新</v-btn>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-btn flat color="blue-grey lighten-3">
                  <v-icon small>edit</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-card>
    <v-card>
      <v-layout column mb-3>
        <v-layout row>
          <v-subheader>バッチ設計</v-subheader>
          <v-layout justify-end>
            <v-dialog ref="dialog" full-width lazy>
              <template v-slot:activator="{ on }">
                <v-btn flat fab @click="modal = true" v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-form>
                  <v-select
                    v-model="design.definition_id"
                    :items="definitions.filter(req => req.type === (4||6))"
                    item-text="name"
                    item-value="id"
                    label="機能・画面名"
                    single-line
                  ></v-select>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.name" label="設計書名" clearable full-width></v-text-field>
                  </v-flex>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.url" label="URL" clearable full-width></v-text-field>
                  </v-flex>
                  <v-btn color="info" @click="add(4)">追加</v-btn>
                </v-form>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex xs4 v-for="btn in designs.filter(design => design.type === 4)" :key="btn.id">
              <v-layout row>
                <v-btn :href="btn.url" target="_newtab" flat>{{btn.name}}</v-btn>
                <v-dialog ref="dialog" full-width lazy>
                  <template v-slot:activator="{ on }">
                    <v-btn flat color="blue-grey lighten-3" @click="modal = true" v-on="on">
                      <v-icon small>edit</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-form>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.name" label="設計書名" clearable full-width></v-text-field>
                      </v-flex>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.url" label="URL" clearable full-width></v-text-field>
                      </v-flex>
                      <v-btn color="info" @click="update(btn)">更新</v-btn>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-btn flat color="blue-grey lighten-3">
                  <v-icon small>edit</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-card>
    <v-card>
      <v-layout column mb-3>
        <v-layout row>
          <v-subheader>データベース設計</v-subheader>
          <v-layout justify-end>
            <v-dialog ref="dialog" full-width lazy>
              <template v-slot:activator="{ on }">
                <v-btn flat fab @click="modal = true" v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-form>
                  <v-select
                    v-model="design.definition_id"
                    :items="definitions.filter(req => req.type === 7)"
                    item-text="name"
                    item-value="id"
                    label="機能・画面名"
                    single-line
                  ></v-select>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.name" label="設計書名" clearable full-width></v-text-field>
                  </v-flex>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.url" label="URL" clearable full-width></v-text-field>
                  </v-flex>
                  <v-btn color="info" @click="add(5)">追加</v-btn>
                </v-form>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex xs4 v-for="btn in designs.filter(design => design.type === 5)" :key="btn.id">
              <v-layout row>
                <v-btn :href="btn.url" target="_newtab" flat>{{btn.name}}</v-btn>
                <v-dialog ref="dialog" full-width lazy>
                  <template v-slot:activator="{ on }">
                    <v-btn flat color="blue-grey lighten-3" @click="modal = true" v-on="on">
                      <v-icon small>edit</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-form>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.name" label="設計書名" clearable full-width></v-text-field>
                      </v-flex>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.url" label="URL" clearable full-width></v-text-field>
                      </v-flex>
                      <v-btn color="info" @click="update(btn)">更新</v-btn>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-btn flat color="blue-grey lighten-3">
                  <v-icon small>edit</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-card>
    <v-card>
      <v-layout column mb-3>
        <v-layout row>
          <v-subheader>インフラ設計</v-subheader>
          <v-layout justify-end>
            <v-dialog ref="dialog" full-width lazy>
              <template v-slot:activator="{ on }">
                <v-btn flat fab @click="modal = true" v-on="on">
                  <v-icon>add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-form>
                  <v-select
                    v-model="design.definition_id"
                    :items="definitions.filter(req => req.type === (4||8))"
                    item-text="name"
                    item-value="id"
                    label="機能・画面名"
                    single-line
                  ></v-select>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.name" label="設計書名" clearable full-width></v-text-field>
                  </v-flex>
                  <v-flex xs12 ma-auto>
                    <v-text-field v-model="design.url" label="URL" clearable full-width></v-text-field>
                  </v-flex>
                  <v-btn color="info" @click="add(6)">追加</v-btn>
                </v-form>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-layout>
        <v-divider></v-divider>
        <v-container grid-list-xs>
          <v-layout row wrap>
            <v-flex xs4 v-for="btn in designs.filter(design => design.type === 6)" :key="btn.id">
              <v-layout row>
                <v-btn :href="btn.url" target="_newtab" flat>{{btn.name}}</v-btn>
                <v-dialog ref="dialog" full-width lazy>
                  <template v-slot:activator="{ on }">
                    <v-btn flat color="blue-grey lighten-3" @click="modal = true" v-on="on">
                      <v-icon small>edit</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-form>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.name" label="設計書名" clearable full-width></v-text-field>
                      </v-flex>
                      <v-flex xs12 ma-auto>
                        <v-text-field v-model="btn.url" label="URL" clearable full-width></v-text-field>
                      </v-flex>
                      <v-btn color="info" @click="update(btn)">更新</v-btn>
                    </v-form>
                  </v-card>
                </v-dialog>
                <v-btn flat　color="blue-grey lighten-3">
                  <v-icon small>edit</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  created() {
    if (!this.definitions.length) this.fetchDefinitions();
    if (!this.designs.length) this.fetchDesigns();
  },
  data() {
    return {
      design: {}
    };
  },
  computed: mapGetters(["definitions", "designs"]),
  methods: {
    add(type) {
      if (this.design.url === "") return;
      if (this.design.name === "") return;
      this.date = new Date();
      this.design.request_date = this.formatDate(this.date, "yyyy/M/d");
      this.design.type = type;
      this.addDesign(this.design);
      this.design = {};
    },
    formatDate(date, format) {
      format = format.replace(/yyyy/g, date.getFullYear());
      format = format.replace(/M/g, date.getMonth() + 1);
      format = format.replace(/d/g, date.getDate());
      return format;
    },
    update(design) {
      this.updateDesign({
        id: design.id,
        design: design
      });
    },
    ...mapActions([
      "fetchDefinitions",
      "addDesign",
      "fetchDesigns",
      "updateDesign"
    ])
  }
};
</script>