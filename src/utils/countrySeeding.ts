import { MigrationInterface, QueryRunner } from 'typeorm';
import { CountriesAndCodes } from '../utils/countries';
import { Country } from '../models/country';

export class SeedCountries1674120802783 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const connection = queryRunner.connection;

        for (const countryData of CountriesAndCodes) {
            const country: any = new Country();

            country.name = countryData.name;
            country.iso2 = countryData.iso2;
            country.iso3 = countryData.iso3;
            country.isoCode = countryData.isoCode;
            country.numCode = countryData.numCode;
            country.capital = countryData.capital;
            country.currency = countryData.currency;
            country.region = countryData.region;
            country.language = countryData.language;
            country.flag = countryData.flag;

            await connection.manager.save(country);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // const connection = queryRunner.connection;
        // const country: any = new Country();
        //   await connection.manager.delete(country, {});
    }
}
