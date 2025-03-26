import fetch from 'node-fetch';

// This file will be used for OpenCorporates API integration
// Currently using WikiData as the data source

async function getExternalIds(entityId) {
    const url = `https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`;
    const response = await fetch(url);
    const data = (await response.json()).entities[entityId].claims;
    
    const opencorporates = data?.P1320?.[0]?.mainsnak?.datavalue?.value;
    const secCik = data?.P5166?.[0]?.mainsnak?.datavalue?.value;
    const lei = data?.P1278?.[0]?.mainsnak?.datavalue?.value;

    return {
        "OpenCorporates ID": opencorporates,
        "SEC CIK": secCik,
        "LEI": lei
    };
}

async function getCompanyDetails(entityId) {
    const url = `https://www.wikidata.org/wiki/Special:EntityData/${entityId}.json`;
    const response = await fetch(url);
    const entityData = (await response.json()).entities[entityId];
    
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
            const ceoResponse = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${ceoId}.json`);
            const ceoData = await ceoResponse.json();
            const ceoName = ceoData.entities[ceoId].labels?.en?.value;
            if (ceoName) {
                ceos.push(ceoName);
            }
        }
    }
    
    // Get founders
    for (const founder of claims.P112 || []) {
        if (founder?.mainsnak?.datavalue) {
            const founderId = founder.mainsnak.datavalue.value.id;
            const founderResponse = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${founderId}.json`);
            const founderData = await founderResponse.json();
            const founderName = founderData.entities[founderId].labels?.en?.value;
            if (founderName) {
                founders.push(founderName);
            }
        }
    }

    // Get key people (P169)
    for (const person of claims.P169 || []) {
        if (person?.mainsnak?.datavalue) {
            const personId = person.mainsnak.datavalue.value.id;
            const personResponse = await fetch(`https://www.wikidata.org/wiki/Special:EntityData/${personId}.json`);
            const personData = await personResponse.json();
            const personName = personData.entities[personId].labels?.en?.value;
            if (personName && !ceos.includes(personName)) {
                keyPeople.push(personName);
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
    // Wikidata SPARQL endpoint
    const url = "https://www.wikidata.org/w/api.php";
    
    // Parameters for the search
    const params = new URLSearchParams({
        action: "wbsearchentities",
        format: "json",
        language: "en",
        type: "item",
        search: companyName,
        origin: "*"  // Required for CORS
    });
    
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();
    
    if (!data.search?.length) {
        return null;
    }
    
    // Get the top matches
    return data.search.map(result => ({
        id: result.id,
        label: result.label,
        description: result.description || "No description available"
    }));
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