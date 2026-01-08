import { DeleteResult, FindOperator, InsertManyResult, InsertOneOptions, InsertOneResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { MultiGames } from 'src/domain/games.entity';
import { insertOne, getCount, findAll, findAllData, updateOne, getOneById, deleteOne } from 'src/repository/games.repository';

async function createGame(multiGames: MultiGames): Promise<MultiGames> {
  const createOne = await insertOne(multiGames);
  if (!createOne) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "Game create Error."
    );
  }
  return createOne;
}

async function findGame(): Promise<{ count: number, list: MultiGames[] }> {
  const [count, list] = await Promise.all([getCount(), findAll()]);
  return { count, list };
}

async function findAllGame(query:any): Promise<{ data: MultiGames[], count: number }> {
  const data = await findAllData(query);
  if (!data) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "Game list Found Error."
    );
  }
  return data;
}


async function findOneGame(id: string): Promise<MultiGames[]> {
  const findGame = await getOneById(id);
  if (!findGame[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Game is not found."
    );
  }
  return findGame
}

async function deleteGame(id: string): Promise<MultiGames[]> {
  let getgame = await getOneById(id);

  if (!getgame[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Game is not found."
    );
  }
  const deletedata = await deleteOne(id);
  return deletedata;
}

async function updateGame(id: string, multiGames: MultiGames): Promise<UpdateResult> {
  let getgame = await getOneById(id);
  if (!getgame[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Game is not found."
    );
  }
  let updateGame = await updateOne(id, multiGames);
  return updateGame;
}

export { createGame, findGame, findAllGame, updateGame, findOneGame, deleteGame };



