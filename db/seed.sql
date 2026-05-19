INSERT INTO users (full_name, email, password_hash, role)
VALUES
  ('Demo Host', 'host@staynest.dev', 'demo_hash', 'host'),
  ('Demo Guest', 'guest@staynest.dev', 'demo_hash', 'guest')
ON CONFLICT (email) DO NOTHING;

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Modern Apartment in Kilimani',
       'Stylish apartment with reliable Wi-Fi, balcony, and easy access to malls and cafes.',
       'Nairobi',
       'Kenya',
       6500.00,
       2,
       'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Modern Apartment in Kilimani'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Spacious Family House in Karen',
       'Private compound home ideal for families with secure parking and garden space.',
       'Nairobi',
       'Kenya',
       12500.00,
       6,
       'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Spacious Family House in Karen'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Cozy Studio in Westlands',
       'Compact and modern studio for solo travelers and business stays.',
       'Nairobi',
       'Kenya',
       3800.00,
       1,
       'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Cozy Studio in Westlands'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Luxury Penthouse in Upper Hill',
       'Premium skyline penthouse with full city view and concierge-ready setup.',
       'Nairobi',
       'Kenya',
       18000.00,
       4,
       'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Luxury Penthouse in Upper Hill'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Beachfront Apartment in Nyali',
       'Calm coastal apartment with ocean breeze, ideal for weekend retreats.',
       'Mombasa',
       'Kenya',
       9200.00,
       3,
       'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Beachfront Apartment in Nyali'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Garden Cottage in Naivasha',
       'Quiet cottage for nature lovers with lake access and mountain views nearby.',
       'Naivasha',
       'Kenya',
       7100.00,
       4,
       'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Garden Cottage in Naivasha'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Sunset Lake Villa in Kisumu',
       'Stunning lakeside villa offering direct access to Lake Victoria, private jetty, and breathtaking sunsets.',
       'Kisumu',
       'Kenya',
       15000.00,
       5,
       'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Sunset Lake Villa in Kisumu'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Rustic Cabin in Nanyuki',
       'Cozy timber cabin nestled in the forest clearing with beautiful views of Mount Kenya peak.',
       'Nanyuki',
       'Kenya',
       8500.00,
       4,
       'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Rustic Cabin in Nanyuki'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Charming Townhouse in Eldoret',
       'Modern, secure gated townhouse ideal for athletic training camps, corporate stays or family tours.',
       'Eldoret',
       'Kenya',
       5200.00,
       3,
       'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Charming Townhouse in Eldoret'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Boutique Eco-Lodge in Watamu',
       'Exquisite eco-lodge with palm thatched roof, tropical gardens, and a short walk to marine park beaches.',
       'Watamu',
       'Kenya',
       13800.00,
       4,
       'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Boutique Eco-Lodge in Watamu'
);

-- New Properties added to expand options
INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Cozy Bedsitter in Kahawa Sukari',
       'Affordable and private bedsitter near KU, ideal for students or solo travelers.',
       'Kahawa',
       'Kenya',
       1500.00,
       1,
       'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Cozy Bedsitter in Kahawa Sukari'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Modern Bedsitter near JKUAT',
       'Clean and secure bedsitter with fast internet, perfect for short stays or studies.',
       'Juja',
       'Kenya',
       1200.00,
       1,
       'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Modern Bedsitter near JKUAT'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Scenic Lakeview Home in Nakuru',
       'Beautiful vacation home overlooking Lake Nakuru, ideal for family getaways.',
       'Nakuru',
       'Kenya',
       8000.00,
       5,
       'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Scenic Lakeview Home in Nakuru'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Serene Villa in Machakos',
       'Quiet and luxurious villa with mountain views, perfect for a peaceful retreat.',
       'Machakos',
       'Kenya',
       10000.00,
       4,
       'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Serene Villa in Machakos'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Cozy Studio in Eldoret',
       'Compact and fully furnished studio apartment in a quiet neighborhood, ideal for students or solo travelers.',
       'Eldoret',
       'Kenya',
       2500.00,
       1,
       'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Cozy Studio in Eldoret'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Luxury Camp in Masai Mara',
       'Experience the wild in luxury. Tented camp with en-suite bathrooms and stunning savanna views.',
       'Masai Mara',
       'Kenya',
       15000.00,
       2,
       'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Luxury Camp in Masai Mara'
);

INSERT INTO properties (host_id, title, description, city, country, price_per_night, max_guests, cover_image_url)
SELECT u.id,
       'Swahili Villa in Lamu',
       'Traditional Swahili architecture with modern luxury. Rooftop terrace with ocean breeze.',
       'Lamu',
       'Kenya',
       12000.00,
       4,
       'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1200&q=80'
FROM users u
WHERE u.email = 'host@staynest.dev'
AND NOT EXISTS (
  SELECT 1 FROM properties p WHERE p.title = 'Swahili Villa in Lamu'
);

-- Force update image URLs for existing installations
UPDATE properties SET cover_image_url = 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80' WHERE title = 'Luxury Camp in Masai Mara';
UPDATE properties SET cover_image_url = 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?auto=format&fit=crop&w=1200&q=80' WHERE title = 'Swahili Villa in Lamu';








