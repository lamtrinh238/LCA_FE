import { ComSwModel } from './comsw';
import { PcrLinkModel } from './pcr-link';

export class ClientModel {
    comAdd: string;
    comBannerLogo: string;
    comCity: string;
    comCompanyname: string;
    comCompanyvat: string;
    comCountry: number;
    comCreatedby: number;
    comCreatedttm: string;
    comDir: string;
    comEmail: string;
    comEpdinfo1: string;
    comEpdinfo2: string;
    comEpdinfo3: string;
    comEpdinfo4: string;
    comEpdpicture1: string;
    comEpdpicture2: string;
    comGuid: string;
    comId: number;
    comLogo: string;
    comMainContact: string;
    comManagmentSys: string;
    comModulSharing: string;
    comModulSubFase: string;
    comPageText: string;
    comPaidTo: string;
    comPhone1: string;
    comPhone2: string;
    comProgramOperator: number;
    comProid: string;
    comStartup: string;
    comStatus: string;
    comSystem: number;
    comToken: string;
    comType: number;
    comWeb: string;
    comZip: string;
    countryName: string;
    comsws: ComSwModel[];
    comPCRLink: PcrLinkModel[];

    constructor() {}
}

export enum ComSWID {
    eEPD = 1,
    eKVAM = 2,
    eCAL = 3,
    eTRANS = 4,
    eFOODWASTE = 5,
    ePACK = 6,
    eCO2 = 7,
    eProject = 8,
    EPD2Digi = 13,
}
