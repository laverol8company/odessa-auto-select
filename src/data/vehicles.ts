import camry from "@/assets/cars/camry.jpg";
import tiguan from "@/assets/cars/tiguan.jpg";
import tucson from "@/assets/cars/tucson.jpg";
import sportage from "@/assets/cars/sportage.jpg";
import bmw5 from "@/assets/cars/bmw5.jpg";
import eclass from "@/assets/cars/eclass.jpg";
import q5 from "@/assets/cars/q5.jpg";
import leaf from "@/assets/cars/leaf.jpg";
import octavia from "@/assets/cars/octavia.jpg";
import clio from "@/assets/cars/clio.jpg";
import rav4 from "@/assets/cars/rav4.jpg";
import passat from "@/assets/cars/passat.jpg";
import kona from "@/assets/cars/kona.jpg";
import rio from "@/assets/cars/rio.jpg";
import vito from "@/assets/cars/vito.jpg";

export type Fuel = "petrol" | "diesel" | "hybrid" | "electric";
export type Transmission = "automatic" | "manual";
export type Body = "sedan" | "suv" | "hatchback" | "wagon" | "van";
export type Condition = "new" | "used" | "certified" | "recent";
export type BadgeKey = "new_arrival" | "best_value" | "low_mileage" | "family_pick" | "city_choice" | "fuel_saver";

export interface Vehicle {
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number; // USD
  mileageKm: number;
  fuel: Fuel;
  transmission: Transmission;
  body: Body;
  condition: Condition;
  isNew: boolean;
  image: string;
  badge?: BadgeKey;
  features: { en: string; uk: string }[];
  benefits?: { en: string; uk: string }[];
  overview: { en: string; uk: string };
}

const benefitsCity = [
  { en: "Easy parking in Odesa city center", uk: "Зручна паркова в центрі Одеси" },
  { en: "Low fuel consumption for daily use", uk: "Низька витрата пального для щодня" },
  { en: "Comfortable for short and medium trips", uk: "Комфортне для коротких і середніх поїздок" },
];
const benefitsFamily = [
  { en: "Spacious cabin for the whole family", uk: "Простора кабіна для всієї родини" },
  { en: "Strong safety equipment", uk: "Надійне обладнання безпеки" },
  { en: "Comfortable on long trips", uk: "Комфортне на далеких поїздках" },
];
const benefitsBusiness = [
  { en: "Premium ride quality", uk: "Преміальний рівень комфорту" },
  { en: "Refined interior materials", uk: "Якісні матеріали салону" },
  { en: "Strong residual value", uk: "Хороша залишкова вартість" },
];

