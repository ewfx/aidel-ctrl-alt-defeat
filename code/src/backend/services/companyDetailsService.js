import { wikiDataClient } from '../clients/wikidata.js';

async function getExternalIds(entityId) {
    const data = await wikiDataClient.getEntityData(entityId);
    const claims = data.claims;
    
    return {
        "OpenCorporates ID": wikiDataClient.extractValue(claims, 'P1320'),
        "SEC CIK": wikiDataClient.extractValue(claims, 'P5166'),
        "LEI": wikiDataClient.extractValue(claims, 'P1278')
    };
}

async function getCompanyDetails(entityId) {
    const entityData = await wikiDataClient.getEntityData(entityId);
    
    // Get basic information
    const labels = entityData.labels || {};
    const companyName = labels.en?.value;
    
    // Get aliases
    const aliases = entityData.aliases?.en?.map(alias => alias.value) || [];
    
    // Get descriptions
    const descriptions = entityData.descriptions || {};
    const description = descriptions.en?.value;
    
    // Get claims/statements
    const claims = entityData.claims || {};
    
    // Arrays for CEOs, founders, and key people
    const ceos = [];
    const founders = [];
    const keyPeople = [];
    
    // Get CEOs
    for (const ceo of claims.P169 || []) {
        if (ceo?.mainsnak?.datavalue) {
            const ceoId = ceo.mainsnak.datavalue.value.id;
            const ceoData = await wikiDataClient.getPersonData(ceoId);
            if (ceoData.name) {
                ceos.push(ceoData.name);
            }
        }
    }
    
    // Get founders
    for (const founder of claims.P112 || []) {
        if (founder?.mainsnak?.datavalue) {
            const founderId = founder.mainsnak.datavalue.value.id;
            const founderData = await wikiDataClient.getPersonData(founderId);
            if (founderData.name) {
                founders.push(founderData.name);
            }
        }
    }

    // Get key people (P169)
    for (const person of claims.P169 || []) {
        if (person?.mainsnak?.datavalue) {
            const personId = person.mainsnak.datavalue.value.id;
            const personData = await wikiDataClient.getPersonData(personId);
            if (personData.name && !ceos.includes(personData.name)) {
                keyPeople.push(personData.name);
            }
        }
    }

    // Compile all information
    return {
        name: companyName,
        aliases,
        description,
        CEOs: ceos,
        founders,
        key_people: keyPeople,
        external_ids: await getExternalIds(entityId)
    };
}

async function searchCompanyId(companyName) {
    return await wikiDataClient.searchEntities(companyName);
}

async function searchAndGetCompanyDetails(companyName) {
    try {
        const matches = await searchCompanyId(companyName);
        
        if (!matches) {
            return { error: `No companies found matching '${companyName}'` };
        }
        
        // For API usage, we'll automatically use the first match
        // You can modify this behavior based on your needs
        const entityId = matches[0].id;
        return await getCompanyDetails(entityId);
        
    } catch (error) {
        return { error: error.message };
    }
}

export {
    searchAndGetCompanyDetails,
    searchCompanyId,
    getCompanyDetails,
    getExternalIds
}; 