
const fs = require('fs');
const fetch = require('node-fetch');

//https://api.si.edu/openaccess/api/v1.0/search?api_key=7uGECQUQp4L06H0EhPGinVVToEECK8SGLH86o4KU&q=data_source:%22National+Museum+of+American+History%22&

const api = 'api_key='+'7uGECQUQp4L06H0EhPGinVVToEECK8SGLH86o4KU';
const starter = 'https://api.si.edu/openaccess/api/v1.0/search?';
fetch('https://api.si.edu/openaccess/api/v1.0/search?api_key=7uGECQUQp4L06H0EhPGinVVToEECK8SGLH86o4KU&q=data_source:%22National+Museum+of+American+History%22&')
                .then((resp) => resp.json())
                .then((d) => {
                    // data = d.response.rows;
                    console.log(d) });


const culture = 'African Americans,Africans,Americans,Amish,Asian Pacific Americans,Asians,Baptists,Blacks,Buddhists,Chinese,Chinese Americans,Christian Scientists,Christians,Cossacks,Creek Indians,Eskimos,Europeans,Filipino Americans,Filipinos,French,Germans,Hawaiians,Hindus,Hippies,Hispanics,Indians of North America,Israelis,Italians,Japanese,Japanese Americans,Jews,Kabyles,Latin Americans,Latinos,Mexican Americans,Mexicans,Muslims,Native Americans,Romanies,Russians,Scots,Spaniards,Turks,Vietnamese'.split(',')

for (let i=0; i<culture.length; i++){

    let url = starter + api + '&q='+ culture[i] + '&fq=data_source:%22National+Museum+of+American+History%22&'

    // const response = await fetch('https://api.github.com/users/github');
    // const data = await response.json();
}

