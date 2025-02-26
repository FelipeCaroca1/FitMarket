const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const Product = require("./src/models/Product");

dotenv.config();

const products = [
  {
    name: "Proteína Whey 1kg",
    description: "Proteína de suero de leche con 25g de proteína por porción.",
    price: 29990,
    category: "Suplementos",
    stock: 50,
    image: "http://localhost:5000/images/Proteina.jpg",
    detalles: {
      uso: "Mezclar una porción (30g) con 250ml de agua o leche después del entrenamiento.",
      beneficios: ["Favorece la recuperación muscular", "Aporta proteínas de alta calidad", "Bajo en grasas"],
      ingredientes: ["Proteína de suero de leche", "Lecitina de soya", "Aromatizantes naturales"],
    },
  },
  {
    name: "Mancuernas Ajustables 10kg",
    description: "Par de mancuernas ajustables con discos intercambiables.",
    price: 49990,
    category: "Equipamiento",
    stock: 20,
    image: "http://localhost:5000/images/mancuernas.jpg",
    detalles: {
      uso: "Utilizar para realizar ejercicios de fuerza y tonificación.",
      beneficios: ["Ajuste fácil de peso", "Diseño ergonómico", "Ideal para entrenamientos en casa"],
    },
  },
  {
    name: "Creatina Monohidratada 500g",
    description: "Creatina pura para mejorar el rendimiento y la recuperación.",
    price: 19990,
    category: "Suplementos",
    stock: 30,
    image: "http://localhost:5000/images/Creatina.jpg",
    detalles: {
      uso: "Consumir 5g diarios disueltos en agua o jugo antes del entrenamiento.",
      beneficios: ["Incrementa la fuerza y potencia", "Mejora la recuperación post-entrenamiento"],
      ingredientes: ["Creatina monohidratada 100% pura"],
    },
  },
  {
    name: "Cuerda para Saltar Profesional",
    description: "Cuerda de velocidad ajustable para entrenamientos intensos.",
    price: 9990,
    category: "Accesorios",
    stock: 40,
    image: "http://localhost:5000/images/cuerda.jpg",
    detalles: {
      uso: "Ajustar la longitud según la altura y utilizar para sesiones de cardio.",
      beneficios: ["Mejora la coordinación", "Incrementa la resistencia cardiovascular"],
    },
  },
  {
    name: "Colágeno Hidrolizado 300g",
    description: "Suplemento de colágeno para el cuidado de articulaciones y piel.",
    price: 15990,
    category: "Salud",
    stock: 25,
    image: "http://localhost:5000/images/colageno.jpg",
    detalles: {
      uso: "Tomar 10g disueltos en agua una vez al día.",
      beneficios: ["Fortalece articulaciones", "Mejora la elasticidad de la piel"],
      ingredientes: ["Colágeno hidrolizado", "Vitamina C", "Saborizante natural"],
    },
  },
  {
    name: "Barra Olímpica 20kg",
    description: "Barra olímpica profesional de acero inoxidable para levantamiento de pesas.",
    price: 129990,
    category: "Equipamiento",
    stock: 10,
    image: "http://localhost:5000/images/barraOlimpica.jpg",
    detalles: {
      uso: "Utilizar con discos compatibles para levantamientos como sentadillas o press de banca.",
      beneficios: ["Alta resistencia", "Agarre antideslizante"],
    },
  },
  {
    name: "Tobilleras con Peso 5kg",
    description: "Par de tobilleras ajustables con peso para entrenamiento funcional.",
    price: 24990,
    category: "Accesorios",
    stock: 15,
    image: "http://localhost:5000/images/tobilleras.jpg",
    detalles: {
      uso: "Colocar en los tobillos para ejercicios de piernas y glúteos.",
      beneficios: ["Añade resistencia", "Mejora la tonificación muscular"],
    },
  },
  {
    name: "Zapatillas Running Pro",
    description: "Zapatillas deportivas con tecnología de amortiguación avanzada.",
    price: 59990,
    category: "Ropa",
    stock: 20,
    image: "http://localhost:5000/images/zapatillas.jpg",
    tallas: ["38", "39", "40", "41", "42"],
    detalles: {
      uso: "Recomendadas para correr y entrenamientos de alta intensidad.",
      beneficios: ["Excelente amortiguación", "Material transpirable"],
    },
  },
  {
    name: "Leggings Deportivos",
    description: "Leggings de compresión para entrenamientos de alto rendimiento.",
    price: 19990,
    category: "Ropa",
    stock: 25,
    image: "http://localhost:5000/images/leggins.jpg",
    tallas: ["XS, S, M, L, XL"],
    detalles: {
      uso: "Usar durante entrenamientos o actividades deportivas.",
      beneficios: ["Ajuste cómodo", "Material elástico y transpirable"],
    },
  },
  {
    name: "Camiseta Dry-Fit",
    description: "Camiseta deportiva transpirable para entrenamientos intensos.",
    price: 14990,
    category: "Ropa",
    stock: 30,
    image: "http://localhost:5000/images/camiseta.jpg",
    tallas: ["XS, S, M, L, XL"],
    detalles: {
      uso: "Ideal para actividades físicas que requieren comodidad y ventilación.",
      beneficios: ["Evita la sudoración excesiva", "Tela liviana"],
    },
  },
  {
    name: "BCAA 2:1:1 300g",
    description: "Aminoácidos de cadena ramificada para mejorar la recuperación muscular.",
    price: 22990,
    category: "Suplementos",
    stock: 40,
    image: "http://localhost:5000/images/bcaa.jpg",
    detalles: {
      uso: "Consumir 7g antes o durante el entrenamiento.",
      beneficios: ["Reduce la fatiga", "Mejora la recuperación muscular"],
      ingredientes: ["Leucina", "Isoleucina", "Valina"],
    },
  },
  {
    name: "Barra de Proteína (Caja de 12)",
    description: "Barras de proteína bajas en azúcar, ideales para snack post-entrenamiento.",
    price: 28990,
    category: "Alimentos",
    stock: 50,
    image: "http://localhost:5000/images/barrasProteina.jpg",
    detalles: {
      uso: "Consumir como snack entre comidas o después del ejercicio.",
      beneficios: ["Alto en proteínas", "Bajo contenido de azúcar"],
      ingredientes: ["Proteína de leche", "Cacao", "Edulcorante natural"],
      tablaNutricional: {
        porcion: "1 barra (50g)",
        calorias: 200,
        proteinas: "20g",
        grasas: "7g",
        carbohidratos: "15g",
        azucares: "2g",
      },
    },
  },
  {
    name: "Pre-entreno Explosivo 400g",
    description: "Suplemento pre-entreno con cafeína y beta-alanina para potenciar el rendimiento.",
    price: 21990,
    category: "Suplementos",
    stock: 35,
    image: "http://localhost:5000/images/preEntreno.jpg",
    detalles: {
      uso: "Consumir 10g con agua 30 minutos antes del entrenamiento.",
      beneficios: ["Mayor energía", "Mejora la concentración"],
      ingredientes: ["Cafeína", "Beta-alanina", "L-arginina"],
    },
  },
  {
    name: "Banda Elástica de Resistencia",
    description: "Banda de resistencia ideal para calistenia y rehabilitación.",
    price: 12990,
    category: "Accesorios",
    stock: 30,
    image: "http://localhost:5000/images/bandaElastica.jpg",
    detalles: {
      uso: "Utilizar para estiramientos y ejercicios de fuerza.",
      beneficios: ["Versátil", "Ligera y portátil"],
    },
  },
  {
    name: "Guantes de Gimnasio",
    description: "Guantes acolchados con agarre antideslizante para levantamiento de pesas.",
    price: 9900,
    category: "Accesorios",
    stock: 20,
    image: "http://localhost:5000/images/guantes.jpg",
    detalles: {
      uso: "Proteger las manos durante el levantamiento de pesas.",
      beneficios: ["Previene ampollas", "Mejora el agarre"],
    },
  },
  {
    name: "Botella Deportiva 1L",
    description: "Botella reutilizable con marcador de hidratación y diseño ergonómico.",
    price: 7990,
    category: "Accesorios",
    stock: 40,
    image: "http://localhost:5000/images/botella.jpg",
    detalles: {
      uso: "Ideal para mantenerse hidratado durante entrenamientos.",
      beneficios: ["Fácil de transportar", "Material libre de BPA"],
    },
  },
  {
    name: "Omega 3 1000mg",
    description: "Ácidos grasos esenciales para el corazón y las articulaciones.",
    price: 12990,
    category: "Salud",
    stock: 35,
    image: "http://localhost:5000/images/omega3.jpg",
    detalles: {
      beneficios: [
        "Mejora la salud cardiovascular",
        "Reduce la inflamación",
        "Apoya la función cerebral"
      ],
      uso: "Tomar 1 cápsula dos veces al día con las comidas.",
      ingredientes: ["Aceite de pescado", "EPA", "DHA", "Vitamina E"],
      tablaNutricional: {
        "porPorcion": "1 cápsula",
        "calorias": 10,
        "grasasTotales": "1g",
        "grasasSaturadas": "0g",
        "colesterol": "5mg",
        "sodio": "0mg"
      }
    }
  },
  {
    name: "Multivitamínico Mujer",
    description: "Vitaminas y minerales esenciales para la salud femenina.",
    price: 14990,
    category: "Salud",
    stock: 40,
    image: "http://localhost:5000/images/multivitaminicoMujer.jpg",
    detalles: {
      "beneficios": [
        "Apoya la salud ósea y cardiovascular",
        "Aumenta la energía diaria",
        "Mejora la salud del cabello, piel y uñas"
      ],
      "uso": "Tomar 1 comprimido al día después de la comida.",
      "ingredientes": ["Vitamina A", "Vitamina C", "Calcio", "Hierro", "Ácido Fólico"]
    }
  },
  {
    "name": "Yogurt Proteico 200g",
    "description": "Yogurt con alto contenido de proteína y bajo en azúcares.",
    "price": 2990,
    "category": "Alimentos",
    "stock": 50,
    "image": "http://localhost:5000/images/yogurtProteico.jpg",
    "detalles": {
      "beneficios": [
        "Favorece la recuperación muscular",
        "Ideal como snack saludable",
        "Fuente de calcio y probióticos"
      ],
      "uso": "Consumir frío. Ideal para desayunos o colaciones.",
      "ingredientes": ["Leche descremada", "Proteína de suero", "Cultivos lácticos"],
      "tablaNutricional": {
        "porPorcion": "200g",
        "calorias": 120,
        "proteinas": "20g",
        "grasasTotales": "2g",
        "carbohidratos": "10g",
        "azucares": "3g",
        "sodio": "80mg"
      }
    }
  },
  {
    "name": "Barra de Granola Fitness (Caja de 6)",
    "description": "Barras energéticas con avena, frutos secos y bajo contenido de azúcar.",
    "price": 9990,
    "category": "Alimentos",
    "stock": 45,
    "image": "http://localhost:5000/images/barraGranola.jpg",
    "detalles": {
      "beneficios": [
        "Aporta energía sostenida",
        "Ideal para snacks pre y post entrenamiento",
        "Fuente de fibra y grasas saludables"
      ],
      "uso": "Consumir antes o después del entrenamiento.",
      "ingredientes": ["Avena", "Almendras", "Arándanos","Miel de caña", "Coco salvado de avena", "Arroz extruido"],
      "tablaNutricional": {
        "porPorcion": "1 barra (40g)",
        "calorias": 150,
        "proteinas": "5g",
        "grasasTotales": "6g",
        "carbohidratos": "20g",
        "azucares": "5g",
        "sodio": "50mg"
      }
    }
  },
  {
    "name": "Tights Deportivos Mujer",
    "description": "Leggings con tejido de compresión y diseño transpirable.",
    "price": 24990,
    "category": "Ropa",
    "stock": 30,
    "image": "http://localhost:5000/images/tightsMujer.jpg",
    tallas: ["XS, S, M, L, XL"],
    "detalles": {
      "beneficios": [
        "Brindan soporte durante el ejercicio",
        "Tejido elástico para mayor movilidad",
        "Absorbe la humedad"
      ],
      "uso": "Ideal para entrenamientos de alto y bajo impacto."
    }
  },
  {
    "name": "Pesas Tobilleras 3kg",
    "description": "Accesorio para aumentar la resistencia en ejercicios de pierna.",
    "price": 15990,
    "category": "Accesorios",
    "stock": 25,
    "image": "http://localhost:5000/images/pesasTobillo.jpg",
    "detalles": {
      "beneficios": [
        "Fortalece glúteos y piernas",
        "Mejora la resistencia muscular",
        "Fáciles de ajustar"
      ],
      "uso": "Colocar alrededor de los tobillos durante el entrenamiento."
    }
  },
  {
    "name": "Mat de Yoga Antideslizante",
    "description": "Colchoneta con agarre superior para prácticas de yoga y pilates.",
    "price": 19990,
    "category": "Accesorios",
    "stock": 40,
    "image": "http://localhost:5000/images/matYoga.jpg",
    "detalles": {
      "beneficios": [
        "Superficie antideslizante",
        "Fácil de transportar",
        "Amortiguación para proteger las articulaciones"
      ],
      "uso": "Ideal para yoga, pilates o entrenamientos de piso."
    }
  },
  {
    "name": "Shaker 600ml",
    "description": "Botella mezcladora con compartimento para suplementos.",
    "price": 6990,
    "category": "Accesorios",
    "stock": 50,
    "image": "http://localhost:5000/images/shaker.jpg",
    "detalles": {
      "beneficios": [
        "Facilita la mezcla de proteínas y preentrenos",
        "Libre de BPA",
        "Apto para lavavajillas"
      ],
      "uso": "Agregar suplemento, agua y agitar para mezclar."
    }
  },
  {
    "name": "Sujetador Deportivo Mujer",
    "description": "Sostén de alto soporte para entrenamientos intensos.",
    "price": 18990,
    "category": "Ropa",
    "stock": 20,
    "image": "http://localhost:5000/images/sujetadorDeportivo.jpg",
    tallas: ["XS, S, M, L, XL"],
    "detalles": {
      "beneficios": [
        "Alto soporte y comodidad",
        "Tejido transpirable",
        "Diseño sin costuras para evitar irritaciones"
      ],
      "uso": "Recomendado para actividades de alto impacto."
    }
  },
  {
    "name": "Aceite de Coco Orgánico 500ml",
    "description": "Aceite multifuncional ideal para cocinar y cuidado personal.",
    "price": 7990,
    "category": "Alimentos",
    "stock": 25,
    "image": "http://localhost:5000/images/aceiteCoco.jpg",
    "detalles": {
      "beneficios": [
        "Ideal para cocinar a altas temperaturas",
        "Hidrata la piel y el cabello",
        "Fuente de grasas saludables"
      ],
      "uso": "Usar en cocina o aplicar directamente en la piel.",
      "ingredientes": ["Aceite de coco 100% orgánico"],
      "tablaNutricional": {
        "porPorcion": "1 cucharada (15ml)",
        "calorias": 130,
        "grasasTotales": "14g",
        "grasasSaturadas": "12g",
        "carbohidratos": "0g",
        "proteinas": "0g",
        "sodio": "0mg"
      }
    }
  },
  {
    "name": "Top Deportivo Mujer",
    "description": "Top de entrenamiento con ajuste perfecto y secado rápido.",
    "price": 17990,
    "category": "Ropa",
    "stock": 28,
    "image": "http://localhost:5000/images/topDeportivo.jpg",
    tallas: ["XS, S, M, L, XL"],
    "detalles": {
      "beneficios": [
        "Ajuste cómodo",
        "Tejido transpirable",
        "Ideal para entrenamientos de alto impacto"
      ],
      "uso": "Utilizar durante actividades deportivas o rutinas de gimnasio."
    }
  },
  {
    "name": "Toalla Deportiva Microfibra",
    "description": "Toalla absorbente de secado rápido ideal para entrenamientos.",
    "price": 6990,
    "category": "Accesorios",
    "stock": 35,
    "image": "http://localhost:5000/images/toallaDeportiva.jpg",
    "detalles": {
      "beneficios": [
        "Alta capacidad de absorción",
        "Compacta y ligera",
        "Secado rápido"
      ],
      "uso": "Ideal para el gimnasio, yoga o actividades al aire libre."
    }
  },
  {
    "name": "Bebida Isotónica 500ml",
    "description": "Bebida isotónica que contiene 10 g de proteína. Ideal para deportistas.",
    "price": 2490,
    "category": "Alimentos",
    "stock": 60,
    "image": "http://localhost:5000/images/bebidaIsotonica.jpg",
    "detalles": {
      "beneficios": [
        "Rehidrata rápidamente",
        "Rico en electrolitos",
        "Mejora la resistencia"
      ],
      "uso": "Consumir durante o después de la actividad física.",
      "tablaNutricional": {
        "porPorcion": "500ml",
        "calorias": 45,
        "proteínas": 10,
        "carbohidratos": "0",
        "azucares": "18g",
        "sodio": "325mg",
        "potasio": "75mg"
      }
    }
  },
  {
    "name": "Muslera de Compresión",
    "description": "Accesorio para mejorar la circulación y soporte muscular en el muslo.",
    "price": 14990,
    "category": "Accesorios",
    "stock": 30,
    "image": "http://localhost:5000/images/muslera.jpg",
    "detalles": {
      "beneficios": [
        "Reduce la fatiga muscular",
        "Mejora la circulación sanguínea",
        "Ideal para entrenamientos prolongados"
      ],
      "uso": "Colocar alrededor del muslo antes de la actividad física."
    }
  },
  {
    "name": "Cinturón de Levantamiento",
    "description": "Proporciona soporte lumbar para levantamiento de pesas.",
    "price": 19990,
    "category": "Accesorios",
    "stock": 15,
    "image": "http://localhost:5000/images/cinturonLevantamiento.jpg",
    "detalles": {
      "beneficios": [
        "Previene lesiones lumbares",
        "Mejora la postura al levantar peso",
        "Ajuste cómodo y seguro"
      ],
      "uso": "Utilizar durante ejercicios de carga pesada."
    }
  },
  {
    "name": "Proteína Isolate 1kg",
    "description": "Proteína de rápida absorción para recuperación muscular.",
    "price": 34990,
    "category": "Suplementos",
    "stock": 25,
    "image": "http://localhost:5000/images/proteinaIsolate.jpg",
    "detalles": {
      "beneficios": [
        "Alta concentración de proteína",
        "Bajo en carbohidratos",
        "Ideal para después del entrenamiento"
      ],
      "uso": "Mezclar 30g con 250ml de agua o leche.",
      "tablaNutricional": {
        "porPorcion": "30g",
        "calorias": 110,
        "proteinas": "27g",
        "carbohidratos": "1g",
        "grasasTotales": "1g"
      }
    }
  },
  {
    "name": "Vinagre de Manzana Orgánico 500ml",
    "description": "Apoya la digestión y ayuda a controlar el apetito.",
    "price": 7990,
    "category": "Salud",
    "stock": 30,
    "image": "http://localhost:5000/images/vinagreManzana.jpg",
    "detalles": {
      "beneficios": [
        "Mejora la digestión",
        "Regula los niveles de azúcar en sangre",
        "Apoya la pérdida de peso"
      ],
      "uso": "Diluir 1 cucharada en un vaso de agua antes de las comidas.",
      "ingredientes": ["Vinagre de manzana orgánico", "Agua"],
      "tablaNutricional": {
        "porPorcion": "15ml",
        "calorias": 0,
        "carbohidratos": "0g",
        "azucares": "0g",
        "sodio": "0mg"
      }
    }
  },
  {
    "name": "Galletas Proteicas (Caja de 12)",
    "description": "Snack saludable con alto contenido de proteínas.",
    "price": 14990,
    "category": "Alimentos",
    "stock": 40,
    "image": "http://localhost:5000/images/galletasProteicas.jpg",
    "detalles": {
      "beneficios": [
        "Fuente de proteínas para recuperación muscular",
        "Bajo en azúcares añadidos",
        "Ideal como colación post entrenamiento"
      ],
      "uso": "Consumir como snack durante el día.",
      "ingredientes": ["Harina de avena", "Proteína de suero", "Stevia"],
      "tablaNutricional": {
        "porPorcion": "1 galleta (50g)",
        "calorias": 180,
        "proteinas": "15g",
        "grasasTotales": "6g",
        "carbohidratos": "20g",
        "azucares": "3g",
        "sodio": "100mg"
      }
    }
  },
  {
    "name": "Camiseta Oversize Hombre",
    "description": "Camiseta cómoda para entrenamientos o uso diario.",
    "price": 16990,
    "category": "Ropa",
    "stock": 25,
    "image": "http://localhost:5000/images/camisetaHombre.jpg",
    "tallas": ["S", "M", "L", "XL", "XXL"],
    "detalles": {
      "beneficios": [
        "Tela transpirable",
        "Diseño holgado para mayor comodidad",
        "Secado rápido"
      ],
      "uso": "Ideal para entrenamientos o uso casual."
    }
  },
  {
    "name": "Proteína Vegetal 1kg",
    "description": "Alternativa vegana con proteínas de arveja y arroz.",
    "price": 31990,
    "category": "Suplementos",
    "stock": 20,
    "image": "http://localhost:5000/images/proteinaVegetal.jpg",
    "detalles": {
      "beneficios": [
        "Apta para veganos",
        "Alto contenido proteico",
        "Favorece la recuperación muscular"
      ],
      "uso": "Mezclar 30g con agua o leche vegetal.",
      "ingredientes": ["Proteína de arveja", "Proteína de arroz", "Cacao natural"],
      "tablaNutricional": {
        "porPorcion": "30g",
        "calorias": 120,
        "proteinas": "24g",
        "grasasTotales": "2g",
        "carbohidratos": "4g",
        "sodio": "150mg"
      }
    }
  },
  {
    "name": "Rueda Abdominal con Rodillera",
    "description": "Fortalece el core y mejora la estabilidad.",
    "price": 18990,
    "category": "Equipamiento",
    "stock": 18,
    "image": "http://localhost:5000/images/ruedaAbdominal.jpg",
    "detalles": {
      "beneficios": [
        "Tonifica abdomen y espalda",
        "Incluye rodillera para mayor comodidad",
        "Compacta y fácil de usar"
      ],
      "uso": "Usar sobre superficie plana con movimientos controlados."
    }
  },
  {
    "name": "Pre-entreno Natural 400g",
    "description": "Energía limpia sin estimulantes artificiales.",
    "price": 20990,
    "category": "Suplementos",
    "stock": 25,
    "image": "http://localhost:5000/images/preEntrenoNatural.jpg",
    "detalles": {
      "beneficios": [
        "Mejora la resistencia",
        "Sin cafeína ni taquicardias",
        "Aumenta el enfoque durante el entrenamiento"
      ],
      "uso": "Mezclar 10g con 250ml de agua antes del entrenamiento.",
      "ingredientes": ["Beta-Alanina", "Citrulina", "Extracto de remolacha"],
      "tablaNutricional": {
        "porPorcion": "10g",
        "calorias": 20,
        "carbohidratos": "3g",
        "sodio": "50mg"
      }
    }
  },
  {
    "name": "Bandas de Resistencia (Set de 5)",
    "description": "Bandas de diferentes resistencias para entrenamiento funcional.",
    "price": 14990,
    "category": "Accesorios",
    "stock": 30,
    "image": "http://localhost:5000/images/bandasResistencia.jpg",
    "detalles": {
      "beneficios": [
        "Fortalece todo el cuerpo",
        "Ideales para calistenia y rehabilitación",
        "Fáciles de transportar"
      ],
      "uso": "Utilizar según nivel de resistencia deseado."
    }
  },
  {
    "name": "Jengibre en Polvo 200g",
    "description": "Superalimento que apoya la digestión y reduce la inflamación.",
    "price": 5990,
    "category": "Alimentos",
    "stock": 50,
    "image": "http://localhost:5000/images/jengibrePolvo.jpg",
    "detalles": {
      "beneficios": [
        "Favorece la digestión",
        "Propiedades antiinflamatorias",
        "Aumenta la inmunidad"
      ],
      "uso": "Agregar 1 cucharadita a batidos o comidas.",
      "ingredientes": ["Jengibre 100% natural"],
      "tablaNutricional": {
        "porPorcion": "5g",
        "calorias": 20,
        "carbohidratos": "4g",
        "azucares": "0g",
        "proteinas": "0g"
      }
    }
  },
  {
    "name": "Rodillera Deportiva",
    "description": "Brinda soporte durante entrenamientos intensos.",
    "price": 13990,
    "category": "Accesorios",
    "stock": 20,
    "image": "http://localhost:5000/images/rodillera.jpg",
    "detalles": {
      "beneficios": [
        "Reduce riesgo de lesiones",
        "Mejora la estabilidad",
        "Cómoda para largas sesiones"
      ],
      "uso": "Colocar alrededor de la rodilla antes del entrenamiento."
    }
  },
  {
    "name": "Leggings Mujer de Cintura Alta",
    "description": "Leggings con soporte abdominal y tela elástica.",
    "price": 22990,
    "category": "Ropa",
    "stock": 22,
    "image": "http://localhost:5000/images/leggingsMujer.jpg",
    "tallas": ["S", "M", "L", "XL", "XXL"],
    "detalles": {
      "beneficios": [
        "Control de abdomen",
        "No se transparenta",
        "Ideal para cualquier tipo de entrenamiento"
      ],
      "uso": "Perfecto para correr, yoga y gimnasio."
    }
  },
  {
    "name": "Café Verde 250g",
    "description": "Suplemento natural que ayuda a la quema de grasa.",
    "price": 10990,
    "category": "Salud",
    "stock": 30,
    "image": "http://localhost:5000/images/cafeVerde.jpg",
    "detalles": {
      "beneficios": [
        "Aumenta el metabolismo",
        "Fuente de antioxidantes",
        "Apoya la pérdida de peso"
      ],
      "uso": "Consumir 1 taza al día por la mañana.",
      "ingredientes": ["Café verde molido"],
      "tablaNutricional": {
        "porPorcion": "10g",
        "calorias": 30,
        "carbohidratos": "5g",
        "proteinas": "1g"
      }
    }
  },
  {
    "name": "Colchoneta Plegable Fitness",
    "description": "Ideal para entrenamientos en casa y gimnasia.",
    "price": 24990,
    "category": "Equipamiento",
    "stock": 15,
    "image": "http://localhost:5000/images/colchonetaFitness.jpg",
    "detalles": {
      "beneficios": [
        "Fácil de transportar",
        "Amortiguación óptima",
        "Superficie antideslizante"
      ],
      "uso": "Usar en entrenamientos de piso y yoga."
    }
  },
  {
    "name": "Bolso Deportivo Unisex",
    "description": "Espacioso y con compartimentos para ropa y accesorios.",
    "price": 19990,
    "category": "Accesorios",
    "stock": 18,
    "image": "http://localhost:5000/images/bolsoDeportivo.jpg",
    "detalles": {
      "beneficios": [
        "Resistente al agua",
        "Ideal para llevar al gimnasio",
        "Correa ajustable"
      ],
      "uso": "Transportar equipo deportivo y ropa."
    }
  },
  {
    "name": "Cintillo Deportivo Absorbente",
    "description": "Cintillo que absorbe el sudor y se ajusta cómodamente.",
    "price": 5990,
    "category": "Accesorios",
    "stock": 40,
    "image": "http://localhost:5000/images/cintillo.jpg",
    "detalles": {
      "beneficios": [
        "Evita que el sudor llegue a los ojos",
        "Ligero y cómodo",
        "Lavable y reutilizable"
      ],
      "uso": "Usar durante entrenamientos o actividades al aire libre."
    }
  },
  {
    "name": "Short Deportivo Hombre",
    "description": "Short ligero con tecnología de secado rápido y bolsillos laterales.",
    "price": 17990,
    "category": "Ropa",
    "stock": 18,
    "image": "http://localhost:5000/images/shortHombre.jpg",
    "tallas": ["S", "M", "L", "XL", "XXL"],
    "detalles": {
      "beneficios": [
        "Secado rápido",
        "Ligero y cómodo",
        "Bolsillos con cierre"
      ],
      "uso": "Ideal para correr, entrenar y uso diario."
    }
  },
  {
    "name": "Short Deportivo Mujer",
    "description": "Short medio muslo con tecnologia de secado rapido y bolsillos laterales",
    "price": 16990,
    "category": "Ropa",
    "stock": 20,
    "image": "http://localhost:5000/images/shortMujer.jpg",
    "tallas": ["XS", "S", "M", "L"],
    "detalles": {
      "beneficios": [
        "Secado rápido",
        "Tela elástica y transpirable",
        "Diseño cómodo y moderno"
      ],
      "uso": "Perfecto para correr, gimnasio y uso diario."
    }
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Productos insertados correctamente");
    process.exit();
  } catch (error) {
    console.error("❌ Error al insertar productos:", error);
    process.exit(1);
  }
};

seedProducts();
