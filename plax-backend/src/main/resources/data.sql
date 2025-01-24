INSERT INTO users (id, email, firstname, lastname, password, role)
VALUES (UUID_TO_BIN('8b07383c-cfbe-4dfe-b122-3ee0f5ac4230'), 'admin@gmail.com', 'admin', 'admin',
        '$2a$12$lVJtPYap0O4AM.jNpV8eYeDzTYuVZlDmGLTWZ0BxPbcYfbfusfzq2', 'ADMIN'),
       (UUID_TO_BIN('8b07383c-cfbe-4dfe-b122-3ee0f5ac4231'), 'maxi11carrillo@gmail.com', 'Maximiliano', 'Carrillo',
        '$2a$12$3QmyP5Ad4l/o4082KVPpmuaqtzjEaDlSVE2zMeBILbykC17OJKBbi', 'ADMIN'),
       (UUID_TO_BIN('8b07383c-cfbe-4dfe-b122-3ee0f5ac4232'), 'sofi@gmail.com', 'Sofia', 'Carrillo',
        '$2a$12$Fh9FRwrIJAHLHs9KTSe8n.EBzErIlNyZYaxeR1PwHZSPzEi9le5T6', 'USER'),
       (UUID_TO_BIN('8b07383c-cfbe-4dfe-b122-3ee0f5ac4233'), 'zoe@gmail.com', 'Zoe', 'Carrillo',
        '$2a$12$GwT1EO2A6HevpV2hy/lDk.QJb4T3IzcCyUwIylXQYAcy.obduSrBi', 'USER'),
       (UUID_TO_BIN('8b07383c-cfbe-4dfe-b122-3ee0f5ac4234'), 'messi@gmail.com', 'Lionel', 'Messi',
        '$2a$12$hCxOwkgEQ2iQ39MiWEj/7eWgDBaEoCqG/Zz3tF148AOaMEiisLB7W', 'USER'),
       (UUID_TO_BIN('8b07383c-cfbe-4dfe-b122-3ee0f5ac4235'), 'goku@gmail.com', 'Goku', 'Son',
        '$2a$12$3QmyP5Ad4l/o4082KVPpmuaqtzjEaDlSVE2zMeBILbykC17OJKBbi', 'USER');

INSERT INTO features (id, icon, name)
VALUES (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), 'wifi.svg', 'Wi-fi'),
       (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), 'aire-acondicionado.svg', 'Aire Acondicionado'),
       (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), 'ducha.svg', 'Ducha'),
       (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), 'cocina.svg', 'Cocina'),
       (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), 'baño.svg', 'Baño'),
       (UUID_TO_BIN('5676c57b-d988-4044-b9ff-4674de90d1c7'), 'piscina.svg', 'Piscina'),
       (UUID_TO_BIN('db98265e-d3b4-47cc-a35d-97b9ab3143ec'), 'gimnasio.svg', 'Gimnasio'),
       (UUID_TO_BIN('b091d98c-465b-489a-9835-1e58be88ef52'), 'tv.svg', 'Televisión'),
       (UUID_TO_BIN('1d18ac34-7b37-4e7d-a71f-10a7f6acb364'), 'estacionamiento.svg', 'Estacionamiento'),
       (UUID_TO_BIN('a278d2c3-e45d-4f76-a6f6-440b7e7de1b0'), 'jacuzzi.svg', 'Jacuzzi'),
       (UUID_TO_BIN('3b674d7c-7e78-437d-970d-c548d3b1b007'), 'terraza.svg', 'Terraza'),
       (UUID_TO_BIN('fe9f0734-33c2-44d1-94a2-3fe1b76c35e9'), 'balcon.svg', 'Balcón'),
       (UUID_TO_BIN('dda5c078-36c6-4601-8b49-13b289cf0e6f'), 'cocina-equipada.svg', 'Cocina equipada'),
       (UUID_TO_BIN('8105d467-b09d-4631-b5c1-d2f8b5d8f110'), 'chimenea.svg', 'Chimenea'),
       (UUID_TO_BIN('4f21d2f0-63c3-41e9-b91d-8c81f83a9688'), 'lavadora.svg', 'Lavadora');

INSERT INTO categories (id, description, image, name)
VALUES (UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c7f'), 'Alojamientos en hoteles con servicios completos',
        'hotel.jpg', 'Hotel'),
       (UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c8f'), 'Alquileres de apartamentos para estancias largas',
        'apartamento.jpg', 'Departamento'),
       (UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c6f'), 'Casas independientes para grupos o familias', 'casa.jpg',
        'Casa'),
       (UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c5f'), 'Hoteles boutique con una experiencia más personalizada',
        'boutique-hotel.jpg', 'Hotel Boutique'),
       (UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c4f'), 'Alojamientos rurales y tranquilos en el campo',
        'cabana.jpg', 'Cabaña');

INSERT INTO addresses (id, city, country, street)
VALUES (UUID_TO_BIN('fccf90c9-288e-451c-9543-d03375c9efab'), 'Buenos Aires', 'Argentina', 'Av. Playa 123'),
       (UUID_TO_BIN('b1b1b1b1-288e-451c-9543-d03375c9efab'), 'Buenos Aires', 'Argentina', 'Calle del Sol 456'),
       (UUID_TO_BIN('c2c2c2c2-288e-451c-9543-d03375c9efab'), 'Mendoza', 'Argentina', 'Calle Libertad 789'),
       (UUID_TO_BIN('d3d3d3d3-288e-451c-9543-d03375c9efab'), 'Santa Fe', 'Argentina', 'Calle del Lago 555'),
       (UUID_TO_BIN('e4e4e4e4-288e-451c-9543-d03375c9efab'), 'Neuquén', 'Argentina', 'Ruta 40 Km 900'),
       (UUID_TO_BIN('f5f5f5f5-288e-451c-9543-d03375c9efab'), 'Buenos Aires', 'Argentina', 'Av. Costa 123');

