## What Makes National Museum of American History?
A typographic visualization on cultural tagging in NMAH | 
[Link to the Page](https://jessiejessje.github.io/major-studio-1/quantitative_data/v2/)

<img src="https://github.com/JessieJessJe/major-studio-1/blob/master/quantitative_data/recording.gif" width=100%>

### About

There're 5,390,280 records of 44 differet cultural tags found on the collections of National Museum of American History. 
In this visualization, I created a `type` which embodies `histogram` to showcase the distribution of cultural tagging in NMAH. 

### Data

The cultural tagging data was retrieved from Smithsonian API. 

Step1: Get all the cultural tags in NMAH.

```javascript
const query = 'q=data_source:%22National+Museum+of+American+History%22&'
const cultureURL = 'https://api.si.edu/openaccess/api/v1.0/terms/topic?' + api + '&' + query; 

        fetch(cultureURL)
                    .then((resp) => resp.json())
                    .then((d) => { 
                        document.getElementById('totalCulture').innerHTML = d.response.terms.map((d) => '<br>' + d);     
                     })
```

Step2: Get the total number of collections in each cultural tag, I used the value in the "row counts" key from the API response.

```javascript
const starter = 'https://api.si.edu/openaccess/api/v1.0/search?'
const url = starter + api +'&'+ query;

        fetch(url)
            .then((resp) => resp.json())
            .then((d) => {
                data = d.response.rows;
                document.getElementById('totalResult').innerHTML = d.response.rowCount;
            })
```

### Process

#### sketch
Initially we each proposed three ideas for this project. After getting feedbacks from the class, I decided to develop my third idea to the next phase – a typographic experiment that uses type as medium to present quantitative data. | [View all three sketches](https://github.com/JessieJessJe/major-studio-1/tree/master/quantitative_data/v0)

<img src="https://github.com/JessieJessJe/major-studio-1/blob/master/quantitative_data/v0/sketch_3.png" width=100%>


#### first iteration
<img src="https://github.com/JessieJessJe/major-studio-1/blob/master/quantitative_data/iteration_1.png" width=100%>


#### second iteration
<img src="https://github.com/JessieJessJe/major-studio-1/blob/master/quantitative_data/iteration_2.png" width=100%>



