-- Complete Product Structure SQL
-- Run this in Supabase SQL Editor

-- =====================================================
-- 1. KITCHEN CABINETS COLLECTION
-- =====================================================

-- Kitchen Sinks
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'kitchen-sinks',
  'Kitchen Sinks',
  'Kitchen',
  'Durable kitchen sinks in multiple configurations to suit any layout. From farmhouse apron-front designs to modern undermount styles, our sinks combine functionality with lasting beauty.',
  ARRAY[
    'Single, double, and triple bowl configurations',
    'Undermount, drop-in, and farmhouse styles',
    'Sound dampening pads on stainless models',
    'Scratch and stain resistant finishes',
    'Easy-clean rounded corners',
    'Includes mounting hardware'
  ],
  jsonb_build_object(
    'material', 'Stainless steel (16-18 gauge) / Granite composite / Fireclay / Cast iron with enamel finish',
    'styles', jsonb_build_array('Single bowl', 'Double bowl', 'Triple bowl', 'Undermount', 'Drop-in', 'Farmhouse'),
    'finishes', jsonb_build_array('Stainless Steel', 'Black', 'White', 'Grey')
  ),
  NULL,
  'kitchen-cabinets'
);

-- Kitchen Faucets
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'kitchen-faucets',
  'Kitchen Faucets',
  'Kitchen',
  'High-performance kitchen faucets designed for daily use. Choose from pull-down, pull-out, and commercial-style models with advanced spray technology and durable finishes.',
  ARRAY[
    'Pull-down or pull-out spray head',
    'Multiple spray patterns (stream, spray, pause)',
    'High-arc spout (8"-10" clearance)',
    'Single or dual handle operation',
    'Ceramic disc valves (drip-free)',
    'ADA compliant models available',
    'Limited lifetime warranty'
  ],
  jsonb_build_object(
    'material', 'Solid brass construction',
    'finishes', jsonb_build_array('Chrome', 'Brushed Nickel', 'Matte Black', 'Bronze'),
    'coating', 'PVD coating for corrosion resistance'
  ),
  NULL,
  'kitchen-cabinets'
);

-- Cabinet Hardware
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'cabinet-hardware',
  'Cabinet Hardware',
  'Kitchen',
  'Complete range of functional and decorative hardware to complement any cabinet style. Quality-tested components ensure smooth operation and long-lasting performance.',
  ARRAY[
    'Corrosion-resistant finishes',
    'Pre-drilled for standard spacing',
    'Matching collections available',
    'Commercial-grade durability',
    'Tested for 100,000+ cycles'
  ],
  jsonb_build_object(
    'types', jsonb_build_array('Knobs & Pulls (bar pulls, cup pulls, decorative knobs)', 'Hinges (soft-close concealed European hinges)', 'Drawer Slides (full-extension, soft-close, 100 lb capacity)'),
    'finishes', jsonb_build_array('Chrome', 'Brushed Nickel', 'Matte Black', 'Bronze', 'Gold')
  ),
  NULL,
  'kitchen-cabinets'
);

-- Custom Designed Cabinets
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'custom-designed-cabinets',
  'Custom Designed Cabinets',
  'Kitchen',
  'Fully custom kitchen cabinets built to your exact specifications. Our design team works with you to create a kitchen that maximizes space, reflects your style, and fits your budget.',
  ARRAY[
    'Dovetail drawer construction',
    'Soft-close hinges and slides standard',
    'Plywood box construction (not particleboard)',
    'Adjustable shelving',
    'Lifetime warranty on construction',
    'Made to order in Canada',
    'Free in-home consultation and 3D design rendering'
  ],
  jsonb_build_object(
    'customization', jsonb_build_array('Any size, shape, or configuration', 'Choice of wood species (maple, oak, cherry, walnut)', 'Custom door styles and profiles', 'Paint, stain, or glazed finishes', 'Interior organization systems', 'Specialty cabinets (corner, pantry, appliance garage)'),
    'material', 'Maple / Oak / Cherry / Walnut',
    'warranty', 'Lifetime warranty on construction'
  ),
  NULL,
  'kitchen-cabinets'
);

-- =====================================================
-- 2. BATHROOM VANITIES COLLECTION
-- =====================================================

