import Principal from "src/domain/entities/auth/principal";

import PresenceValidator from "src/domain/utils/validation/validators/presence_validator";
import DatesRangeValidator from "src/domain/utils/validation/validators/dates_range_validator";
import StringInArrayValidator from "src/domain/utils/validation/validators/string_in_array_validator";

import PrincipalValidationUtil from "src/domain/utils/validation/principal_validation_util";
import CreateAdValidationUtil from "src/domain/utils/validation/ads/create_ad_validation_util";
import DeleteAdValidationUtil from "src/domain/utils/validation/ads/delete_ad_validation_util";
import EditAdValidationUtil from "src/domain/utils/validation/ads/edit_ad_validation_util";
import GetAdsPageValidationUtil from "src/domain/utils/validation/ads/get_ads_page_validation_util";

import ProfileTranslator from "src/data/translators/auth/profile_translator";
import UserTranslator from "src/data/translators/auth/user_translator";
import AdTranslator from "src/data/translators/ads/ad_translator";

import AdsMockRepository from "src/data/repositories/ads/ads_mock_repository";
// import AdsRESTRepository from "src/data/repositories/ads/ads_rest_repository";

import CreateAdUseCase from "src/domain/use_cases/ads/create_ad_use_case";
import GetAdUseCase from "src/domain/use_cases/ads/get_ad_use_case";
import DeleteAdUseCase from "src/domain/use_cases/ads/delete_ad_use_case";
import EditAdUseCase from "src/domain/use_cases/ads/edit_ad_use_case";
import GetAdsPageUseCase from "src/domain/use_cases/ads/get_ads_page_use_case";

import PrincipalUtil from "src/presentation/utils/principal_util";

import CreateAdHandler from "src/presentation/handlers/ads/create_ad_handler";
import GetAdHandler from "src/presentation/handlers/ads/get_ad_handler";
import DeleteAdHandler from "src/presentation/handlers/ads/delete_ad_handler";
import EditAdHandler from "src/presentation/handlers/ads/edit_ad_handler";
import GetAdsPageHandler from "src/presentation/handlers/ads/get_ads_page_handler";

// const adsRestBaseUrl = "http://localhost:8000/v1/ads";
// const adsTokenType = "Bearer";

export const principal = new Principal(undefined, undefined);
principal.onLogin();

const presenceValidator = new PresenceValidator();
const datesRangeValidator = new DatesRangeValidator();
const stringInArrayValidator = new StringInArrayValidator();

const principalValidationUtil = new PrincipalValidationUtil();
const createAdValidationUtil = new CreateAdValidationUtil(
  principalValidationUtil,
  presenceValidator,
  datesRangeValidator
);
const deleteAdValidationUtil = new DeleteAdValidationUtil(principalValidationUtil);
const editAdValidationUtil = new EditAdValidationUtil(
  principalValidationUtil,
  presenceValidator,
  datesRangeValidator
);
const getAdsPageValidationUtil = new GetAdsPageValidationUtil(stringInArrayValidator);

const profileTranslator = new ProfileTranslator();
const userTranslator = new UserTranslator(profileTranslator);
const adTranslator = new AdTranslator(userTranslator);

const adsRepository = new AdsMockRepository(adTranslator);
// const adsRepository = new AdsRESTRepository(
//   adsRestBaseUrl,
//   adsTokenType,
//   principal,
//   adTranslator
// );

const createAdUseCase = new CreateAdUseCase(
  createAdValidationUtil,
  adsRepository
);
const getAdUseCase = new GetAdUseCase(adsRepository);
const deleteAdUseCase = new DeleteAdUseCase(deleteAdValidationUtil, adsRepository);
const editAdUseCase = new EditAdUseCase(editAdValidationUtil, adsRepository);
const getAdsPageUseCase = new GetAdsPageUseCase(getAdsPageValidationUtil, adsRepository);

const principalUtil = new PrincipalUtil(principal);

export const createAdHandler = new CreateAdHandler(createAdUseCase, principalUtil);
export const getAdHandler = new GetAdHandler(getAdUseCase);
export const deleteAdHandler = new DeleteAdHandler(deleteAdUseCase, principalUtil);
export const editAdHandler = new EditAdHandler(editAdUseCase, principalUtil);
export const getAdsPageHandler = new GetAdsPageHandler(getAdsPageUseCase);
