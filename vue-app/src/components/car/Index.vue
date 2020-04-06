<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">Placas</th>
          <th class="text-left">Marca</th>
          <th class="text-left">Color</th>
          <th class="text-left">Modelo</th>
          <th class="text-left">Posición</th>
          <th class="text-left">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(car, index) in cars" :key="car.id">
          <td>{{ car.plate}}</td>
          <td>{{ car.brand}}</td>
          <td>{{ car.color}}</td>
          <td>{{ car.model}}</td>
          <td>
            lat: {{ car.position.lat }}, lng: {{ car.position.lng }}
          </td>
          <td>
            <v-btn icon color="primary" title="editar" @click="showEditDialog(index, car)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon color="secondary" title="actualizar posición" @click="showPositionDialog(index, car)">
              <v-icon>mdi-crosshairs-gps</v-icon>
            </v-btn>
            <v-btn icon color="error" title="eliminar" @click="showDeleteDialog(index, car)">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <GmapMap
      :center="defaultMapPosition"
      :zoom="15"
      style="width: 100%; height: 500px"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPosition"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"/>
      <GmapMarker
        v-for="(car, index) in cars"
        :key="index"
        :position="car.position"
        :icon="require('../../assets/car.png')"
        :title="car.plate"
        :clickable="true"
        :draggable="true"
        @dragend="updatePosition(index, car, $event.latLng)"
        @click="toggleInfoWindow(index, car)"
      />
    </GmapMap>
    <edit/>
    <delete/>
    <position/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Edit from './Edit';
  import Delete from './Delete';
  import Position from './Position';

  export default {
    name: 'Index',
    components: {
      Edit,
      Delete,
      Position
    },
    data() {
      return {
        defaultMapPosition: {
          lat: 20.6811036, lng: -103.3722313
        },
        infoWindowPosition: null,
        infoWinOpen: false,
        currentMarker: null,
        infoOptions: {
          content: '',
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
      }
    },
    mounted() {
      this.index();
      this.$store.dispatch('car/initSocket');
    },
    methods: {
      index() {
        this.$store.dispatch('car/index');
      },
      showEditDialog(index, car) {
        this.$store.dispatch('car/showEditDialog', true);
        this.$store.dispatch('car/setCarToEdit', {index, ...car});
      },
      showDeleteDialog(index, car) {
        this.$store.dispatch('car/showDeleteDialog', true);
        this.$store.dispatch('car/setCarToDelete', {index, ...car});
      },
      showPositionDialog(index, car) {
        this.$store.dispatch('car/showPositionDialog', true);
        this.$store.dispatch('car/setCarToPosition', {index, ...car});
      },
      toggleInfoWindow: function (index, marker) {
        this.infoWindowPosition = marker.position;
        this.infoOptions.content = `Placa: ${marker.plate},
                                    Marca: ${marker.brand},
                                    Color: ${marker.color},
                                    Modelo: ${marker.model}`;
        if (this.currentMarker === index) {
          this.infoWinOpen = !this.infoWinOpen;
        } else {
          this.infoWinOpen = true;
          this.currentMarker = index;
        }
      },
      updatePosition(index, car, latLng) {
        const position = {
          index: index,
          id: car.id,
          lat: latLng.lat(),
          lng: latLng.lng(),
        };
        this.$store.dispatch('car/updatePosition', position);
      }
    },
    computed: {
      ...mapState('car', ['cars']),
    }
  }
</script>

<style scoped>

</style>