-- Bathroom Sinks
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'bathroom-sinks',
  'Bathroom Sinks',
  'Bathroom',
  'Elegant bathroom sinks in styles from classic to contemporary. Designed to integrate seamlessly with vanity tops or serve as striking vessel-style statement pieces.',
  ARRAY[
    'Undermount, drop-in, vessel, and integrated styles',
    'Single and double basin options',
    'Overflow protection',
    'Scratch and stain resistant glazed finish',
    'Pre-drilled faucet holes (or undrilled for flexibility)',
    'ADA compliant models available'
  ],
  jsonb_build_object(
    'material', 'Vitreous china / Porcelain / Natural stone / Tempered glass / Composite materials',
    'styles', jsonb_build_array('Undermount', 'Drop-in', 'Vessel', 'Integrated')
  ),
  NULL,
  'bathroom-vanities'
);

-- Bathroom Faucets
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'bathroom-faucets',
  'Bathroom Faucets',
  'Bathroom',
  'Premium bathroom faucets that blend style and water efficiency. From single-hole to widespread configurations, available in finishes that resist water spots and fingerprints.',
  ARRAY[
    'WaterSense certified (1.2-1.5 GPM)',
    'Ceramic disc cartridges (drip-free)',
    'Single-handle, widespread, or wall-mount styles',
    'Pop-up drain assembly included',
    'High-quality aerators for smooth flow',
    'Limited lifetime warranty',
    'Touch-clean spray holes prevent mineral buildup'
  ],
  jsonb_build_object(
    'material', 'Solid brass bodies',
    'finishes', jsonb_build_array('Chrome', 'Brushed Nickel', 'Matte Black', 'Oil-Rubbed Bronze'),
    'coating', 'Water-repellent coating technology'
  ),
  NULL,
  'bathroom-vanities'
);

-- Vanity Hardware
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'vanity-hardware',
  'Vanity Hardware',
  'Bathroom',
  'Moisture-resistant hardware designed specifically for bathroom environments. Coordinating knobs, pulls, hinges, and slides that maintain their finish in humid conditions.',
  ARRAY[
    'Bathroom-grade finishes (won''t tarnish)',
    'Sealed against humidity',
    'Matching accessory collections',
    'Easy installation with included hardware'
  ],
  jsonb_build_object(
    'types', jsonb_build_array('Knobs & Pulls (modern bar pulls, classic bin pulls, crystal and glass options)', 'Hinges (corrosion-resistant soft-close, concealed European style)', 'Drawer Slides (epoxy-coated, full-extension, soft-close)')
  ),
  NULL,
  'bathroom-vanities'
);

-- Custom Designed Vanities
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'custom-designed-vanities',
  'Custom Designed Vanities',
  'Bathroom',
  'Made-to-measure vanities tailored to your bathroom''s dimensions and your design vision. Perfect for awkward spaces, unique layouts, or when you want something truly one-of-a-kind.',
  ARRAY[
    'Water-resistant materials and finishes',
    'Soft-close doors and drawers',
    'Integrated electrical outlets available',
    'Maximizes available space',
    'Professional installation recommended',
    '10-year limited warranty'
  ],
  jsonb_build_object(
    'customization', jsonb_build_array('Custom widths from 24" to 96"+', 'Single or double sink configurations', 'Choice of cabinet style and finish', 'Custom countertop materials (quartz, marble, granite)', 'Integrated or vessel sink options', 'Open shelving or closed storage', 'Floating or freestanding designs'),
    'dimensions', '24" to 96"+ widths'
  ),
  NULL,
  'bathroom-vanities'
);

-- =====================================================
-- 3. QUARTZ COUNTERTOPS COLLECTION
-- =====================================================

-- Essential Series
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'quartz-essential-series',
  'Essential Series (Standard)',
  'Countertops',
  'Quality engineered quartz surfaces featuring popular patterns and solid colors. Perfect for budget-conscious homeowners and rental properties seeking durability without compromise.',
  ARRAY[
    'Non-porous, stain-resistant surface',
    'Heat resistant up to 150°C',
    '10-year limited warranty',
    '20+ color options',
    'Standard edge profiles included',
    'NSF certified for food contact'
  ],
  jsonb_build_object(
    'material', '93% natural quartz, 7% polymer resins',
    'thickness', '2cm or 3cm',
    'finish', 'Polished',
    'warranty', '10 years',
    'image_gallery', ARRAY[
      'app/assets/products/quartz/essential-series/one.jpg',
      'app/assets/products/quartz/essential-series/2.webp',
      'app/assets/products/quartz/essential-series/3.webp',
      'app/assets/products/quartz/essential-series/4.webp',
      'app/assets/products/quartz/essential-series/5.webp'
    ]
  ),
  NULL,
  'quartz-countertops'
);

