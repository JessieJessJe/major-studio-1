## What Makes National Museum of American History?
A typographic visualization on cultural tagging in NMAH | 
[Link to the Page](https://jessiejessje.github.io/major-studio-1/quantitative_data/v2/)

![demo](https://github.com/JessieJessJe/major-studio-1/blob/master/quantitative_data/recording.gif)

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
<img src="https://github.com/JessieJessJe/major-studio-1/blob/master/quantitative_data/v2/sketch.jpeg" width=100%>


#### first prototype
<img src="https://github.com/JessieJessJe/major-studio-1/blob/master/quantitative_data/v1/Screen%20Shot%202021-09-15%20at%208.59.51%20PM.png" width=50% height=50%>
<img src="https://github.com/JessieJessJe/major-studio-1/blob/master/quantitative_data/v1/Screen%20Shot%202021-09-16%20at%2010.45.44%20AM.png" width=50% height=50%>

#### second prototype

Because the dataset I've chosen is highly skewed, it's hard to represent all the data points on one scale. Therefore in this round, I've added a sliding feature, allowing visitors to slide through the type horizontally, to get detailed information on each category. Furthermore, there's a large marker on the slider, whose color is the same as the category being hovered on – to better help visitors distinguish categories in the condensed area.   

![picture](https://github.com/JessieJessJe/major-studio-1/blob/master/quantitative_data/v2/AT.jpeg)
