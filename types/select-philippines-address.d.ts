declare module "select-philippines-address" {
  export interface Region {
    id: number;
    psgc_code: string;
    region_name: string;
    region_code: string;
  }
  export interface Province {
    psgc_code: string;
    province_name: string;
    province_code: string;
    region_code: string;
  }
  export interface City {
    psgc_code: string;
    city_name: string;
    city_code: string;
    province_code: string;
  }
  export interface Barangay {
    psgc_code: string;
    brgy_name: string;
    brgy_code: string;
    province_code: string;
    city_code: string;
  }

  export function regions(): Promise<Region[] | string>;
  export function regionByCode(code: string): Promise<Region | undefined | string>;
  export function provinces(regionCode: string): Promise<Province[] | string>;
  export function provincesByCode(regionCode: string): Promise<Province[] | string>;
  export function provinceByName(name: string): Promise<Province | undefined | string>;
  export function cities(provinceCode: string): Promise<City[] | string>;
  export function barangays(cityCode: string): Promise<Barangay[] | string>;
}