INSERT INTO stay_policies (id, policy, description)
VALUES (UUID_TO_BIN('fccf90c9-288e-451c-9543-d03375c9efab'), 'Prohibido la entrada de animales',
        'Está completamente prohibido la entrada de cualquier tipo de animal a las instalaciones'),
       (UUID_TO_BIN('b1b1b1b1-288e-451c-9543-d03375c9efab'), 'Prohibido fumar',
        'Está prohibido fumar en cualquier lugar de las instalaciones'),
       (UUID_TO_BIN('c2c2c2c2-288e-451c-9543-d03375c9efab'), 'Check-in a partir de las 15hs',
        'El check-in se realiza a partir de las 15hs'),
       (UUID_TO_BIN('d3d3d3d3-288e-451c-9543-d03375c9efab'), 'Check-out antes de las 10hs',
        'El check-out se realiza antes de las 10hs'),
       (UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c7f'), 'Prohibido la entrada de animales',
        'Está completamente prohibido la entrada de cualquier tipo de animal a las instalaciones'),
       (UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c8f'), 'Prohibido fumar',
        'Está prohibido fumar en cualquier lugar de las instalaciones'),
       (UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c6f'), 'Check-in a partir de las 15hs',
        'El check-in se realiza a partir de las 15hs'),
       (UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c5f'), 'Check-out antes de las 10hs',
        'El check-out se realiza antes de las 10hs'),
       (UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c4f'), 'Está prohibido invitar gente a dormir',
        'Está prohibido fumar invitar a cualquier persona ajenas a los huéspedes a dormir en las instalaciones'),
       (UUID_TO_BIN('fe9f0734-33c2-44d1-94a2-3fe1b76c35e9'), 'Check-in a partir de las 14hs',
        'El check-in se realiza a partir de las 14hs'),
       (UUID_TO_BIN('4f21d2f0-63c3-41e9-b91d-8c81f83a9688'), 'Check-out antes de las 12hs',
        'El check-out se realiza antes de las 12hs'),
       (UUID_TO_BIN('5676c57b-d988-4044-b9ff-4674de90d1c7'), 'Check-in a partir de las 14hs',
        'El check-in se realiza a partir de las 14hs'),
       (UUID_TO_BIN('4f21d2f0-63c3-41e9-b91d-8c81f83a9668'), 'Check-out antes de las 12hs',
        'El check-out se realiza antes de las 12hs'),
       (UUID_TO_BIN('fe9f0734-33c2-44d1-94a2-3fe1b76c45e9'), 'Check-in a partir de las 14hs',
        'El check-in se realiza a partir de las 14hs'),
       (UUID_TO_BIN('4f21d2f0-63c3-41e9-b91d-8c81f83a9678'), 'Check-out antes de las 12hs',
        'El check-out se realiza antes de las 12hs');

