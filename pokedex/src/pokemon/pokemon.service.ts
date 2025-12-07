import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
      }
      console.log(error);
      throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
    }
  }

  findAll(paginationDto: PaginationDto) {

    const {limit = 10, offset = 0} = paginationDto;
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({number: 1})
      .select('-__v');
  }

  async findOne(term: string) {
    let pokemon: Pokemon | null;

    // Search by MongoID

    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    // Search by number or name
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ number: term });
    } else {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase() });
    }
    if (!pokemon) {
      throw new NotFoundException(`Pokemon with id, name or number "${term}" not found`);
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      try {

        await pokemon.updateOne(updatePokemonDto);
        return { ...pokemon.toJSON(), ...updatePokemonDto };
      } catch (error) {
        if (error.code === 11000) {
          throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`);
        }
        console.log(error);
        throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
      }
    }


  }

  async remove(id: string) {
    const {deletedCount} = await this.pokemonModel.deleteOne({_id: id});
    if(deletedCount === 0) throw new BadRequestException(`Pokemon with id "${id}" not found`);
    return;
  }}