-- Signature Collection
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'quartz-signature-collection',
  'Signature Collection (Mid-range)',
  'Countertops',
  'Enhanced quartz surfaces with authentic stone veining and modern patterns. Ideal for kitchen and bathroom renovations where style meets performance.',
  ARRAY[
    'Advanced stain and scratch resistance',
    'UV-resistant pigments (no fading)',
    'Heat resistant up to 180°C',
    '15-year warranty',
    '35+ designer colors and patterns',
    'Premium edge profiles included',
    'Antibacterial surface treatment'
  ],
  jsonb_build_object(
    'material', '93% natural quartz with enhanced color technology',
    'thickness', '2cm or 3cm',
    'finish', 'Polished or Honed',
    'warranty', '15 years'
  ),
  NULL,
  'quartz-countertops'
);

-- Signature Plus
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'quartz-signature-plus',
  'Signature Plus (Lux)',
  'Countertops',
  'Premium quartz with sophisticated veining, depth, and movement that mimics natural marble and granite. Designed for discerning homeowners and high-end renovations.',
  ARRAY[
    'Superior scratch and impact resistance',
    'Heat resistant up to 200°C',
    'Lifetime residential warranty',
    '50+ exclusive patterns including Calacatta and Carrara marble looks',
    'Custom edge profiles available',
    'Full slab matching for seamless installations',
    'Enhanced color depth with 3D veining technology'
  ],
  jsonb_build_object(
    'material', '93% premium-grade quartz with mineral depth technology',
    'thickness', '3cm standard (2cm available)',
    'finish', 'Polished / Honed / Leathered',
    'warranty', 'Lifetime residential'
  ),
  NULL,
  'quartz-countertops'
);

-- Signature Lux
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'quartz-signature-lux',
  'Signature Lux (Ultra Lux)',
  'Countertops',
  'Designer-grade quartz featuring dramatic veining, oversized slabs, and exclusive patterns. The pinnacle of engineered stone for luxury homes, showrooms, and commercial spaces.',
  ARRAY[
    'Maximum durability with diamond-hard surface',
    'Heat resistant up to 220°C',
    'Lifetime transferable warranty',
    'Exclusive designer patterns not available elsewhere',
    'Book-matched and vein-matched slabs',
    'Custom edge details and waterfall installations',
    'UV-stable for outdoor applications',
    'White-glove installation service included',
    'Concierge design consultation'
  ],
  jsonb_build_object(
    'material', '93% ultra-premium quartz with proprietary color matching',
    'dimensions', 'Jumbo slabs up to 65" x 130"',
    'thickness', '3cm',
    'finish', 'Polished / Honed / Leathered / Brushed',
    'warranty', 'Lifetime transferable'
  ),
  NULL,
  'quartz-countertops'
);

-- Custom Designed Countertops
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'custom-designed-countertops',
  'Custom Designed Countertops',
  'Countertops',
  'Fully customized quartz countertops fabricated to exact specifications for your kitchen or bathroom. Complex shapes, waterfall edges, integrated sinks, and specialty features all available.',
  ARRAY[
    'No seam installations up to 130" with jumbo slabs',
    'Custom thickness options (2cm or 3cm)',
    'Mitered edges for seamless look',
    'Heat-resistant trivets included',
    'Lifetime warranty on fabrication',
    'White-glove installation and cleanup',
    'Laser-precision templating'
  ],
  jsonb_build_object(
    'customization', jsonb_build_array('Custom slab selection and vein matching', 'Any edge profile (straight, bullnose, ogee, waterfall)', 'Integrated or undermount sink cutouts', 'Cooktop and appliance cutouts', 'Backsplash integration', 'Book-matched or vein-matched installations')
  ),
  NULL,
  'quartz-countertops'
);

-- =====================================================
-- 4. CLOSETS & WARDROBES COLLECTION
-- =====================================================

