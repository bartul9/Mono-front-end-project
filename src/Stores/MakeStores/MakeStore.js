import { observable } from "mobx";

import { v4 as uuid } from "uuid";

import {
  mercedes_logo,
  bmw_logo,
  audi_logo,
  ferrari_logo,
  lamborghini_logo,
  nissan_logo,
  porsche_logo,
  mitsubishi_logo,
  astonMartin_logo,
  ford_logo,
} from "../../images/MakeImages/index";

class MakeStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.storeData = observable({
      makes: [
        {
          make: "BMW",
          country: "Germany",
          founded: "March 7, 1916",
          logo: bmw_logo,
          id: uuid(),
        },
        {
          make: "Mercedes",
          country: "Germany",
          founded: "1926",
          logo: mercedes_logo,
          id: uuid(),
        },
        {
          make: "Audi",
          country: "Germany",
          founded: "June 29, 1932",
          logo: audi_logo,
          id: uuid(),
        },
        {
          make: "Ferrari",
          country: "Italy",
          founded: "1947",
          logo: ferrari_logo,
          id: uuid(),
        },
        {
          make: "Lamborghini",
          country: "Italy",
          founded: "May 1963",
          logo: lamborghini_logo,
          id: uuid(),
        },
        {
          make: "Porsche",
          country: "Germany",
          founded: "April 25, 1931",
          logo: porsche_logo,
          id: uuid(),
        },
        {
          make: "Nissan",
          country: "Japan",
          founded: "December 26, 1933",
          logo: nissan_logo,
          id: uuid(),
        },
        {
          make: "Mitsubishi",
          country: "Japan",
          founded: "1870",
          logo: mitsubishi_logo,
          id: uuid(),
        },
        {
          make: "Aston Martin",
          country: "Great Britain",
          founded: "January 15, 1913",
          logo: astonMartin_logo,
          id: uuid(),
        },
        {
          make: "Ford",
          country: "USA",
          founded: "June 16, 1903",
          logo: ford_logo,
          id: uuid(),
        },
      ],
    });
  }
}

export default MakeStore;
