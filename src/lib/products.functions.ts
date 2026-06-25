
import { z } from "zod";
import phinSuaDa from "@/assets/products/phin-sua-da.png";
import phinDenDa from "@/assets/products/phin-den-da.png";
import traSenVang from "@/assets/products/tra-sen-vang.jpg";
import trathanhdao from "@/assets/products/tra-thanh-dao.jpg";
import freezematcha from "@/assets/products/freeze-matcha.jpg";
import freezechoc from "@/assets/products/freeze-chocolate.jpg";


export async function listProducts() {
  return [
    {
      id: "phin-sua-da",
      name: "Phin Sữa Đá",
      category: "Cà phê",
      description: "Hương vị cà phê Việt Nam đích thực, đậm đà từ hạt Robusta.",
      price: 29000,
      image_url: phinSuaDa,
      is_available: true,
    },

    {
      id: "bac-xiu-da",
      name: "Bạc Xỉu Đá",
      category: "Cà phê",
      description: "Sữa nhiều hơn cà phê, thơm béo dễ uống.",
      price: 32000,
      image_url: phinDenDa,
      is_available: true,
    },

    {
      id: "phin-den-da",
      name: "Phin Đen Đá",
      category: "Cà phê",
      description: "Cà phê đen truyền thống Việt Nam.",
      price: 27000,
      image_url: phinDenDa,
      is_available: true,
    },

    {
      id: "tra-sen-vang",
      name: "Trà Sen Vàng",
      category: "Trà",
      description: "Trà sen thanh mát kết hợp thạch giòn.",
      price: 39000,
      image_url: traSenVang,
      is_available: true,
    },

    {
      id: "tra-thach-dao",
      name: "Trà Thạch Đào",
      category: "Trà",
      description: "Đào ngọt dịu kết hợp trà thơm.",
      price: 39000,
      image_url: trathanhdao,
      is_available: true,
    },

    {
      id: "freeze-tra-xanh",
      name: "Freeze Trà Xanh",
      category: "Freeze",
      description: "Trà xanh đá xay phủ kem béo.",
      price: 55000,
      image_url: freezematcha,
      is_available: true,
    },

    {
      id: "freeze-chocolate",
      name: "Freeze Chocolate",
      category: "Freeze",
      description: "Chocolate đá xay đậm vị.",
      price: 59000,
      image_url: freezechoc,
      is_available: true,
    },
  ];
}


const productInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(120),
  category: z.string().min(1).max(60),
  description: z.string().max(500).optional().nullable(),
  price: z.number().int().min(0).max(10_000_000),
  image_url: z.string().url().max(500).optional().nullable(),
  is_available: z.boolean(),
});

 