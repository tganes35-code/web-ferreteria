<?php

$categories = [
    ['name' => 'Herramientas eléctricas', 'slug' => 'herramientas-electricas', 'image' => '/images/realistic/electricas.jpg', 'desc' => 'Taladros, amoladoras, sierras y más.'],
    ['name' => 'Herramientas manuales', 'slug' => 'herramientas-manuales', 'image' => '/images/realistic/manuales.jpg', 'desc' => 'Martillos, llaves, destornilladores y alicates.'],
    ['name' => 'Materiales de construcción', 'slug' => 'materiales-de-construccion', 'image' => '/images/realistic/construccion.jpg', 'desc' => 'Cemento, agregados y materiales de estructura.'],
    ['name' => 'Plomería', 'slug' => 'plomeria', 'image' => '/images/realistic/plomeria.jpg', 'desc' => 'Tuberías, conexiones, grifería y accesorios.'],
    ['name' => 'Electricidad', 'slug' => 'electricidad', 'image' => '/images/realistic/electricidad.jpg', 'desc' => 'Cables, breakers, tomacorrientes e iluminación.'],
    ['name' => 'Pinturas y acabados', 'slug' => 'pinturas-y-acabados', 'image' => '/images/realistic/pinturas.jpg', 'desc' => 'Pinturas vinílicas, brochas, rodillos y masillas.'],
    ['name' => 'Ferretería en general', 'slug' => 'ferreteria-en-general', 'image' => '/images/realistic/ferreteria.jpg', 'desc' => 'Tornillería, fijaciones, candados y cerrojos.'],
    ['name' => 'Jardinería y agro', 'slug' => 'jardineria-y-agro', 'image' => '/images/realistic/jardineria.jpg', 'desc' => 'Mangueras, guadañadoras y herramientas de jardín.'],
    ['name' => 'Seguridad industrial', 'slug' => 'seguridad-industrial', 'image' => '/images/realistic/seguridad.jpg', 'desc' => 'Cascos, guantes, gafas y equipo de protección.'],
    ['name' => 'Hogar y organización', 'slug' => 'hogar-y-organizacion', 'image' => '/images/realistic/hogar.jpg', 'desc' => 'Organizadores, cajas de herramientas y accesorios.'],
];

$brands = [
    ['name' => 'DeWalt', 'slug' => 'dewalt'],
    ['name' => 'Stanley', 'slug' => 'stanley'],
    ['name' => 'Bosch', 'slug' => 'bosch'],
    ['name' => 'Makita', 'slug' => 'makita'],
    ['name' => 'Truper', 'slug' => 'truper'],
    ['name' => 'Pavco', 'slug' => 'pavco'],
    ['name' => 'Pintuco', 'slug' => 'pintuco'],
    ['name' => 'Pacasmayo', 'slug' => 'pacasmayo'],
];

