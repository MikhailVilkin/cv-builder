<template>
  <div class="container">
    <CVMaker class="block maker" :style="{ flex: '0' + '0' + leftWidth + '%' }" @generatePDF="this.$refs.CVPreview.generatePDF();"/>
    <div class="resizer" @mousedown="startDrag">
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <CVPreview class="preview" :style="{ flex: '0' + '0' + rightWidth + '%' }" ref="CVPreview"/>
  </div>
</template>

<script>
import CVMaker from './components/CVMaker.vue'
import CVPreview from './components/CVPreview.vue'

export default {
  name: 'App',
  components: {
    CVMaker,
    CVPreview
  },
  data() {
    return {
      dragging: false,
      startX: 0,
      startLeftWidth: 40,
      startRightWidth: 60
    }
  },
  computed: {
      leftWidth() {
          return this.dragging ? this.startLeftWidth : 100 * this.startLeftWidth / (this.startLeftWidth + this.startRightWidth);
      },
      rightWidth() {
          return this.dragging ? this.startRightWidth : 100 * this.startRightWidth / (this.startLeftWidth + this.startRightWidth);
      },
      count() {
        return this.$store.state.count;
      }
  },
  methods: {
      startDrag() {
          this.dragging = true;

          const moveHandler = (event) => {
              const delta = event.clientX / this.$el.offsetWidth * 100 - 5
              if (delta >= 30 && delta <= 60) {
                this.startLeftWidth = delta;
                this.startRightWidth = 100 - this.startLeftWidth;
              }
          };

          const endHandler = () => {
              this.dragging = false;
              document.removeEventListener('mousemove', moveHandler);
              document.removeEventListener('mouseup', endHandler);
          };

          document.addEventListener('mousemove', moveHandler);
          document.addEventListener('mouseup', endHandler);
      }
  }
}
</script>

<style>
#app {
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


.container {
  display: flex;
  width: auto;
  margin: 5%;
  justify-content: space-between;
}

.block {
  width: 100%;
  padding: 5%;
}

.resizer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
  width: 40px;
  cursor: ew-resize;
}

.line {
    width: 1px;
    height: 30px; /* Example height */
    background-color: gray;
}

.preview > * {
  user-select: none;
}

</style>
