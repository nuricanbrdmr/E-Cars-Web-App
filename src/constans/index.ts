import { client } from "@/app/lib/sanity";

export const allData = async () => {
  const query = `*[_type == 'product']{
    _id,
    title,
    brand,
    model,
    "slug": slug.current,
    images,
    price,
    price_id,
    description,
    "categories": categories[]->{
      name
    },
    car_type,
    tire,
    color,
    range, 
    year,
    battery,
    chassis_type,
    range,
    engine,
  }`;
  const data = await client.fetch(query);
  return data;
};

// all Brand
export const allCategory = async () => {
  const query = `*[_type == 'category']{
    name
  }`;
  const data = await client.fetch(query);
  const sequential = data.sort((a: any, b: any) =>
    a.name.localeCompare(b.name)
  );
  return sequential;
};
// all model
export const allModel = async () => {
  const query = `*[_type == 'product']{
    brand,
    model
  }`;
  const data = await client.fetch(query);
  return data;
};
// all year and color
export const allYearColor = async () => {
  const query = `*[_type == 'product']{
    year,
    color
  }`;
  const data = await client.fetch(query);
  return data;
};

// Product Details
export const getCarData = async (slug: any) => {
  const query = `*[_type == 'product' && slug.current == '${slug}'][0]{
    _id,
      title,
      description,
      car_type,
      tire,
      range,
      images,
      price,
      price_id,
      "slug": slug.current,
      "categories": categories->{name},
      brand,
      model,
      battery,
      chassis_type,
      range,
      engine,
      consumption,
      charge,
      engine_power,
      tork,
      maximum_speed,
      zero_hundred,
      engine_size,
      driving_system,
      engine_type,
      dc_speed,
      ac_speed,
      dc_time,
      ac_time,
      weight,
      length,
      width,
      height,
      luggage,
      color,
      year,
      driving,
      location,
      security,
      other
  }`;
  const data = await client.fetch(query);
  return data;
};

// ALL Category
let manufacturers: string[] = []; // Boş bir dizi oluştur
const fetchData = async () => {
  try {
    const data = await allCategory();
    const names = data.map((item: any) => item.name);
    manufacturers = names;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
fetchData();
export { manufacturers };

// ALL Model
let carModels: string[] = []; // Boş bir dizi oluştur
const fetchModels = async () => {
  try {
    const data = await allModel();
    carModels = data.map((item: any) => item);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
fetchModels();
export { carModels };

// ALL Year and Color
let yearsOfProduction: string[] = [];
let colors: string[] = ["ALL"];
const fetchYearColor = async () => {
  try {
    const data = await allYearColor();
    yearsOfProduction = data.map((item: any) => item.year);
    yearsOfProduction = [...new Set(yearsOfProduction)].sort();
    yearsOfProduction = ["ALL", ...yearsOfProduction];

    data.forEach((item: any) => {
      item.color.forEach((color: any) => {
        colors.push(color);
      });
    });
    colors = [...new Set(colors)]; // tekrar eden değerleri siler
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
fetchYearColor();
export { yearsOfProduction, colors };

export const fuels = [
  {
    title: "Gas",
    value: "Gas",
  },
  {
    title: "Electricity",
    value: "Electricity",
  },
];

export const footerLinks = [
  {
    title: "About",
    links: [
      { title: "How it works", url: "/" },
      { title: "Featured", url: "/" },
      { title: "Partnership", url: "/" },
      { title: "Bussiness Relation", url: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Events", url: "/" },
      { title: "Blog", url: "/" },
      { title: "Podcast", url: "/" },
      { title: "Invite a friend", url: "/" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Discord", url: "/" },
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "Facebook", url: "/" },
    ],
  },
];