-- Walk-in Closets
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'walk-in-closets',
  'Walk-in Closets',
  'Closets',
  'Maximize your walk-in closet with custom-designed organization systems. Adjustable shelving, double hang rods, accessory drawers, and specialized storage create a boutique-like experience.',
  ARRAY[
    'Custom layout design',
    'Adjustable shelving and hanging rods',
    'Soft-close drawers with dividers',
    'Specialty racks (shoes, ties, belts, jewelry)',
    'LED lighting integration',
    'Melamine or wood veneer finishes'
  ],
  jsonb_build_object(
    'material', 'Melamine / Wood veneer',
    'features', jsonb_build_array('Double hang rods', 'Accessory drawers', 'LED lighting', 'Custom layout')
  ),
  NULL,
  'closets-wardrobes'
);

-- Reach-in Closets
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'reach-in-closets',
  'Reach-in Closets',
  'Closets',
  'Transform standard reach-in closets with efficient vertical storage solutions. Double your hanging space and add shelving, baskets, and hooks for complete organization.',
  ARRAY[
    'Maximizes vertical space',
    'Adjustable components',
    'Wire or laminate shelving options',
    'Integrated hampers and baskets',
    'Top shelf storage',
    'Easy DIY or professional installation'
  ],
  jsonb_build_object(
    'material', 'Wire / Laminate',
    'installation', 'DIY or Professional'
  ),
  NULL,
  'closets-wardrobes'
);

-- Wardrobe Systems
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'wardrobe-systems',
  'Wardrobe Systems',
  'Closets',
  'Freestanding wardrobe systems for rooms without built-in closets. Modern designs with hanging space, shelves, and drawers that function as both storage and statement furniture.',
  ARRAY[
    'Modern or traditional styling',
    'Solid wood or engineered construction',
    'Mirrored doors available',
    'Internal LED lighting options',
    'Soft-close doors and drawers',
    'Multiple size configurations'
  ],
  jsonb_build_object(
    'material', 'Solid wood / Engineered wood',
    'styles', jsonb_build_array('Modern', 'Traditional', 'Contemporary')
  ),
  NULL,
  'closets-wardrobes'
);

-- Custom Designed Closets
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'custom-designed-closets',
  'Custom Designed Closets',
  'Closets',
  'Professionally designed closet systems built around your wardrobe and storage needs. Our designers assess your space and create a solution that makes getting dressed effortless.',
  ARRAY[
    'Designed around your wardrobe',
    'Adjustable as needs change',
    'Lifetime warranty on components',
    'Professional installation included',
    'Maximize every inch of space',
    'Free consultation and 3D design'
  ],
  jsonb_build_object(
    'customization', jsonb_build_array('Any closet size or shape', 'Material choice (wood, melamine, wire)', 'Finish color selection', 'Specialized storage (shoe walls, accessory islands)', 'Integrated seating or dressing areas', 'Lighting design'),
    'warranty', 'Lifetime on components'
  ),
  NULL,
  'closets-wardrobes'
);

-- =====================================================
-- 5. FLOORING COLLECTION - TILE
-- =====================================================

-- Ceramic Tile
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'ceramic-tile-flooring',
  'Ceramic Tile',
  'Flooring',
  'Classic ceramic tiles offer affordable, versatile flooring for kitchens, bathrooms, and entryways. Made from clay fired at high temperatures, ceramic tiles provide reliable performance with endless design options.',
  ARRAY[
    'Water and stain resistant',
    'Easy to clean and maintain',
    'Budget-friendly option',
    'Wide variety of colors and patterns',
    'Suitable for light to medium traffic',
    '15-20 year lifespan'
  ],
  jsonb_build_object(
    'material', 'Clay fired at high temperatures',
    'dimensions', '6"x6" to 24"x24"',
    'finish', 'Glazed / Unglazed / Matte / Glossy / Textured',
    'rating', 'Wall and floor-rated options',
    'lifespan', '15-20 years'
  ),
  NULL,
  'flooring'
);

