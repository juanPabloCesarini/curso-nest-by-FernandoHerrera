import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {
    private cars = [
        {
            id: 1,
            brand: "Toyota",
            model: "Corolla"
        },
        {
            id: 2,
            brand: "Fiat",
            model: "Siena"
        },
        {
            id: 3,
            brand: "Renault",
            model: "19"
        }
    ]

    findAll() {
        return this.cars;
    }

    findOneById(id: number) {
        const car = this.cars.find(car => car.id === id)
        if (!car) throw new NotFoundException(`El id ${id} no existe`)
        
        return car;
    }
}
