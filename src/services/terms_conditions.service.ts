import { TermsAndConditions } from 'src/domain/tearms_conditions.entity';
import { getCount, findAll, insertOne, deleteOne, updateOne, getOneById, findAllData } from './../libs/typeorm/terms_conditions.repository';
import { DeleteResult, FindOperator, UpdateResult } from 'typeorm';
import StandardError from 'src/common/standard-error';
import { ErrorCodes } from 'src/common/error-type';

async function createTerm(termsAndConditions: TermsAndConditions): Promise<TermsAndConditions> {
  const createOne = await insertOne(termsAndConditions);
  if (!createOne) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "Terms and conditions create Error."
    );
  }
  return createOne;
}

async function findTerm(): Promise<{ count: number, list: TermsAndConditions[] }> {
  const [count, list] = await Promise.all([getCount(), findAll()]);
  return { count, list };
}

async function findAllTerm(query:any): Promise<{ data: TermsAndConditions[], count: number }> {
  const res = await findAllData(query);
  if (!res) {
    throw new StandardError(
      ErrorCodes.API_VALIDATION_ERROR,
      "Terms and conditions list Found Error."
    );
  }
  return res;
}

async function findOneTerm(id: string): Promise<TermsAndConditions[]> {
  const term = await getOneById(id);
  if (!term[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Terms and conditions is not found."
    );
  }
  return term
}

async function deleteTerm(id: string): Promise<DeleteResult> {
  let getterms = await getOneById(id);
  if (!getterms[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Terms and conditions is not found."
    );
  }
  const deletedata = await deleteOne(id);
  return deletedata;
}

async function updateTerm(id: string, termsAndConditions: TermsAndConditions): Promise<UpdateResult> {
  let getterms = await getOneById(id);
  if (!getterms[0]) {
    throw new StandardError(
      ErrorCodes.NOT_FOUND,
      "Terms and conditions is not found."
    );
  }
  let updateTC = await updateOne(id, termsAndConditions);
  return updateTC;
}

export { findTerm, createTerm, deleteTerm, updateTerm, findAllTerm, findOneTerm };



