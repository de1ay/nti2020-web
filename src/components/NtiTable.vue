<template>
  <table class="nti-table nti-table--rounded" :class="tableClasses">
    <thead class="nti-table__header">
      <tr>
        <th v-for="(item, index) in $props.columnsDefs" :key="index"
          :class="getClasses(item)">
          {{ item.title }}
        </th>
        <th v-if="isDefaultActionsOn" class="cell--actions">
          {{ $props.defaultActions.isTitleHidden ? '' : 'Действия'}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="nti-table__row" v-for="(row, rowIndex) in $props.data"
        :key="rowIndex">
        <td class="nti-table__cell" :class="getBodyClasses(columnDef)" 
          v-for="(columnDef, index) in $props.columnsDefs" :key="index">
          <!-- div required for flex layout -->
          <div>
            <slot :name="columnDef.name" :columnDef="columnDef" :row="row" 
              :rowIndex="rowIndex" :isEmpty="isEmpty(row, columnDef)">
              <span v-if="isEmpty(row, columnDef)">
                {{ columnDef.emptyText || '-' }}
              </span>
              <span v-else>
                {{ getDisplayText(row[columnDef.prop], columnDef) }}
              </span>
            </slot>
          </div>
        </td>
        <td v-if="isDefaultActionsOn" class="cell--actions">
          <div>
            <v-icon v-if="$props.defaultActions.edit"
              class="nti-icon--primary nti-icon--hover" name="edit"
              @click="$emit('edit', row, rowIndex)"/>
            <v-icon v-if="$props.defaultActions.delete"
              class="nti-icon--secondary nti-icon--hover" name="trash" scale="0.9"
              @click="$emit('delete', row, rowIndex)"/>
          </div>
        </td>
      </tr>
    </tbody>
    <div v-if="!$props.options.hideEmptyText && (!$props.data || $props.data.length === 0)"
      class="nti-table__notify">
      {{ $props.options.emptyText || 'Нет данных для отображения' }}
    </div>
  </table>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      dateFormatOptions: {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
      },
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columnsDefs: {
      required: true,
      type: Array,
    },
    options: {
      type: Object,
      default: () => {
        return {
          hideHeader: false,
          hideBottomBorder: false,
        };
      },
    },
    defaultActions: {
      type: Object,
      default: () => {
        return {
          defaultActions: {
            isTitleHidden: false,
            edit: false,
            delete: false,
          },
        };
      },
    },
  },
  computed: {
    tableClasses() {
      return {
        'nti-table--no-header': this.$props.options.hideHeader,
        'nti-table--no-b_border': this.$props.options.hideBottomBorder,
      };
    },
    isDefaultActionsOn() {
      return !!this.$props.defaultActions.edit || !!this.$props.defaultActions.delete;
    },
  },
  methods: {
    getClasses(columnDef) {
      return {
        'cell--a_left': columnDef.align === 'left' ? true : false,
        'cell--a_right': columnDef.align === 'right' ? true : false,
        'cell--a_center': columnDef.align === 'center' ? true : false,
        'cell--actions': columnDef.isActions,
      };
    },
    getBodyClasses(columnDef) {
      return {
        ...this.getClasses(columnDef),
        'cell--bold': columnDef.fontStyle === 'bold' ? true : false,
        'cell--secondary': columnDef.fontStyle === 'secondary' ? true : false,
      };
    },
    isEmpty(row, columnDef) {
      return !row[columnDef.prop]
        || row[columnDef.prop] === {}
        || (row[columnDef.prop].length !== undefined && row[columnDef.prop].length === 0)
    },
    getDisplayText(data, columnDef) {
      if (columnDef.type && columnDef.type === `date` ) {
        let date = new Date(data);
        return date.toLocaleString('ru-RU', this.dateFormatOptions);
      }
      return data;
    }
  },
}
</script>

<style lang="scss" scoped>
.nti-table {
  width: 100%;

  td, th {
    padding: 14px 24px;
    color: black;//$surface;
  }

  th {
    font-size: 12px;
    font-weight: bold;
    text-align: left;
    vertical-align: bottom;
  }

  .cell-container {
    min-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    > .cell-container {
      min-height: 0;
    }

  }

  .cell--bold {
    font-weight: bold;

    input:disabled {
      font-weight: bold;
    }

  }

  .cell--secondary {
    color: $neutralLight;
    font-size: 12px;

    input:disabled {
      color: $neutralLight;
      font-size: 12px;
    }

  }

  .cell--a_left {
    text-align: left;
    
    > div {
      justify-content: flex-start;
    }

    input:disabled {
      text-align: left;
    }

  }

  .cell--a_center {
    text-align: center;
    
    > div {
      justify-content: center;
    }

    input:disabled {
      text-align: center;
    }

  }

  .cell--a_right {
    text-align: right;

    > div {
      justify-content: flex-end;
    }

    input:disabled {
      text-align: right;
    }

  }

  .cell--actions {
    text-align: center;

    > div {
      justify-content: center;

      > * {
        margin-right: 10px;
      }

      > *:hover {
        cursor: pointer;
      }

      > :last-child {
        margin-right: 0;
      }

    }

  }

  &__header {
    width: 100%;
    background: $neutralLightest;

    > tr {
      height: 32px;
    }

  }

  &__row {
    background: #fff;
    border-bottom: 1px solid #D8DDEF;

    > td {
      font-size: 14px;
      vertical-align: middle;

      > div {
        height: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

    }

  }

  &__row:first-child {
    border-top: 1px solid #D8DDEF;
  }

  &__notify {
    padding: 10px 15px;
    width: 100%;
  } 

  &--rounded {
    
    .nti-table__header {
      
      > tr > th:first-child {
        border-radius: 5px 0 0 0;
      }

      > tr > th:last-child {
        border-radius: 0 5px 0 0;
      }

    }

    .nti-table__row:last-child {

      > td:first-child {
        border-radius: 0 0 0 5px;
      }

      > td:last-child {
        border-radius: 0 0 5px 0;
      }
      
    }

  }

  &--no-header > thead {
    display: none;
  }

  &--no-b_border > tbody > tr:last-child {
    border-bottom: none;
  }

}
</style>
