import { $authHost, $host } from "./index";

// Type APIs

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
  
};

// Brand APIs

export const createBrand = async(brand) => {
  const {data} = await $authHost.post('api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};


// Device APIs

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async (type_id, brand_id, page, limit ) => {
  const { data } = await $host.get("api/device", {
    params: {
      type_id,
      brand_id,
      page,
      limit,
    }
  } ); 
  
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};