export const vehicles: Vehicle[] = [
  {
    slug: "toyota-camry-2021",
    brand: "Toyota", model: "Camry", year: 2021, price: 22500, mileageKm: 48000,
    fuel: "petrol", transmission: "automatic", body: "sedan", condition: "used", isNew: false,
    image: camry, badge: "best_value", overview: {
      en: "A reliable, comfortable business sedan with proven Toyota dependability and a smooth automatic transmission.",
      uk: "Надійний і комфортний бізнес-седан із перевіреною надійністю Toyota та плавною автоматичною коробкою.",
    },
    features: [
      { en: "Adaptive cruise control", uk: "Адаптивний круїз-контроль" },
      { en: "Heated leather seats", uk: "Підігрів шкіряних сидінь" },
      { en: "Apple CarPlay & Android Auto", uk: "Apple CarPlay і Android Auto" },
      { en: "Lane-keeping assist", uk: "Асистент утримання смуги" },
    ],
    benefits: benefitsBusiness,
  },
  {
    slug: "volkswagen-tiguan-2022",
    brand: "Volkswagen", model: "Tiguan", year: 2022, price: 28900, mileageKm: 32000,
    fuel: "diesel", transmission: "automatic", body: "suv", condition: "certified", isNew: false,
    image: tiguan, badge: "family_pick", overview: {
      en: "A versatile family SUV with diesel efficiency, generous space and confident on-road manners.",
      uk: "Універсальний сімейний SUV з економічним дизелем, просторим салоном і впевненою керованістю.",
    },
    features: [
      { en: "All-wheel drive", uk: "Повний привід" },
      { en: "Panoramic roof", uk: "Панорамний дах" },
      { en: "3-zone climate", uk: "Тризонний клімат" },
      { en: "Parking sensors front & rear", uk: "Парктроніки спереду та ззаду" },
    ],
    benefits: benefitsFamily,
  },
  {
    slug: "hyundai-tucson-2023",
    brand: "Hyundai", model: "Tucson", year: 2023, price: 31500, mileageKm: 12000,
    fuel: "hybrid", transmission: "automatic", body: "suv", condition: "recent", isNew: false,
    image: tucson, badge: "new_arrival", overview: {
      en: "Modern hybrid SUV with bold styling, low fuel consumption and a high-quality interior.",
      uk: "Сучасний гібридний SUV із сміливим дизайном, низькою витратою та якісним салоном.",
    },
    features: [
      { en: "Hybrid powertrain", uk: "Гібридна силова установка" },
      { en: "Digital cockpit", uk: "Цифрова панель приладів" },
      { en: "Wireless charging", uk: "Бездротова зарядка" },
      { en: "360° camera", uk: "Камера 360°" },
    ],
    benefits: benefitsFamily,
  },
  {
    slug: "kia-sportage-2022",
    brand: "Kia", model: "Sportage", year: 2022, price: 26800, mileageKm: 28000,
    fuel: "petrol", transmission: "automatic", body: "suv", condition: "used", isNew: false,
    image: sportage, overview: {
      en: "A balanced compact SUV with comfortable ride, modern equipment and confident styling.",
      uk: "Збалансований компактний SUV з комфортною ходою, сучасним обладнанням і виразним стилем.",
    },
    features: [
      { en: "Heated steering wheel", uk: "Підігрів керма" },
      { en: "Smart key", uk: "Безключовий доступ" },
      { en: "LED headlights", uk: "LED-фари" },
      { en: "Reversing camera", uk: "Камера заднього виду" },
    ],
    benefits: benefitsFamily,
  },
  {
    slug: "bmw-5-series-2021",
    brand: "BMW", model: "5 Series", year: 2021, price: 41900, mileageKm: 41000,
    fuel: "diesel", transmission: "automatic", body: "sedan", condition: "certified", isNew: false,
    image: bmw5, overview: {
      en: "Executive sedan combining sport-tuned dynamics with first-class comfort and refined cabin materials.",
      uk: "Бізнес-седан, що поєднує спортивну динаміку, високий комфорт і якісні матеріали салону.",
    },
    features: [
      { en: "Sport seats with memory", uk: "Спортивні сидіння з пам’яттю" },
      { en: "Harman Kardon audio", uk: "Аудіо Harman Kardon" },
      { en: "Head-up display", uk: "Проєкційний дисплей" },
      { en: "Adaptive suspension", uk: "Адаптивна підвіска" },
    ],
    benefits: benefitsBusiness,
  },
  {
    slug: "mercedes-benz-e-class-2022",
    brand: "Mercedes-Benz", model: "E-Class", year: 2022, price: 48500, mileageKm: 26000,
    fuel: "diesel", transmission: "automatic", body: "sedan", condition: "certified", isNew: false,
    image: eclass, overview: {
      en: "Refined executive sedan with elegant design, advanced driver assistance and a quiet, comfortable ride.",
      uk: "Витончений бізнес-седан з елегантним дизайном, сучасними асистентами та тихою плавною ходою.",
    },
    features: [
      { en: "MBUX infotainment", uk: "Мультимедіа MBUX" },
      { en: "Burmester audio", uk: "Аудіо Burmester" },
      { en: "Air suspension", uk: "Пневмопідвіска" },
      { en: "Active distance assist", uk: "Активний асистент дистанції" },
    ],
    benefits: benefitsBusiness,
  },
  {
    slug: "audi-q5-2023",
    brand: "Audi", model: "Q5", year: 2023, price: 46200, mileageKm: 9000,
    fuel: "petrol", transmission: "automatic", body: "suv", condition: "recent", isNew: true,
    image: q5, badge: "new_arrival", overview: {
      en: "A premium midsize SUV with quattro all-wheel drive, sophisticated tech and a beautifully built interior.",
      uk: "Преміальний середній SUV з повним приводом quattro, сучасними технологіями та чудовим салоном.",
    },
    features: [
      { en: "Quattro AWD", uk: "Повний привід quattro" },
      { en: "Virtual cockpit", uk: "Віртуальна панель приладів" },
      { en: "Matrix LED headlights", uk: "Фари Matrix LED" },
      { en: "Power tailgate", uk: "Електропривод дверей багажника" },
    ],
    benefits: benefitsBusiness,
  },
  {
    slug: "nissan-leaf-2022",
    brand: "Nissan", model: "Leaf", year: 2022, price: 18500, mileageKm: 22000,
    fuel: "electric", transmission: "automatic", body: "hatchback", condition: "used", isNew: false,
    image: leaf, badge: "fuel_saver", overview: {
      en: "An efficient electric hatchback ideal for daily driving in Odesa with very low running costs.",
      uk: "Ефективний електричний хетчбек, ідеальний для щоденних поїздок Одесою з низькими витратами.",
    },
    features: [
      { en: "Range up to 270 km", uk: "Запас ходу до 270 км" },
      { en: "Fast DC charging", uk: "Швидка DC-зарядка" },
      { en: "ProPilot assist", uk: "Асистент ProPilot" },
      { en: "Heated seats and steering", uk: "Підігрів сидінь і керма" },
    ],
    benefits: benefitsCity,
  },
  {
    slug: "skoda-octavia-2021",
    brand: "Skoda", model: "Octavia", year: 2021, price: 19900, mileageKm: 56000,
    fuel: "diesel", transmission: "manual", body: "wagon", condition: "used", isNew: false,
    image: octavia, badge: "best_value", overview: {
      en: "A practical, fuel-efficient wagon with a huge boot and a comfortable, well-built cabin.",
      uk: "Практичний, економічний універсал з великим багажником і комфортним, якісним салоном.",
    },
    features: [
      { en: "Large 640L boot", uk: "Великий багажник 640 л" },
      { en: "Adaptive cruise", uk: "Адаптивний круїз" },
      { en: "Lane assist", uk: "Асистент смуги" },
      { en: "Apple CarPlay", uk: "Apple CarPlay" },
    ],
    benefits: benefitsFamily,
  },
  {
    slug: "renault-clio-2020",
    brand: "Renault", model: "Clio", year: 2020, price: 11200, mileageKm: 64000,
    fuel: "petrol", transmission: "manual", body: "hatchback", condition: "used", isNew: false,
    image: clio, badge: "city_choice", overview: {
      en: "A nimble city hatchback that's easy to park, light on fuel, and great for first-time buyers.",
      uk: "Спритний міський хетчбек: легко паркувати, економний і чудовий для перших покупців.",
    },
    features: [
      { en: "Touchscreen infotainment", uk: "Сенсорна мультимедія" },
      { en: "Cruise control", uk: "Круїз-контроль" },
      { en: "Climate control", uk: "Клімат-контроль" },
      { en: "Bluetooth & USB", uk: "Bluetooth і USB" },
    ],
    benefits: benefitsCity,
  },
  {
    slug: "toyota-rav4-hybrid-2023",
    brand: "Toyota", model: "RAV4 Hybrid", year: 2023, price: 34900, mileageKm: 11000,
    fuel: "hybrid", transmission: "automatic", body: "suv", condition: "recent", isNew: false,
    image: rav4, badge: "fuel_saver", overview: {
      en: "Hybrid family SUV with excellent fuel economy, generous space and Toyota's proven reliability.",
      uk: "Гібридний сімейний SUV з відмінною економією, просторим салоном і відомою надійністю Toyota.",
    },
    features: [
      { en: "AWD-i", uk: "Повний привід AWD-i" },
      { en: "Toyota Safety Sense", uk: "Toyota Safety Sense" },
      { en: "Wireless CarPlay", uk: "Бездротовий CarPlay" },
      { en: "Power tailgate", uk: "Електропривод багажника" },
    ],
    benefits: benefitsFamily,
  },
  {
    slug: "volkswagen-passat-2021",
    brand: "Volkswagen", model: "Passat", year: 2021, price: 21800, mileageKm: 52000,
    fuel: "diesel", transmission: "automatic", body: "sedan", condition: "used", isNew: false,
    image: passat, overview: {
      en: "A composed business sedan with strong diesel efficiency and a refined, quiet ride.",
      uk: "Збалансований бізнес-седан з ефективним дизелем і витонченою тихою ходою.",
    },
    features: [
      { en: "Digital Cockpit Pro", uk: "Digital Cockpit Pro" },
      { en: "LED Matrix headlights", uk: "LED Matrix фари" },
      { en: "Adaptive cruise", uk: "Адаптивний круїз" },
      { en: "Front & rear cameras", uk: "Камери спереду та ззаду" },
    ],
    benefits: benefitsBusiness,
  },
  {
    slug: "hyundai-kona-electric-2023",
    brand: "Hyundai", model: "Kona Electric", year: 2023, price: 27800, mileageKm: 8000,
    fuel: "electric", transmission: "automatic", body: "suv", condition: "recent", isNew: true,
    image: kona, badge: "new_arrival", overview: {
      en: "A modern compact electric SUV with strong range, quick charging and a tech-rich interior.",
      uk: "Сучасний компактний електричний SUV з хорошим запасом ходу, швидкою зарядкою та сучасним салоном.",
    },
    features: [
      { en: "Range up to 400 km", uk: "Запас ходу до 400 км" },
      { en: "100 kW DC charging", uk: "DC-зарядка 100 кВт" },
      { en: "Highway Driving Assist", uk: "Highway Driving Assist" },
      { en: "Heat pump", uk: "Тепловий насос" },
    ],
    benefits: benefitsCity,
  },
  {
    slug: "kia-rio-2022",
    brand: "Kia", model: "Rio", year: 2022, price: 13900, mileageKm: 30000,
    fuel: "petrol", transmission: "automatic", body: "sedan", condition: "used", isNew: false,
    image: rio, badge: "city_choice", overview: {
      en: "A compact, fuel-efficient sedan with a comfortable ride and easy maintenance — perfect for the city.",
      uk: "Компактний економічний седан з комфортною ходою та простим обслуговуванням — ідеально для міста.",
    },
    features: [
      { en: "Touchscreen with CarPlay", uk: "Сенсорний дисплей з CarPlay" },
      { en: "Reversing camera", uk: "Камера заднього виду" },
      { en: "Cruise control", uk: "Круїз-контроль" },
      { en: "Climate control", uk: "Клімат-контроль" },
    ],
    benefits: benefitsCity,
  },
  {
    slug: "mercedes-benz-vito-2021",
    brand: "Mercedes-Benz", model: "Vito", year: 2021, price: 29900, mileageKm: 78000,
    fuel: "diesel", transmission: "manual", body: "van", condition: "used", isNew: false,
    image: vito, overview: {
      en: "A reliable commercial van with a spacious cargo area, ideal for work and small business use.",
      uk: "Надійний комерційний фургон з просторим вантажним відсіком, ідеальний для роботи та малого бізнесу.",
    },
    features: [
      { en: "Large cargo area", uk: "Великий вантажний відсік" },
      { en: "Bluetooth audio", uk: "Bluetooth аудіо" },
      { en: "Cruise control", uk: "Круїз-контроль" },
      { en: "Parking sensors", uk: "Парктроніки" },
    ],
  },
];

export const brandList = Array.from(new Set(vehicles.map(v => v.brand))).sort();
