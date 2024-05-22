export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Car title',
      type: 'string',
    },
    {
      name: 'brand',
      title: 'Car Brand',
      type: 'string',
    },
    {
      name: 'model',
      title: 'Car Model',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Car Slug',
      type: 'slug',
      options: {
        source: 'title', 
      }
    },
    {
      name: 'images',
      title: 'Car Images',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'price',
      title: 'Car price',
      type: 'number',
    },
    {
      name: 'price_id',
      title: 'Stripe Product Price ID',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Car Description',
      type: 'string',
    },
    {
      name: 'categories',
      title: 'Car Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'battery',
      title: 'Car Battery',
      type: 'string',
    },
    {
      name: 'car_type',
      title: 'Car type',
      type: 'string',
    },
    {
      name: 'tire',
      title: 'Car Tire type',
      type: 'string',
    },
    {
      name: 'range',
      title: 'Car Range',
      type: 'string',
    },
    {
      name: 'engine',
      title: 'Car Engine',
      type: 'string',
    },
    {
      name: 'consumption',
      title: 'Car Consumption',
      type: 'string',
    },
    {
      name: 'charge',
      title: 'Car Charge',
      type: 'string',
    },
    // Güç ve Hız
    {
      name: 'engine_power',
      title: 'Car Engine Power',
      type: 'string',
    },
    {
      name: 'tork',
      title: 'Car Tork',
      type: 'string',
    },
    {
      name: 'maximum_speed',
      title: 'Car Maximum Speed',
      type: 'string',
    },
    {
      name: 'zero_hundred',
      title: 'Car 0-100 km/s',
      type: 'string',
    },
    {
      name: 'engine_size',
      title: 'Car Engine Size',
      type: 'string',
    },
    {
      name: 'driving_system',
      title: 'Car Driving System',
      type: 'string',
    },
    {
      name: 'engine_type',
      title: 'Car Engine Type',
      type: 'string',
    },
    // Batarya ve Şarj
    {
      name: 'dc_speed',
      title: 'Car DC Charging Speed',
      type: 'string',
    },
    {
      name: 'ac_speed',
      title: 'Car AC Charging Speed',
      type: 'string',
    },
    {
      name: 'dc_time',
      title: 'Car DC Charging Time',
      type: 'string',
    },
    {
      name: 'ac_time',
      title: 'Car AC Charging Time',
      type: 'string',
    },
    // Araç Özellikleri
    {
      name: 'color',
      title: 'Car Color',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'chassis_type',
      title: 'Car Chassis Type',
      type: 'string',
    },
    {
      name: 'weight',
      title: 'Car Weight',
      type: 'string',
    },
    {
      name: 'length',
      title: 'Car Length',
      type: 'string',
    },
    {
      name: 'width',
      title: 'Car Width',
      type: 'string',
    },
    {
      name: 'height',
      title: 'Car Height',
      type: 'string',
    },
    {
      name: 'luggage',
      title: 'Car Luggage Volume',
      type: 'string',
    },
    // Ekstra Özellikler
    {
      name: 'year',
      title: 'Car Release Date',
      type: 'string',
    },
    {
      name: 'driving',
      title: 'Car Autonomous Driving',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Car Production Location',
      type: 'string',
    },
    {
      name: 'security',
      title: 'Car Security',
      type: 'string',
    },
    {
      name: 'other',
      title: 'Car Other',
      type: 'string',
    },
  ],
}
