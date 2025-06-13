let products = [
  {
    "id" : 1,
    "title": "Placa de Video ASUS PRIME GeForce RTX 5070 Ti 16GB GDDR7 OC",
    "description": "16GB de memoria GDDR7",
    "price": 1450450,
    "category" : "component",
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_44890_Placa_de_Video_ASUS_PRIME_GeForce_RTX_5070_12GB_GDDR7_OC_f3fd0b62-grn.jpg"
  },
  {
    "id" : 2,
    "title": "Mouse Logitech G203 Lightsync RGB White",
    "description": "8000 DPI, iluminación RGB personalizable",
    "category" : "accessory",
    "price": 27590,
    "status": false,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_36943_Mouse_Logitech_G203_Lightsync_RGB_White_e2e81b78-grn.jpg"
  },
  {
    "id" : 3,
    "title": "Joystick ASUS ROG Raikiri Pro OLED Wireless 2.4Ghz Bluetooth PC",
    "description": "Doble vibración, agarre ergonómico y botones configurables",
    "category" : "accessory",
    "price": 255350,
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_41806_Joystick_ASUS_ROG_Raikiri_Pro_OLED_Wireless_2.4Ghz_Bluetooth_PC____XBOX_solo_cableado_4336b8fb-grn.jpg"
  },
  {
    "id" : 4,     
    "title": "Auriculares Logitech G733 Wireless Lightspeed LightSync RGB",
    "description": "Sonido envolvente, micrófono con cancelación de ruido y almohadillas acolchadas.",
    "category" : "accessory",
    "price": 264600,
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_21894_Auriculares_Logitech_G733_Wireless_Lightspeed_LightSync_RGB_Lila_29Hs_1dffcd73-grn.jpg"
  },
  {
    "id" : 5,     
    "title": "Mother ASUS ROG STRIX B550-F GAMING WIFI II",
    "description": "AM4 Gaming ATX con PCIe® 4.0, 12 + 2 fases de poder en equipo",
    "category" : "component",
    "price": 261499,
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_32296_Mother_ASUS_ROG_STRIX_B550-F_GAMING_WIFI_II_d770a43e-grn.jpg"
  },
  {
    "id" : 6,     
    "title": "Disco Solido SSD M.2 WD 1TB Black SN850X Heatsink NVMe PCIe Gen4 x4",
    "description": "Rendimiento de lectura secuencial: 7300MB/s. Rendimiento de escritura secuencial: 6300MB/s",
    "category" : "component",
    "price": 164927,
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_44568_Disco_Solido_SSD_M.2_WD_1TB_Black_SN850X_Heatsink_7300MB_s_NVMe_PCIe_Gen4_x4_3a3defa5-grn.jpg"
  },
  {
    "id" : 7,     
    "title": "Disco Solido SSD M.2 SK Hynix 2TB Platinum P41 NVMe PCIe Gen4 x4",
    "description": "Velocidades de lectura de hasta 7000 MB/s y velocidades de escritura de hasta 6500 MB/s",
    "category" : "component",
    "price": 207650,
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_41568_Disco_Solido_SSD_M.2_SK_Hynix_2TB_Platinum_P41_7000MB_s_NVMe_PCIe_Gen4_x4_1e6e0b33-grn.jpg"
  },
  {
    "id" : 8,     
    "title": "Monitor Gamer ViewSonic VX2428A 24\" 1080p IPS 180Hz FreeSync Premium",
    "description": "Frecuencia de actualización de 180Hz y un tiempo de respuesta de 0.5ms",
    "category" : "accessory",
    "price": 216999,
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_40295_Monitor_Gamer_ViewSonic_VX2428A_24__1080p_IPS_180Hz_FreeSync_Premium_3f8b9818-grn.jpg"
  },
  {
    "id" : 9,     
    "title": "Teclado Mecanico ASUS ROG Strix M603 Falchion Wireless",
    "description": "60% Wireless 2.4Ghz Bluetooth RGB Swtich RX Blue",
    "category" : "accessory",
    "price": 193110,
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_41449_Teclado_Mecanico_ASUS_ROG_Strix_M603_Falchion_Wireless_2.4Ghz_Bluetooth_RGB_Swtich_RX_Blue_d3cc5070-grn.jpg"
  },
  {
    "id" : 10,     
    "title": "Procesador AMD Ryzen 7 9800X3D 5.2GHz Turbo AM5",
    "description": "NO INCLUYE COOLER - Tecnología AMD 3D V-Cache™ de 2.ª generación.",
    "category" : "component",
    "price": 664900,
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_43006_Procesador_AMD_Ryzen_7_9800X3D_5.2GHz_Turbo_AM5_-_No_Incluye_Cooler_ad69d322-grn.jpg"
  },
  {
    "id" : 11,     
    "title": "Procesador AMD Ryzen 5 8600G 5.0GHz AM5",
    "description": "Incluye tarjeta gráfica AMD Radeon 760M",
    "category" : "component",
    "price": 240900,
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_38449_Procesador_AMD_Ryzen_5_8600G_5.0GHz_AM5_f1bd9500-grn.jpg"
  },
  {
    "id" : 12,     
    "title": "Fuente ADATA XPG 850W 80 Plus Gold Full Modular",
    "description": "Fuente de alimentación modular 80 Plus Gold equipada con condensadores 100% japoneses.",
    "category" : "component",
    "price": 161050,
    "status": true,
    "img": "https://imagenes.compragamer.com/productos/compragamer_Imganen_general_45310_Fuente_ADATA_XPG_850W_80_Plus_Gold_Full_Modular_ATX_3.1_PCIe_5.1_CORE_REACTOR_II_VE_e02bdee0-grn.jpg"
  }
]

const getAll = () => {
    return products;
}

const toggleStatus = (id) => {
  let index = products.findIndex(p => p.id === id);
  
  products[index].status = !products[index].status;
  
  return products[index];
}

export default {getAll, toggleStatus}