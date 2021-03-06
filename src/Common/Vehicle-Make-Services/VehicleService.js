// Vehicle images
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

class VehicleService {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.vehicles = [
      {
        makeId: "2",
        model: "E55 AMG",
        year: "2007",
        horsePower: "350",
        engine: "5.5 V8",
        id: 1,
        img: mercedes_e55,
      },
      {
        makeId: "4",
        model: "F430 Scuderia",
        year: "2009",
        horsePower: "483",
        engine: "4.3 V8",
        id: 2,
        img: ferrari_f430,
      },
      {
        makeId: "1",
        model: "E39 M5",
        year: "2002",
        horsePower: "400",
        engine: "4.9 V8",
        id: 3,
        img: bmw_m5,
      },
      {
        makeId: "7",
        model: "r35 GTR",
        year: "2007",
        horsePower: "479",
        engine: "3.8 L twin-turbocharged",
        id: 4,
        img: nissan_r35,
      },

      {
        makeId: "9",
        model: "DB9",
        year: "2003",
        horsePower: "510",
        engine: "5.9 V12",
        id: 5,
        img: astonMartin_db9,
      },
      {
        makeId: "8",
        model: "Lancer EVO 9",
        year: "2005",
        horsePower: "287",
        engine: "2.0 L ",
        id: 6,
        img: misthubishi_evo9,
      },
      {
        makeId: "5",
        model: "Huracan",
        year: "2017",
        horsePower: "602",
        engine: "5.2 L V10",
        id: 7,
        img: lamborghini_huracan,
      },
      {
        makeId: "6",
        model: "991 GT2",
        year: "2011",
        horsePower: "691",
        engine: "3.8 L twin-turbocharged",
        id: 8,
        img: porsche_991,
      },
      {
        makeId: "2",
        model: "CLS 63 AMG",
        year: "2017",
        horsePower: "577",
        engine: "5.5L twin-turbo V8",
        id: 9,
        img: mercedes_cls_63,
      },
      {
        makeId: "3",
        model: "S8",
        year: "2020",
        horsePower: "563",
        engine: "4.0 V8",
        id: 10,
        img: audi_s8,
      },
      {
        makeId: "4",
        model: "F12 Berlinetta",
        year: "2014",
        horsePower: "731",
        engine: "6.3 V12",
        id: 11,
        img: ferrari_f12,
      },
      {
        makeId: "5",
        model: "Diablo",
        year: "1990",
        horsePower: "510",
        engine: "6.0 L V12",
        id: 12,
        img: lamborghini_diablo,
      },
    ];
  }

  getVehicles = () => this.vehicles;

  addVehicle = (data) => this.vehicles.push(data);

  editVehicle = (data) => (this.vehicles = data);

  // If??ID??was??passed??down??to??function??filter??trough??vehicles??and??remove??vehicle??with??that??ID.??If??make??was??passed??down??to??function??that??means??that??user??deleted??make, so??I??removed??all??vehicles??containing??that??make
  deleteVehicle = (id, makeId) => {
    this.vehicles = this.vehicles.filter((vehicle) => {
      if (id) {
        return vehicle.id !== id;
      }
      if (makeId) {
        return vehicle.makeId !== makeId;
      }
      return vehicle;
    });
  };
}

export default VehicleService;
