<template>
  <div id="home">
    <react-wrapper-component />
  </div>
</template>
<script type="module">
import { ReactInVue } from "vuera";
import RegularPageComponent from "./RegularPage.js";

import { computed, defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "Home",
  components: {
    "react-wrapper-component": ReactInVue(RegularPageComponent),
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {},
});
</script>
<style lang="scss">
#layout {
  max-width: inherit !important;
}
.sf-footer {
  margin-top: 0px !important;
}
</style>