// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function getRecordSearch(filter: string ) {
//     try {
//         const whereCondition: any = {};

//         if (filter === "id") {
//             whereCondition.id = filter.id;
//         } else if (filter.cpf) {
//             whereCondition.tutors = { cpf: filter.cpf };
//         } else if (filter.protocol) {
//             whereCondition.pets = { protocol: filter.protocol };
//         } else if (filter.microchip) {
//             whereCondition.pets = { microchip: filter.microchip };
//         } else if (filter.type) {
//             whereCondition.services_records = {
//                 some: {
//                     services: { type: filter.type }
//                 }
//             };
//         }

//         const fichas = await prisma.records.findMany({
//             where: whereCondition,
//             include: {
//                 tutors: {
//                     include: {
//                         address_tutors_addressToaddress: true,
//                     },
//                 },
//                 pets: {
//                     select: {
//                         protocol: true,
//                         age: true,
//                         size_pet: true,
//                         input_date: true,
//                         specie: true,
//                         breed: true,
//                         color: true,
//                         weight: true,
//                         pet_gender: true,
//                         plate: true,
//                         microchip: true,
//                     },
//                 },
//                 services_records: {
//                     include: {
//                         services: {
//                             select: {
//                                 type: true,
//                                 price: true,
//                             },
//                         },
//                     },
//                 },
//             },
//         });

//         return fichas;
//     } catch (error) {
//         console.error("Erro ao buscar registros:", error);
//         return [];
//     }
// }
