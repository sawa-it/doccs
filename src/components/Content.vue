<template>
  <div v-if="activeTab === 1">
    <!-- プロジェクト計画 -->
    <ProjectPlan/>
  </div>
  <div v-else-if="activeTab === 2">
    <!-- 課題管理 -->
    <ProblemManagement/>
  </div>
  <div v-else-if="activeTab === 3">
    <!-- 要求整理 -->
    <RequirementsConsolidation/>
  </div>
  <div v-else-if="activeTab === 4">
    <!-- 要件定義 -->
    <RequirementDefinition/>
  </div>
  <div v-else-if="activeTab === 5">
    <!-- 設計 -->
    <Design/>
  </div>
</template>

<script>
import ProjectPlan from "./ProjectPlan";
import ProblemManagement from "./ProblemManagement";
import RequirementsConsolidation from "./RequirementsConsolidation";
import RequirementDefinition from "./RequirementDefinition";
import Design from "./Design";
import { mapGetters } from "vuex";

export default {
  computed: mapGetters(["activeTab"]),
  components: {
    ProjectPlan,
    ProblemManagement,
    RequirementsConsolidation,
    RequirementDefinition,
    Design
  }
};
</script>

