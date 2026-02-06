-- Cabinets Product with Complex Options
-- Run this in Supabase SQL Editor

INSERT INTO public.products (slug, name, category, description, features, specifications, image_url, collection_slug)
VALUES (
  'cabinets',
  'Cabinets',
  'Kitchen',
  'Complete range of kitchen cabinet solutions for every storage need. From corner cabinets with innovative organizers to multi-drawer units and sink bases, our cabinets combine smart functionality with premium construction.',
  ARRAY[
    'Soft-close hinges and drawer slides standard',
    'Plywood box construction',
    'Dovetail drawer boxes',
    'Adjustable interior shelving',
    'Multiple finish options available',
    'Made in Canada',
    'Lifetime warranty on hardware'
  ],
  jsonb_build_object(
    'material', 'MDF / Thermofoil / Solid Wood',
    'finishes', jsonb_build_array('White', 'Grey', 'Black', 'Navy', 'Natural Oak', 'Walnut', 'Custom Paint'),
    'cabinet_types', jsonb_build_object(
      'corner_cabinets', jsonb_build_object(
        'description', 'Maximize corner space with specialized storage solutions',
        'options', jsonb_build_array(
          jsonb_build_object('name', 'Lazy Susan', 'description', 'Rotating shelves for easy access to corner items'),
          jsonb_build_object('name', 'Spice Rack', 'description', 'Pull-out spice storage for corner cabinets'),
          jsonb_build_object('name', 'Garbage Bins', 'description', 'Hidden waste and recycling compartments'),
          jsonb_build_object('name', 'Swing Trays', 'description', 'Swing-out trays for full corner access'),
          jsonb_build_object('name', 'Peanut Shape', 'description', 'Curved pull-out shelves for blind corners')
        )
      ),
      'drawer_cabinets', jsonb_build_object(
        'description', 'Drawer base cabinets for organized storage',
        'options', jsonb_build_array(
          jsonb_build_object('name', '1 Drawer Cabinet', 'description', 'Single drawer with door below'),
          jsonb_build_object('name', '2 Drawer Cabinet', 'description', 'Double drawer stack'),
          jsonb_build_object('name', '3 Drawer Cabinet', 'description', 'Triple drawer stack for maximum organization')
        )
      ),
      'full_door_cabinets', jsonb_build_object(
        'description', 'Classic cabinet design with full-height doors',
        'options', jsonb_build_array(
          jsonb_build_object('name', 'Single Door', 'description', 'Standard single door base cabinet'),
          jsonb_build_object('name', 'Double Door', 'description', 'Wide base cabinet with two doors')
        )
      ),
      'sink_base_cabinets', jsonb_build_object(
        'description', 'Specially designed cabinets for sink installation',
        'options', jsonb_build_array(
          jsonb_build_object('name', 'Standard Sink Base', 'description', 'Open interior for plumbing access'),
          jsonb_build_object('name', 'Farmhouse Sink Base', 'description', 'Modified front for apron-front sinks'),
          jsonb_build_object('name', 'Corner Sink Base', 'description', 'Angled design for corner sink placement')
        )
      )
    ),
    'dimensions', jsonb_build_object(
      'base_widths', '12″ / 15″ / 18″ / 21″ / 24″ / 27″ / 30″ / 33″ / 36″',
      'base_height', '34.5″ standard',
      'base_depth', '24″ standard',
      'corner_sizes', '33″ / 36″ / 42″'
    ),
    'door_styles', jsonb_build_array('Shaker', 'Flat Panel', 'Raised Panel', 'Glass Insert', 'Open Frame')
  ),
  NULL,
  'kitchen-cabinets'
);
