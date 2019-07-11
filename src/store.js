/* eslint-disable no-undef */
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
    project_plans: [],
    problems: [],
    requests: [],
    request_major_items: [],
    expected_developments: [],
    definitions: [],
    designs: [],
    active_tab: 1
  },
  mutations: {
    setLoginUser(state, user) {
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null;
    },
    setActiveTab(state, active_tab) {
      state.active_tab = active_tab;
    },
    addProjectPlan(state, { id, project_plan }) {
      project_plan.id = id;
      state.project_plans.push(project_plan);
    },
    updateProjectPlan(state, { id, project_plan }) {
      const index = state.project_plans.findIndex(
        project_plan => project_plan.id === id
      );
      state.project_plans[index] = project_plan;
    },
    addProblem(state, { id, problem }) {
      problem.id = id;
      state.problems.push(problem);
    },
    updateProblem(state, { id, problem }) {
      const index = state.problems.findIndex(problem => problem.id === id);
      state.problems[index] = problem;
    },
    addRequestMajorItem(state, { id, request_major_item }) {
      request_major_item.id = id;
      state.request_major_items.push(request_major_item);
    },
    updateRequestMajorItem(state, { id, request_major_item }) {
      const index = state.request_major_items.findIndex(
        request_major_item => request_major_item.id === id
      );
      state.request_major_items[index] = request_major_item;
    },
    addRequest(state, { id, request }) {
      request.id = id;
      state.requests.push(request);
    },
    updateRequest(state, { id, request }) {
      const index = state.requests.findIndex(request => request.id === id);
      state.requests[index] = request;
    },
    addExpectedDevelopment(state, { id, expected_development }) {
      expected_development.id = id;
      state.expected_developments.push(expected_development);
    },
    updateExpectedDevelopment(state, { id, expected_development }) {
      const index = state.expected_developments.findIndex(
        expected_development => expected_development.id === id
      );
      state.expected_developments[index] = expected_development;
    },
    addDefinition(state, { id, definition }) {
      definition.id = id;
      state.definitions.push(definition);
    },
    updateDefinition(state, { id, definition }) {
      const index = state.definitions.findIndex(
        definition => definition.id === id
      );
      state.definitions[index] = definition;
    },
    addDesign(state, { id, design }) {
      design.id = id;
      state.designs.push(design);
    },
    updateDesign(state, { id, design }) {
      const index = state.designs.findIndex(design => design.id === id);
      state.designs[index] = design;
    }
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    logout() {
      firebase.auth().signOut();
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    setActiveTab({ commit }, active_tab) {
      commit("setActiveTab", active_tab);
    },
    fetchProjectPlans({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/project_plans`)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit("addProjectPlan", { id: doc.id, project_plan: doc.data() })
          );
        });
    },
    addProjectPlan({ getters, commit }, project_plan) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/project_plans`)
          .add(project_plan)
          .then(doc => {
            commit("addProjectPlan", { id: doc.id, project_plan });
          });
      }
    },
    updateProjectPlan({ getters, commit }, { id, project_plan }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/project_plans`)
          .doc(id)
          .update(project_plan)
          .then(() => {
            commit("updateProjectPlan", { id, project_plan });
          });
      }
    },
    fetchProblems({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/problems`)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit("addProblem", { id: doc.id, problem: doc.data() })
          );
        });
    },
    addProblem({ getters, commit }, problem) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/problems`)
          .add(problem)
          .then(doc => {
            commit("addProblem", { id: doc.id, problem });
          });
      }
    },
    updateProblem({ getters, commit }, { id, problem }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/problems`)
          .doc(id)
          .update(problem)
          .then(() => {
            commit("updateProblem", { id, problem });
          });
      }
    },
    fetchRequests({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/requests`)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit("addRequest", { id: doc.id, request: doc.data() })
          );
        });
    },
    addRequest({ getters, commit }, request) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/requests`)
          .add(request)
          .then(doc => {
            commit("addRequest", { id: doc.id, request });
          });
      }
    },
    updateRequest({ getters, commit }, { id, request }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/requests`)
          .doc(id)
          .update(request)
          .then(() => {
            commit("updateRequest", { id, request });
          });
      }
    },
    fetchRequestMajorItems({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/request_major_items`)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit("addRequestMajorItem", {
              id: doc.id,
              request_major_item: doc.data()
            })
          );
        });
    },
    addRequestMajorItem({ getters, commit }, request_major_item) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/request_major_items`)
          .add(request_major_item)
          .then(doc => {
            commit("addRequestMajorItem", { id: doc.id, request_major_item });
          });
      }
    },
    updateRequestMajorItem({ getters, commit }, { id, request_major_item }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/request_major_items`)
          .doc(id)
          .update(request_major_item)
          .then(() => {
            commit("updateRequestMajorItem", { id, request_major_item });
          });
      }
    },
    fetchExpectedDevelopments({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/expected_developments`)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit("addExpectedDevelopment", {
              id: doc.id,
              expected_development: doc.data()
            })
          );
        });
    },
    addExpectedDevelopment({ getters, commit }, expected_development) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/expected_developments`)
          .add(expected_development)
          .then(doc => {
            commit("addExpectedDevelopment", {
              id: doc.id,
              expected_development
            });
          });
      }
    },
    updateExpectedDevelopment(
      { getters, commit },
      { id, expected_development }
    ) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/expected_developments`)
          .doc(id)
          .update(expected_development)
          .then(() => {
            commit("updateExpectedDevelopment", { id, expected_development });
          });
      }
    },
    fetchDefinitions({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/definitions`)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit("addDefinition", {
              id: doc.id,
              definition: doc.data()
            })
          );
        });
    },
    addDefinition({ getters, commit }, definition) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/definitions`)
          .add(definition)
          .then(doc => {
            commit("addDefinition", {
              id: doc.id,
              definition
            });
          });
      }
    },
    updateDefinition({ getters, commit }, { id, definition }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/definitions`)
          .doc(id)
          .update(definition)
          .then(() => {
            commit("updateExpectedDevelopment", { id, definition });
          });
      }
    },
    addDesign({ getters, commit }, design) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/designs`)
          .add(design)
          .then(doc => {
            commit("addDesign", { id: doc.id, design });
          });
      }
    },
    updateDesign({ getters, commit }, { id, design }) {
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/designs`)
          .doc(id)
          .update(design)
          .then(() => {
            commit("updateDesign", { id, design });
          });
      }
    },
    fetchDesigns({ getters, commit }) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/designs`)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit("addDesign", { id: doc.id, design: doc.data() })
          );
        });
    }
  },
  getters: {
    userName: state => (state.login_user ? state.login_user.displayName : ""),
    uid: state => (state.login_user ? state.login_user.uid : null),
    project_reports: state =>
      state.project_reports ? state.project_reports : "",
    meeting_minutes: state =>
      state.meeting_minutes ? state.meeting_minutes : "",
    project_plans: state => (state.project_plans ? state.project_plans : ""),
    problems: state => (state.problems ? state.problems : ""),
    requests: state => (state.requests ? state.requests : ""),
    request_major_items: state =>
      state.request_major_items ? state.request_major_items : "",
    expected_developments: state =>
      state.expected_developments ? state.expected_developments : "",
    definitions: state => (state.definitions ? state.definitions : ""),
    designs: state => (state.designs ? state.designs : ""),
    activeTab: state => (state.active_tab ? state.active_tab : ""),
    tab_titles: state => (state.tab_titles ? state.tab_titles : "")
  }
});