-- Porcelain Tile
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'porcelain-tile-flooring',
  'Porcelain Tile',
  'Flooring',
  'Dense, durable porcelain tiles made from refined clay and fired at higher temperatures than ceramic. Ideal for high-traffic areas, outdoor spaces, and commercial applications.',
  ARRAY[
    'Extremely durable and dense',
    '100% waterproof',
    'Scratch and stain resistant',
    'Frost-proof (outdoor rated)',
    'Works with radiant heat',
    'Low water absorption rate (< 0.5%)',
    '50+ year lifespan',
    'Indoor and outdoor use'
  ],
  jsonb_build_object(
    'material', 'Refined clay fired at high temperatures',
    'dimensions', '12"x12" to 48"x48" and larger',
    'finish', 'Through-body / Glazed / Polished / Matte / Textured',
    'styles', jsonb_build_array('Wood-look planks', 'Stone-look', 'Modern patterns'),
    'lifespan', '50+ years'
  ),
  NULL,
  'flooring'
);

-- Natural Stone
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'natural-stone-flooring',
  'Natural Stone',
  'Flooring',
  'Authentic stone tiles including marble, travertine, and slate bring unique natural beauty to any space. Each tile is one-of-a-kind with organic variation in color and veining.',
  ARRAY[
    '100% natural material',
    'Unique patterns (no two tiles alike)',
    'Increases home value',
    'Cool underfoot in summer',
    'Requires periodic sealing',
    'Professional installation recommended',
    'Lifetime durability with proper care'
  ],
  jsonb_build_object(
    'types', jsonb_build_object(
      'Marble', 'Elegant veining, polished or honed finish, requires sealing',
      'Travertine', 'Porous texture, earthy tones, tumbled or polished',
      'Slate', 'Rustic texture, natural cleft surface, non-slip'
    )
  ),
  NULL,
  'flooring'
);

-- =====================================================
-- 5. FLOORING COLLECTION - VINYL
-- =====================================================

-- Luxury Vinyl Plank (LVP)
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'luxury-vinyl-plank',
  'Luxury Vinyl Plank (LVP)',
  'Flooring',
  'Premium vinyl planks with realistic wood visuals and enhanced wear layers. Multiple core constructions available to suit different performance needs and budgets.',
  ARRAY[
    '100% waterproof core options',
    'Scratch and dent resistant',
    'Pet and kid-friendly',
    'Easy DIY installation',
    'Realistic embossed wood textures',
    'Silent underfoot',
    '20-30 year residential warranty',
    'Can be installed over existing floors'
  ],
  jsonb_build_object(
    'wear_layer', '12-20 mil (residential), 20+ mil (commercial)',
    'thickness', '5mm-8mm',
    'dimensions', '6"x36" to 9"x60" planks',
    'installation', 'Click-lock floating installation',
    'underlayment', 'Attached underlayment common'
  ),
  NULL,
  'flooring'
);

-- Stone Plastic Composite (SPC)
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'stone-plastic-composite-spc',
  'Stone Plastic Composite (SPC)',
  'Flooring',
  'Rigid core vinyl flooring with stone-plastic composite base. The densest and most stable luxury vinyl option, perfect for high-traffic areas and commercial spaces.',
  ARRAY[
    '100% waterproof',
    'Extremely rigid and durable',
    'Dent resistant (heavy furniture safe)',
    'No acclimation required',
    'Works with radiant heat',
    'Great for concrete subfloors',
    'Commercial-grade durability',
    'Lifetime residential warranty'
  ],
  jsonb_build_object(
    'core', 'Stone-plastic composite rigid core',
    'thickness', '4mm-6mm',
    'wear_layer', '20+ mil commercial',
    'installation', 'Click-lock installation',
    'stability', 'Ultra-stable (won''t expand/contract)'
  ),
  NULL,
  'flooring'
);

-- Wood Plastic Composite (WPC)
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'wood-plastic-composite-wpc',
  'Wood Plastic Composite (WPC)',
  'Flooring',
  'Luxury vinyl with wood-plastic composite core offering excellent sound dampening and comfort underfoot. Softer and warmer feel than SPC while maintaining waterproof protection.',
  ARRAY[
    '100% waterproof',
    'Quietest vinyl option',
    'Warmer and softer underfoot than SPC',
    'Excellent sound absorption',
    'More forgiving on uneven subfloors',
    'Comfortable for standing',
    'Pet-friendly',
    '25-30 year warranty'
  ],
  jsonb_build_object(
    'core', 'Wood-plastic composite core',
    'thickness', '5mm-8mm',
    'wear_layer', '12-20 mil',
    'installation', 'Click-lock floating installation',
    'underlayment', 'Integrated'
  ),
  NULL,
  'flooring'
);

