let db = [
  {
    "id" : 1,
    "title": "Placa de Video ASUS PRIME GeForce RTX 5070 Ti 16GB GDDR7 OC",
    "description": "16GB de memoria GDDR7",
    "price": 1450450,
    "category" : "component",
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_44890_Placa_de_Video_ASUS_PRIME_GeForce_RTX_5070_12GB_GDDR7_OC_f3fd0b62-grn.jpg"
  },
  {
    "id" : 2,
    "title": "Mouse Logitech G203 Lightsync RGB White",
    "description": "8000 DPI, iluminación RGB personalizable",
    "category" : "accessory",
    "price": 27590,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_36943_Mouse_Logitech_G203_Lightsync_RGB_White_e2e81b78-grn.jpg"
  }]

const getAll = () => {
    return db;
}

export default {getAll}