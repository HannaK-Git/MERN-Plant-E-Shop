import { $authHost } from "./index";



// Basket APIs
export const fetchBasket = async (basket_id) => {
 
  const { data } = await $authHost.get("api/basket", {
    params: { basket_id },
  });
  
  return data;
};

// Add or update an item in the basket.
export const addOrUpdateItem = async (basket_id, device_id, quantity) => {
  const { data } = await $authHost.post("api/basket", {
    basket_id,
    device_id,
    quantity,
  });
  return data;
};

// Add a single item to the basket.
export const addItem = async (basket_id, device_id) => {
  const { data } = await $authHost.put("api/basket/add", {
    basket_id,
    device_id,
  });
  return data;
};

// Delete a single item from the basket.
export const deleteItem = async (basket_id, device_id) => {
  const { data } = await $authHost.put("api/basket/delete", {
    basket_id,
    device_id,
  });
  return data;
};

// Clear the entire basket.
export const clearBasket = async (basket_id) => {
  const { data } = await $authHost.delete(`api/basket/clear/${basket_id}`);
  return data;
};