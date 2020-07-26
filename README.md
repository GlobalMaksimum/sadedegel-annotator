<a href="http://sadedegel.ai"><img src="https://avatars0.githubusercontent.com/u/2204565?s=280&v=4" width="125" height="125" align="right" /></a>


# Sadedegel Annotator
Electron based labeling tool for extraction based summarization.

## Installation

Install the dependencies

```sh
$ npm install
```

## Usage

```sh
$ npm start
```
### Sample Input 

Input should be json file(s) in the following format:

 ```sh
{"sentences":["Şimdi sizden günlük hayatınızda devamlı olarak kullandığınız bir unsuru düşünmenizi istiyorum.",
"Onsuz yapamam dediğiniz, artık varlığı hayatınızda bir alışkanlık oluşturmuş, yokluğu ise panik sebebi olan...",
"Herkesin farklı olabilir; telefon, araba veya bilgisayar...",]}
 ```

### Output

Output is saved in [selectedInputDirectory]/labeled.

