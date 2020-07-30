<a href="http://sadedegel.ai"><img src="https://sadedegel.ai/dist/img/logo-2.png?s=280&v=4" width="125" height="125" align="right" /></a>


# Sadedegel Annotator
[Electronjs](https://www.electronjs.org/) based labeling tool for extraction based summarization. Developed as a part of [Açık Kaynak Hackathon Programı 2020](https://www.acikhack.com/), in order to provide annotated data for [Sadedegel Library](https://github.com/GlobalMaksimum/sadedegel).

[![License](https://img.shields.io/pypi/l/sadedegel)](https://github.com/GlobalMaksimum/sadedegel-annotator/blob/master/LICENSE)
![Last Commit](https://img.shields.io/github/last-commit/globalmaksimum/sadedegel-annotator?style=plastic&logo=GitHub)

## 💬 Where to ask questions

The SadedeGel project is maintained by [@globalmaksmum](https://github.com/GlobalMaksimum) AI team members
[@dafajon](https://github.com/dafajon),
[@askarbozcan](https://github.com/askarbozcan),
[@mccakir](https://github.com/mccakir) and 
[@husnusensoy](https://github.com/husnusensoy). 

| Type                     | Platforms                                              |
| ------------------------ | ------------------------------------------------------ |
| 🚨 **Bug Reports**       | [GitHub Issue Tracker]                                 |
| 🎁 **Feature Requests**  | [GitHub Issue Tracker]                                 |

[github issue tracker]: https://github.com/GlobalMaksimum/sadedegel-annotator/issues

## Installation

Sadedegel Annotator is a cross-platform desktop application. 

- **Supported Operating Systems**: macOS · Linux · Windows 

To install Sadedegel Annotator and its dependencies:

```sh
$ git clone https://github.com/GlobalMaksimum/sadedegel-annotator.git
$ cd sadedegel-annotator
$ npm install
```

## Usage

```sh
$ npm start
```

### How it works

Sadedegel Annotator enables the user to summarize texts by eliminating sentences in rounds. At each round, user identifies the sentences that contain the least important information and selects them to be extracted from the text. For each sentence, the round it is eliminated in implies its level of importance.

### Sample Input 

Input should be json file(s) in the following format:

 ```sh
{"sentences":["Şimdi sizden günlük hayatınızda devamlı olarak kullandığınız bir unsuru düşünmenizi istiyorum.",
"Onsuz yapamam dediğiniz, artık varlığı hayatınızda bir alışkanlık oluşturmuş, yokluğu ise panik sebebi olan...",
"Herkesin farklı olabilir; telefon, araba veya bilgisayar...",]}
 ```

### Output

Output is saved in [selectedInputDirectory]/labeled.

## References

* [Extraction Based Summarization](https://en.wikipedia.org/wiki/Automatic_summarization)