-- =====================================================
-- 5. FLOORING COLLECTION - HARDWOOD
-- =====================================================

-- Engineered Hardwood
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'engineered-hardwood-flooring',
  'Engineered Hardwood',
  'Flooring',
  'Real wood flooring with multi-layer construction for superior stability. Genuine hardwood veneer over plywood core resists moisture and temperature changes better than solid wood.',
  ARRAY[
    'Stable in basements and over radiant heat',
    'Can be refinished 1-2 times (depending on veneer thickness)',
    'Water-resistant (not waterproof)',
    'Wide plank options (up to 7")',
    'Multiple finish options (matte, satin, hand-scraped)',
    '25-30 year residential warranty',
    'Pre-finished and ready to install',
    'Less expensive than solid hardwood'
  ],
  jsonb_build_object(
    'veneer', '2mm-6mm real wood top layer',
    'core', 'Plywood or HDF',
    'thickness', '3/8" to 5/8"',
    'installation', 'Click-lock or glue-down',
    'species', jsonb_build_array('Red Oak', 'White Oak', 'Maple', 'Hickory', 'Walnut', 'Cherry', 'Acacia', 'Birch')
  ),
  NULL,
  'flooring'
);

-- Solid Hardwood
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'solid-hardwood-flooring',
  'Solid Hardwood',
  'Flooring',
  'Classic 100% natural wood flooring milled from a single piece of lumber. Solid hardwood adds timeless beauty and can be refinished multiple times, lasting for generations.',
  ARRAY[
    '100% natural wood throughout',
    'Can be refinished 5-7 times',
    'Increases home resale value',
    'Authentic and timeless',
    'Ages beautifully over decades',
    'Lifetime durability with care',
    'Not recommended for basements or bathrooms',
    'Requires acclimation before installation',
    'Professional installation recommended'
  ],
  jsonb_build_object(
    'thickness', '3/4" solid wood throughout',
    'installation', 'Nail-down or glue-down',
    'widths', 'Strip: 2.25" to 5", Plank: up to 10"',
    'species', jsonb_build_array('Red Oak', 'White Oak', 'Maple', 'Hickory', 'Walnut', 'Brazilian Cherry'),
    'finish', 'Unfinished or pre-finished'
  ),
  NULL,
  'flooring'
);

-- =====================================================
-- 5. FLOORING COLLECTION - LAMINATE
-- =====================================================

-- Residential Laminate (AC3-AC4)
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'residential-laminate-flooring',
  'Residential Laminate (AC3-AC4)',
  'Flooring',
  'Affordable laminate flooring designed for moderate household traffic. AC3 and AC4 wear ratings provide reliable performance for bedrooms, dining rooms, and living areas.',
  ARRAY[
    'Budget-friendly flooring option',
    'Realistic wood and stone visuals',
    'Fade resistant',
    'Scratch and stain resistant',
    'Easy to clean and maintain',
    'DIY-friendly installation',
    'Underlayment required (sometimes attached)',
    '20-25 year warranty',
    'Not waterproof (water-resistant options available)'
  ],
  jsonb_build_object(
    'core', 'High-density fiberboard',
    'thickness', '7mm-10mm',
    'rating', 'AC3 (Moderate residential) / AC4 (Heavy residential)',
    'installation', 'Click-lock',
    'warranty', '20-25 years'
  ),
  NULL,
  'flooring'
);

-- Commercial Laminate (AC5)
INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'commercial-laminate-flooring',
  'Commercial Laminate (AC5)',
  'Flooring',
  'Heavy-duty laminate flooring with AC5 commercial rating. Designed to withstand high-traffic commercial environments while maintaining residential beauty.',
  ARRAY[
    'Heaviest traffic rating',
    'Suitable for retail, offices, and busy households',
    'Superior scratch and impact resistance',
    'Fade and stain proof',
    'Easy maintenance',
    'Long-lasting performance',
    '30+ year residential warranty',
    '10-15 year commercial warranty',
    'Pet and kid-proof'
  ],
  jsonb_build_object(
    'core', 'Extra-dense HDF',
    'thickness', '10mm-12mm',
    'rating', 'AC5 Commercial',
    'installation', 'Commercial-grade locking system',
    'underlayment', 'Attached underlayment common',
    'warranty', '30+ years residential, 10-15 years commercial'
  ),
  NULL,
  'flooring'
);
