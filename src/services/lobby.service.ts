import { DeleteResult, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';
import { insertOne, getCount, findAll, findAllData, getOneById, updateOne, deleteOne } from 'src/repository/lobby.repository';
import { Lobby } from 'src/domain/lobby.entity';
import { generatePermanentPresignedUrl } from 'src/common/upload';

async function createLobby(lobby: Lobby): Promise<Lobby> {
  const createOne = await insertOne(lobby);
  if (!createOne) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "Lobby create Error."
    );
  }
  return createOne;
}

async function findLobby(): Promise<{ count: number, list: Lobby[] }> {
  const [count, list] = await Promise.all([getCount(), findAll()]);
  for (let index = 0; index < list.length; index++) {
    const getSignedUrl = list[index].FILE;
    const getBucketname = list[index].BUCKET_NAME;
    const getKey = list[index].KEY;
    const url = new URL(getSignedUrl);
    const expirationString = url.searchParams.get("expires");
    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
    if (!expirationString || parseInt(expirationString, 10) < currentTimestamp) {
      list[index].FILE = await generatePermanentPresignedUrl(getBucketname, getKey);
    }
  }
  return { count, list };
}


async function findLobbyForDashboardService(): Promise<{ list: any }> {
  const list = await findAll();
  for (let mainIndex = 0; mainIndex < list.length; mainIndex++) {
    const mainUrl = await generatePermanentPresignedUrl(list[mainIndex]?.BUCKET_NAME, list[mainIndex]?.KEY)
    list[mainIndex].FILE = mainUrl;
    delete list[mainIndex].UPDATED_DATE;
    delete list[mainIndex].DATA;
    delete list[mainIndex].CREATED_DATE;
    delete list[mainIndex].GAME;
    delete list[mainIndex].BUCKET_NAME;
    delete list[mainIndex].KEY;
  }
  
  return { list };
}

async function findAllLobby(query: any): Promise<{ data: Lobby[], count: number }> {
  const data = await findAllData(query);
  if (!data) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "Lobby list Found Error."
    );
  }
  for (let index = 0; index < data.data.length; index++) {
    const getSignedUrl = data.data[index].FILE;
    const getBucketname = data.data[index].BUCKET_NAME;
    const getKey = data.data[index].KEY;
    const url = new URL(getSignedUrl);
    const expirationString = url.searchParams.get("expires");
    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert to seconds
    if (!expirationString || parseInt(expirationString, 10) < currentTimestamp) {
      data.data[index].FILE = await generatePermanentPresignedUrl(getBucketname, getKey);
    }
  }
  return data;
}

async function findOneLobby(id: string): Promise<Lobby[]> {
  const findLobby = await getOneById(id);
  if (!findLobby[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Lobby is not found."
    );
  }
  return findLobby
}

async function updateLobby(id: string, Lobby: Lobby): Promise<UpdateResult> {
  let getLobby = await getOneById(id);
  if (!getLobby[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Lobby is not found."
    );
  }
  const updateLobby = await updateOne(id, Lobby);
  return updateLobby;
}

async function deleteLobby(id: string): Promise<Lobby> {
  let getlobby = await getOneById(id);
  if (!getlobby) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Lobby is not found."
    );
  }
  const deletedata = await deleteOne(id);
  return deletedata;
}

async function findLobbyNameService() {
  const list = await findAll();
  return list?.map((data) => ({ TASK_LOBBY_ID: data?.ID, NAME: data?.TITLE }));
}

export { createLobby, findLobby, findAllLobby, findOneLobby, updateLobby, deleteLobby, findLobbyNameService, findLobbyForDashboardService };