$products = [
    [
        'id' => 1,
        'name' => 'Taladro Percutor 1/2" 750W DeWalt',
        'slug' => 'taladro-percutor-1-2-750w-dewalt',
        'sku' => 'DWD024K',
        'price' => 329900,
        'sale_price' => 279900,
        'discount_percent' => 15,
        'stock' => 15,
        'stock_type' => 'in_stock',
        'rating' => 4.8,
        'reviews_count' => 24,
        'description' => 'Taladro percutor de 750W ideal para trabajos de perforación en concreto, madera y metal. Diseño ergonómico y liviano para mayor comodidad en trabajos prolongados.',
        'features' => [
            'Potencia: 750W',
            'Velocidad: 0-2800 rpm',
            'Impactos por minuto: 0-47600 gpm',
            'Capacidad en concreto: 13mm',
            'Capacidad en acero: 13mm',
            'Capacidad en madera: 25mm'
        ],
        'specs' => [
            'Garantía' => '3 años DeWalt',
            'Mandril' => '1/2" (13mm)',
            'Modos' => 'Rotación y Percusión',
            'Peso' => '1.8 kg'
        ],
        'category' => $categories[0],
        'brand' => $brands[0],
        'images' => ['/images/realistic/electricas.jpg'],
        'is_offer' => true,
        'is_featured' => true,
        'compatible_product_ids' => [2],
        'projects' => ['remodelacion', 'construccion', 'electricidad']
    ],
    [
        'id' => 2,
        'name' => 'Esmeril Angular 4 1/2" 850W Stanley',
        'slug' => 'esmeril-angular-4-1-2-850w-stanley',
        'sku' => 'STGL8015',
        'price' => 229900,
        'sale_price' => 189900,
        'discount_percent' => 17,
        'stock' => 12,
        'stock_type' => 'in_stock',
        'rating' => 4.5,
        'reviews_count' => 12,
        'description' => 'Esmeril angular potente de 850W para corte y desbaste en metal y mampostería. Caja de engranajes metálica para mayor vida útil.',
        'features' => [
            'Potencia: 850W',
            'Velocidad: 11000 rpm',
            'Diámetro de disco: 4 1/2" (115mm)',
            'Interruptor de bloqueo para uso continuo'
        ],
        'specs' => [
            'Garantía' => '2 años Stanley',
            'Eje' => 'M14',
            'Peso' => '2.1 kg'
        ],
        'category' => $categories[0],
        'brand' => $brands[1],
        'images' => ['/images/realistic/electricas.jpg'],
        'is_offer' => true,
        'is_featured' => true,
        'compatible_product_ids' => [1],
        'projects' => ['remodelacion', 'construccion']
    ],
    [
        'id' => 3,
        'name' => 'Rotomartillo SDS Plus 800W Truper',
        'slug' => 'rotomartillo-sds-plus-800w-truper',
        'sku' => 'ROTA-800',
        'price' => 379900,
        'sale_price' => 299900,
        'discount_percent' => 20,
        'stock' => 8,
        'stock_type' => 'in_stock',
        'rating' => 4.7,
        'reviews_count' => 19,
        'description' => 'Rotomartillo electroneumático con encastre SDS Plus. 3 funciones: taladro, rotomartillo y cincelado.',
        'features' => [
            'Potencia: 800W',
            'Energía de impacto: 3 Joules',
            'Velocidad: 0-1100 rpm',
            'Incluye maletín y brocas'
        ],
        'specs' => [
            'Garantía' => '1 año Truper',
            'Encastre' => 'SDS Plus',
            'Peso' => '3.2 kg'
        ],
        'category' => $categories[0],
        'brand' => $brands[4],
        'images' => ['/images/realistic/electricas.jpg'],
        'is_offer' => true,
        'is_featured' => true,
        'compatible_product_ids' => [1],
        'projects' => ['construccion', 'remodelacion']
    ],
    [
        'id' => 10,
        'name' => 'San Marcos Cemento',
        'slug' => 'san-marcos-cemento',
        'sku' => 'SM-CEM-33',
        'price' => 33000,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 100,
        'stock_type' => 'in_stock',
        'rating' => 4.7,
        'reviews_count' => 45,
        'description' => 'Cemento Portland San Marcos de alta calidad para proyectos de construcción. Ideal para mezclas de concreto y mortero.',
        'features' => [
            'Peso: 50 kg',
            'Resistencia inicial excelente',
            'Aplicación en concretos estructurales'
        ],
        'specs' => [
            'Marca' => 'San Marcos',
            'Tipo' => 'Portland'
        ],
        'category' => $categories[2],
        'brand' => $brands[7],
        'images' => ['/images/products/cemento-san-marcos.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [],
        'projects' => ['construccion']
    ],
    [
        'id' => 11,
        'name' => 'Boyacá Cemento',
        'slug' => 'boyaca-cemento',
        'sku' => 'BOY-CEM-34',
        'price' => 34000,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 100,
        'stock_type' => 'in_stock',
        'rating' => 4.6,
        'reviews_count' => 38,
        'description' => 'Cemento Boyacá premium para proyectos estructurales y de acabado. Garantiza durabilidad y resistencia excepcional.',
        'features' => [
            'Peso: 50 kg',
            'Resistencia a la intemperie',
            'Formulación mejorada'
        ],
        'specs' => [
            'Marca' => 'Boyacá',
            'Tipo' => 'Portland I'
        ],
        'category' => $categories[2],
        'brand' => $brands[7],
        'images' => ['/images/products/cemento-holcim.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [],
        'projects' => ['construccion']
    ],
    [
        'id' => 12,
        'name' => 'Cemex Cemento',
        'slug' => 'cemex-cemento',
        'sku' => 'CMX-CEM-34',
        'price' => 34500,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 150,
        'stock_type' => 'in_stock',
        'rating' => 4.8,
        'reviews_count' => 62,
        'description' => 'Cemento Cemex de clase mundial, líder en la industria. Perfecto para cualquier tipo de construcción.',
        'features' => [
            'Peso: 50 kg',
            'Marca reconocida internacionalmente',
            'Calidad certificada'
        ],
        'specs' => [
            'Marca' => 'Cemex',
            'Tipo' => 'Portland I'
        ],
        'category' => $categories[2],
        'brand' => $brands[7],
        'images' => ['/images/products/cemento-cemex.png'],
        'is_offer' => false,
        'is_featured' => true,
        'compatible_product_ids' => [],
        'projects' => ['construccion']
    ],
    [
        'id' => 13,
        'name' => 'Pega Perfecta',
        'slug' => 'pega-perfecta',
        'sku' => 'PP-40K-41',
        'price' => 41000,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 80,
        'stock_type' => 'in_stock',
        'rating' => 4.9,
        'reviews_count' => 55,
        'description' => 'Adhesivo Pega Perfecta de 40kg, ideal para cerámica, porcelanato y mosaicos. Excelente adherencia y resistencia.',
        'features' => [
            'Peso: 40 kg',
            'Tiempo abierto: 30 minutos',
            'Resistencia al agua'
        ],
        'specs' => [
            'Rendimiento' => 'Aprox. 4 m² por bolsa',
            'Aplicación' => 'Interiores y exteriores'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/pega-perfecta-user.png'],
        'is_offer' => false,
        'is_featured' => true,
        'compatible_product_ids' => [],
        'projects' => ['remodelacion', 'bano', 'cocina']
    ],
    [
        'id' => 14,
        'name' => 'Pega Ya',
        'slug' => 'pega-ya',
        'sku' => 'PY-25K-15',
        'price' => 15000,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 120,
        'stock_type' => 'in_stock',
        'rating' => 4.5,
        'reviews_count' => 28,
        'description' => 'Adhesivo Pega Ya en presentación de 25kg. Secado rápido y perfecta adherencia en superficies variadas.',
        'features' => [
            'Peso: 25 kg',
            'Secado rápido',
            'Económico y práctico'
        ],
        'specs' => [
            'Rendimiento' => 'Aprox. 2.5 m² por bolsa',
            'Aplicación' => 'Interiores'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/pega-ya-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [],
        'projects' => ['remodelacion']
    ],
    [
        'id' => 15,
        'name' => 'Aerosoles',
        'slug' => 'aerosoles',
        'sku' => 'AER-9000',
        'price' => 9000,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 200,
        'stock_type' => 'in_stock',
        'rating' => 4.4,
        'reviews_count' => 72,
        'description' => 'Pintura en aerosol de calidad profesional. Disponible en múltiples colores para acabados rápidos y uniformes.',
        'features' => [
            'Capacidad: 400ml',
            'Acabado profesional',
            'Múltiples colores'
        ],
        'specs' => [
            'Secado' => 'Rápido',
            'Aplicación' => 'Metal, madera y plástico'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/aerosoles-user-can.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [],
        'projects' => ['pintura']
    ],
    [
        'id' => 16,
        'name' => 'Cromados',
        'slug' => 'cromados',
        'sku' => 'CRO-14500',
        'price' => 14500,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 60,
        'stock_type' => 'in_stock',
        'rating' => 4.6,
        'reviews_count' => 35,
        'description' => 'Acabados cromados de alta calidad para grifería y accesorios. Protección contra corrosión y durabilidad garantizada.',
        'features' => [
            'Acabado espejo',
            'Resistencia a la corrosión',
            'Aplicación profesional'
        ],
        'specs' => [
            'Material' => 'Acero inoxidable con recubrimiento cromado',
            'Aplicación' => 'Grifería y accesorios'
        ],
        'category' => $categories[3],
        'brand' => $brands[5],
        'images' => ['/images/products/cromados-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [],
        'projects' => ['plomeria', 'bano', 'cocina']
    ],
    [
        'id' => 17,
        'name' => 'Alta Temperatura',
        'slug' => 'alta-temperatura',
        'sku' => 'AT-14500',
        'price' => 14500,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 75,
        'stock_type' => 'in_stock',
        'rating' => 4.7,
        'reviews_count' => 42,
        'description' => 'Pintura resistente a alta temperatura. Ideal para chimeneas, estufas y superficies expuestas al calor intenso.',
        'features' => [
            'Resistencia hasta 600°C',
            'Acabado mate de larga durabilidad',
            'Resistencia a grietas'
        ],
        'specs' => [
            'Aplicación' => 'Chimeneas, estufas, tuberías',
            'Secado' => '24 horas'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/alta-temperatura-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [],
        'projects' => ['remodelacion']
    ],
    [
        'id' => 18,
        'name' => 'Brocha 5"',
        'slug' => 'brocha-5',
        'sku' => 'BRO-5-14',
        'price' => 14000,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 150,
        'stock_type' => 'in_stock',
        'rating' => 4.5,
        'reviews_count' => 38,
        'description' => 'Brochas profesionales de 5 pulgadas con cerdas de calidad premium. Perfectas para pinturas al agua y al óleo.',
        'features' => [
            'Ancho: 5 pulgadas (127mm)',
            'Cerdas naturales de calidad',
            'Mango ergonómico'
        ],
        'specs' => [
            'Material de cerdas' => 'Fibra natural premium',
            'Aplicación' => 'Interiores y exteriores'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/brocha-5-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 19,
        'name' => 'Brocha 4"',
        'slug' => 'brocha-4',
        'sku' => 'BRO-4-98',
        'price' => 9800,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 180,
        'stock_type' => 'in_stock',
        'rating' => 4.6,
        'reviews_count' => 52,
        'description' => 'Brochas de 4 pulgadas con excelente retención de pintura. Ideales para acabados de calidad en muros y techos.',
        'features' => [
            'Ancho: 4 pulgadas (102mm)',
            'Cerdas resistentes',
            'Mango cómodo'
        ],
        'specs' => [
            'Material de cerdas' => 'Fibra de alta calidad',
            'Aplicación' => 'Muros y techos'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/brocha-4-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 20,
        'name' => 'Brocha 3"',
        'slug' => 'brocha-3',
        'sku' => 'BRO-3-64',
        'price' => 6400,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 200,
        'stock_type' => 'in_stock',
        'rating' => 4.5,
        'reviews_count' => 61,
        'description' => 'Brochas de 3 pulgadas para trabajos de precisión y detalle. Perfectas para acabados en molduras y bordes.',
        'features' => [
            'Ancho: 3 pulgadas (76mm)',
            'Cerdas finas y resistentes',
            'Ideal para detalles'
        ],
        'specs' => [
            'Material de cerdas' => 'Fibra sintética',
            'Aplicación' => 'Detalles y molduras'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/brocha-3-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 21,
        'name' => 'Brocha 2.5"',
        'slug' => 'brocha-2-5',
        'sku' => 'BRO-2.5-55',
        'price' => 5500,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 220,
        'stock_type' => 'in_stock',
        'rating' => 4.4,
        'reviews_count' => 48,
        'description' => 'Brochas de 2.5 pulgadas compactas y versátiles. Excelente para acabados en superficies pequeñas y decorativas.',
        'features' => [
            'Ancho: 2.5 pulgadas (64mm)',
            'Cerdas suaves',
            'Fácil de controlar'
        ],
        'specs' => [
            'Material de cerdas' => 'Fibra mixta',
            'Aplicación' => 'Superficies pequeñas'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/brocha-2-5-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 22,
        'name' => 'Brocha 2"',
        'slug' => 'brocha-2',
        'sku' => 'BRO-2-45',
        'price' => 4500,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 250,
        'stock_type' => 'in_stock',
        'rating' => 4.7,
        'reviews_count' => 78,
        'description' => 'Brochas de 2 pulgadas para trabajos de precisión y retoque. Perfectas para pintura de acabado fino.',
        'features' => [
            'Ancho: 2 pulgadas (51mm)',
            'Cerdas de máxima precisión',
            'Calidad profesional'
        ],
        'specs' => [
            'Material de cerdas' => 'Fibra premium',
            'Aplicación' => 'Trabajos de precisión'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/brocha-2-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 23,
        'name' => 'Brocha 1.5"',
        'slug' => 'brocha-1-5',
        'sku' => 'BRO-1.5-38',
        'price' => 3800,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 280,
        'stock_type' => 'in_stock',
        'rating' => 4.6,
        'reviews_count' => 65,
        'description' => 'Brochas de 1.5 pulgadas compactas para trabajos delicados y acabados finos. Ideal para espacios reducidos.',
        'features' => [
            'Ancho: 1.5 pulgadas (38mm)',
            'Cerdas finas y suaves',
            'Perfecto para detalles'
        ],
        'specs' => [
            'Material de cerdas' => 'Fibra natural',
            'Aplicación' => 'Detalles y espacios reducidos'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/brocha-1-5-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 24,
        'name' => 'Brocha 1"',
        'slug' => 'brocha-1',
        'sku' => 'BRO-1-35',
        'price' => 3500,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 300,
        'stock_type' => 'in_stock',
        'rating' => 4.8,
        'reviews_count' => 89,
        'description' => 'Brochas de 1 pulgada para trabajos muy precisos. Ideales para toques finales y retoque de pintura.',
        'features' => [
            'Ancho: 1 pulgada (25mm)',
            'Cerdas ultra finas',
            'Máximo control'
        ],
        'specs' => [
            'Material de cerdas' => 'Fibra sintética premium',
            'Aplicación' => 'Trabajos muy precisos'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/brocha-1-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 25,
        'name' => 'Semicodo 1/2"',
        'slug' => 'semicodo-1-2',
        'sku' => 'SCO-1/2-11',
        'price' => 1100,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 500,
        'stock_type' => 'in_stock',
        'rating' => 4.7,
        'reviews_count' => 112,
        'description' => 'Semicodo de 1/2 pulgada en PVC. Accesorio esencial para instalaciones de plomería y cambios de dirección.',
        'features' => [
            'Medida: 1/2 pulgada',
            'Ángulo: 45 grados',
            'Material: PVC sanitario'
        ],
        'specs' => [
            'Norma' => 'NTC 1087',
            'Uso' => 'Plomería sanitaria'
        ],
        'category' => $categories[3],
        'brand' => $brands[5],
        'images' => ['/images/products/semicodo-1-2-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [],
        'projects' => ['plomeria', 'bano', 'cocina']
    ],
    [
        'id' => 26,
        'name' => 'Tee 1/2"',
        'slug' => 'tee-1-2',
        'sku' => 'TEE-1/2-10',
        'price' => 1000,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 550,
        'stock_type' => 'in_stock',
        'rating' => 4.8,
        'reviews_count' => 128,
        'description' => 'Conexión Tee de 1/2 pulgada en PVC. Permite ramificaciones en tuberías de plomería sanitaria.',
        'features' => [
            'Medida: 1/2 pulgada',
            'Tipo: Tee',
            'Material: PVC sanitario'
        ],
        'specs' => [
            'Norma' => 'NTC 1087',
            'Uso' => 'Ramificaciones en plomería'
        ],
        'category' => $categories[3],
        'brand' => $brands[5],
        'images' => ['/images/products/tee-1-2-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [],
        'projects' => ['plomeria', 'bano', 'cocina']
    ],
    [
        'id' => 27,
        'name' => 'Codo/Adaptador/Unión 1/2"',
        'slug' => 'codo-adaptador-union-1-2',
        'sku' => 'COA-1/2-8',
        'price' => 800,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 600,
        'stock_type' => 'in_stock',
        'rating' => 4.6,
        'reviews_count' => 156,
        'description' => 'Accesorios de plomería 1/2 pulgada: Codos, Adaptadores Macho/Hembra y Uniones. Versátiles para cualquier instalación.',
        'features' => [
            'Medida: 1/2 pulgada',
            'Múltiples tipos: Codo 90°, Adaptador M/H, Unión',
            'Material: PVC y latón'
        ],
        'specs' => [
            'Norma' => 'NTC 1087',
            'Aplicación' => 'Instalaciones sanitarias'
        ],
        'category' => $categories[3],
        'brand' => $brands[5],
        'images' => ['/images/products/codo-adaptador-union-1-2-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [25, 26],
        'projects' => ['plomeria', 'bano', 'cocina']
    ],
    [
        'id' => 28,
        'name' => 'Rodillo 9"',
        'slug' => 'rodillo-9',
        'sku' => 'ROD-9-98',
        'price' => 9800,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 160,
        'stock_type' => 'in_stock',
        'rating' => 4.7,
        'reviews_count' => 84,
        'description' => 'Rodillo de felpa de 9 pulgadas. Ideal para pintar superficies grandes con acabado uniforme y profesional.',
        'features' => [
            'Ancho: 9 pulgadas (228mm)',
            'Material: Felpa de calidad premium',
            'Peso: 350g'
        ],
        'specs' => [
            'Aplicación' => 'Muros, techos',
            'Rendimiento' => 'Alto cubrimiento'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/rodillo-9-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 29,
        'name' => 'Rodillo 3"',
        'slug' => 'rodillo-3',
        'sku' => 'ROD-3-50',
        'price' => 5000,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 200,
        'stock_type' => 'in_stock',
        'rating' => 4.5,
        'reviews_count' => 67,
        'description' => 'Rodillo de felpa de 3 pulgadas para trabajos de acabado en superficies medianas. Perfecto para control de detalle.',
        'features' => [
            'Ancho: 3 pulgadas (76mm)',
            'Material: Felpa de calidad',
            'Peso: 120g'
        ],
        'specs' => [
            'Aplicación' => 'Superficies medianas',
            'Control' => 'Excelente para detalles'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/rodillo-3-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 30,
        'name' => 'Rodillo 2"',
        'slug' => 'rodillo-2',
        'sku' => 'ROD-2-45',
        'price' => 4500,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 220,
        'stock_type' => 'in_stock',
        'rating' => 4.6,
        'reviews_count' => 71,
        'description' => 'Rodillo de felpa de 2 pulgadas compacto y versátil. Ideal para pintar esquinas y espacios reducidos con precisión.',
        'features' => [
            'Ancho: 2 pulgadas (51mm)',
            'Material: Felpa fina',
            'Peso: 80g'
        ],
        'specs' => [
            'Aplicación' => 'Espacios reducidos y esquinas',
            'Precisión' => 'Muy alta'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/rodillo-2-user.png'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 31,
        'name' => 'Rodillo 1.5"',
        'slug' => 'rodillo-1-5',
        'sku' => 'ROD-1.5-28',
        'price' => 2800,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 250,
        'stock_type' => 'in_stock',
        'rating' => 4.7,
        'reviews_count' => 58,
        'description' => 'Rodillo de felpa de 1.5 pulgadas. Especial para detalles finos y retoque de pintura en acabados delicados.',
        'features' => [
            'Ancho: 1.5 pulgadas (38mm)',
            'Material: Felpa ultra fina',
            'Peso: 60g'
        ],
        'specs' => [
            'Aplicación' => 'Detalles y retoque',
            'Control' => 'Máximo'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/rodillo-1.5.jpg'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ],
    [
        'id' => 32,
        'name' => 'Rodillo 4"',
        'slug' => 'rodillo-4',
        'sku' => 'ROD-4-58',
        'price' => 5800,
        'sale_price' => null,
        'discount_percent' => 0,
        'stock' => 190,
        'stock_type' => 'in_stock',
        'rating' => 4.6,
        'reviews_count' => 73,
        'description' => 'Rodillo de felpa de 4 pulgadas profesional. Excelente relación entre cobertura y control para trabajos de media escala.',
        'features' => [
            'Ancho: 4 pulgadas (102mm)',
            'Material: Felpa profesional',
            'Peso: 140g'
        ],
        'specs' => [
            'Aplicación' => 'Trabajos de media escala',
            'Rendimiento' => 'Muy bueno'
        ],
        'category' => $categories[5],
        'brand' => $brands[6],
        'images' => ['/images/products/rodillo-4.jpg'],
        'is_offer' => false,
        'is_featured' => false,
        'compatible_product_ids' => [15],
        'projects' => ['pintura']
    ]
];

return [
    'categories' => $categories,
    'brands' => $brands,
    'products' => $products,
];
