import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response-interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

   constructor(
      @InjectModel(Pokemon.name)
      private readonly pokemonModel: Model<Pokemon>,
    ) { }


  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemonToInsert: { name: string; number: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const number = +segments[segments.length - 2];
      pokemonToInsert.push({ name, number });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed';
  }
}    