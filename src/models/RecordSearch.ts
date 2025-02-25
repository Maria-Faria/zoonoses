import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getRecordSearch(filter: string, value: string) {
    try {
        const whereCondition: any = {};

        if (filter === "ficha") {
            whereCondition.id = Number(value);
        } else if (filter === "cpf") {
            whereCondition.tutors = { cpf: value };
        } else if (filter === "protocolo") {
            whereCondition.pets = { protocol: Number(value) };
        } else if (filter === "microchip") {
            whereCondition.pets = { microchip: value };
        } else if (filter === "name") {
            whereCondition.tutors = { name: {startsWith: value} };
        }

        const fichas = await prisma.records.findMany({
            where: whereCondition,
            include: {
                tutors: {
                    include: {
                        address_tutors_addressToaddress: true,
                    },
                },
                pets: {
                    select: {
                        protocol: true,
                        age: true,
                        size_pet: true,
                        input_date: true,
                        specie: true,
                        breed: true,
                        color: true,
                        weight: true,
                        pet_gender: true,
                        plate: true,
                        microchip: true,
                    },
                },
                services_records: {
                    include: {
                        services: {
                            select: {
                                type: true,
                                price: true,
                            },
                        },
                    },
                },
            },
        });

        return fichas;
    } catch (error) {
        console.error("Erro ao buscar registros:", error);
        return [];
    }
}
