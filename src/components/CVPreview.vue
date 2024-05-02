<template>
  <vue3-simple-html2pdf
      ref="vue3SimpleHtml2pdf"
      :options="pdfOptions"
      :filename="exportFilename">
  <div class="CVPreview" :style="{ backgroundColor: bgColor, '--gap': gap }" @dragover="dragOver">
    <CVHeader/>
    <CVDescription/>
    <div class="columns">
      <div class="column" id="left-column">
        <CVBlock :title="'Experience'" 
                 :items="experience" 
                 class="CVBlock" 
                 draggable="true" 
                 @dragstart="dragStart" 
                 @dragend="dragEnd" />
        <CVBlock :title="'Languages'" 
                 :items="languages" 
                 class="CVBlock" 
                 draggable="true" 
                 @dragstart="dragStart" 
                 @dragend="dragEnd"/>
      </div>
      <div class="column" id="right-column">
        <CVBlock :title="'Technical Skills'" 
                 :items="technical_skills" 
                 class="CVBlock" 
                 draggable="true" 
                 @dragstart="dragStart" 
                 @dragend="dragEnd" 
                 />
        <CVBlock :title="'Soft Skills'" 
                 :items="soft_skills" 
                 class="CVBlock" 
                 draggable="true" 
                 @dragstart="dragStart" 
                 @dragend="dragEnd" />
      </div>
    </div>
  </div>
  
</vue3-simple-html2pdf>
</template>

<script>

import CVHeader from './CVHeader.vue'
import CVDescription from './CVDescription.vue'
import CVBlock from './CVBlock.vue'

export default {
  name: 'CVPreview',
  components: {
    CVHeader,
    CVDescription,
    CVBlock
  },
  data() {
    return {
      pdfOptions: {
        margin: 0,
        image: {
          type: 'png',
          quality: 1,
        },
        html2canvas: { scale: 3 },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'p',
        },
      },
      exportFilename: 'my-custom-file.pdf'
    }
  },
  computed: {
    languages() { return this.$store.state.languages; },
    experience() { return this.$store.state.experience; },
    technical_skills() { return this.$store.state.technical_skills; },
    soft_skills() { return this.$store.state.soft_skills; },
    bgColor() { return this.$store.state.bgColor; },
    gap() { return this.$store.state.gap; }
  },
  methods: {
    dragStart(el) {
      el.target.classList.add('dragging');

      const columns = document.querySelectorAll('.column');
      columns.forEach(function(column) {
        column.classList.add('highlited-borders');
      });

    },
    dragEnd(el) {
      el.target.classList.remove('dragging');

      document.querySelectorAll('.column').forEach(function(column) {
        column.classList.remove('highlited-borders');
      });

    },
    dragOver(event) {
      if (event.target.matches('.CVBlock')) {
        this.allowDrop(event);
      }
      if (event.target.matches('.column')) {
        this.columnDraggedOver(event);
      }
    },
    allowDrop(event) {
      event.preventDefault();
      var dragOver = event.target;
      var dragOverParent = dragOver.parentElement;
      var beingDragged = document.querySelector(".dragging");
      var draggedParent = beingDragged.parentElement;
      var draggedIndex = this.whichChild(beingDragged);
      var dragOverIndex = this.whichChild(dragOver);
      if (draggedParent === dragOverParent) {
        if (draggedIndex < dragOverIndex) {
          draggedParent.insertBefore(dragOver, beingDragged);
        }
        if (draggedIndex > dragOverIndex) {
          draggedParent.insertBefore(dragOver, beingDragged.nextSibling);
        }
      }
      if (draggedParent !== dragOverParent) {
        dragOverParent.insertBefore(beingDragged, dragOver);
      }
    },
    columnDraggedOver(event) {
      event.preventDefault();
      var dragOver = event.target;
      var beingDragged = document.querySelector(".dragging");
      var draggedParent = beingDragged.parentElement;
      if (draggedParent.id !== dragOver.id && 
          draggedParent.classList.contains('column') && 
          dragOver.classList.contains('column')) {
        dragOver.appendChild(beingDragged)
      }
    },
    whichChild(el) {
      var i = 0;
      while ((el = el.previousSibling) != null) ++i;
      return i;
    },
      generatePDF() {
        this.$refs.vue3SimpleHtml2pdf.download();
      }
  },
  mounted() {
  }
}

</script>

<style scoped>
.CVPreview {
  padding: var(--gap);
  display: flex;
  gap: var(--gap);
  flex-direction: column;

  height: auto;

  padding-bottom: 10%;
}

.columns {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.columns > * {
  flex: 0 0 calc(50% - calc(var(--gap)/2));
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.column {
  min-height: 50px;
}

.dragging {
  opacity: 0.5;
}


.highlited-borders {
  border: 3px solid whitesmoke;
  border-radius: 10px;
  border-style: dashed;
  padding: 10px;
  padding-bottom: 50px;
}


</style>
