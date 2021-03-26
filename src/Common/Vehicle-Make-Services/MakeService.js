// Make images
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
} from "../../images/MakeImages";

class MakeService {
  makes = [
    {
      make: "BMW",
      country: "Germany",
      founded: "March 7, 1916",
      logo: bmw_logo,
      id: 1,
    },
    {
      make: "Mercedes",
      country: "Germany",
      founded: "1926",
      logo: mercedes_logo,
      id: 2,
    },
    {
      make: "Audi",
      country: "Germany",
      founded: "June 29, 1932",
      logo: audi_logo,
      id: 3,
    },
    {
      make: "Ferrari",
      country: "Italy",
      founded: "1947",
      logo: ferrari_logo,
      id: 4,
    },
    {
      make: "Lamborghini",
      country: "Italy",
      founded: "May 1963",
      logo: lamborghini_logo,
      id: 5,
    },
    {
      make: "Porsche",
      country: "Germany",
      founded: "April 25, 1931",
      logo: porsche_logo,
      id: 6,
    },
    {
      make: "Nissan",
      country: "Japan",
      founded: "December 26, 1933",
      logo: nissan_logo,
      id: 7,
    },
    {
      make: "Mitsubishi",
      country: "Japan",
      founded: "1870",
      logo: mitsubishi_logo,
      id: 8,
    },
    {
      make: "Aston Martin",
      country: "Great Britain",
      founded: "January 15, 1913",
      logo: astonMartin_logo,
      id: 9,
    },
    {
      make: "Ford",
      country: "USA",
      founded: "June 16, 1903",
      logo: ford_logo,
      id: 10,
    },
  ];

  getMakes = () => this.makes;

  addMake = (data) => this.makes.push(data);

  deleteMake = (id) =>
    (this.makes = this.makes.filter((make) => make.id !== id));
}

export default MakeService;