INSERT INTO stays (id, appreciation, description, name, price, id_address, id_category)
VALUES (UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8'), 0, 'Hotel frente al mar, con todas las comodidades',
        'Hotel Duna', 50000, UUID_TO_BIN('fccf90c9-288e-451c-9543-d03375c9efab'),
        UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c7f')),
       (UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891'), 0, 'Departamento con vista panorámica', 'Departamento Sol',
        35000, UUID_TO_BIN('b1b1b1b1-288e-451c-9543-d03375c9efab'),
        UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c8f')),
       (UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0'), 0, 'Casa amplia con jardín para familias', 'Casa Libertad',
        30000, UUID_TO_BIN('c2c2c2c2-288e-451c-9543-d03375c9efab'),
        UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c6f')),
       (UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c'), 0, 'Hotel boutique con encanto', 'Hotel Boutique Lago',
        40000, UUID_TO_BIN('d3d3d3d3-288e-451c-9543-d03375c9efab'),
        UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c5f')),
       (UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4'), 0, 'Cabaña en el campo, rodeada de naturaleza',
        'Cabaña del Valle', 25000, UUID_TO_BIN('e4e4e4e4-288e-451c-9543-d03375c9efab'),
        UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c4f'));
-- Falta agregar las estancias de abajo

-- INSERT INTO
--   stays (price, id, id_category, address, description, name)
-- VALUES
--   (27000, UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c7f'), 'Av. Costa 123, Mar del Plata', 'Hotel de lujo con spa y piscina', 'Hotel Costa Azul'),
--   (45000, UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c7f'), 'Calle Sur 678, Bariloche', 'Hotel con vista a las montañas', 'Hotel Montañas'),
--   (32000, UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c8f'), 'Calle Larga 345, Mendoza', 'Departamento con pileta y parrilla', 'Departamento Luján'),
--   (40000, UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c6f'), 'Ruta Nacional 40, San Juan', 'Casa de campo con quincho', 'Casa San Juan'),
--   (55000, UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c7f'), 'Calle del Mar 455, Viña del Mar', 'Hotel con restaurant y eventos', 'Hotel del Mar'),
--   (45000, UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c5f'), 'Av. Las Palmas 234, Mar del Plata', 'Hotel boutique con servicio de lujo', 'Hotel Palmas'),
--   (22000, UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c6f'), 'Calle Verde 789, Villa María', 'Casa con jardín y parrilla', 'Casa Verde'),
--   (35000, UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c8f'), 'Avenida Central 512, Córdoba', 'Departamento con excelente ubicación', 'Departamento Central'),
--   (23000, UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c7f'), 'Calle de la Playa 654, San Clemente', 'Hotel con actividades recreativas', 'Hotel Recreo'),
--   (28000, UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c7f'), 'Avenida Nueva 123, Villa Gesell', 'Hotel con todos los servicios', 'Hotel Villa Gesell'),
--   (50000, UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c5f'), 'Calle del Río 788, Puerto Madryn', 'Hotel boutique en el centro', 'Hotel Boutique Río'),
--   (40000, UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c8f'), 'Calle de los Pinos 412, Mendoza', 'Departamento con pileta y parrilla', 'Departamento Los Pinos'),
--   (35000, UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c7f'), 'Avenida del Sol 901, Mar del Plata', 'Hotel moderno con excelente servicio', 'Hotel Roma'),
--   (32000, UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c8f'), 'Calle Luna 123, Rosario', 'Departamento amueblado, ideal para familias', 'Departamento Luna');
--

INSERT INTO stays_policies
(stays_id, policies_id)
VALUES
--     DUNA
(UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8'), UUID_TO_BIN('fccf90c9-288e-451c-9543-d03375c9efab')),
(UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8'), UUID_TO_BIN('b1b1b1b1-288e-451c-9543-d03375c9efab')),
(UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8'), UUID_TO_BIN('c2c2c2c2-288e-451c-9543-d03375c9efab')),
(UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8'), UUID_TO_BIN('d3d3d3d3-288e-451c-9543-d03375c9efab')),
--     SOL
(UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c7f')),
(UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c8f')),
(UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c6f')),
(UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c5f')),
--     LIBERTAD
(UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0'), UUID_TO_BIN('be39b7dd-fe38-44f4-8ada-451681d01c4f')),
(UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0'), UUID_TO_BIN('fe9f0734-33c2-44d1-94a2-3fe1b76c35e9')),
(UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0'), UUID_TO_BIN('4f21d2f0-63c3-41e9-b91d-8c81f83a9688')),
--     LAGO
(UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c'), UUID_TO_BIN('5676c57b-d988-4044-b9ff-4674de90d1c7')),
(UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c'), UUID_TO_BIN('4f21d2f0-63c3-41e9-b91d-8c81f83a9668')),
--     VALLE
(UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4'), UUID_TO_BIN('fe9f0734-33c2-44d1-94a2-3fe1b76c45e9')),
(UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4'), UUID_TO_BIN('4f21d2f0-63c3-41e9-b91d-8c81f83a9678'));

INSERT INTO stay_feature (feature_id, stay_id)
VALUES
    -- Hotel Duna
    (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8')),
    (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8')),
    (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8')),
    (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8')),
    (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8')),
    -- Departamento Sol
    (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891')),
    (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891')),
    (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891')),
    (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891')),
    (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891')),
    -- Casa Libertad
    (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0')),
    (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0')),
    (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0')),
    (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0')),
    (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0')),
    -- Hotel Boutique Lago
    (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c')),
    (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c')),
    (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c')),
    (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c')),
    (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c')),
    -- Cabaña del Valle
    (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4')),
    (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4')),
    (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4')),
    (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4')),
    (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4'));
--   -- Hotel Costa Azul
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6')),
--   -- Hotel Montañas
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b')),
--   -- Departamento Luján
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91')),
--   -- Casa San Juan
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9')),
--   -- Hotel del Mar
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522')),
--   -- Hotel Palmas
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325')),
--   -- Casa Verde
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785')),
--   -- Departamento Central
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856')),
--   -- Hotel Recreo
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d')),
--   -- Hotel Villa Gesell
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f')),
--   -- Hotel Boutique Río
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56')),
--   -- Departamento Los Pinos
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02')),
--   -- Hotel Roma
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297')),
--   -- Departamento Luna
--   (UUID_TO_BIN('1c9f77b1-1be1-4b18-a43b-287b0989238e'), UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78')),
--   (UUID_TO_BIN('2dca07fc-7c1d-4069-9057-f5c55a1c0ab1'), UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78')),
--   (UUID_TO_BIN('9f8c1be1-6200-4533-a1fa-c23c12d0e0b4'), UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78')),
--   (UUID_TO_BIN('f8c2ab10-f70a-467e-92a1-f3ffeb1266e0'), UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78')),
--   (UUID_TO_BIN('61f63e53-5092-450b-b17c-0e340d1258d0'), UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78'));
--
INSERT INTO stay_images (id, url)
VALUES
    -- Hotel Duna
    (UUID_TO_BIN('e1338d35-9944-4861-842b-4fce19759cae'), 'hotel-duna-1.jpg'),
    (UUID_TO_BIN('6b2baec8-386c-45ca-a201-39d63310b938'), 'hotel-duna-2.jpg'),
    (UUID_TO_BIN('2b026a26-bcb2-4ec2-b4d5-500106a52fbf'), 'hotel-duna-3.jpg'),
    (UUID_TO_BIN('0b30d2ed-d200-44b4-8be6-0e26f86bf017'), 'hotel-duna-4.jpg'),
    (UUID_TO_BIN('4e8381fc-d5e4-4063-95ef-b246904ee7c0'), 'hotel-duna-5.jpg'),
    -- Departamento Sol
    (UUID_TO_BIN('c1a5f4e1-5367-4e99-9c11-6571a4e2ad76'), 'departamento-sol-1.jpg'),
    (UUID_TO_BIN('d2b6789f-b673-40b8-91a1-7f18d91e2b72'), 'departamento-sol-2.jpg'),
    (UUID_TO_BIN('e5b82d4a-9231-4d97-845b-3d8175c77d49'), 'departamento-sol-3.jpg'),
    (UUID_TO_BIN('f6c92e3a-11bc-47b1-b7c6-89f71996c1a3'), 'departamento-sol-4.jpg'),
    (UUID_TO_BIN('a8d83f1b-21cd-4e03-a3a5-5f219bcd1a81'), 'departamento-sol-5.jpg'),
    -- Casa Libertad
    (UUID_TO_BIN('b7e94f2c-31de-44e2-a51c-63d92e3d7b49'), 'casa-libertad-1.jpg'),
    (UUID_TO_BIN('c8f0514d-41ef-48f3-b62d-72e92d4e8c5a'), 'casa-libertad-2.jpg'),
    (UUID_TO_BIN('d9f1625e-5201-4994-c73e-81fa91e4b1d6'), 'casa-libertad-3.jpg'),
    (UUID_TO_BIN('eaf2736f-6312-4a05-d84f-92fb92f5b2e7'), 'casa-libertad-4.jpg'),
    (UUID_TO_BIN('2c4ee99c-284b-43b5-bad9-57a0304a9942'), 'casa-libertad-5.jpg'),
    -- Hotel Boutique Lago
    (UUID_TO_BIN('a1a5d4e2-5217-4c99-8c22-9572b4e3cd87'), 'hotel-boutique-lago-1.jpg'),
    (UUID_TO_BIN('b2b6789d-a673-41b8-91b1-6f19e81f3b73'), 'hotel-boutique-lago-2.jpg'),
    (UUID_TO_BIN('c5c82d4e-b231-4d97-854b-2d8185d88d59'), 'hotel-boutique-lago-3.jpg'),
    (UUID_TO_BIN('d6d92e3a-c1bc-47b1-b7d7-78f71996d2b4'), 'hotel-boutique-lago-4.jpg'),
    (UUID_TO_BIN('e8e83f2b-d1cd-4e03-a3a6-4f219acd1a82'), 'hotel-boutique-lago-5.jpg'),
    -- Cabaña del Valle
    (UUID_TO_BIN('a2b5e4c3-e117-4d99-9c33-6581b4e4ad77'), 'cabana-del-valle-1.jpg'),
    (UUID_TO_BIN('b3c678af-f773-41b8-92b2-5f19d82f4c84'), 'cabana-del-valle-2.jpg'),
    (UUID_TO_BIN('c6d82d5f-a341-4c97-865b-3d8195c89d60'), 'cabana-del-valle-3.jpg'),
    (UUID_TO_BIN('d7e92f4a-d2cd-48b2-c8d7-67f71997d3b5'), 'cabana-del-valle-4.jpg'),
    (UUID_TO_BIN('e9f83f3b-e3dc-4e14-d3a7-3f319bde2b92'), 'cabana-del-valle-5.jpg');
--   -- Hotel Costa Azul
--   (UUID_TO_BIN('a3c5f4e4-f217-4e99-9d44-7591c4f4be88'), 'hotel-costa-azul-1.jpg'),
--   (UUID_TO_BIN('795f705b-f41e-4bd8-8151-04b0818b0543'), 'hotel-costa-azul-2.jpg'),
--   (UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a937341e'), 'hotel-costa-azul-3.jpg'),
--   (UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a937342e'), 'hotel-costa-azul-4.jpg'),
--   (UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a934341e'), 'hotel-costa-azul-5.jpg'),
--   -- Hotel Montañas
--   (UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1248a937341e'), 'hotel-montanas-1.jpg'),
--   (UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1448a937341e'), 'hotel-montanas-2.jpg'),
--   (UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a937340e'), 'hotel-montanas-3.jpg'),
--   (UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a037341e'), 'hotel-montanas-4.jpg'),
--   (UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a887341e'), 'hotel-montanas-5.jpg'),
--   -- Departamento Luján
--   (UUID_TO_BIN('091823a6-9909-4925-9554-e9811cfb54ab'), 'departamento-lujan-1.jpg'),
--   (UUID_TO_BIN('d631328c-2f5d-43ca-8b7a-4c974f388454'), 'departamento-lujan-2.jpg'),
--   (UUID_TO_BIN('42bc94ea-db16-4276-a99a-a45debfea7b5'), 'departamento-lujan-3.jpg'),
--   (UUID_TO_BIN('be7aed2e-50c4-4608-87dd-fcb58f985d5d'), 'departamento-lujan-4.jpg'),
--   (UUID_TO_BIN('3a7019a3-cb5d-4046-9c95-dc778a645951'), 'departamento-lujan-5.jpg'),
--   -- Casa San Juan
--   (UUID_TO_BIN('a3d5f4e5-d317-4c99-9d35-8972a4e3cb88'), 'casa-san-juan-1.jpg'),
--   (UUID_TO_BIN('b4e6789d-c673-48b8-91b1-6f18d91f5c84'), 'casa-san-juan-2.jpg'),
--   (UUID_TO_BIN('c6f82d6a-9231-4d97-865a-3d9196c8ae61'), 'casa-san-juan-3.jpg'),
--   (UUID_TO_BIN('d7f92f5b-b2cd-48b2-c8c7-78f81997f7b6'), 'casa-san-juan-4.jpg'),
--   (UUID_TO_BIN('e8f83f3b-c3dc-4e14-d4a8-6f519bde4c93'), 'casa-san-juan-5.jpg'),
--   -- Hotel del Mar
--   (UUID_TO_BIN('b5e6d4a7-d71d-4d99-9c47-8872b4e3ad77'), 'hotel-del-mar-1.jpg'),
--   (UUID_TO_BIN('c6f7d8af-f873-41b8-91c4-7f39d82f7c95'), 'hotel-del-mar-2.jpg'),
--   (UUID_TO_BIN('d7e9e5be-b741-4c97-865b-4e9196c8ae73'), 'hotel-del-mar-3.jpg'),
--   (UUID_TO_BIN('e8f92f7a-c1cd-48b2-d4a7-88f81997f6c6'), 'hotel-del-mar-4.jpg'),
--   (UUID_TO_BIN('f9e93f3b-d3dc-4e14-d5a8-7f519bde4d81'), 'hotel-del-mar-5.jpg'),
--   -- Hotel Palmas
--   (UUID_TO_BIN('b8e4d7c3-d512-4e99-8a22-8657b4f3be79'), 'hotel-palmas-1.jpg'),
--   (UUID_TO_BIN('c9f6789d-b873-40b8-92b4-6f19d92f4b93'), 'hotel-palmas-2.jpg'),
--   (UUID_TO_BIN('d1f82d6a-8431-4c97-865a-8d9185d77a56'), 'hotel-palmas-3.jpg'),
--   (UUID_TO_BIN('e2f92e3b-c2bc-47b1-b7d6-79f81997d1c8'), 'hotel-palmas-4.jpg'),
--   (UUID_TO_BIN('f3f83f1b-d1cd-4e03-a1a6-5f219acd8b33'), 'hotel-palmas-5.jpg'),
--   -- Casa Verde
--   (UUID_TO_BIN('c7a5d4e2-e217-4d99-8c22-9572b4e3cd99'), 'casa-verde-1.jpg'),
--   (UUID_TO_BIN('d8b6789f-b673-40b8-91a2-6f18d91f5b73'), 'casa-verde-2.jpg'),
--   (UUID_TO_BIN('e9c82d4a-9231-4e97-845b-3f8185d88c69'), 'casa-verde-3.jpg'),
--   (UUID_TO_BIN('f1d92e3b-b1bc-47b1-b7c6-88f81996b1b7'), 'casa-verde-4.jpg'),
--   (UUID_TO_BIN('a2e83f1b-c1cd-4e03-a4a5-5f219acd2a72'), 'casa-verde-5.jpg'),
--   -- Departamento Central
--   (UUID_TO_BIN('a4b5d7e6-6217-4c99-9c28-6671a7f3cd91'), 'departamento-central-1.jpg'),
--   (UUID_TO_BIN('b5c6789f-b673-40b8-91a3-7f28d91f8b84'), 'departamento-central-2.jpg'),
--   (UUID_TO_BIN('c6d82d4a-9231-4e97-845b-3f9185d88d51'), 'departamento-central-3.jpg'),
--   (UUID_TO_BIN('d7d92e3b-b1bc-47b1-b7c6-99f81996b5b4'), 'departamento-central-4.jpg'),
--   (UUID_TO_BIN('e8e83f1b-c1cd-4e03-a4a7-7f219acd2a22'), 'departamento-central-5.jpg'),
--   -- Hotel Recreo
--   (UUID_TO_BIN('b6a5d4e2-5317-4c99-9c35-6472b4e3d961'), 'hotel-recreo-1.jpg'),
--   (UUID_TO_BIN('c7b6789f-b773-40b8-91a1-7f28d91f2d56'), 'hotel-recreo-2.jpg'),
--   (UUID_TO_BIN('d8c82d4a-9231-4e97-845a-3f8185d88b91'), 'hotel-recreo-3.jpg'),
--   (UUID_TO_BIN('e9d92e3b-b2bc-47b1-b7d7-79f81996f3a8'), 'hotel-recreo-4.jpg'),
--   (UUID_TO_BIN('fae83f1b-c1cd-4e03-a4a8-6f219acd5f99'), 'hotel-recreo-5.jpg'),
--   -- Hotel Villa Gesell
--   (UUID_TO_BIN('b7a5d7e1-6517-4c99-8c17-6671a7f2bd61'), 'hotel-villa-gesell-1.jpg'),
--   (UUID_TO_BIN('c8b6789f-c673-42b8-91a2-7f28d91f3d94'), 'hotel-villa-gesell-2.jpg'),
--   (UUID_TO_BIN('d9c82d4a-9331-4e97-845b-3f8185d88c41'), 'hotel-villa-gesell-3.jpg'),
--   (UUID_TO_BIN('eaf92e3b-b1bc-47b1-b7c6-79f81996b8b1'), 'hotel-villa-gesell-4.jpg'),
--   (UUID_TO_BIN('fbd83f1b-c1cd-4e03-a4a5-6f219acd7a42'), 'hotel-villa-gesell-5.jpg'),
--   -- Hotel Boutique Río
--   (UUID_TO_BIN('b8d5d7e2-6617-4c99-9c28-6671a7f2d981'), 'hotel-boutique-rio-1.jpg'),
--   (UUID_TO_BIN('c9e6789f-b773-40b8-91a2-6f18d91f7b84'), 'hotel-boutique-rio-2.jpg'),
--   (UUID_TO_BIN('d0f82d4a-9231-4e97-845b-3f9185d88a59'), 'hotel-boutique-rio-3.jpg'),
--   (UUID_TO_BIN('e1d92e3b-b1bc-47b1-b7c6-88f81996d7a6'), 'hotel-boutique-rio-4.jpg'),
--   (UUID_TO_BIN('f2e83f1b-c1cd-4e03-a4a5-5f219acd8d33'), 'hotel-boutique-rio-5.jpg'),
--   -- Departamento Los Pinos
--   (UUID_TO_BIN('c2a5d7e3-8217-4d99-9c22-9572b4e3cd88'), 'departamento-los-pinos-1.jpg'),
--   (UUID_TO_BIN('d3b6789f-b673-41b8-91a3-6f18d91f5d88'), 'departamento-los-pinos-2.jpg'),
--   (UUID_TO_BIN('e4c82d4a-9231-4e97-845b-3f9185d88e55'), 'departamento-los-pinos-3.jpg'),
--   (UUID_TO_BIN('f5d92e3b-b1bc-47b1-b7c6-99f81996e8b7'), 'departamento-los-pinos-4.jpg'),
--   (UUID_TO_BIN('a6e83f1b-c1cd-4e03-a4a5-5f219acd6b33'), 'departamento-los-pinos-5.jpg'),
--   -- Hotel Roma
--   (UUID_TO_BIN('a8a5d7e6-6317-4c99-9c27-6671a7f2bd92'), 'hotel-roma-1.jpg'),
--   (UUID_TO_BIN('b9b6789f-b673-41b8-91a3-7f28d91f3d67'), 'hotel-roma-2.jpg'),
--   (UUID_TO_BIN('c0c82d4a-9231-4e97-845b-3f9185d88d72'), 'hotel-roma-3.jpg'),
--   (UUID_TO_BIN('d1d92e3b-b1bc-47b1-b7c6-99f81996f9b8'), 'hotel-roma-4.jpg'),
--   (UUID_TO_BIN('e2e83f1b-c1cd-4e03-a4a5-7f219acd8c62'), 'hotel-roma-5.jpg'),
--   -- Departamento Luna
--   (UUID_TO_BIN('c1b5d7c4-8317-4e88-9c11-75d1c5e3ab76'), 'departamento-luna-1.jpg'),
--   (UUID_TO_BIN('d2c6789a-b893-40b8-91c1-8f28d61e2d71'), 'departamento-luna-2.jpg'),
--   (UUID_TO_BIN('e5d82d4f-9321-4c97-846b-4d9175c78e38'), 'departamento-luna-3.jpg'),
--   (UUID_TO_BIN('f6e92e2b-12bc-47a1-c7c6-90f81997d2b3'), 'departamento-luna-4.jpg'),
--   (UUID_TO_BIN('a8f83f4b-23cd-4f03-d3a5-6f319bde2c91'), 'departamento-luna-5.jpg');
--
INSERT INTO stays_images (stays_id, images_id)
VALUES
    -- Hotel Duna
    (UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8'), UUID_TO_BIN('e1338d35-9944-4861-842b-4fce19759cae')),
    (UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8'), UUID_TO_BIN('6b2baec8-386c-45ca-a201-39d63310b938')),
    (UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8'), UUID_TO_BIN('2b026a26-bcb2-4ec2-b4d5-500106a52fbf')),
    (UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8'), UUID_TO_BIN('0b30d2ed-d200-44b4-8be6-0e26f86bf017')),
    (UUID_TO_BIN('8a9b6e3d-27b2-4a0d-9992-d35031e5c7a8'), UUID_TO_BIN('4e8381fc-d5e4-4063-95ef-b246904ee7c0')),
    -- Departamento Sol
    (UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891'), UUID_TO_BIN('c1a5f4e1-5367-4e99-9c11-6571a4e2ad76')),
    (UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891'), UUID_TO_BIN('d2b6789f-b673-40b8-91a1-7f18d91e2b72')),
    (UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891'), UUID_TO_BIN('e5b82d4a-9231-4d97-845b-3d8175c77d49')),
    (UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891'), UUID_TO_BIN('f6c92e3a-11bc-47b1-b7c6-89f71996c1a3')),
    (UUID_TO_BIN('a3b2e1f4-9e02-49ea-b0d1-b6f5d9536891'), UUID_TO_BIN('a8d83f1b-21cd-4e03-a3a5-5f219bcd1a81')),
    -- Casa Libertad
    (UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0'), UUID_TO_BIN('b7e94f2c-31de-44e2-a51c-63d92e3d7b49')),
    (UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0'), UUID_TO_BIN('c8f0514d-41ef-48f3-b62d-72e92d4e8c5a')),
    (UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0'), UUID_TO_BIN('d9f1625e-5201-4994-c73e-81fa91e4b1d6')),
    (UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0'), UUID_TO_BIN('eaf2736f-6312-4a05-d84f-92fb92f5b2e7')),
    (UUID_TO_BIN('d5f8f0f4-ec7e-406d-8d96-5d5053b4f1f0'), UUID_TO_BIN('2c4ee99c-284b-43b5-bad9-57a0304a9942')),
    -- Hotel Boutique Lago
    (UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c'), UUID_TO_BIN('a1a5d4e2-5217-4c99-8c22-9572b4e3cd87')),
    (UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c'), UUID_TO_BIN('b2b6789d-a673-41b8-91b1-6f19e81f3b73')),
    (UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c'), UUID_TO_BIN('c5c82d4e-b231-4d97-854b-2d8185d88d59')),
    (UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c'), UUID_TO_BIN('d6d92e3a-c1bc-47b1-b7d7-78f71996d2b4')),
    (UUID_TO_BIN('c3e2d8f5-2731-4e12-91d5-c8f5ff01392c'), UUID_TO_BIN('e8e83f2b-d1cd-4e03-a3a6-4f219acd1a82')),
    -- Cabaña del Valle
    (UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4'), UUID_TO_BIN('a2b5e4c3-e117-4d99-9c33-6581b4e4ad77')),
    (UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4'), UUID_TO_BIN('b3c678af-f773-41b8-92b2-5f19d82f4c84')),
    (UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4'), UUID_TO_BIN('c6d82d5f-a341-4c97-865b-3d8195c89d60')),
    (UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4'), UUID_TO_BIN('d7e92f4a-d2cd-48b2-c8d7-67f71997d3b5')),
    (UUID_TO_BIN('f8a83214-182b-4204-b44a-31e82f9c5ca4'), UUID_TO_BIN('e9f83f3b-e3dc-4e14-d3a7-3f319bde2b92'));
--   -- Hotel Costa Azul
--   (UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6'), UUID_TO_BIN('a3c5f4e4-f217-4e99-9d44-7591c4f4be88')),
--   (UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6'), UUID_TO_BIN('795f705b-f41e-4bd8-8151-04b0818b0543')),
--   (UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6'), UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a937341e')),
--   (UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6'), UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a937342e')),
--   (UUID_TO_BIN('2d7a23fe-b512-408d-a4d9-13e7d992c9a6'), UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a934341e')),
--   -- Hotel Montañas
--   (UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b'), UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1248a937341e')),
--   (UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b'), UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1448a937341e')),
--   (UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b'), UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a937340e')),
--   (UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b'), UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a037341e')),
--   (UUID_TO_BIN('d84d8b6a-06c2-4e2f-a255-b2456c4d755b'), UUID_TO_BIN('ba063a07-5cc3-4a96-b587-1348a887341e')),
--   -- Departamento Luján
--   (UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91'), UUID_TO_BIN('091823a6-9909-4925-9554-e9811cfb54ab')),
--   (UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91'), UUID_TO_BIN('d631328c-2f5d-43ca-8b7a-4c974f388454')),
--   (UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91'), UUID_TO_BIN('42bc94ea-db16-4276-a99a-a45debfea7b5')),
--   (UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91'), UUID_TO_BIN('be7aed2e-50c4-4608-87dd-fcb58f985d5d')),
--   (UUID_TO_BIN('7c9f07b4-d23c-4e87-b5a5-501e7a544d91'), UUID_TO_BIN('3a7019a3-cb5d-4046-9c95-dc778a645951')),
--   -- Casa San Juan
--   (UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9'), UUID_TO_BIN('a3d5f4e5-d317-4c99-9d35-8972a4e3cb88')),
--   (UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9'), UUID_TO_BIN('b4e6789d-c673-48b8-91b1-6f18d91f5c84')),
--   (UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9'), UUID_TO_BIN('c6f82d6a-9231-4d97-865a-3d9196c8ae61')),
--   (UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9'), UUID_TO_BIN('d7f92f5b-b2cd-48b2-c8c7-78f81997f7b6')),
--   (UUID_TO_BIN('74e3b4a2-6c25-4217-9d6c-e99a258984b9'), UUID_TO_BIN('e8f83f3b-c3dc-4e14-d4a8-6f519bde4c93')),
--   -- Hotel del Mar
--   (UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522'), UUID_TO_BIN('b5e6d4a7-d71d-4d99-9c47-8872b4e3ad77')),
--   (UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522'), UUID_TO_BIN('c6f7d8af-f873-41b8-91c4-7f39d82f7c95')),
--   (UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522'), UUID_TO_BIN('d7e9e5be-b741-4c97-865b-4e9196c8ae73')),
--   (UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522'), UUID_TO_BIN('e8f92f7a-c1cd-48b2-d4a7-88f81997f6c6')),
--   (UUID_TO_BIN('11858bb7-5d9e-40f5-b9d0-218c5d941522'), UUID_TO_BIN('f9e93f3b-d3dc-4e14-d5a8-7f519bde4d81')),
--   -- Hotel Palmas
--   (UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325'), UUID_TO_BIN('b8e4d7c3-d512-4e99-8a22-8657b4f3be79')),
--   (UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325'), UUID_TO_BIN('c9f6789d-b873-40b8-92b4-6f19d92f4b93')),
--   (UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325'), UUID_TO_BIN('d1f82d6a-8431-4c97-865a-8d9185d77a56')),
--   (UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325'), UUID_TO_BIN('e2f92e3b-c2bc-47b1-b7d6-79f81997d1c8')),
--   (UUID_TO_BIN('d5b4521a-168b-4a84-b37f-9e759a59f325'), UUID_TO_BIN('f3f83f1b-d1cd-4e03-a1a6-5f219acd8b33')),
--   -- Casa Verde
--   (UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785'), UUID_TO_BIN('c7a5d4e2-e217-4d99-8c22-9572b4e3cd99')),
--   (UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785'), UUID_TO_BIN('d8b6789f-b673-40b8-91a2-6f18d91f5b73')),
--   (UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785'), UUID_TO_BIN('e9c82d4a-9231-4e97-845b-3f8185d88c69')),
--   (UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785'), UUID_TO_BIN('f1d92e3b-b1bc-47b1-b7c6-88f81996b1b7')),
--   (UUID_TO_BIN('6d63d2e4-847b-4172-8e43-5732b48a4785'), UUID_TO_BIN('a2e83f1b-c1cd-4e03-a4a5-5f219acd2a72')),
--   -- Departamento Central
--   (UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856'), UUID_TO_BIN('a4b5d7e6-6217-4c99-9c28-6671a7f3cd91')),
--   (UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856'), UUID_TO_BIN('b5c6789f-b673-40b8-91a3-7f28d91f8b84')),
--   (UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856'), UUID_TO_BIN('c6d82d4a-9231-4e97-845b-3f9185d88d51')),
--   (UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856'), UUID_TO_BIN('d7d92e3b-b1bc-47b1-b7c6-99f81996b5b4')),
--   (UUID_TO_BIN('1e635f7a-abb6-4a76-9db5-f92443227856'), UUID_TO_BIN('e8e83f1b-c1cd-4e03-a4a7-7f219acd2a22')),
--   -- Hotel Recreo
--   (UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d'), UUID_TO_BIN('b6a5d4e2-5317-4c99-9c35-6472b4e3d961')),
--   (UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d'), UUID_TO_BIN('c7b6789f-b773-40b8-91a1-7f28d91f2d56')),
--   (UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d'), UUID_TO_BIN('d8c82d4a-9231-4e97-845a-3f8185d88b91')),
--   (UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d'), UUID_TO_BIN('e9d92e3b-b2bc-47b1-b7d7-79f81996f3a8')),
--   (UUID_TO_BIN('9c4c2e2f-ec87-44e5-9ab9-e5b1c9e9bb0d'), UUID_TO_BIN('fae83f1b-c1cd-4e03-a4a8-6f219acd5f99')),
--   -- Hotel Villa Gesell
--   (UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f'), UUID_TO_BIN('b7a5d7e1-6517-4c99-8c17-6671a7f2bd61')),
--   (UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f'), UUID_TO_BIN('c8b6789f-c673-42b8-91a2-7f28d91f3d94')),
--   (UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f'), UUID_TO_BIN('d9c82d4a-9331-4e97-845b-3f8185d88c41')),
--   (UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f'), UUID_TO_BIN('eaf92e3b-b1bc-47b1-b7c6-79f81996b8b1')),
--   (UUID_TO_BIN('2ad6e4bb-5b74-4323-b064-676073b21f3f'), UUID_TO_BIN('fbd83f1b-c1cd-4e03-a4a5-6f219acd7a42')),
--   -- Hotel Boutique Río
--   (UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56'), UUID_TO_BIN('b8d5d7e2-6617-4c99-9c28-6671a7f2d981')),
--   (UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56'), UUID_TO_BIN('c9e6789f-b773-40b8-91a2-6f18d91f7b84')),
--   (UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56'), UUID_TO_BIN('d0f82d4a-9231-4e97-845b-3f9185d88a59')),
--   (UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56'), UUID_TO_BIN('e1d92e3b-b1bc-47b1-b7c6-88f81996d7a6')),
--   (UUID_TO_BIN('4f2f79e5-d9e1-4b98-869f-5e39e8cfbb56'), UUID_TO_BIN('f2e83f1b-c1cd-4e03-a4a5-5f219acd8d33')),
--   -- Departamento Los Pinos
--   (UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02'), UUID_TO_BIN('c2a5d7e3-8217-4d99-9c22-9572b4e3cd88')),
--   (UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02'), UUID_TO_BIN('d3b6789f-b673-41b8-91a3-6f18d91f5d88')),
--   (UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02'), UUID_TO_BIN('e4c82d4a-9231-4e97-845b-3f9185d88e55')),
--   (UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02'), UUID_TO_BIN('f5d92e3b-b1bc-47b1-b7c6-99f81996e8b7')),
--   (UUID_TO_BIN('68c3cfd5-0c5d-4744-bbf7-2b254c88ef02'), UUID_TO_BIN('a6e83f1b-c1cd-4e03-a4a5-5f219acd6b33')),
--   -- Hotel Roma
--   (UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297'), UUID_TO_BIN('a8a5d7e6-6317-4c99-9c27-6671a7f2bd92')),
--   (UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297'), UUID_TO_BIN('b9b6789f-b673-41b8-91a3-7f28d91f3d67')),
--   (UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297'), UUID_TO_BIN('c0c82d4a-9231-4e97-845b-3f9185d88d72')),
--   (UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297'), UUID_TO_BIN('d1d92e3b-b1bc-47b1-b7c6-99f81996f9b8')),
--   (UUID_TO_BIN('fbcfb736-d3eb-40ff-bb63-cd4054de2297'), UUID_TO_BIN('e2e83f1b-c1cd-4e03-a4a5-7f219acd8c62')),
--   -- Departamento Luna
--   (UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78'), UUID_TO_BIN('c1b5d7c4-8317-4e88-9c11-75d1c5e3ab76')),
--   (UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78'), UUID_TO_BIN('d2c6789a-b893-40b8-91c1-8f28d61e2d71')),
--   (UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78'), UUID_TO_BIN('e5d82d4f-9321-4c97-846b-4d9175c78e38')),
--   (UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78'), UUID_TO_BIN('f6e92e2b-12bc-47a1-c7c6-90f81997d2b3')),
--   (UUID_TO_BIN('bcf324b5-38da-4b45-9b99-2d2c3be48c78'), UUID_TO_BIN('a8f83f4b-23cd-4f03-d3a5-6f319bde2c91'));
