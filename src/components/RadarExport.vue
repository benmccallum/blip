<template>
  <button class="btn btn-primary btn-sm" type="button" v-on:click="exportCsv">
    <i class="fa fa-floppy-o"></i> Export
  </button>
</template>

<script>
  import FileSaver from 'file-saver';

  export default {
    name: 'radar-export',
    props: {
      sortedPlaces: Array
    },
    methods: {
      exportCsv () {
        const blob = new Blob([this.buildCsvContent()], { type: 'text/csv;charset=utf-8' });
        FileSaver.saveAs(blob, 'Results by blip.website.csv');
      },
      buildCsvContent () {
        // Header
        let csvContent = '"Name","Website","Address","Phone Number","Uses HTML5?","Security Score","Desktop Score","Mobile Score"\r\n';

        // Data
        const x = (val, transform) => val == null ? 'Unknown' : transform || val;

        this.sortedPlaces.forEach(function (p) {
          csvContent += `"${p.name}","${x(p.website)}"`;
          if (p.website) {
            csvContent +=
              `,"${x(p.vicinity)}","${x(p.ph)}",` +
              `"${x(p.isHtml5.score, p.isHtml5.score ? 'Yes' : 'No')}",` +
              `"${x(p.security.score)}","${x(p.desktop.score)}",` +
              `"${x(p.mobile.score)}","${x(p.mobile.score)}"`
          }
          csvContent += '\r\n';
        });

        return csvContent;
      }
    }
  }
</script>
