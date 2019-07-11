<template>
  <v-app>
    <Tabs/>
    <Content/>
  </v-app>
</template>

<script>
import Tabs from "../components/Tabs";
import Content from "../components/Content";

export default {
  components: {
    Tabs,
    Content
  }
};
</script>
