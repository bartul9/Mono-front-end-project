import { observable } from "mobx";

// Import images for vehicles
import {
  bmw_m5,
  mercedes_e55,
  nissan_r35,
  ferrari_f430,
  astonMartin_db9,
  misthubishi_evo9,
  porsche_991,
  lamborghini_huracan,
  mercedes_cls_63,
  audi_s8,
  ferrari_f12,
  lamborghini_diablo,
} from "../../images/VehicleImages";

// UUID unique ID generator for vehicles ID
import { v4 as uuid } from "uuid";

// Disabeling forced actions so I don't have warning when I'm not using action in front of functions
import { configure } from "mobx";
configure({
  enforceActions: "never",
});

class MainStore {
  // Vehicles array
  vehicles = [
    {
      make: "Mercedes",
      model: "E55 AMG",
      year: "2007",
      horsePower: "350",
      engine: "5.5 V8",
      id: uuid(),
      img: mercedes_e55,
    },
    {
      make: "Ferrari",
      model: "F430 Scuderia",
      year: "2009",
      horsePower: "483",
      engine: "4.3 V8",
      id: uuid(),
      img: ferrari_f430,
    },
    {
      make: "BMW",
      model: "E39 M5",
      year: "2002",
      horsePower: "400",
      engine: "4.9 V8",
      id: uuid(),
      img: bmw_m5,
    },
    {
      make: "Nissan",
      model: "r35 GTR",
      year: "2007",
      horsePower: "479",
      engine: "3.8 L twin-turbocharged",
      id: uuid(),
      img: nissan_r35,
    },

    {
      make: "Aston Martin",
      model: "DB9",
      year: "2003",
      horsePower: "510",
      engine: "5.9 V12",
      id: uuid(),
      img: astonMartin_db9,
    },
    {
      make: "Mitsubishi",
      model: "Lancer EVO 9",
      year: "2005",
      horsePower: "287",
      engine: "2.0 L ",
      id: uuid(),
      img: misthubishi_evo9,
    },
    {
      make: "Lamborghini",
      model: "Huracan",
      year: "2017",
      horsePower: "602",
      engine: "5.2 L V10",
      id: uuid(),
      img: lamborghini_huracan,
    },
    {
      make: "Porsche",
      model: "991 GT2",
      year: "2011",
      horsePower: "691",
      engine: "3.8 L twin-turbocharged",
      id: uuid(),
      img: porsche_991,
    },
    {
      make: "Mercedes",
      model: "CLS 63 AMG",
      year: "2017",
      horsePower: "577",
      engine: "5.5L twin-turbo V8",
      id: uuid(),
      img: mercedes_cls_63,
    },
    {
      make: "Audi",
      model: "S8",
      year: "2020",
      horsePower: "563",
      engine: "4.0 V8",
      id: uuid(),
      img: audi_s8,
    },
    {
      make: "Ferrari",
      model: "F12 Berlinetta",
      year: "2014",
      horsePower: "731",
      engine: "6.3 V12",
      id: uuid(),
      img: ferrari_f12,
    },
    {
      make: "Lamborghini",
      model: "Diablo",
      year: "1990",
      horsePower: "510",
      engine: "6.0 L V12",
      id: uuid(),
      img: lamborghini_diablo,
    },
  ];
  storeData = observable({
    showingVehicles: [...this.vehicles],
    showAllVehicles: false,
    isEditing: false,
    makePage: false,
  });
}

export default MainStore;
